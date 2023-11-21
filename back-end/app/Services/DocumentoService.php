<?php

namespace App\Services;

use App\Models\Documento;
use App\Models\PlanoTrabalho;
use App\Models\DocumentoAssinatura;
use App\Services\ServiceBase;
use App\Exceptions\ServerException;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Throwable;

class DocumentoService extends ServiceBase {

    public function proxyUpdate($data, $unidade) {
        if(!empty($data["status"]) && $data["status"] == "GERADO") {
            $documento = Documento::find($data['id']);
            if($documento->especie == "TCR" && !empty($documento->plano_id) && $documento->status == "AGUARDANDO_SEI") {
                $planoTrabalho = PlanoTrabalho::find($documento->plano_trabalho_id);
                $planoTrabalho->documento_id = $data['id'];
                $planoTrabalho->save();    
            }
        }
        return $data;
    }

    public function afterStore($entity, $action) {
        $documento = $entity;
        if($documento->especie == "TCR" && $action == ServiceBase::ACTION_INSERT) {
            if(!empty($documento->plano_trabalho_id) && $documento->status == "GERADO") {
                $plano = PlanoTrabalho::find($documento->plano_trabalho_id);
                $plano->documento_id = $entity->id;
                $plano->save();    
            }
        }
    }

    public function pendenteSei($id_documento) {
        return Documento::where("id_documento", $id_documento)->where("status", "AGUARDANDO_SEI")->first();
    }

    public function assinar($data,$request) {
        $usuario = parent::loggedUser();
        $documentos = Documento::with(['assinaturas' => function ($query) use ($usuario) {
            $query->where('usuario_id', $usuario->id);
        }, 'planoTrabalho'])->whereIn('id', $data["documentos_ids"])->get();
        try {
            DB::beginTransaction();
            foreach($documentos as $documento) {
                $especie = $documento->especie;
                if(count($documento->assinaturas) == 0) { 
                    $this->registrarAssinatura($documento, $usuario->id,$request); 
                    if($especie == "TCR") {
                        /*
                            (RN_PTR_O)
                            Enquanto faltar assinatura no TCR, o plano vai para o (ou permanece no) status de 'AGUARDANDO_ASSINATURA'. Quando o último assinar o TCR, o plano vai para o status 'ATIVO' (RN_PTR_D);
                        */
                        $status = count(array_diff($this->programa->assinaturasExigidas($documento->planoTrabalho),$this->usuario->jaAssinaramTCR($documento->planoTrabalho->id))) > 0 ? 'AGUARDANDO_ASSINATURA' : 'ATIVO';
                        $this->status->atualizaStatus($documento->planoTrabalho, $status, 'Registrada a assinatura do servidor: ' . $usuario->nome . ' - CPF ' . $usuario->cpf . '.');                        
                    }
                } else {
                    /* Remove o documento que já foi assinado */
                    $data["documentos_ids"] = array_diff($data["documentos_ids"], [$documento->id]);
                }
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return Documento::with('assinaturas.usuario:id,nome,apelido')->whereIn('id', $data["documentos_ids"])->get()->all();
    }

    public function registrarAssinatura($documento, $usuario_id,$request){
        $unidadeLogin = Auth::user()->areasTrabalho[0]->unidade;
        $assinatura = new DocumentoAssinatura();
        $assinatura->data_assinatura = $this->unidadeService->hora($unidadeLogin->id);
        $assinatura->documento_id = $documento->id;
        $assinatura->usuario_id = $usuario_id;
        //$assinatura->assinatura = hash('md5', $assinatura->data_assinatura->toDateTimeString() . $usuario_id . $documento->conteudo);
        $assinatura->assinatura = hash('md5', $assinatura->data_assinatura . $usuario_id . $documento->conteudo);
        return $assinatura->save();
    }

}