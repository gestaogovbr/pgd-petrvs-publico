<?php

namespace App\Services\Siape\Gestor;

use App\Enums\Atribuicao as EnumsAtribuicao;
use App\Exceptions\ServerException;
use App\Models\Perfil;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Services\LogTrait;
use App\Services\NivelAcessoService;
use App\Services\PerfilService;
use App\Services\Siape\Contrato\InterfaceIntegracao;
use App\Services\Siape\Unidade\Atribuicao;
use App\Services\Tipo;
use App\Services\UnidadeIntegranteService;
use Illuminate\Support\Facades\Log;

class Integracao implements InterfaceIntegracao
{

    use LogTrait, Atribuicao;

    private array $message = [];

    /**
     *
     * @param array{id_unidade: string, id_chefe: string, id_substituto: string}[] $dados
     * @param Usuario $userModel
     * @param UnidadeIntegranteService $unidadeIntegranteService
     * @param NivelAcessoService $nivelAcessoService
     * @param PerfilService $perfilService
     * @param mixed $config
     */
    public function __construct(
        private array $dados,
        private Usuario $userModel,
        private UnidadeIntegranteService $unidadeIntegranteService,
        private NivelAcessoService $nivelAcessoService,
        private PerfilService $perfilService,
        private mixed $config
    ) {
        $this->message['vazio'] = [];
        $this->message['erro'] = [];
        $this->message['sucesso'] = [];
    }

    public function processar(): void
    {
        foreach ($this->dados as $dado) {
            try {
                $this->logSiape("iniciando o processamento da chefia:", $dado);
                $this->processaChefia($dado);
            } catch (\Exception $e) {
                array_push($this->message['erro'], $dado['id_unidade']);
                $this->logSiape($e->getMessage(), $dado, Tipo::ERROR);
                continue;
            }
        }
    }

    private function processaChefia(array $dado): void
    {

        if (empty($dado['id_chefe'])) {
            $unidade = Unidade::find($dado['id_unidade']);
            $this->removeAtualGestorDaUnidade($unidade);
            array_push($this->message['vazio'],  $dado['id_unidade']);
            $this->logSiape("Chefe não informado para a unidade " . $dado['id_unidade'], $dado, Tipo::WARNING);
            return;
        }
        $usuarioChefia = $this->userModel->find($dado['id_chefe']);
        $atribuicoesAtuaisDaChefia = $usuarioChefia->getUnidadesAtribuicoesAttribute();
        $unidadeExercicioId = $dado['id_unidade'];
        $chefeAtribuicoes = $this->preparaChefia($atribuicoesAtuaisDaChefia, $unidadeExercicioId);

        $this->logSiape(sprintf("atribuições do usuário: %s na unidade %s", $dado['id_chefe'], $dado['id_unidade']), $chefeAtribuicoes);

        $vinculo = $this->preparaVinculo($dado['id_chefe'], $unidadeExercicioId, $chefeAtribuicoes);

        $this->logSiape("Salvando integrantes", $vinculo, Tipo::INFO);
        $this->unidadeIntegranteService->salvarIntegrantes($vinculo, false);

        $this->alteraPerfilAdministradorNegocial($dado['id_chefe'], $usuarioChefia);
        array_push($this->message['sucesso'], $dado['id_unidade']);
    }


    private function preparaVinculo(string $idUsuario, string $unidadeExercicioId, array $atribuicoes): array
    {
        return array([
            'usuario_id' => $idUsuario,
            'unidade_id' => $unidadeExercicioId,
            'atribuicoes' => $atribuicoes,
        ]);;
    }

    private function preparaChefia(array|null $queryChefeAtribuicoes, string $unidadeExercicioId): array
    {
        if (empty($queryChefeAtribuicoes) || !is_array($queryChefeAtribuicoes) || !array_key_exists($unidadeExercicioId, $queryChefeAtribuicoes)) {
            return [EnumsAtribuicao::LOTADO->value, EnumsAtribuicao::GESTOR->value];
        }

        $chefeAtribuicoes = array_diff($queryChefeAtribuicoes[$unidadeExercicioId], [EnumsAtribuicao::DELEGADO->value, EnumsAtribuicao::GESTOR_SUBSTITUTO->value]);
        if (!in_array(EnumsAtribuicao::GESTOR->value, $chefeAtribuicoes)) array_push($chefeAtribuicoes, EnumsAtribuicao::GESTOR->value);
        $chefeAtribuicoes = array_values(array_unique($chefeAtribuicoes));
        return $chefeAtribuicoes;
    }

    private function preparaSubstituto(array|null $queryChefeAtribuicoes, string $unidadeExercicioId): array
    {
        if (empty($queryChefeAtribuicoes) || !is_array($queryChefeAtribuicoes) || !array_key_exists($unidadeExercicioId, $queryChefeAtribuicoes)) {
            return [EnumsAtribuicao::GESTOR_SUBSTITUTO->value];
        }

        $chefeAtribuicoes = array_diff($queryChefeAtribuicoes[$unidadeExercicioId], [EnumsAtribuicao::GESTOR->value]);
        if (!in_array(EnumsAtribuicao::GESTOR->value, $chefeAtribuicoes)) array_push($chefeAtribuicoes, EnumsAtribuicao::GESTOR->value);
        $chefeAtribuicoes = array_values(array_unique($chefeAtribuicoes));
        return $chefeAtribuicoes;
    }

    private function alteraPerfilAdministradorNegocial(string $idUsuario, Usuario $queryChefe): void
    {
        $perfilChefe = $this->nivelAcessoService->getPerfilChefia();
        if (empty($perfilChefe)) {
            throw new ServerException("ValidateUsuario", "Perfil de gestor não encontrado no banco de dados. Verificar configuração no painel SaaS.");
        }
        $perfilChefeId = $perfilChefe->id;
        $perfilAdministradorNegocial = $this->nivelAcessoService->getPerfilAdministrador();
        if (empty($perfilAdministradorNegocial)) {
            throw new ServerException("ValidateUsuario", "Perfil de administrador negocial não encontrado no banco de dados. Verificar configuração no painel SaaS.");
        }

        $perfilDesenvolvedor = $this->nivelAcessoService->getPerfilDesenvolvedor();
        if (empty($perfilDesenvolvedor)) {
            throw new ServerException("ValidateUsuario", "Perfil de desenvolvedor não encontrado no banco de dados. Verificar configuração no painel SaaS.");
        }
        $perfilDesenvolvedorId = $perfilDesenvolvedor->id;

        $perfilAdministradorGeral = $this->nivelAcessoService->getPerfilAdministradorGeral();
        if (empty($perfilAdministradorGeral)) {
            throw new ServerException("ValidateUsuario", "Perfil de Administrador Geral não encontrado no banco de dados. Verificar configuração no painel SaaS.");
        }
        $perfilAdministradorGeralId = $perfilAdministradorGeral->id;

        if (!in_array($queryChefe->perfil->id, [$perfilAdministradorNegocial->id, $perfilDesenvolvedorId, $perfilAdministradorGeralId])) {
            $values = [
                ':perfil_id' => $perfilChefeId,
                ':id' => $idUsuario
            ];
            $this->perfilService->alteraPerfilUsuario($idUsuario, $perfilChefeId);
            $this->logSiape("Atualizando perfil do chefe", $values, Tipo::INFO);
            return;
        }
        $this->logSiape("IntegracaoService: durante atualização de gestores, o usuário não teve seu perfil atualizado para um 'perfil de chefia' uma vez que é Desenvolvedor.", [$queryChefe->nome, $queryChefe->email]);
    }

    /**
     * Undocumented function
     *
     * @return array{sucesso: string, id_chefe: erro, vazio: string}[] 
     */
    public function getMessage(): array
    {
        return $this->message;
    }
}
