<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Enums\StatusEnum;
use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\TipoAtividade;
use App\Models\Comentario;
use App\Models\Documento;
use App\Models\Reacao;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class Atividade extends ModelBase
{
  protected $table = 'atividades';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'descricao', /* text; NOT NULL; */ // Assunto da atividade
    'data_distribuicao', /* datetime; NOT NULL; */ // Data de cadastro da atividade
    'carga_horaria', /* double(8,2); */ // Carga horária que será utilizada para todos os cálculos (vinda do plano de trabalho)
    'tempo_planejado', /* double(8,2); NOT NULL; */ // Diferença entre data_distribuicao e data_estipulada_entrega em horas (úteis ou corridas, configurada na unidade)
    'data_estipulada_entrega', /* datetime; NOT NULL; */ // Data estipulada para entrega da demanda
    'data_inicio', /* datetime; */ // Data em que o usuário iniciou a atividade
    'data_entrega', /* datetime; */ // Data da entrega
    'esforco', /* double(8,2); NOT NULL; */ // Esforço (tempo) que será empregado na execução da atividade
    'tempo_despendido', /* double(8,2); */ // Calculado no final da atividade, sendo o tempo líquido (considerando pausas)
    'data_arquivamento', /* datetime; */ // Data de arquivamento da demanda
    'etiquetas', /* json; */ // Etiquetas
    'checklist', /* json; */ // Checklist
    'prioridade', /* int; */ // Nível de prioridade
    'progresso', /* decimal(5,2); NOT NULL; DEFAULT: '0.00'; */ // Progresso da realização da atividade
    'plano_trabalho_id', /* char(36); */
    'plano_trabalho_entrega_id', /* char(36); */
    'plano_trabalho_consolidacao_id', /* char(36); */
    'tipo_atividade_id', /* char(36); */
    'demandante_id', /* char(36); NOT NULL; */
    'usuario_id', /* char(36); */
    'unidade_id', /* char(36); NOT NULL; */
    'documento_requisicao_id', /* char(36); */
    'documento_entrega_id', /* char(36); */
    //'deleted_at', /* timestamp; */
    //'numero', /* int; NOT NULL; */// Número da atividade (Gerado pelo sistema)
    //'status', /* enum('INCLUIDO','INICIADO','PAUSADO','CONCLUIDO'); NOT NULL; DEFAULT: 'INCLUIDO'; */// Status atual da atividade
  ];

  public $fillable_changes = [
    'comentarios',
    'reacoes',
    'tarefas',
    'documentoRequisicao',
    'documentoEntrega'
  ];

  protected static function booted()
  {
    static::creating(function (Atividade $atividade) {
      $atividade->numero = DB::select("CALL sequence_atividade_numero()")[0]->number;

      $consolidacao = PlanoTrabalhoConsolidacao::find($atividade->plano_trabalho_consolidacao_id);
      if (!!$consolidacao && $consolidacao->status === StatusEnum::AGUARDANDO_REGISTRO->value) {
        $consolidacao->status = StatusEnum::INCLUIDO->value;
        $consolidacao->save();
      }
    });

    static::deleting(function (Atividade $atividade) {
      $consolidacao = PlanoTrabalhoConsolidacao::find($atividade->plano_trabalho_consolidacao_id);
      if (!!$consolidacao && $consolidacao->status === StatusEnum::INCLUIDO->value && $consolidacao->atividades->count() === 1) {
        $consolidacao->status = StatusEnum::AGUARDANDO_REGISTRO->value;
        $consolidacao->save();
      }
    });
  }

  public $delete_cascade = ['tarefas', 'pausas', 'comentarios', 'reacoes'];

  // Casting
  protected $casts = [
    'etiquetas' => AsJson::class,
    'checklist' => AsJson::class
  ];

  // Has
  public function statusHistorico()
  {
    return $this->hasMany(StatusJustificativa::class, "atividade_id");
  }
  public function latestStatus()
  {
    return $this->hasOne(StatusJustificativa::class, "atividade_id")->latestOfMany();
  }
  public function tarefas()
  {
    return $this->hasMany(AtividadeTarefa::class);
  }
  public function tarefasProjeto()
  {
    return $this->hasMany(ProjetoTarefa::class);
  }
  public function pausas()
  {
    return $this->hasMany(AtividadePausa::class);
  }
  public function comentarios()
  {
    return $this->hasMany(Comentario::class);
  }
  public function documentos()
  {
    return $this->hasMany(Documento::class);
  }
  public function consolidacoes()
  {
    return $this->hasMany(PlanoTrabalhoConsolidacaoAtividade::class);
  }
  public function consolidacao()
  {
    return $this->belongsTo(PlanoTrabalhoConsolidacao::class);
  }
  public function reacoes()
  {
    return $this->hasMany(Reacao::class);
  }
  // Belongs
  public function planoTrabalho()
  {
    return $this->belongsTo(PlanoTrabalho::class);
  }        //nullable
  public function planoTrabalhoEntrega()
  {
    return $this->belongsTo(PlanoTrabalhoEntrega::class);
  }      //nullable
  public function tipoAtividade()
  {
    return $this->belongsTo(TipoAtividade::class);
  }    //nullable
  public function demandante()
  {
    return $this->belongsTo(Usuario::class);
  }
  public function usuario()
  {
    return $this->belongsTo(Usuario::class);
  }        //nullable
  public function unidade()
  {
    return $this->belongsTo(Unidade::class);
  }
  public function documentoRequisicao()
  {
    return $this->belongsTo(Documento::class);
  }      //nullable
  public function documentoEntrega()
  {
    return $this->belongsTo(Documento::class);
  }         //nullable
  // Escopos
  public function scopeDoUsuario($query, $usuario_id)
  {
    return $query->where("usuario_id", $usuario_id);
  }
  public function scopeDosPlanosTrabalho($query, $planos_trabalho_ids)
  {
    return $query->whereIn("plano_trabalho_id", $planos_trabalho_ids);
  }
  public function scopeNaoIniciadas($query)
  {
    return $query->whereNull('data_inicio');
  }
  public function scopeConcluidas($query)
  {
    return $query->whereNotNull('data_entrega');
  }
  public function scopeNaoConcluidas($query)
  {
    return $query->whereNotNull('data_inicio')->whereNull('data_entrega');
  }
  public function scopeAtrasadas($query)
  {
    return $query->whereNotNull('data_inicio')->whereNull('data_entrega')->whereDate('data_estipulada_entrega', '<', Carbon::today());
  }
  public function scopeDistribuidas($query)
  {
    return $query->whereNotNull('data_distribuicao');
  }
  public function scopeIniciadas($query)
  {
    return $query->whereNotNull('data_inicio');
  }
  public function scopeEmAndamento($query)
  {
    return $query->whereNotNull('data_inicio')->whereNull('data_entrega');
  }
}
