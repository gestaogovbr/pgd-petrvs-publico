<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\DemandaPausa;
use App\Models\DemandaVinculo;
use App\Models\DemandaAvaliacao;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\Atividade;
use App\Models\Anexo;
use App\Models\TipoDocumento;
use App\Models\Plano;
use App\Models\Comentario;
use App\Models\DemandaEntrega;
use Illuminate\Support\Facades\DB;

class Demanda extends ModelBase
{
    protected $with = [];
    
    public $fillable = [
        'numero',
        'id_requisicao',
        'numero_requisicao',
        'id_processo',
        'numero_processo',
        'assunto',
        'data_distribuicao',
        'tempo_planejado',
        'carga_horaria',
        'dias_planejado',
        'prazo_entrega',
        'data_inicio',
        'data_entrega',
        'tempo_pactuado',
        'fator_complexidade',
        'tempo_despendido',
        'dias_despendido',
        'id_processo_entrega',
        'numero_processo_entrega',
        'id_documento_entrega',
        'numero_documento_entrega',
        'titulo_documento_entrega',
        'data_arquivamento',
        'tempo_homologado',
        'produtividade',
        'etiquetas',
        'checklist',
        'prioridade',
        'recalcula_prazo',
        'atividade_id',
        'demandante_id',
        'usuario_id',
        'unidade_id',
        'tipo_documento_requisicao_id',
        'tipo_documento_entrega_id',
        'avaliacao_id',
        'plano_id',
        'tipo_processo_id'
    ];

    public $fillable_changes = [
        'comentarios',
        'entregas'
    ];

    protected static function booted()
    {
        static::creating(function ($demanda) {
            $demanda->numero = DB::select("CALL sequence_demanda_numero()")[0]->number;
        }); 
    }

    public $delete_cascade = ['entregas', 'pausas', 'vinculos', 'avaliacoes', 'comentarios'];

    // Has
    public function entregas() { return $this->hasMany(DemandaEntrega::class); }    
    //public function anexos() { return $this->hasMany(Anexo::class); }
    public function pausas() { return $this->hasMany(DemandaPausa::class); }
    public function vinculos() { return $this->hasMany(DemandaVinculo::class); }
    public function avaliacoes() { return $this->hasMany(DemandaAvaliacao::class); }    
    public function comentarios() { return $this->hasMany(Comentario::class); }    
    // Belongs
    public function atividade() { return $this->belongsTo(Atividade::class); }
    public function demandante() { return $this->belongsTo(Usuario::class); }    
    public function usuario() { return $this->belongsTo(Usuario::class); }    
    public function unidade() { return $this->belongsTo(Unidade::class); }    
    public function tipoDocumentoRequisicao() { return $this->belongsTo(TipoDocumento::class, 'tipo_documento_requisicao_id'); }    
    public function tipoDocumentoEntrega() { return $this->belongsTo(TipoDocumento::class, 'tipo_documento_entrega_id'); }    
    public function avaliacao() { return $this->belongsTo(DemandaAvaliacao::class); }    
    public function plano() { return $this->belongsTo(Plano::class); }    
    // Mutattors e Casts
    public function getEtiquetasAttribute($value)
    {
        return json_decode($value);
    }   
    public function setEtiquetasAttribute($value)
    {
        $this->attributes['etiquetas'] = json_encode($value);
    }
    public function getChecklistAttribute($value)
    {
        return json_decode($value);
    }   
    public function setChecklistAttribute($value)
    {
        $this->attributes['checklist'] = json_encode($value);
    }
}
