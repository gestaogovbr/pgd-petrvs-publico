<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use App\Exceptions\LogError;

class WhatsappService 
{
    
    public static function sendMessage($number, $mensage) {
        $config = config("notificacoes")["whatsapp"];
        if(!empty($config["url"])) {
            try {
                $response = Http::post($config["url"] . "/sendText", [
                    "args" => [
                        "to" => "55" . $number . "@c.us",
                        "content" => $mensage
                    ]
                ]);
            } catch (\Throwable $e) {
                LogError::newError("Erro ao enviar mensagem Whatsapp", $e, ["number" => $number]);
            }
        }
    }

}
