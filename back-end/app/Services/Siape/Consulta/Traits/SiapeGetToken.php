<?php
namespace App\Services\Siape\Consulta\Traits;

use Illuminate\Support\Facades\Log;
use App\Exceptions\RequestConectaGovException;

trait SiapeGetToken
{
    protected static $token = null;
    protected static $tokenExpiresAt = null;
    
    public function getToken()
    {
        if (self::$token && now()->lessThan(self::$tokenExpiresAt)) {
            return self::$token;
        }

        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => $this->getUrl() . '/oauth2/jwt-token',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => [
                'Content-Type: ' . $this->contentType,
                'Authorization: ' . $this->authorizationHeader,
            ],
            CURLOPT_POSTFIELDS => http_build_query(['grant_type' => 'client_credentials']),
        ]);

        $response = curl_exec($curl);

        if (curl_errno($curl)) {
            $error_msg = curl_error($curl);
            curl_close($curl);
            Log::error('cURL error: ' . $error_msg);
            throw new RequestConectaGovException('cURL error: ' . $error_msg);
        }

        curl_close($curl);

        $data = json_decode($response, true);

        if (isset($data['access_token'])) {
            self::$token = $data['access_token'];
            self::$tokenExpiresAt = now()->addMinutes(59);

            return $data['access_token'];
        }
        
        throw new RequestConectaGovException('Falha ao gerar o token. Response: ' . $response);
    }
}