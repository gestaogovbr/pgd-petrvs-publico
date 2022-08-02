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
use Illuminate\Support\Facades\DB;

class Plano extends ModelBase
{
    use AutoDataInicio;

    public $fillable = [
        'numero',
        'carga_horaria',
        'tempo_total',
        'tempo_proporcional',
        'data_inicio_vigencia',
        'data_fim_vigencia',
        'data_inicio',
        //'data_fim',
        'ganho_produtividade',
        'programa_id',
        'usuario_id',
        'unidade_id',
        'documento_id',
        'tipo_modalidade_id',
        'forma_contagem_carga_horaria'
    ];

    protected $table = 'planos';

    public $fillable_changes = ['atividades'];

    public $delete_cascade = ['atividades', 'documentos'];

    protected static function booted()
    {
        static::creating(function ($plano) {
            $plano->numero = DB::select("CALL sequence_plano_numero()")[0]->number;
        });
    }

    // Has
    public function atividades() { return $this->hasMany(PlanoAtividade::class); }
    public function documentos() { return $this->hasMany(Documento::class); }
    public function demandas() { return $this->hasMany(Demanda::class); }
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class, 'usuario_id'); }
    public function programa() { return $this->belongsTo(Programa::class, 'programa_id'); }
    public function unidade() { return $this->belongsTo(Unidade::class, 'unidade_id'); }
    public function tipoModalidade() { return $this->belongsTo(TipoModalidade::class, 'tipo_modalidade_id'); }
    public function documento() { return $this->belongsTo(Documento::class, 'documento_id'); }
}
