<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\Unidade;
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

    public $fillable = [ // TYPE; NULL?; DEFAULT?; // COMMENT

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
    public function entregas() { return $this->hasMany(PlanoTrabalhoEntrega::class); }
    public function documentos() { return $this->hasMany(Documento::class); }
    public function atividades() { return $this->hasMany(Atividade::class); }
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class); }
    public function programa() { return $this->belongsTo(Programa::class); }
    public function unidade() { return $this->belongsTo(Unidade::class); }
    public function tipoModalidade() { return $this->belongsTo(TipoModalidade::class); }
    public function planoEntrega() { return $this->belongsTo(PlanoEntrega::class); }
    public function documento() { return $this->belongsTo(Documento::class); }
}

/*
        'numero', // int; NOT NULL; // Número do plano (Gerado pelo sistema)
        'carga_horaria', // double; // Carga horária diária do usuário
        'tempo_total', // double; // Horas úteis de trabalho no período de data_inicio_vigencia à data_fim_vigencia considerando carga_horaria, feriados, fins de semana
        'tempo_proporcional', // double; // tempo_total menos os afastamentos
        'data_inicio_vigencia', // datetime; NOT NULL; // Inicio do plano
        'data_fim_vigencia', // datetime; NOT NULL; // Fim do plano
        'data_inicio', // datetime; NOT NULL; // Data inicio da vigência
        'ganho_produtividade', // int; NOT NULL; // Ganho de produtividade
        'programa_id', // char(36); NOT NULL; 
        'usuario_id', // char(36); NOT NULL; 
        'unidade_id', // char(36); NOT NULL; 
        'documento_id', // char(36); 
        'tipo_modalidade_id', // char(36); NOT NULL; 
        'forma_contagem_carga_horaria', // enum('DIA','SEMANA','MES'); NOT NULL; DEFAULT: 'DIA'; // Forma de contagem padrão da carga horária
        'plano_entrega_id', // char(36); 
        //'data_fim', // datetime; // Data fim da vigência
*/