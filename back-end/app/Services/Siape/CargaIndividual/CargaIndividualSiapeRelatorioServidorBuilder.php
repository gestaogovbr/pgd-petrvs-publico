<?php

declare(strict_types=1);

namespace App\Services\Siape\CargaIndividual;

use App\Models\Usuario;
use App\Repository\UsuarioRepository;
use App\Support\ModalidadePgd;

class CargaIndividualSiapeRelatorioServidorBuilder
{
    public function __construct(
        private readonly UsuarioRepository $usuarioRepository,
        private readonly CargaIndividualSiapeCampoComparator $comparator,
    ) {
    }

    /**
     * @param array<string, mixed> $dadosSiape
     * @return array<int, array<string, mixed>>
     */
    public function construir(array $dadosSiape, string $cpf): array
    {
        $dadosFuncionais = $this->normalizarFuncionais($dadosSiape['dadosFuncionais'] ?? []);
        $dadosPessoais = is_array($dadosSiape['dadosPessoais'] ?? null) ? $dadosSiape['dadosPessoais'] : [];
        $usuarios = $this->usuarioRepository->findAllByCpfUnfiltered($this->somenteNumeros($cpf) ?? $cpf)
            ->keyBy(fn(Usuario $usuario) => (string) ($usuario->matricula ?? $usuario->id));

        if ($dadosFuncionais === []) {
            $dadosFuncionais = [[]];
        }

        $secoes = [];
        foreach ($dadosFuncionais as $indice => $funcional) {
            $matricula = (string) ($funcional['matriculaSiape'] ?? '');
            /** @var Usuario|null $usuario */
            $usuario = $matricula !== '' ? $usuarios->get($matricula) : $usuarios->first();

            $secoes[] = [
                'titulo' => count($dadosFuncionais) > 1 ? 'Vinculo SIAPE ' . ($indice + 1) : 'Dados do servidor',
                'tipo' => 'servidor',
                'campos' => $this->camposServidor($dadosPessoais, $funcional, $usuario),
            ];
        }

        return $secoes;
    }

    /**
     * @param array<string, mixed> $dadosPessoais
     * @param array<string, mixed> $funcional
     * @return array<int, array<string, mixed>>
     */
    private function camposServidor(array $dadosPessoais, array $funcional, ?Usuario $usuario): array
    {
        $situacaoFuncional = $this->campoSituacaoFuncional($funcional, $usuario);

        return [
            $this->comparator->comparar('nome', 'Nome', $dadosPessoais['nome'] ?? null, $usuario?->nome),
            $this->comparator->comparar('emailInstitucional', 'E-mail institucional', $funcional['emailInstitucional'] ?? null, $usuario?->email),
            // TODO/FIXME: reexibir a ultima atualizacao do servidor quando houver fonte confiavel.
            // O XML de consultaDadosFuncionais nao traz dataUltimaTransacao; integracao_servidores tambem
            // nao e confiavel para este relatorio. A fonte correta futura deve partir do XML salvo em
            // siape_listaServidores, mas isso exige um fluxo adicional com mais consultas externas ao SIAPE.
            $this->comparator->comparar('nomeJornada', 'Jornada', $funcional['nomeJornada'] ?? null, $usuario?->nome_jornada),
            $this->comparator->comparar('codJornada', 'Codigo da jornada', $funcional['codJornada'] ?? null, $usuario?->cod_jornada),
            $this->comparator->comparar('matriculaSiape', 'Matricula SIAPE', $funcional['matriculaSiape'] ?? null, $usuario?->matricula),
            $this->comparator->comparar('codUorgExercicio', 'Unidade de exercicio', $funcional['codUorgExercicio'] ?? null, $usuario?->lotacao?->unidade?->codigo),
            $situacaoFuncional,
            $this->comparator->comparar('modalidadePGD', 'Modalidade PGD', $funcional['modalidadePGD'] ?? null, $this->modalidadePgd($usuario)),
            $this->comparator->comparar('participaPGD', 'Participa do PGD', $funcional['participaPGD'] ?? null, $usuario?->participa_pgd),
        ];
    }

    /**
     * @param array<string, mixed> $funcional
     * @return array<string, mixed>
     */
    private function campoSituacaoFuncional(array $funcional, ?Usuario $usuario): array
    {
        $campo = $this->comparator->comparar(
            'nomeSitFuncional',
            'Situacao funcional',
            $funcional['nomeSitFuncional'] ?? null,
            $usuario?->situacao_funcional,
        );

        $recebidoSiape = $this->situacaoFuncionalSiapeParaExibicao(
            $funcional['nomeSitFuncional'] ?? null,
            $funcional['codSitFuncional'] ?? null,
        );

        if ($recebidoSiape !== null) {
            $campo['recebido_siape'] = $recebidoSiape;
        }

        return $campo;
    }

    private function situacaoFuncionalSiapeParaExibicao(mixed $nome, mixed $codigo): ?string
    {
        if (!is_scalar($nome)) {
            return null;
        }

        $nome = trim((string) $nome);
        if ($nome === '') {
            return null;
        }

        $codigo = is_scalar($codigo) ? trim((string) $codigo) : '';

        return $codigo !== '' ? "{$nome} ({$codigo})" : $nome;
    }

    /**
     * @param mixed $dadosFuncionais
     * @return array<int, array<string, mixed>>
     */
    private function normalizarFuncionais(mixed $dadosFuncionais): array
    {
        if (!is_array($dadosFuncionais)) {
            return [];
        }

        if ($dadosFuncionais === []) {
            return [];
        }

        if (array_is_list($dadosFuncionais)) {
            return array_values(array_filter($dadosFuncionais, 'is_array'));
        }

        return [$dadosFuncionais];
    }

    private function modalidadePgd(?Usuario $usuario): ?string
    {
        if (!$usuario instanceof Usuario) {
            return null;
        }

        return ModalidadePgd::normalize($usuario->modalidade_pgd);
    }

    private function somenteNumeros(?string $valor): ?string
    {
        $digitos = preg_replace('/\D/', '', (string) $valor);

        return is_string($digitos) && $digitos !== '' ? $digitos : null;
    }
}
