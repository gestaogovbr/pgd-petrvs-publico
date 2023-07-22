<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\PlanoTrabalho;
use App\Models\Entidade;
use Illuminate\Support\Facades\DB;

class Documento extends ModelBase
{
    protected $table = 'documentos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'numero', /* int; NOT NULL; */// Número do documento (Gerado pelo sistema)
        'titulo', /* varchar(256); NOT NULL; */// Titulo do documento
        'tipo', /* enum('HTML','PDF','LINK'); NOT NULL; */// Tipo do documento
        'especie', /* enum('TERMO_ADESAO','SEI','TCR'); NOT NULL; */// Especificação da espécie do documento (interno do sistema)
        'conteudo', /* longtext; */// Conteúdo do arquivo
        'metadados', /* json; */// Metadados
        'link', /* json; */// Informações sobre o link, caso o tipo seja LINK
        'status', /* enum('GERADO','AGUARDANDO_SEI'); NOT NULL; DEFAULT: 'GERADO'; */// Status do documento: GERADO (documento gerado); AGUARDANDO_SEI (Aguardando abrir o documento no sei para colar o conteúdo dentro)
        'template', /* text; */// Campo de Template
        'datasource', /* json; */// Conjunto de dados do template
        'dataset', /* json; */// Definição das variáveis disponíveis para o template
        'entidade_id', /* char(36); */
        'tipo_documento_id', /* char(36); */
        'tipo_processo_id', /* char(36); */
        'atividade_id', /* char(36); */
        'atividade_tarefa_id', /* char(36); */
        'plano_trabalho_id', /* char(36); */
        'template_id', /* char(36); */
        //'deleted_at', /* timestamp; */
    ];

    public $delete_cascade = ['assinaturas'];

    protected static function booted()
    {
        static::creating(function ($documento) {
            $documento->numero = DB::select("CALL sequence_documento_numero()")[0]->number;
        });
    }

    // Casting
    protected $casts = [
        'metadados' => AsJson::class,
        'datasource' => AsJson::class,
        'dataset' => AsJson::class,
        'link' => AsJson::class,
    ];

    // Has
    public function assinaturas() { return $this->hasMany(DocumentoAssinatura::class); }    
    // Belongs
    public function template() { return $this->belongsTo(Template::class); }
    public function planoTrabalho() { return $this->belongsTo(PlanoTrabalho::class); }
    public function tipoDocumento() { return $this->belongsTo(TipoDocumento::class); }
    public function tipoProcesso() { return $this->belongsTo(TipoProcesso::class); }
    public function entidade() { return $this->belongsTo(Entidade::class); }    
    public function atividade() { return $this->belongsTo(Atividade::class); }    
    public function atividadeTarefa() { return $this->belongsTo(AtividadeTarefa::class); }    
    
}
