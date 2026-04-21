<?php

namespace App\Services;

use App\Enums\PerfilEnum;
use App\Exceptions\NotFoundException;
use App\Exceptions\ServerException;
use App\Models\Afastamento;
use App\Models\PlanoTrabalhoConsolidacaoOcorrencia;
use App\Repository\Afastamento\AfastamentoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\Session;

class OcorrenciaService extends ServiceBase {

    public string $collection = "App\Models\Afastamento";

    protected AfastamentoRepository $afastamentoRepository;

    protected PlanoTrabalhoRepository $planoTrabalhoRepository;

    public function __construct()
    {
        parent::__construct();
        $this->afastamentoRepository = app(AfastamentoRepository::class);
        $this->planoTrabalhoRepository = app(PlanoTrabalhoRepository::class);
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function insert(array $attributes): Afastamento
    {
        return $this->afastamentoRepository->insert($attributes);
    }

    public function afterStore($entity, $action): void
    {
        $consolidacao = PlanoTrabalhoConsolidacaoOcorrencia::where('ocorrencia_id', $entity->id)->first();
        if ($consolidacao && $consolidacao->exists()) {
            $snapshot = (array) ($consolidacao->snapshot ?? []);
            $snapshot['data_inicio'] = $entity->data_inicio;
            $snapshot['data_fim'] = $entity->data_fim;
            $consolidacao->snapshot = $snapshot;
            $consolidacao->save();
        }
    }

    private function ocorrenciasRestritasAoProprioUsuario(): bool
    {
        $usuario = self::loggedUser();
        $nivel = $usuario?->perfil?->nivel;
        return $nivel !== null && (int) $nivel === PerfilEnum::PARTICIPANTE->value;
    }

    private function aplicarFiltroUsuarioLogado(array &$data): void
    {
        if (!$this->ocorrenciasRestritasAoProprioUsuario()) {
            return;
        }
        $uid = self::loggedUser()?->id;
        if ($uid) {
            $data['where'][] = ['usuario_id', '==', $uid];
        }
    }

    /**
     * Com MOD_OCOR_UNIDADE (e sem MOD_OCOR_TODAS_UNIDADES): lista apenas afastamentos cujo usuário possui vínculo
     * (unidades_integrantes, qualquer atribuição) com a unidade de contexto (sessão ou lotação) ou subordinada.
     */
    private function ocorrenciasRestritasPorHierarquiaUnidade(): bool
    {
        $usuario = self::loggedUser();
        if ($usuario === null) {
            return false;
        }
        if (!$usuario->hasPermissionTo('MOD_OCOR_UNIDADE')) {
            return false;
        }
        if ($usuario->hasPermissionTo('MOD_OCOR_TODAS_UNIDADES')) {
            return false;
        }

        return true;
    }

    /**
     * @return list<string>
     */
    private function idsUnidadeContextoComSubordinadas(): array
    {
        $unidadeId = Session::get('unidade_id') ?? self::loggedUser()?->lotacao?->unidade_id;
        if (empty($unidadeId)) {
            return [];
        }
        $subordinadas = $this->unidadeService->subordinadas($unidadeId);

        return array_values(array_unique(array_merge(
            [$unidadeId],
            $subordinadas->pluck('id')->all()
        )));
    }

    private function aplicarFiltroHierarquiaUnidade(array &$data): void
    {
        if (!$this->ocorrenciasRestritasPorHierarquiaUnidade()) {
            return;
        }
        $ids = $this->idsUnidadeContextoComSubordinadas();
        $data['where'][] = ['usuario_unidade_integrante_ids', 'in', $ids];
    }

    /**
     * @param array<string, mixed> $params
     * @return array{count: int, rows: mixed, extra: mixed}
     */
    public function query($params)
    {
        $this->aplicarFiltroUsuarioLogado($params);
        $this->aplicarFiltroHierarquiaUnidade($params);

        $result = $this->afastamentoRepository->findAll($params);

        return $result->toArray();
    }

    public function getById($data)
    {
        $entity = parent::getById($data);

        if ($this->ocorrenciasRestritasAoProprioUsuario() && $entity->usuario_id !== self::loggedUser()?->id) {
            throw new NotFoundException("Id não encontrado");
        }
        if ($this->ocorrenciasRestritasPorHierarquiaUnidade()) {
            $ids = $this->idsUnidadeContextoComSubordinadas();
            if (!$this->afastamentoRepository->usuarioPossuiVinculoEmUnidades((string) $entity->usuario_id, $ids)) {
                throw new NotFoundException("Id não encontrado");
            }
        }
        return $entity;
    }

    public function proxyStore($dataOrEntity, $unidade, $action)
    {
        if ($this->ocorrenciasRestritasAoProprioUsuario() && $action === ServiceBase::ACTION_INSERT) {
            $dataOrEntity['usuario_id'] = self::loggedUser()->id;
        }
        return $dataOrEntity;
    }

    public function validateStore($data, $unidade, $action)
    {
        if ($this->ocorrenciasRestritasAoProprioUsuario()) {
            if ($action === ServiceBase::ACTION_EDIT) {
                $existente = $this->afastamentoRepository->findById((string) ($data['id'] ?? ''));
                if ($existente && $existente->usuario_id !== self::loggedUser()?->id) {
                    throw new ServerException("ValidateOcorrencia", "Edição não permitida para esta ocorrência");
                }
                if (($data['usuario_id'] ?? null) !== self::loggedUser()?->id) {
                    throw new ServerException("ValidateOcorrencia", "Ocorrência deve ser registrada para o próprio usuário");
                }
            }
        }

        if (!empty($data["plano_trabalho_id"])) {
            $planoTrabalho = $this->planoTrabalhoRepository->findById((string) $data["plano_trabalho_id"]);
            if (empty($planoTrabalho)) {
                throw new ServerException("ValidateOcorrencia", "Plano de trabalho da ocorrência não encontrado");
            }
        }
    }

}
