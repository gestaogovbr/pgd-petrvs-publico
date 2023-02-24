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
        'entidade_id', /* char(36); */
        'tipo_modalidade_id', /* char(36); NOT NULL; */
        //'data_fim', /* datetime; */// Data final do registro
        //'usuario_id', /* char(36); */
        //'unidade_id', /* char(36); */
        //'numero', /* int; NOT NULL; */// Número da adesão (Gerado pelo sistema)
        //'documento_id', /* char(36); */
    ];

    public $fillable_relations = [
        "unidades",
        "usuarios"
    ];

    public $delete_cascade = ['documentos'];

    protected static function booted()
    {
        static::creating(function ($plano) {
            $plano->numero = DB::select("CALL sequence_adesao_numero()")[0]->number;
        });
    }

    // Has
    public function usuarios() { return $this->hasMany(AdesaoUsuario::class, 'programa_adesao_id'); }
    public function unidades() { return $this->hasMany(AdesaoUnidade::class, 'programa_adesao_id'); }
    public function documentos() { return $this->hasMany(Documento::class, 'programa_adesao_id'); }
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class, 'usuario_id'); }
    public function programa() { return $this->belongsTo(Programa::class, 'programa_id'); }
    public function unidade() { return $this->belongsTo(Unidade::class, 'unidade_id'); }
    public function entidade() { return $this->belongsTo(Entidade::class, 'entidade_id'); }
    public function tipoModalidade() { return $this->belongsTo(TipoModalidade::class, 'tipo_modalidade_id'); }
    public function documento() { return $this->belongsTo(Documento::class, 'documento_id'); }
}
