<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Plano;
use App\Models\Entidade;
use App\Traits\AutoDataInicio;

class Documento extends ModelBase
{
    use AutoDataInicio;
    protected $table = 'documentos';

    public $fillable = [
        'especie',
        'conteudo',
        'assinatura',
        'metadados',
        'entidade_id',
        'plano_id',
        'id_processo',
        'numero_processo',
        'id_documento',
        'data_inicio',
        //'data_fim',
        'numero_documento',
        'titulo_documento',
        'tipo_documento_id',
        'tipo_processo_id',
        'status'
    ];

    public $delete_cascade = ['assinaturas'];

    // Has
    public function assinaturas() { return $this->hasMany(DocumentoAssinatura::class); }    
    // Belongs
    public function plano() { return $this->belongsTo(Plano::class); }
    public function entidade() { return $this->belongsTo(Entidade::class); }    
    // Mutattors e Casts
    public function getAssinaturaAttribute($value)
    {
        return json_decode($value);
    }   
    public function setAssinaturaAttribute($value)
    {
        $this->attributes['assinatura'] = json_encode($value);
    }
    public function getMetadadosAttribute($value)
    {
        return json_decode($value);
    }   
    public function setMetadadosAttribute($value)
    {
        $this->attributes['metadados'] = json_encode($value);
    }
}
