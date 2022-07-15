<?php

namespace App\Services;

use App\Models\Documento;
use App\Models\Plano;
use App\Models\DocumentoAssinatura;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class DocumentoService extends ServiceBase {

    public function proxyUpdate($data, $unidade) {
        if(!empty($data["status"]) && $data["status"] == "GERADO") {
            $documento = Documento::find($data['id']);
            if(!empty($documento->plano_id) && $documento->status == "AGUARDANDO_SEI") {
                $plano = Plano::find($documento->plano_id);
                $plano->documento_id = $data['id'];
                $plano->save();    
            }
        }
        return $data;
    }

    public function afterStore($entity, $action) {
        $documento = $entity;
        if($documento->especie == "TERMO_ADESAO" && $action == ServiceBase::ACTION_INSERTED) {
            if(!empty($documento->plano_id) && $documento->status == "GERADO") {
                $plano = Plano::find($documento->plano_id);
                $plano->documento_id = $entity->id;
                $plano->save();    
            }
        }
    }

    public function pendenteSei($id_documento) {
        return Documento::where("id_documento", $id_documento)->where("status", "AGUARDANDO_SEI")->first();
    }

    public function assinar($documento_id) {
        $usuario = Auth::user();
        $documento = Documento::with(['assinaturas' => function ($query) use ($usuario) {
            $query->where('usuario_id', $usuario->id);
        }])->find($documento_id);
        if(isset($documento) && count($documento->assinaturas) == 0) {
            $assinatura = new DocumentoAssinatura();
            $assinatura->documento_id = $documento->id;
            $assinatura->usuario_id = $usuario->id;
            $assinatura->assinatura = hash('md5', $usuario->id . $documento->conteudo);
            $assinatura->save();
            $documento = Documento::with('assinaturas.usuario:id,nome,apelido')->find($documento_id);
        }
        return $documento;
    }

}