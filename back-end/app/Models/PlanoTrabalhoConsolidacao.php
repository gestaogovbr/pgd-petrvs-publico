<?php

namespace App\Models;

use App\Enums\StatusEnum;
use App\Contracts\HasStatusHistory;
use App\Models\ModelBase;
use App\Models\PlanoTrabalho;
use App\Models\Comparecimento;
use App\Models\PlanoTrabalhoConsolidacaoOcorrencia;
use App\Models\StatusJustificativa;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string|null $justificativa_conclusao
 */
class PlanoTrabalhoConsolidacao extends ModelBase implements HasStatusHistory
{
    public function getStatusFkColumn(): string
    {
        return 'plano_trabalho_consolidacao_id';
    }

    public function possuiRecursoSemReavaliacao(): bool
    {
        $avaliacoes = $this->relationLoaded('avaliacoes')
            ? $this->avaliacoes
            : $this->avaliacoes()->get();

        return $avaliacoes->count() === 1
            && $avaliacoes->first()->recurso !== null;
    }
  protected $table = 'planos_trabalhos_consolidacoes';

  protected $with = [];

  protected static function booted()
  {
    static::updated(function (PlanoTrabalhoConsolidacao $consolidacao) {
      if (!$consolidacao->isDirty('status')) {
        return;
      }

      /** @var \App\V2\StatusService $statusService */
      $statusService = app(\App\V2\StatusService::class);
      $planoTrabalho = $consolidacao->planoTrabalho()->first();

      $todasAvaliadas = $planoTrabalho->consolidacoes()
        ->where('status', '!=', StatusEnum::AVALIADO->value)
        ->when($planoTrabalho->encerrado_at, fn ($q) => $q->where('data_inicio', '<=', $planoTrabalho->encerrado_at))
        ->doesntExist();

      if ($todasAvaliadas && $planoTrabalho->status === StatusEnum::ATIVO->value) {
        $planoTrabalho->update(['avaliado_at' => date('Y-m-d')]);
        $statusService->atualizaStatus(
          $planoTrabalho,
          StatusEnum::CONCLUIDO->value,
          'Plano de Trabalho concluído: todos os períodos avaliativos foram avaliados.',
        );
        return;
      }

      if ($todasAvaliadas && $planoTrabalho->status === StatusEnum::CONCLUIDO->value) {
        $planoTrabalho->update(['avaliado_at' => date('Y-m-d')]);
        $statusService->atualizaStatus(
          $planoTrabalho,
          StatusEnum::AVALIADO->value,
          'Plano de Trabalho avaliado: todos os períodos avaliativos foram avaliados.',
        );
        return;
      }

      $foiRecurso = $consolidacao->possuiRecursoSemReavaliacao();

      if (!$todasAvaliadas && $planoTrabalho->status === StatusEnum::CONCLUIDO->value && !$planoTrabalho->encerrado_at && !$foiRecurso) {
        $planoTrabalho->update(['avaliado_at' => null]);
        $statusService->atualizaStatus(
          $planoTrabalho,
          StatusEnum::ATIVO->value,
          'Plano de Trabalho reaberto: um período avaliativo deixou de estar avaliado.',
        );
      }

      if (!$todasAvaliadas && $planoTrabalho->status === StatusEnum::AVALIADO->value) {
        $planoTrabalho->update(['avaliado_at' => null]);
        $statusService->atualizaStatus(
          $planoTrabalho,
          StatusEnum::CONCLUIDO->value,
          'Avaliação cancelada: plano retornou ao status anterior.',
        );
      }
    });
  }


  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'data_inicio', /* date; NOT NULL; */ // Data inicial da consolidacão
    'data_fim', /* date; NOT NULL; */ // Data final da consolidação
    'plano_trabalho_id', /* char(36); NOT NULL; */
    //'data_conclusao', /* date; NOT NULL; */
    'status', /* enum('INCLUIDO','CONCLUIDO','AVALIADO'); */// Status atual da consolidação
    //'avaliacao_id', /* char(36); */
    //'deleted_at', /* timestamp; */
  ];

  public $fillable_changes = [];

  public $delete_cascade = ["avaliacao"];

  protected $casts = [
    'data_conclusao' => 'datetime'
  ];

  // Has
  public function statusHistorico(): HasMany
  {
    return $this->hasMany(StatusJustificativa::class, "plano_trabalho_consolidacao_id");
  }
  public function latestStatus(): HasOne
  {
    return $this->hasOne(StatusJustificativa::class, "plano_trabalho_consolidacao_id")->latestOfMany();
  }
  public function afastamentos(): HasMany
  {
    return $this->hasMany(PlanoTrabalhoConsolidacaoAfastamento::class, 'plano_trabalho_consolidacao_id');
  }
  public function ocorrencias(): HasMany
  {
    return $this->hasMany(PlanoTrabalhoConsolidacaoOcorrencia::class, 'plano_trabalho_consolidacao_id');
  }
  public function comparecimentos(): HasMany
  {
    return $this->hasMany(Comparecimento::class, 'plano_trabalho_consolidacao_id');
  }
  public function avaliacoes(): HasMany
  {
    return $this->hasMany(Avaliacao::class, 'plano_trabalho_consolidacao_id');
  }
  // Verificar se há a possibilidade de fazer um relacionamento utilizando a chave da entrega e pela data
  public function atividades(): HasMany
  {
    return $this->hasMany(Atividade::class);
  }

  // Relação com as atividades consolidadas (snapshots)
  public function atividadesConsolidadas(): HasMany
  {
    return $this->hasMany(PlanoTrabalhoConsolidacaoAtividade::class, 'plano_trabalho_consolidacao_id');
  }

  // Belongs
  public function planoTrabalho(): BelongsTo
  {
    return $this->belongsTo(PlanoTrabalho::class);
  }
  public function avaliacao(): BelongsTo
  {
    return $this->belongsTo(Avaliacao::class);
  }  //nullable

}
