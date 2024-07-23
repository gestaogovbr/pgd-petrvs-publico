<?php

namespace App\Services\API_PGD;

use Illuminate\Support\Facades\Http;
use App\Services\API_PGD\HttpSenderService;
use App\Models\PlanoTrabalho;
use App\Services\API_PGD\Resources\PlanoTrabalhoResource;
use App\Services\CalendarioService;

class ExportarPlanoTrabalhoService
{
  public function __construct(
    private readonly CalendarioService $calendarioService, 
    private readonly HttpSenderService $httpSender
  )
  {}

  public function enviar($token, $ids)
  {
    $planos_trabalho = PlanoTrabalho::whereIn('id', $ids)->get();

    foreach($planos_trabalho as $plano_trabalho) {
      $resource = new PlanoTrabalhoResource($plano_trabalho);

      $response = $this->httpSender->enviarDados($token,
        "/organizacao/SIAPE/1/plano_trabalho/{$plano_trabalho->id}",
        $resource->toJson()
      );

      if (!$response->successful()) {
        if ($response->status() == 422) {
          $data = $response->json();
          var_dump($data['detail']);
        } else {
            $response->throw();
        }
      }
    }
  }
}
