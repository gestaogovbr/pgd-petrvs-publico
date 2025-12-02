<?php

namespace App\Services;

use App\Models\Documento;
use App\Models\PlanoTrabalho;
use App\Models\DocumentoAssinatura;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Exceptions\ServerException;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\App;
use App\Services\UtilService;
use Illuminate\Database\Eloquent\Builder;


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

    public function extraStore($entity, $unidade, $action) {
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
                    $this->registrarAssinatura($documento, $usuario->id, $request); 
                    if($especie == "TCR") $this->planoTrabalhoService->assinaturaTcr($documento, $usuario);
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
        $assinatura = new DocumentoAssinatura();
        $assinatura->data_assinatura = $this->dataHora();
        $assinatura->documento_id = $documento->id;
        $assinatura->usuario_id = $usuario_id;
        //$assinatura->assinatura = hash('md5', $assinatura->data_assinatura->toDateTimeString() . $usuario_id . $documento->conteudo);
        $assinatura->assinatura = hash('md5', $assinatura->data_assinatura . $usuario_id . $documento->conteudo);
        return $assinatura->save();
    }

    public function gerarPDF($data){
        $utilservice = New UtilService();
        $documento = Documento::find($data["documento_id"]);
        if(empty($documento)) throw new ServerException("ValidateDocumento", "Documento não encontrado");        
        $head = '<head><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1" /><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">';
        $assinaturas = '';
        if($documento->assinaturas) {
            $assinaturas .= "<div style='display:block; '><br><hr><h5>Assinatura(s):</h5>";
            foreach ($documento->assinaturas as $assinatura) {
                $assinaturas .= "<div style='margin-bottom:5px;'><p style='margin:0; padding:0;'>{$assinatura->usuario->nome}</p><small>Assinado em: {$utilservice->getDateTimeFormatted($assinatura->data_assinatura)} <br>{$assinatura->assinatura}</small></div>";
            }
            $assinaturas .= '</div>';
        }
        $pdf = Pdf::loadHTML($head . $documento->conteudo . $assinaturas);        
        $pdf->render();
        return $pdf->output();
    }

    public function proxyQuery($query, &$data) {
        $where = [];
        $unidade_id = null;
        $subordinadas = false;
        $usuario = parent::loggedUser();
        foreach($data["where"] as $condition) {
            if(is_array($condition) && $condition[0] == "unidade_id") {
                $unidade_id = $condition[2];
            } else if(is_array($condition) && $condition[0] == "unidades_subordinadas") {
                $subordinadas = $condition[2];
            } else if(is_array($condition) && $condition[0] == "numero_processo") {
                $query->whereRaw("JSON_CONTAINS(link, ?, '$.numero_processo')", [$condition[2]]);
            } else {
                array_push($where, $condition);
            }
        }
        $data["where"] = $this->prefixWhere($where, "Documento");
        $unidades_ids = [];
        if(!empty($unidade_id)) {
            array_push($unidades_ids, $unidade_id);
        } else if(!empty($usuario)) {
            foreach($usuario->areasTrabalho as $lotacao) {
                array_push($unidades_ids, $lotacao->unidade_id);
            }
        }
        if(count($unidades_ids) > 0) {
            $query->where(function($q) use ($unidades_ids, $subordinadas) {
                $q->whereHas('atividade.unidade', function (Builder $q2) use ($unidades_ids, $subordinadas) {
                    $q2->where(function($q3) use ($unidades_ids, $subordinadas) {
                        $q3->whereIn('id', $unidades_ids);
                        if($subordinadas) {
                            foreach($unidades_ids as $unidade) {
                                $q3->orWhere('path', 'like', "%/$unidade%");
                            }
                        }
                    });
                })
                ->orWhereHas('planoTrabalho.unidade', function (Builder $q2) use ($unidades_ids, $subordinadas) {
                    $q2->where(function($q3) use ($unidades_ids, $subordinadas) {
                        $q3->whereIn('id', $unidades_ids);
                        if($subordinadas) {
                            foreach($unidades_ids as $unidade) {
                                $q3->orWhere('path', 'like', "%/$unidade%");
                            }
                        }
                    });
                });
            });
        }
    }

}
