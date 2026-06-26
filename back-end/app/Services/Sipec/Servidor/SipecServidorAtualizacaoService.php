<?php

declare(strict_types=1);

namespace App\Services\Sipec\Servidor;

use App\DTOs\Sipec\AtualizacaoDadosPessoaisDTO;
use App\DTOs\Sipec\AtualizacaoLotacaoDTO;
use App\DTOs\Sipec\ServidorAusenteDTO;
use App\DTOs\Sipec\ServidorNaoLotadoDTO;
use App\Enums\Atribuicao;
use App\Facades\SiapeLog;
use App\Repository\IntegracaoServidorRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\Services\NivelAcessoService;
use App\Services\UnidadeIntegranteService;
use App\Support\ModalidadePgd;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;

/**
 * Compara integracao_servidores com usuarios/lotações e aplica diffs.
 */
class SipecServidorAtualizacaoService
{
    private const CHUNK_SIZE = 50;
    private const TRANSACTION_RETRIES = 3;

    public function __construct(
        private readonly IntegracaoServidorRepository $integracaoServidorRepository,
        private readonly UsuarioRepository $usuarioRepository,
        private readonly UnidadeRepository $unidadeRepository,
        private readonly UnidadeIntegranteService $unidadeIntegranteService,
    ) {
    }

    /**
     * @return array{dados_pessoais: int, lotacoes_movidas: int, lotacoes_inseridas: int, usuarios_criados: int, matriculas_atualizadas: int, erros: int}
     */
    public function processar(): array
    {
        $resultado = [
            'dados_pessoais' => 0,
            'lotacoes_movidas' => 0,
            'lotacoes_inseridas' => 0,
            'usuarios_criados' => 0,
            'matriculas_atualizadas' => 0,
            'erros' => 0,
        ];

        $resultado['dados_pessoais'] = $this->atualizarDadosPessoais();
        $lotacoes = $this->atualizarLotacoes();
        $resultado['lotacoes_movidas'] = $lotacoes['movidas'];
        $resultado['lotacoes_inseridas'] = $lotacoes['inseridas'];
        $novos = $this->cadastrarNovos();
        $resultado['usuarios_criados'] = $novos['criados'];
        $resultado['matriculas_atualizadas'] = $novos['matriculas_atualizadas'];
        $resultado['erros'] = $novos['erros'];

        SiapeLog::info('SIPEC Servidor Atualização: processamento concluído', $resultado);

        return $resultado;
    }

    private function atualizarDadosPessoais(): int
    {
        $atualizacoes = array_map(
            fn(object $row) => AtualizacaoDadosPessoaisDTO::fromStdClass($row),
            $this->integracaoServidorRepository->buscarAtualizacoesDados()
        );
        $chunks = array_chunk($atualizacoes, self::CHUNK_SIZE);
        $total = 0;

        foreach ($chunks as $chunk) {
            DB::transaction(function () use ($chunk, &$total) {
                foreach ($chunk as $dto) {
                    try {
                        if ($this->aplicarAtualizacaoDadosPessoais($dto)) {
                            $total++;
                        }
                    } catch (\Throwable $e) {
                        report($e);
                        SiapeLog::error('SIPEC: falha ao atualizar dados pessoais', [
                            'matricula' => $dto->matriculasiape,
                            'erro' => $e->getMessage(),
                        ]);
                    }
                }
            }, self::TRANSACTION_RETRIES);
        }

        return $total;
    }

    private function aplicarAtualizacaoDadosPessoais(AtualizacaoDadosPessoaisDTO $dto): bool
    {
        if (empty($dto->id)) {
            return false;
        }

        $email = $this->normalizarEmail($dto->emailfuncional);

        if ($email !== null) {
            $this->liberarEmailDuplicado($email, $dto->id);
        }

        $this->usuarioRepository->update($dto->id, [
            'nome' => $dto->nomeServidor,
            'apelido' => $dto->nomeGuerra,
            'email' => $email,
            'cod_jornada' => $dto->codJornada,
            'nome_jornada' => $dto->nomeJornada,
            'modalidade_pgd' => ModalidadePgd::normalize($dto->modalidadePgd),
            'participa_pgd' => $dto->participaPgd,
            'ident_unica' => $dto->identUnica,
            'data_modificacao' => $dto->dataModificacao,
            'data_nascimento' => $dto->dataNascimento,
        ]);

        return true;
    }

    /**
     * @return array{movidas: int, inseridas: int}
     */
    private function atualizarLotacoes(): array
    {
        $contadores = ['movidas' => 0, 'inseridas' => 0];

        $this->atualizarMatriculasUsuariosSemMatricula();

        $servidoresNaoLotados = array_map(
            fn(object $row) => ServidorNaoLotadoDTO::fromStdClass($row),
            $this->integracaoServidorRepository->getServidoresInseridosNaoLotados()
        );
        $atualizacoesLotacoes = array_map(
            fn(object $row) => AtualizacaoLotacaoDTO::fromStdClass($row),
            $this->integracaoServidorRepository->getAtualizacoesLotacoes()
        );

        $registros = array_merge(
            array_map(fn(ServidorNaoLotadoDTO $dto) => ['usuario_id' => $dto->usuarioId, 'unidade_id' => $dto->unidadeId, 'tipo' => 'inserida'], $servidoresNaoLotados),
            array_map(fn(AtualizacaoLotacaoDTO $dto) => ['usuario_id' => $dto->usuarioId, 'unidade_id' => $dto->exercicioAtualId, 'tipo' => 'movida'], $atualizacoesLotacoes),
        );

        $chunks = array_chunk($registros, self::CHUNK_SIZE);

        foreach ($chunks as $chunk) {
            DB::transaction(function () use ($chunk, &$contadores) {
                foreach ($chunk as $registro) {
                    try {
                        if (empty($registro['unidade_id'])) {
                            SiapeLog::info('SIPEC: servidor sem unidade de exercício, não será alocado', [
                                'usuario_id' => $registro['usuario_id'],
                            ]);
                            continue;
                        }

                        $this->salvarLotacao($registro['usuario_id'], $registro['unidade_id']);
                        $contadores[$registro['tipo'] === 'inserida' ? 'inseridas' : 'movidas']++;
                    } catch (\Throwable $e) {
                        report($e);
                        SiapeLog::error('SIPEC: falha ao atualizar lotação', [
                            'usuario_id' => $registro['usuario_id'],
                            'erro' => $e->getMessage(),
                        ]);
                    }
                }
            }, self::TRANSACTION_RETRIES);
        }

        return $contadores;
    }

    /**
     * @return array{criados: int, matriculas_atualizadas: int, erros: int}
     */
    private function cadastrarNovos(): array
    {
        $contadores = ['criados' => 0, 'matriculas_atualizadas' => 0, 'erros' => 0];

        $ausentes = array_map(
            fn(object $row) => ServidorAusenteDTO::fromStdClass($row),
            $this->integracaoServidorRepository->getUsuariosAusentes()
        );

        if (empty($ausentes)) {
            return $contadores;
        }

        $perfilParticipante = $this->getPerfilParticipante();

        if (!$perfilParticipante) {
            SiapeLog::error('SIPEC: Perfil participante não encontrado. Cadastro de novos abortado.');
            return $contadores;
        }

        $matriculasAlteradasNoBatch = [];

        foreach ($ausentes as $dto) {
            try {
                $resultado = $this->processarServidorAusente($dto, $perfilParticipante->id, $matriculasAlteradasNoBatch);
                $contadores[$resultado]++;
            } catch (\Throwable $e) {
                $contadores['erros']++;
                report($e);
                SiapeLog::error('SIPEC: falha ao cadastrar servidor', [
                    'matricula' => $dto->matricula,
                    'cpf' => $dto->cpf,
                    'erro' => $e->getMessage(),
                ]);
            }
        }

        return $contadores;
    }

    /**
     * @return 'criados'|'matriculas_atualizadas'|'erros'
     */
    private function processarServidorAusente(ServidorAusenteDTO $dto, string $perfilParticipanteId, array &$matriculasAlteradasNoBatch): string
    {
        if (empty($dto->matricula)) {
            SiapeLog::info('SIPEC: servidor ausente sem matrícula, ignorado', ['cpf' => $dto->cpf]);
            return 'erros';
        }

        $unidadeExercicio = !empty($dto->exercicio) ? $this->unidadeRepository->findByCodigo($dto->exercicio) : null;
        $unidadeExercicioId = $unidadeExercicio?->id;

        if (!empty($dto->cpf) && !empty($unidadeExercicioId)) {
            $resultado = $this->tentarAtualizarMatricula($dto->cpf, $unidadeExercicioId, $dto->matricula, $dto->exercicio, $matriculasAlteradasNoBatch);
            if ($resultado !== null) {
                return $resultado;
            }
        }

        return $this->criarNovoUsuario($dto, $perfilParticipanteId, $unidadeExercicioId);
    }

    /**
     * @return 'matriculas_atualizadas'|null (null = deve criar novo usuário)
     */
    private function tentarAtualizarMatricula(string $cpf, string $unidadeExercicioId, string $matriculaNova, ?string $codigoExercicio, array &$matriculasAlteradasNoBatch): ?string
    {
        $usuarioExistente = $this->usuarioRepository->findByCpfAndLotacao($cpf, $unidadeExercicioId);

        if (!$usuarioExistente) {
            return null;
        }

        $matriculaAtual = $usuarioExistente->matricula;

        if (empty($matriculaAtual)) {
            $this->usuarioRepository->update($usuarioExistente->id, ['matricula' => $matriculaNova]);
            SiapeLog::info('SIPEC: matrícula preenchida em usuário sem matrícula', [
                'cpf' => $cpf, 'matricula' => $matriculaNova,
            ]);
            return 'matriculas_atualizadas';
        }

        if ($matriculaAtual === $matriculaNova) {
            return 'matriculas_atualizadas';
        }

        $chaveBatch = $cpf . '|' . $unidadeExercicioId;

        if (isset($matriculasAlteradasNoBatch[$chaveBatch])) {
            return null;
        }

        $this->usuarioRepository->update($usuarioExistente->id, ['matricula' => $matriculaNova]);
        $matriculasAlteradasNoBatch[$chaveBatch] = true;

        SiapeLog::info('SIPEC: matrícula atualizada sem criar novo usuário', [
            'cpf' => $cpf, 'de' => $matriculaAtual, 'para' => $matriculaNova,
        ]);

        return 'matriculas_atualizadas';
    }

    private function criarNovoUsuario(ServidorAusenteDTO $dto, string $perfilParticipanteId, ?string $unidadeExercicioId): string
    {
        $email = $this->validarEmail($dto->emailfuncional);

        if ($email !== null) {
            $this->liberarEmailDuplicado($email, null);
        }

        $atributos = [
            'id' => Uuid::uuid4()->toString(),
            'cpf' => $dto->cpf,
            'nome' => $dto->nome,
            'email' => $email,
            'matricula' => $dto->matricula,
            'apelido' => $dto->apelido,
            'telefone' => $dto->telefone,
            'data_nascimento' => $dto->dataNascimento,
            'sexo' => $dto->sexo,
            'situacao_funcional' => $dto->situacaoFuncional ?? 'DESCONHECIDO',
            'perfil_id' => $perfilParticipanteId,
            'modalidade_pgd' => ModalidadePgd::normalize($dto->modalidadePgd),
            'ident_unica' => $dto->identUnica,
            'data_modificacao' => $dto->dataModificacao,
        ];

        $usuario = $this->usuarioRepository->create($atributos);

        SiapeLog::info('SIPEC: novo usuário criado', ['id' => $usuario->id, 'matricula' => $dto->matricula]);

        if (!empty($unidadeExercicioId)) {
            $this->salvarLotacao($usuario->id, $unidadeExercicioId);
        }

        return 'criados';
    }

    private function salvarLotacao(string $usuarioId, string $unidadeId): void
    {
        $vinculo = [[
            'usuario_id' => $usuarioId,
            'unidade_id' => $unidadeId,
            'atribuicoes' => [Atribuicao::LOTADO->value],
        ]];

        $this->unidadeIntegranteService->salvarIntegrantes($vinculo, false, true);
    }

    private function atualizarMatriculasUsuariosSemMatricula(): void
    {
        $usuariosSemMatricula = $this->usuarioRepository->findAllSemMatricula();

        /** @var \App\Models\Usuario $usuario */
        foreach ($usuariosSemMatricula as $usuario) {
            $matricula = $this->integracaoServidorRepository->getMatriculaByCpf($usuario->cpf);

            if (!empty($matricula)) {
                $this->usuarioRepository->update($usuario->id, ['matricula' => $matricula]);
                SiapeLog::info('SIPEC: matrícula preenchida via CPF', [
                    'usuario_id' => $usuario->id, 'matricula' => $matricula,
                ]);
            }
        }
    }

    private function liberarEmailDuplicado(string $email, ?string $ignoreId): void
    {
        $duplicados = $this->usuarioRepository->findByEmail($email);

        if (!$duplicados || $duplicados->id === $ignoreId) {
            return;
        }

        $this->usuarioRepository->update($duplicados->id, ['email' => null]);
        SiapeLog::info('SIPEC: email duplicado liberado', [
            'usuario_id' => $duplicados->id, 'email' => $email,
        ]);
    }

    private function normalizarEmail(?string $email): ?string
    {
        if (empty($email)) {
            return null;
        }

        $email = trim(mb_strtolower($email, 'UTF-8'));

        if (!str_contains($email, '@')) {
            return null;
        }

        return $email;
    }

    private function validarEmail(?string $email): ?string
    {
        $email = $this->normalizarEmail($email);

        if ($email === null) {
            return null;
        }

        $validator = Validator::make(['email' => $email], ['email' => 'email']);

        if ($validator->fails()) {
            return null;
        }

        return $email;
    }

    protected function getPerfilParticipante(): ?\App\Models\Perfil
    {
        return NivelAcessoService::getPerfilParticipante();
    }
}
