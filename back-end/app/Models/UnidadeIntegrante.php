<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Usuario;

class UnidadeIntegrante extends ModelBase
{
    protected $table = 'unidades_integrantes';

    protected $with = [];

    protected $delete_cascade = ["atribuicoes"];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'unidade_id', /* char(36); NOT NULL; */
        'usuario_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
    ];
    // hasOne
    public function lotado() { return $this->hasOne(UnidadeIntegranteAtribuicao::class)->where('atribuicao', 'LOTADO'); } 
    public function gestor() { return $this->hasOne(UnidadeIntegranteAtribuicao::class)->where('atribuicao', 'GESTOR'); } 
    public function gestorSubstituto() { return $this->hasOne(UnidadeIntegranteAtribuicao::class)->where('atribuicao', 'GESTOR_SUBSTITUTO'); } 
    public function colaborador() { return $this->hasOne(UnidadeIntegranteAtribuicao::class)->where('atribuicao', 'COLABORADOR'); } // aquele que possui TCR
    public function homologadorPlanoEntrega() { return $this->hasOne(UnidadeIntegranteAtribuicao::class)->where('atribuicao', 'HOMOLOGADOR_PLANO_ENTREGA'); } 
    public function avaliadorPlanoEntrega() { return $this->hasOne(UnidadeIntegranteAtribuicao::class)->where('atribuicao', 'AVALIADOR_PLANO_ENTREGA'); } 
    public function avaliadorPlanoTrabalho() { return $this->hasOne(UnidadeIntegranteAtribuicao::class)->where('atribuicao', 'AVALIADOR_PLANO_TRABALHO'); } 
    // hasMany
    public function atribuicoes() { return $this->hasMany(UnidadeIntegranteAtribuicao::class); } 
    // Belongs
    public function unidade() { return $this->belongsTo(Unidade::class); }
    public function usuario() { return $this->belongsTo(Usuario::class); }
    //Mutators and casts
}
