<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Plano;
use App\Models\Entidade;
use App\Traits\AutoDataInicio;
use Illuminate\Support\Facades\DB;
use App\Traits\HasDataFim;

class Documento extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'documentos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'numero', /* int; NOT NULL; */// Número do documento (Gerado pelo sistema)
        'especie', /* enum('TERMO_ADESAO','SEI','TCR', ''); */// Especificação da espécie do documento (interno do sistema)
        'conteudo', /* longtext; */// Conteúdo do arquivo
        'assinatura', /* json; */// Dados da assinatura, se nulo não está assinado
        'metadados', /* json; */// Metadados
        'entidade_id', /* char(36); */
        'id_processo', /* int; */// ID do processo de entrega, caso seja Sei será o ID do procedimento
        'numero_processo', /* varchar(50); */// Número do processo de entrega, com a formatação de origem
        'id_documento', /* int; */// ID da entrega, caso seja o Sei será o ID_Documento
        'data_inicio', /* datetime; NOT NULL; */// Data inicio do documento
        'numero_documento', /* varchar(11); */// Numero do documento de entrega, caso seja o Sei é o numero Sei
        'titulo_documento', /* text; */// Numeração do tipo de documento no sistema integrado
        'tipo_documento_id', /* char(36); */
        'tipo_processo_id', /* char(36); */
        'plano_id', /* char(36); */
        'programa_adesao_id', /* char(36); */
        'status', /* enum('GERADO','AGUARDANDO_SEI'); NOT NULL; DEFAULT: 'GERADO'; */// Status do documento: GERADO (documento gerado); AGUARDANDO_SEI (Aguardando abrir o documento no sei para colar o conteúdo dentro)
        //'data_fim', /* datetime; */// Data fim
        'template', /* text; */// Campo de Template
        'data_source', /* json; */// Conjunto de dados do template
        //'template_id', /* char(36); */
    ];

    public $delete_cascade = ['assinaturas'];

    protected static function booted()
    {
        static::creating(function ($documento) {
            $documento->numero = DB::select("CALL sequence_documento_numero()")[0]->number;
        });
    }

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
