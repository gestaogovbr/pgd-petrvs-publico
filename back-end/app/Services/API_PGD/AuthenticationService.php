<?php

namespace App\Services\API_PGD;

use Illuminate\Support\Facades\Http;

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
}
