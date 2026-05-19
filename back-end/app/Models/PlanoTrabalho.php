<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Enums\StatusEnum;
use App\Contracts\HasStatusHistory;
use App\Models\Atividade;
use App\Models\Documento;
use App\Models\DocumentoAssinatura;
use App\Models\ModelBase;
use App\Models\Ocorrencia;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\Programa;
use App\Models\StatusJustificativa;
use App\Support\ModalidadePgd;
use App\Models\Unidade;
use App\Models\Usuario;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Database\Eloquent\Collection;

/**
 * @property string $usuario_id
 * @property string $programa_id
 * @property string $unidade_id
 * @property string|null $modalidade_pgd
 * @property string $criacao_usuario_id
 * @property string $documento_id
 * @property float $carga_horaria
 * @property float $tempo_total
 * @property float $tempo_proporcional
 * @property \DateTime $data_inicio
 * @property \DateTime $data_fim
 * @property \DateTime|null $data_arquivamento
 * @property \DateTime|null $avaliado_at
 * @property array $criterios_avaliacao
 * @property mixed $_metadata
 * @property Carbon|null $data_agendamento_envio
 * @property Carbon|null $data_envio_api_pgd
 * @property Carbon|null $data_tentativa_envio
 * @property Carbon|null $data_conclusao_envio
 * @property string|null $log_envio
 * @property-read Usuario $usuario
 * @property-read Programa $programa
 * @property-read Unidade $unidade
 * @property-read Usuario|null $criacaoUsuario
 * @property-read Documento|null $documento
 * @property-read Collection|PlanoTrabalhoConsolidacao[] $consolidacoes
 * @property-read Collection|PlanoTrabalhoEntrega[] $entregas
 * @property-read Collection|Documento[] $documentos
 * @property-read Collection|Atividade[] $atividades
 * @property-read Collection|Ocorrencia[] $ocorrencias
 */
class PlanoTrabalho extends ModelBase implements HasStatusHistory
{
    public function getStatusFkColumn(): string
    {
        return 'plano_trabalho_id';
    }
    protected $table = 'planos_trabalhos';

    protected $with = [];

    protected $appends = ['modalidade_pgd_label'];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
        'carga_horaria', /* double(8,2); NOT NULL; DEFAULT: '0.00'; */ // Carga horária diária do usuário
        'tempo_total', /* double(8,2); NOT NULL; DEFAULT: '0.00'; */ // Horas úteis de trabalho no período de data_inicio_vigencia à data_fim_vigencia considerando carga_horaria, feriados, fins de semana
        'tempo_proporcional', /* double(8,2); NOT NULL; DEFAULT: '0.00'; */ // tempo_total menos os afastamentos
        'forma_contagem_carga_horaria', /* enum('DIA','SEMANA','MES'); NOT NULL; DEFAULT: 'DIA'; */ // Forma de contagem padrão da carga horária
        'programa_id', /* char(36); NOT NULL; */
        'usuario_id', /* char(36); NOT NULL; */
        //'status', /* enum('INCLUIDO','AGUARDANDO_ASSINATURA','ATIVO','CONCLUIDO','AVALIADO','SUSPENSO','CANCELADO'); */// Status atual do plano de trabalho
        'criacao_usuario_id', /* char(36); */
        'unidade_id', /* char(36); NOT NULL; */
        'documento_id', /* char(36); */
        'modalidade_pgd', /* varchar(50); NULL; */
        'data_inicio', /* datetime; NOT NULL; */ // Inicio do plano de trabalho
        'data_fim', /* datetime; NOT NULL; */ // Fim do plano de trabalho
        'data_arquivamento', /* datetime; */ // Data de arquivamento do plano de trabalho
        'criterios_avaliacao',
        'avaliado_at', /* date; data em que o plano teve o status trasicionado para AVALIADO */
        //'deleted_at', /* timestamp; */
        //'numero', /* int; NOT NULL; */// Número do plano de trabalho (Gerado pelo sistema)
        'justificativa', /* text; NULL; */ // Justificativa para carga horária diferente de 100%
        'justificativa_modalidade', /* varchar(500); NULL; */ // Justificativa para modalidade divergente do SIAPE
        'encerrado_at', /* date; NULL; */ // Data de encerramento antecipado do plano de trabalho
    ];

  public const STATUSES = [
    'INCLUIDO' => 'Incluído',
    'AGUARDANDO_ASSINATURA' => 'Aguardando Assinatura',
    'ATIVO' => 'Aprovado',
    'CONCLUIDO' => 'Executado',
    'AVALIADO' => 'Avaliado',
    'SUSPENSO' => 'Suspenso',
    'CANCELADO' => 'Cancelado'
  ];
  public const DATA_MUDANCA_REGRA_PT = '2025-10-01';

  public $fillable_changes = ['entregas', 'documentos'];

    public $delete_cascade = ['documentos','consolidacoes'];

    protected $casts = [
        "criterios_avaliacao" => AsJson::class,
        'data_agendamento_envio' => 'datetime',
        'data_tentativa_envio' => 'datetime',
        'data_envio_api_pgd' => 'datetime',
    ];

    protected static function booted()
    {
        static::creating(function ($planoTrabalho) {
            $planoTrabalho->numero = DB::select("CALL sequence_plano_trabalho_numero()")[0]->number;
        });
    }

    // Has
    public function statusHistorico()
    {
        return $this->hasMany(StatusJustificativa::class, "plano_trabalho_id");
    }

    public function latestStatus(): HasOne
    {
        return $this->hasOne(StatusJustificativa::class, "plano_trabalho_id")->latestOfMany();
    }

    public function entregas(): HasMany
    {
        return $this->hasMany(PlanoTrabalhoEntrega::class);
    }

    public function documentos(): HasMany
    {
        return $this->hasMany(Documento::class)->orderBy('numero', 'desc');
    }

    public function atividades(): HasMany
    {
        return $this->hasMany(Atividade::class);
    }

    public function ocorrencias(): HasMany
    {
        return $this->hasMany(Ocorrencia::class, "plano_trabalho_id");
    }

    public function consolidacoes(): HasMany
    {
        return $this->hasMany(PlanoTrabalhoConsolidacao::class)->orderBy('data_inicio');
    }

    // Belongs
    public function usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class);
    }

    public function criador(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'criacao_usuario_id');
    }

    public function criacaoUsuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'criacao_usuario_id');
    }

    public function programa(): BelongsTo
    {
        return $this->belongsTo(Programa::class);
    }

    public function unidade(): BelongsTo
    {
        return $this->belongsTo(Unidade::class);
    }

    public function documento(): BelongsTo
    {
        return $this->belongsTo(Documento::class);
    }    //nullable

    public function getModalidadePgdLabelAttribute(): string
    {
        return ModalidadePgd::label($this->modalidade_pgd ?? null);
    }

    public function ultimaAssinatura(): HasOneThrough
    {
        return $this->hasOneThrough(DocumentoAssinatura::class, Documento::class)
            ->orderBy('data_assinatura', 'desc');
    }

    public function getAuditRelations(): array
    {
        return [
            [
                'model' => \App\Models\PlanoTrabalhoConsolidacao::class,
                'foreign_key' => 'plano_trabalho_id',
            ],
            [
                'model' => \App\Models\PlanoTrabalhoConsolidacaoAfastamento::class,
                'foreign_key' => 'plano_trabalho_consolidacao_id', // nome real da coluna FK
                'via' => [
                    'model' => \App\Models\PlanoTrabalhoConsolidacao::class,
                    'foreign_key' => 'plano_trabalho_id',
                ]
            ],
            [
                'model' => \App\Models\PlanoTrabalhoEntrega::class,
                'foreign_key' => 'plano_trabalho_id',
            ],
            [
                'model' => \App\Models\Atividade::class,
                'foreign_key' => 'plano_trabalho_id',
            ],
            [
                'model' => \App\Models\Ocorrencia::class,
                'foreign_key' => 'plano_trabalho_id',
            ],
        ];
    }

    public function isEmStatusParaEnvio() {
        if ($this->status instanceof \App\Enums\StatusEnum) {
            $status = $this->status->value;
        } else{
            $status = (string)$this->status;
        }

        return ($status == StatusEnum::ATIVO->value)
            || ($status == StatusEnum::CONCLUIDO->value)
            || ($status == StatusEnum::AVALIADO->value)
        ;
    }

}
