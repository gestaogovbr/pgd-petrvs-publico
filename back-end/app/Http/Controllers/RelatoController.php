<?php
namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\ControllerBase;
use App\Mails\ErroLotacaoMail;
use App\DTOs\RelatoErroLotacaoDTO;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\Tenant;
use App\Models\Unidade;
use App\Models\Usuario;
use Brazanation\Documents\Cpf;
use Throwable;

class RelatoController extends ControllerBase
{
    public function checkPermissions($action, $request, $service, $unidade, $usuario){}

    public function store(Request $request) {
        try {
            $data = $request->validate([
                'opcao' => ['required'],
                'usuario_id' => 'required_if:opcao,1,2|string',
                'unidade_id' => 'required_if:opcao,1|string',
                'nome' => 'required_if:opcao,3,4|string|max:150',
                'cpf' => 'required_if:opcao,3,4|string|max:15',
                'matricula' => 'required_if:opcao,3,4|string|max:20',
                'descricao' => 'required_if:opcao,1,4|string|max:500',
            ]);

            $opcoes = [
                "1" => "O agente público mudou de unidade dentro do próprio órgão/entidade e o Petrvs não atualizou sua lotação.",
                "2" => "O agente público está cedido para outro órgão/entidade e o Petrvs o mantém na base de dados deste órgão/entidade.",
                "3" => "O agente público está cedido para este órgão/entidade, mas no Petrvs ainda não consta na base de dados.",
                "4" => "Outros"
            ];

            $relatoDto                = new RelatoErroLotacaoDTO();
            $relatoDto->opcao         = $opcoes[$data['opcao']];
            $relatoDto->usuario_id    = $data['usuario_id'];
            $relatoDto->usuario       = $data['usuario_id'] ? Usuario::find($data['usuario_id']) : null;
            $relatoDto->unidade_id    = $data['unidade_id'] ? $data['unidade_id']: ($relatoDto->usuario? $relatoDto->usuario->lotacao->unidade_id: null);
            $relatoDto->unidade       = $relatoDto->unidade_id ? Unidade::find($relatoDto->unidade_id) : null;

            if ($relatoDto->usuario) {
                $relatoDto->nome          = $relatoDto->usuario->nome;
                $relatoDto->cpf           = Cpf::createFromString($relatoDto->usuario->cpf)->format();
                $relatoDto->matricula     = $relatoDto->usuario->matricula;
            } else {
                $relatoDto->nome          = $data['nome'];
                $relatoDto->cpf           = $data['cpf'];
                $relatoDto->matricula     = $data['matricula'];
            }
            $relatoDto->descricao     = $data['descricao'];

            $tenantId = $request->headers->get('X-ENTIDADE');
            $tenant = Tenant::find($tenantId);

            if (!$tenant->smtp_host) {
               throw new \Error('SMTP não configurado');
            }

            config([
                'mail.mailers.smtp.host' => $tenant->smtp_host,
                'mail.mailers.smtp.port' => $tenant->smtp_port,
                'mail.mailers.smtp.encryption' => $tenant->smtp_encryption,
                'mail.mailers.smtp.username' => $tenant->smtp_user,
                'mail.mailers.smtp.password' => $tenant->smtp_password,
                'mail.from.address' => $tenant->smtp_from_address,
                'mail.from.name' => $tenant->smtp_from_name,
            ]);

            Mail::to($request->user())->send(new ErroLotacaoMail($relatoDto));

            return response()->json([
                'success' => true
            ]);

        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage(), 400]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json([
                'success' => false,
                'error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado.".$e->getMessage()
            ], 400);
        }
    }
}
