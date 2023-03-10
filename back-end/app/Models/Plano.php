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

class Plano extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'planos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'numero', /* int; NOT NULL; */// Número do plano (Gerado pelo sistema)
        'carga_horaria', /* double; */// Carga horária diária do usuário
        'tempo_total', /* double; */// Horas úteis de trabalho no período de data_inicio_vigencia à data_fim_vigencia considerando carga_horaria, feriados, fins de semana
        'tempo_proporcional', /* double; */// tempo_total menos os afastamentos
        'data_inicio_vigencia', /* datetime; NOT NULL; */// Inicio do plano
        'data_fim_vigencia', /* datetime; NOT NULL; */// Fim do plano
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        'ganho_produtividade', /* int; NOT NULL; */// Ganho de produtividade
        'programa_id', /* char(36); NOT NULL; */
        'usuario_id', /* char(36); NOT NULL; */
        'unidade_id', /* char(36); NOT NULL; */
        'documento_id', /* char(36); */
        'tipo_modalidade_id', /* char(36); NOT NULL; */
        'forma_contagem_carga_horaria', /* enum('DIA','SEMANA','MES'); NOT NULL; DEFAULT: 'DIA'; */// Forma de contagem padrão da carga horária
        //'data_fim', /* datetime; */// Data fim da vigência
        //'plano_entrega_id', /* char(36); */
    ];

    public $fillable_changes = ['atividades', 'documentos'];

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
