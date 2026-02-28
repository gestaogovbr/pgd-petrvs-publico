<?php

namespace App\Models;

use App\Models\ModelBase;
use Illuminate\Database\Eloquent\Relations\Pivot;
use App\Models\Unidade;
use App\Models\Usuario;

/**
 * @property-read \App\Models\Unidade $unidade
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\UnidadeIntegranteAtribuicao[] $gestores
 * @property-read \App\Models\UnidadeIntegranteAtribuicao|null $lotado
 * @property-read \App\Models\UnidadeIntegranteAtribuicao|null $gestor
 * @property-read \App\Models\UnidadeIntegranteAtribuicao|null $gestorSubstituto
 * @property-read \App\Models\UnidadeIntegranteAtribuicao|null $gestorDelegado
 * @property-read \App\Models\UnidadeIntegranteAtribuicao|null $curador
 * @property-read \App\Models\UnidadeIntegranteAtribuicao|null $colaborador
 * @property-read \App\Models\UnidadeIntegranteAtribuicao|null $avaliadorPlanoEntrega
 * @property-read \App\Models\UnidadeIntegranteAtribuicao|null $avaliadorPlanoTrabalho
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\UnidadeIntegranteAtribuicao[] $atribuicoes
 * @property-read \App\Models\Usuario $usuario
 */
class UnidadeIntegrante extends ModelBase //Pivot //ModelBase
{
  protected $table = 'unidades_integrantes';

  protected $with = [];

  protected $delete_cascade = ["atribuicoes"];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'unidade_id', /* char(36); NOT NULL; */
    'usuario_id', /* char(36); NOT NULL; */
    //'deleted_at', /* timestamp; */
  ];
  public function gestores()
  {
    return $this->hasMany(UnidadeIntegranteAtribuicao::class)->where('atribuicao', 'GESTOR');
  }
  // hasOne
  /**
   * @return \Illuminate\Database\Eloquent\Relations\HasOne
   */
  public function lotado()
  {
    return $this->hasOne(UnidadeIntegranteAtribuicao::class)->where('atribuicao', 'LOTADO');
  }
  /**
   * @return \Illuminate\Database\Eloquent\Relations\HasOne
   */
  public function gestor()
  {
    return $this->hasOne(UnidadeIntegranteAtribuicao::class)->where('atribuicao', 'GESTOR');
  }
  /**
   * @return \Illuminate\Database\Eloquent\Relations\HasOne
   */
  public function gestorSubstituto()
  {
    return $this->hasOne(UnidadeIntegranteAtribuicao::class)->where('atribuicao', 'GESTOR_SUBSTITUTO');
  }
  /**
   * @return \Illuminate\Database\Eloquent\Relations\HasOne
   */
  public function gestorDelegado()
  {
    return $this->hasOne(UnidadeIntegranteAtribuicao::class)->where('atribuicao', 'GESTOR_DELEGADO');
  }
  /**
   * @return \Illuminate\Database\Eloquent\Relations\HasOne
   */
  public function curador()
  {
    return $this->hasOne(UnidadeIntegranteAtribuicao::class)->where('atribuicao', 'CURADOR');
  }
  /**
   * @return \Illuminate\Database\Eloquent\Relations\HasOne
   */
  public function colaborador()
  {
    return $this->hasOne(UnidadeIntegranteAtribuicao::class)->where('atribuicao', 'COLABORADOR');
  } // aquele que possui TCR
  /**
   * @return \Illuminate\Database\Eloquent\Relations\HasOne
   */
  public function avaliadorPlanoEntrega()
  {
    return $this->hasOne(UnidadeIntegranteAtribuicao::class)->where('atribuicao', 'AVALIADOR_PLANO_ENTREGA');
  }
  /**
   * @return \Illuminate\Database\Eloquent\Relations\HasOne
   */
  public function avaliadorPlanoTrabalho()
  {
    return $this->hasOne(UnidadeIntegranteAtribuicao::class)->where('atribuicao', 'AVALIADOR_PLANO_TRABALHO');
  }
  // hasMany
  /**
   * @return \Illuminate\Database\Eloquent\Relations\HasMany
   */
  public function atribuicoes()
  {
    return $this->hasMany(UnidadeIntegranteAtribuicao::class, 'unidade_integrante_id', 'id');
  }
  // Belongs
  /**
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
  public function unidade()
  {
    return $this->belongsTo(Unidade::class);
  }
  public function usuario()
  {
    return $this->belongsTo(Usuario::class);
  }
  //Mutators and casts
}
