<?php

namespace App\Services\API_PGD;

use App\Models\PlanoTrabalho;
use App\Services\API_PGD\Contracts\ExportarService;
use App\Services\API_PGD\HttpSenderService;
use App\Services\API_PGD\Resources\PlanoTrabalhoResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExportarPlanoTrabalhoService extends ExportarService
{
  public function __construct(
    private readonly HttpSenderService $httpSender,
    private readonly Request $request
  ) {
    parent::__construct($httpSender);
  }

  public function enviar($token, array $ids): void
  {
    $planos_trabalho = PlanoTrabalho::whereIn('id', $ids)->get();

    foreach ($planos_trabalho as $plano_trabalho) {
      $resource = new PlanoTrabalhoResource($plano_trabalho);
      $success = $this->enviarDados($token, $resource);

      if ($success) {
        echo 'Sucesso';
      }

      $this->alterarStatus($plano_trabalho->id, $success);
    }
  }

  public function getEndpoint(JsonResource $dados): string
  {
    return "/organizacao/SIAPE/1/plano_trabalho/{$dados->id}";
  }
}
