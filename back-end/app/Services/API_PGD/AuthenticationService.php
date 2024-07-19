<?php

namespace App\Services\API_PGD;

use Illuminate\Support\Facades\Http;
use App\Models\Tenant;

class AuthenticationService
{
  public function getToken()
  {
    $header = [
      'Accept' => 'application/json',
      'Content-Type' => 'application/x-www-form-urlencoded'
    ];
    $formParams = [
      'username' => config('pgd')['username'],
      'password' => config('pgd')['password']
    ];
    $response = Http::withOptions(['verify' => false, 'timeout' => 29])
      ->withHeaders($header)
      ->asForm()->post(config('pgd.host') . '/token', $formParams);
    if ($response->successful()) {
      $responseObj = $response->json();
      if (isset($responseObj['access_token'])) {
        return $responseObj['access_token'];
      }
    } else {
      dd("Falha autenticação");
    }
    return false;
  }

  public static function authenticate($tenantId)
  {
    $tenant = Tenant::find($tenantId) ?? abort(404, "Tenant inválido");

    $response = Http::baseUrl(config('pgd.host'))
        ->asForm()
        ->post('/token', [
            'username' => $tenant['api_username'],
            'password' => $tenant['api_password']
        ]);

    if (!$response->successful()) {
        if ($response->status() == 422) {
            $data = $response->json();
            $detail = json_decode($data['detail'], true);
            echo "Erro no tenant $tenantId: ".$detail[0]['msg'];
        } else {
            $response->throw();
        }
    }

    $dados = $response->json();
    $token = $dados['access_token'];

    return $token;
  }
}
