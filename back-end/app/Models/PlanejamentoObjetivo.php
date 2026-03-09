<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Planejamento;
use App\Models\EixoTematico;
use App\Models\PlanoEntregaEntregaObjetivo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $nome
 * @property string $fundamentacao
 * @property int $sequencia
 * @property string|null $path
 * @property string $eixo_tematico_id
 * @property string|null $objetivo_pai_id
 * @property string $planejamento_id
 * @property int $integra_okr
 * @property string|null $objetivo_superior_id
 * @property PlanejamentoObjetivo|null $objetivoPai
 * @property PlanejamentoObjetivo|null $objetivoSuperior
 * @property Planejamento $planejamento
 * @property EixoTematico $eixoTematico
 */
class PlanejamentoObjetivo extends ModelBase
{
  protected $table = 'planejamentos_objetivos';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'nome', /* varchar(256); NOT NULL; */ // Nome do objetivo
    'fundamentacao', /* varchar(256); NOT NULL; */ // Fundamentação do objetivo
    'sequencia', /* int; NOT NULL; */ // Sequência utilizada para ordenar os objetivos
    'path', /* text; */ // IDs dos nós ascendentes separados por /, ou NULL caso seja um nó raiz
    'eixo_tematico_id', /* char(36); NOT NULL; */
    'objetivo_pai_id', /* char(36); */
    'planejamento_id', /* char(36); NOT NULL; */
    'integra_okr',  /* tinyint(1); NOT NULL; */ // Objetivos que serão visíveis no OKR
    //'deleted_at', /* timestamp; */
    'objetivo_superior_id', /* char(36); */
  ];

  public $delete_cascade = ["objetivos"];

  // Has
  public function objetivos(): HasMany
  {
    return $this->hasMany(PlanejamentoObjetivo::class, 'objetivo_superior_id');
  }

  public function objetivosFilhos(): HasMany
  {
    return $this->hasMany(PlanejamentoObjetivo::class, 'objetivo_pai_id');
  }

  public function objetivosEntrega(): HasMany
  {
    return $this->hasMany(PlanoEntregaEntregaObjetivo::class, 'planejamento_objetivo_id');
  }

  // Belongs
  public function planejamento(): BelongsTo
  {
    return $this->belongsTo(Planejamento::class);
  }

  public function eixoTematico(): BelongsTo
  {
    return $this->belongsTo(EixoTematico::class);
  }

  public function objetivoPai(): BelongsTo
  {
    return $this->belongsTo(PlanejamentoObjetivo::class, 'objetivo_pai_id');
  }

  public function objetivoSuperior(): BelongsTo
  {
    return $this->belongsTo(PlanejamentoObjetivo::class, 'objetivo_superior_id');
  }
}
