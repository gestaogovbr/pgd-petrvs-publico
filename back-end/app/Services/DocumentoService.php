<?php

namespace App\Services;

use App\Models\Documento;
use App\Models\Plano;
use App\Models\DocumentoAssinatura;
use App\Services\ServiceBase;
use App\Exceptions\ServerException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class DocumentoService extends ServiceBase {

    public function proxyUpdate($data, $unidade) {
        if(!empty($data["status"]) && $data["status"] == "GERADO") {
            $documento = Documento::find($data['id']);
            if($documento->especie == "TERMO_ADESAO" && !empty($documento->plano_id) && $documento->status == "AGUARDANDO_SEI") {
                $plano = Plano::find($documento->plano_id);
                $plano->documento_id = $data['id'];
                $plano->save();    
            }
        }
        return $data;
    }

    public function afterStore($entity, $action) {
        $documento = $entity;
        if($documento->especie == "TERMO_ADESAO" && $action == ServiceBase::ACTION_INSERT) {
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

    public function assinar($data) {
        $usuario = Auth::user();
        $documentos = Documento::with(['assinaturas' => function ($query) use ($usuario) {
            $query->where('usuario_id', $usuario->id);
        }])->whereIn('id', $data["documentos_ids"])->get();
        try {
            DB::beginTransaction();
            foreach($documentos as $documento) {
                if($documento->especie == "TERMO_ADESAO") {
                    $plano = Plano::find($documento->plano_id);
                    $tipoModalidade = $plano->tipo_modalidade;
                    $servidor = $plano->usuario;
                    $unidade = $plano->unidade;
                    $entidade = $unidade->entidade;
                    $ids = [];
                    if($tipoModalidade->exige_assinatura && isset($servidor)) $ids[] = $servidor->id;
                    if($tipoModalidade->exige_assinatura_gestor_unidade && isset($unidade)) array_merge($ids, array_filter([$unidade->gestor_id, $unidade->gestor_substituto_id]));
                    if($tipoModalidade->exige_assinatura_gestor_entidade && isset($entidade)) array_merge($ids, array_filter([$entidade->gestor_id, $entidade->gestor_substituto_id]));
                    if(!in_array($usuario->id, $ids)) throw new ServerException("ValidateDocumento", "Usuário não tem prerrogativas para asssinar o documento #" . $documento->numero);
                }
                if(count($documento->assinaturas) == 0) {
                    $assinatura = new DocumentoAssinatura();
                    $assinatura->documento_id = $documento->id;
                    $assinatura->usuario_id = $usuario->id;
                    $assinatura->assinatura = hash('md5', $usuario->id . $documento->conteudo);
                    $assinatura->save();
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
        return Documento::with('assinaturas.usuario:id,nome,apelido')->whereIn('id', $data["documentos_ids"])->all();
    }

}