<?php

namespace App\Models;

use App\Enums\StatusEnum;
use App\Models\ModelBase;
use App\Models\PlanoTrabalho;
use App\Models\Comparecimento;
use App\Models\PlanoTrabalhoConsolidacaoOcorrencia;
use App\Models\StatusJustificativa;

class PlanoTrabalhoConsolidacao extends ModelBase
{
  protected $table = 'planos_trabalhos_consolidacoes';

  protected $with = [];

  protected static function booted()
  {
    static::updating(function (PlanoTrabalhoConsolidacao $consolidacao) {
      $planoTrabalho = $consolidacao->planoTrabalho;
      if ($consolidacao->isDirty('status') && $consolidacao->status === StatusEnum::AVALIADO->value) {
        $isAllConsolidacoesAvaliadas = $planoTrabalho->consolidacoes()
          ->where('status', '!=', StatusEnum::AVALIADO->value)
          ->where('id', '!=', $consolidacao->id)
          ->doesntExist();
        if ($isAllConsolidacoesAvaliadas) {
          $planoTrabalho->update(['avaliado_at' => date('Y-m-d')]);
        }
      }

      if ($consolidacao->isDirty('status') && $consolidacao->status !== StatusEnum::AVALIADO->value && !!$planoTrabalho->avaliado_at) {
        $planoTrabalho->update(['avaliado_at' => null]);
      }
    });

    static::updated(function ($consolidacao) {
      $planoTrabalho = $consolidacao->planoTrabalho;
      if ($consolidacao->isDirty('status') && $consolidacao->status === StatusEnum::CONCLUIDO->value && $planoTrabalho->status === StatusEnum::ATIVO->value) {
        $allConcluido = $planoTrabalho->consolidacoes()
          ->where('status', '!=', StatusEnum::CONCLUIDO->value)
          ->doesntExist();

        if ($allConcluido) {
          $planoTrabalho->status = StatusEnum::CONCLUIDO->value;
          $planoTrabalho->save();
        }
      }

      if ($consolidacao->isDirty('status') && $consolidacao->status !== StatusEnum::CONCLUIDO->value && $planoTrabalho->status === StatusEnum::CONCLUIDO->value) {
        $planoTrabalho->status = 'ATIVO';
        $planoTrabalho->save();
      }
    });

    static::updating(function (PlanoTrabalhoConsolidacao $consolidacao) {
      $planoTrabalho = $consolidacao->planoTrabalho;
      if ($consolidacao->isDirty('status') && $consolidacao->status === StatusEnum::AVALIADO->value) {
        $isAllConsolidacoesAvaliadas = $planoTrabalho->consolidacoes()
          ->where('status', '!=', StatusEnum::AVALIADO->value)
          ->where('id', '!=', $consolidacao->id)
          ->doesntExist();
        if ($isAllConsolidacoesAvaliadas) {
          $planoTrabalho->update(['avaliado_at' => date('Y-m-d')]);
        }
      }

      if ($consolidacao->isDirty('status') && $consolidacao->status !== StatusEnum::AVALIADO->value && !!$planoTrabalho->avaliado_at) {
        $planoTrabalho->update(['avaliado_at' => null]);
      }
    });
  }


  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'data_inicio', /* date; NOT NULL; */ // Data inicial da consolidacão
    'data_fim', /* date; NOT NULL; */ // Data final da consolidação
    'plano_trabalho_id', /* char(36); NOT NULL; */
    //'data_conclusao', /* date; NOT NULL; */
    //'status', /* enum('CONCLUIDO','AVALIADO','INCLUIDO'); */// Status atual da consolidação
    //'avaliacao_id', /* char(36); */
    //'deleted_at', /* timestamp; */
  ];

  public $fillable_changes = [];

  public $delete_cascade = ["avaliacao"];

  protected $casts = [
    'data_conclusao' => 'datetime'
  ];

  // Has
  public function statusHistorico()
  {
    return $this->hasMany(StatusJustificativa::class, "plano_trabalho_consolidacao_id");
  }
  public function latestStatus()
  {
    return $this->hasOne(StatusJustificativa::class, "plano_trabalho_consolidacao_id")->latestOfMany();
  }
  public function afastamentos()
  {
    return $this->hasMany(PlanoTrabalhoConsolidacaoAfastamento::class, 'plano_trabalho_consolidacao_id');
  }
  public function ocorrencias()
  {
    return $this->hasMany(PlanoTrabalhoConsolidacaoOcorrencia::class, 'plano_trabalho_consolidacao_id');
  }
  public function comparecimentos()
  {
    return $this->hasMany(Comparecimento::class, 'plano_trabalho_consolidacao_id');
  }
  public function avaliacoes()
  {
    return $this->hasMany(Avaliacao::class, 'plano_trabalho_consolidacao_id');
  }
  // Verificar se há a possibilidade de fazer um relacionamento utilizando a chave da entrega e pela data
  public function atividades()
  {
    return $this->hasMany(Atividade::class);
  }

  // Relação com as atividades consolidadas (snapshots)
  public function atividadesConsolidadas()
  {
    return $this->hasMany(PlanoTrabalhoConsolidacaoAtividade::class, 'plano_trabalho_consolidacao_id');
  }

  // Belongs
  public function planoTrabalho()
  {
    return $this->belongsTo(PlanoTrabalho::class);
  }
  public function avaliacao()
  {
    return $this->belongsTo(Avaliacao::class);
  }  //nullable

}
