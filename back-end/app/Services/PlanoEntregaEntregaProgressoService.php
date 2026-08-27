<?php

namespace App\Services;

use App\Enums\StatusEnum;
use App\Exceptions\ServerException;
use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoEntregaEntregaProgresso;
use App\Repository\PlanoEntregaEntregaProgressoRepository;
use App\Repository\PlanoEntregaEntregaRepository;

class PlanoEntregaEntregaProgressoService extends ServiceBase
{
  protected PlanoEntregaEntregaRepository $entregaRepository;
  protected PlanoEntregaEntregaProgressoRepository $progressoRepository;

  public function __construct(
    $collection = null,
    ?PlanoEntregaEntregaRepository $entregaRepository = null,
    ?PlanoEntregaEntregaProgressoRepository $progressoRepository = null
  ) {
    parent::__construct($collection);
    $this->entregaRepository = $entregaRepository ?? app(PlanoEntregaEntregaRepository::class);
    $this->progressoRepository = $progressoRepository ?? app(PlanoEntregaEntregaProgressoRepository::class);
  }

  public function validateStore($data, $unidade, $action)
  {
    $this->validatePlanoEntregaAtivo($data['plano_entrega_entrega_id']);
  }

  public function extraStore($entity, $unidade, $action)
  {
    $this->updateEntrega($entity);
  }

  public function extraUpdate($entity, $unidade)
  {
    $this->validatePlanoEntregaAtivo($entity['plano_entrega_entrega_id']);
    $this->updateEntrega($entity);
  }

  public function extraDestroy($data){
    $this->validatePlanoEntregaAtivo($data['plano_entrega_entrega_id']);
    $this->updateEntrega($data);
  }

  private function validatePlanoEntregaAtivo(string $planoEntregaEntregaId): void
  {
    $status = $this->statusPlanoEntrega($planoEntregaEntregaId);
    if ($status !== StatusEnum::ATIVO->value) {
      throw new ServerException("ValidatePlanoEntrega", "O progresso só pode ser alterado quando o Plano de Entregas estiver com status ATIVO.");
    }
  }

  private function statusPlanoEntrega(string $planoEntregaEntregaId): ?string
  {
    $entrega = $this->findEntrega($planoEntregaEntregaId);
    return $entrega?->planoEntrega?->status;
  }

  protected function findEntrega(string $id): ?PlanoEntregaEntrega
  {
    return $this->entregaRepository->findById($id);
  }

  /** Período e expectativa do histórico; não inclui meta/realizado da tela principal. */
  protected function dadosSincronizacaoEntrega(PlanoEntregaEntregaProgresso $progresso): array
  {
    return [
      'progresso_esperado' => $progresso->progresso_esperado,
      'data_inicio' => $progresso->data_inicio,
      'data_fim' => $progresso->data_fim,
    ];
  }

  protected function updateEntrega($data)
  {
    $entrega = $this->findEntrega($data["plano_entrega_entrega_id"]);
    if ($entrega === null) {
      return;
    }

    $progresso = $this->progressoRepository->findLatestByEntregaId($entrega->id);
    if ($progresso === null) {
      return;
    }

    $this->entregaRepository->update($entrega->id, $this->dadosSincronizacaoEntrega($progresso));
  }

}
