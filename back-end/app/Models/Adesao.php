<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\Programa;
use App\Models\Documento;
use App\Models\TipoModalidade;
use App\Models\PlanoAtividade;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;
use Illuminate\Support\Facades\DB;

class Adesao extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'programas_adesoes';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'data_inicio_vigencia', /* datetime; NOT NULL; */// Inicio no programa
        'data_fim_vigencia', /* datetime; */// Fim no programa
        'data_inicio', /* datetime; NOT NULL; */// Data de criação
        'status', /* enum('SOLICITADO','HOMOLOGADO','CANCELADO'); NOT NULL; */// Status da adesão
        'programa_id', /* char(36); */
        'usuario_id', /* char(36); */
        'unidade_id', /* char(36); */
        'entidade_id', /* char(36); */
        'tipo_modalidade_id', /* char(36); NOT NULL; */
        //'data_fim', /* datetime; */// Data final do registro
    ];

    public $delete_cascade = ['documentos'];

    // Has
    public function atividades() { return $this->hasMany(PlanoAtividade::class); }
    public function documentos() { return $this->hasMany(Documento::class); }
    public function demandas() { return $this->hasMany(Demanda::class); }
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class, 'usuario_id'); }
    public function programa() { return $this->belongsTo(Programa::class, 'programa_id'); }
    public function unidade() { return $this->belongsTo(Unidade::class, 'unidade_id'); }
    public function entidade() { return $this->belongsTo(Entidade::class, 'entidade_id'); }
    public function tipoModalidade() { return $this->belongsTo(TipoModalidade::class, 'tipo_modalidade_id'); }
    public function documento() { return $this->belongsTo(Documento::class, 'documento_id'); }
}
