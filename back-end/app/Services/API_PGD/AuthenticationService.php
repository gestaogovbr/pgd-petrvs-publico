<?php

namespace App\Services\API_PGD;

use App\Exceptions\BadRequestException as ExceptionsBadRequestException;
use App\Exceptions\LogError;
use App\Models\Tenant;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class AuthenticationService
{
  CONST TIMEOUT = 29;
  
  public function getToken() : string
  {
    $header = [
      'Accept' => 'application/json',
      'Content-Type' => 'application/x-www-form-urlencoded'
    ];
    $formParams = [
      'username' => config('pgd')['username'],
      'password' => config('pgd')['password']
    ];

    $response = Http::withOptions(['timeout' => self::TIMEOUT])
      ->withHeaders($header)
      ->asForm()->post(config('pgd.host') . '/token', $formParams);

      if(!$response->successful() || !isset($response->json()['access_token'])) {
        throw new ExceptionsBadRequestException('Falha na autenticação');
      }

      $responseObj = $response->json();
      return  $responseObj['access_token'];
  }

  public static function authenticate(Tenant $tenant, string $username, string $password)
  {
    try {
      $response = Http::baseUrl($tenant['api_url'])
          ->asForm()
          ->post('/token', [
              'username' => $username,
              'password' => $password
          ]);

      if (!$response->successful()) {
          if ($response->status() == Response::HTTP_UNPROCESSABLE_ENTITY) {
              $data = $response->json();

              if (is_array($data['detail'])) {
                $detail = $data['detail'];
              } else {
                $detail = json_decode($data['detail'], true);
              }
              
              Log::error("Erro no tenant $tenant->id: ".$detail[0]['msg']);
          } else {
              $response->throw();
          }
      }

      $dados = $response->json();
      $token = $dados['access_token'];

      return $token;
    } catch(\Throwable $e) {
      Log::error("Erro ao obter Token da API PGD: ".$e->getMessage());
      LogError::newError("Erro ao obter Token da API PGD: ");
      throw $e;
    }
  }
}
