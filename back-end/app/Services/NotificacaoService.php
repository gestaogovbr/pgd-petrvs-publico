<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use DateTime;
use App\Services\WhatsappService;
use App\Mails\NotificacaoMail;
use App\Exceptions\LogError;
use App\Models\Notificacao;
use App\Models\NotificacaoDestinatario;
use App\Models\Usuario;
use App\Models\NotificacaoWhatsapp;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail as LaravelMail;

class NotificacaoService extends ServiceBase
{
    public function proxyQuery(&$query, &$data) {
        if(!empty($this->extractWith($data, "destinatarios"))) {
            $query->with(["destinatarios" => function($query) { 
                $query->where('usuario_id', '=', Auth::user()->id);
            }]);
        }
        $todas = $this->extractWhere($data, "todas");
        $usuarioId = $this->extractWhere($data, "usuario_id");
        $query->whereHas('destinatarios', function (Builder $query) use ($todas) {
            $destinatarios = $query->where("usuario_id", Auth::user()->id);
            if(empty($todas)) $destinatarios->whereNull('data_leitura');
        });
    }

    public function findByPhone($data) {
        try {
            $com9 = strlen($data["telefone"]) == 11 ? $data["telefone"] : substr($data["telefone"], 0, 2) . "9" . substr($data["telefone"], 2);
            $sem9 = strlen($data["telefone"]) == 10 ? $data["telefone"] : substr($data["telefone"], 0, 2) . substr($data["telefone"], 3);
            $usuario = Usuario::whereRaw("REGEXP_REPLACE(telefone, '[^0-9]', '') IN (:sem9, :com9)", ["sem9" => $sem9, "com9" => $com9])->first();
            if(isset($usuario)) {
                return $usuario;
            } else {
                throw new Exception('Usuário não encontrado');
            }
        } catch (\Throwable $e) {
            LogError::newError($e->getMessage(), $e, ["telefone" => $data["telefone"]]);
        }
    }

    public function findSession($data)
    {
        try {
            $usuario = $this->findByPhone($data);
            $session = NotificacaoWhatsapp::where("usuario_id", $data["usuario_id"])->whereRaw("DATE_ADD(data_ultima_interacao, INTERVAL 30 MINUTE) > NOW() && data_fim_sessao IS NULL")->first();
            return [
                "usuario" => $usuario,
                "session" => isset($session) ? $session->atual : null
            ];
        } catch (\Throwable $e) {
            LogError::newError($e->getMessage(), $e, ["telefone" => $data["telefone"]]);
        }
    }

    public function naoLidas() {
        return Notificacao::whereHas('destinatarios', function (Builder $query) {
            $query->where("usuario_id", Auth::user()->id)->whereNull('data_leitura');
        })->count();
    }

    public function marcarComoLido($idsDestinatarios) {
        DB::beginTransaction();
        $marcadas = 0;
        try {
            foreach($idsDestinatarios as $id) {
                $notificacao = NotificacaoDestinatario::find($id);
                if(!empty($notificacao) && $notificacao->usuario_id == Auth::user()->id) {
                    $notificacao->data_leitura = now();
                    $notificacao->save();
                    $marcadas++;
                }
            }
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return $marcadas;
    }

}
