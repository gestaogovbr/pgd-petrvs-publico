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

            $relatoDto                = new RelatoErroLotacaoDTO();
            $relatoDto->opcao         = $data['opcao'];
            $relatoDto->usuario_id    = $data['usuario_id'];
            $relatoDto->unidade_id    = $data['unidade_id'];
            $relatoDto->nome          = $data['nome'];
            $relatoDto->cpf           = $data['cpf'];
            $relatoDto->matricula     = $data['matricula'];
            $relatoDto->descricao     = $data['descricao'];
            $relatoDto->usuario       = $data['usuario_id'] ? Usuario::find($data['usuario_id']) : null;
            $relatoDto->unidade       = $data['unidade_id'] ? Unidade::find($data['unidade_id']) : null;

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
