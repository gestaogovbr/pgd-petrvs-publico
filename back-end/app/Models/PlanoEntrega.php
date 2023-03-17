<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;
use Illuminate\Support\Facades\DB;

class PlanoEntrega extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'planos_entregas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência do registro
        'data_fim', /* datetime; */// Data fim da vigência do registro
        'inicio', /* datetime; NOT NULL; */// Data inicio do planejamento
        'fim', /* datetime; */// Data fim do planejamento
        'nome', /* varchar(256); NOT NULL; */// Nome do plano estratégico/entregas
        'planejamento_id', /* char(36); */
        'cadeia_valor_id', /* char(36); */
        'unidade_id', /* char(36); NOT NULL; */
        //'numero', /* int; NOT NULL; */// Número do plano de entrega (Gerado pelo sistema)
    ];

    public $fillable_changes = [];

    public $delete_cascade = [];

    protected static function booted()
    {
        static::creating(function ($plano) {
            $plano->numero = DB::select("CALL sequence_plano_entrega_numero()")[0]->number;
        });
    }

    // Has
    // public function atividades() { return $this->hasMany(PlanoAtividade::class); }
    // Belongs
    public function planejamento() { return $this->belongsTo(Planejamento::class, 'planejamento_id'); }
    public function cadeiaValor() { return $this->belongsTo(CadeiaValor::class, 'cadeia_valor_id'); }
    public function unidade() { return $this->belongsTo(Unidade::class, 'unidade_id'); }

    // mutators and casts
    protected function siglaUnidade(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => $this->unidade->sigla ?? $this->unidade->entidade->sigla,
        );
    }
}
