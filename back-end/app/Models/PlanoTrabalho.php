<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\Atividade;
use App\Models\Programa;
use App\Models\Documento;
use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\TipoModalidade;
use Illuminate\Support\Facades\DB;

class PlanoTrabalho extends ModelBase
{
    protected $table = 'planos_trabalhos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'numero', /* int; NOT NULL; */// Número do plano de trabalho (Gerado pelo sistema)
        'carga_horaria', /* double(8,2); NOT NULL; DEFAULT: '0.00'; */// Carga horária diária do usuário
        'tempo_total', /* double(8,2); NOT NULL; DEFAULT: '0.00'; */// Horas úteis de trabalho no período de data_inicio_vigencia à data_fim_vigencia considerando carga_horaria, feriados, fins de semana
        'tempo_proporcional', /* double(8,2); NOT NULL; DEFAULT: '0.00'; */// tempo_total menos os afastamentos
        'data_inicio_vigencia', /* datetime; NOT NULL; */// Inicio do plano de trabalho
        'data_fim_vigencia', /* datetime; NOT NULL; */// Fim do plano de trabalho
        'programa_id', /* char(36); NOT NULL; */
        'usuario_id', /* char(36); NOT NULL; */
        'unidade_id', /* char(36); NOT NULL; */
        'documento_id', /* char(36); */
        'tipo_modalidade_id', /* char(36); NOT NULL; */
        'forma_contagem_carga_horaria', /* enum('DIA','SEMANA','MES'); NOT NULL; DEFAULT: 'DIA'; */// Forma de contagem padrão da carga horária
        'plano_entrega_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
    ];

    public $fillable_changes = ['entregas', 'documentos'];

    public $delete_cascade = ['documentos'];

    protected static function booted()
    {
        static::creating(function ($planoTrabalho) {
            $planoTrabalho->numero = DB::select("CALL sequence_plano_trabalho_numero()")[0]->number;
        });
    }

    // Has
    public function entregas() { return $this->hasMany(PlanoTrabalhoEntrega::class); }//OK//
    public function documentos() { return $this->hasMany(Documento::class); }//OK//
    public function atividades() { return $this->hasMany(Atividade::class); }//OK//
    public function consolidacoes() { return $this->hasMany(PlanoTrabalhoConsolidacao::class); }//OK//
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class); }//OK//
    public function programa() { return $this->belongsTo(Programa::class); }//OK//
    public function unidade() { return $this->belongsTo(Unidade::class); }//OK//
    public function tipoModalidade() { return $this->belongsTo(TipoModalidade::class); }//OK//
    public function planoEntrega() { return $this->belongsTo(PlanoEntrega::class); }//OK//
    public function documento() { return $this->belongsTo(Documento::class); }//OK//    //nullable
}