<?php

namespace App\Models;

use App\Enums\StatusEnum;
use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\PlanoTrabalho;
use App\Models\Programa;
use App\Models\Planejamento;
use App\Models\CadeiaValor;
use App\Models\PlanoEntregaEntrega;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property string $nome
 * @property string $planejamento_id
 * @property string $cadeia_valor_id
 * @property string $unidade_id
 * @property string $plano_entrega_id
 * @property string $programa_id
 * @property string $criacao_usuario_id
 * @property \DateTime $data_inicio
 * @property \DateTime|null $data_fim
 * @property \DateTime|null $data_arquivamento
 * @property \DateTime|null $avaliado_at
 * @property-read Unidade $unidade
 * @property-read Programa $programa
 * @property-read Usuario $criacaoUsuario
 * @property-read Planejamento|null $planejamento
 * @property-read CadeiaValor|null $cadeiaValor
 * @property-read PlanoEntrega|null $planoEntregaPai
 */
class PlanoEntrega extends ModelBase
{
    protected $table = 'planos_entregas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
        'nome', /* varchar(256); NOT NULL; */ // Nome do plano de entregas
        'planejamento_id', /* char(36); */
        'cadeia_valor_id', /* char(36); */
        'unidade_id', /* char(36); NOT NULL; */
        'plano_entrega_id', /* char(36); */
        'data_arquivamento', /* datetime; */ // Data de arquivamento do plano de entregas
        'programa_id', /* char(36); NOT NULL; */
        'criacao_usuario_id', /* char(36); NOT NULL; */
        //'status', /* enum('INCLUIDO','HOMOLOGANDO','ATIVO','CONCLUIDO','AVALIADO','SUSPENSO','CANCELADO'); */// Status atual do plano de entregas
        'data_inicio', /* datetime; NOT NULL; */ // Data inicial do plano de entregas
        'data_fim', /* datetime; */ // Data final do plano de entregas
        'avaliado_at', /* date; data em que o plano teve o status trasicionado para AVALIADO */
        //'avaliacao_id',
        //'deleted_at', /* timestamp; */
        //'numero', /* int; NOT NULL; */// Número do plano de entrega (Gerado pelo sistema)
    ];

  public const STATUSES = [
    'INCLUIDO' => 'Incluído',
    'HOMOLOGANDO' => 'Aguardando homologação',
    'ATIVO' => 'Em execução',
    'CONCLUIDO' => 'Concluído',
    'AVALIADO' => 'Avaliado',
    'SUSPENSO' => 'Suspenso',
    'CANCELADO' => 'Cancelado'
  ];

  public const STATUSES_PENDENTES = [
    'INCLUIDO', 'HOMOLOGANDO', 'ATIVO', 'CONCLUIDO'
  ];

  public $fillable_changes = ["entregas"];

    public $delete_cascade = [];

    protected static function booted()
    {
        static::creating(function ($planoEntrega) {
            $planoEntrega->numero = DB::select("CALL sequence_plano_entrega_numero()")[0]->number;
        });

        static::updating(function (PlanoEntrega $planoEntrega) {
            if ($planoEntrega->isDirty('status') && $planoEntrega->status === StatusEnum::AVALIADO->value) {
                $planoEntrega->avaliado_at = now();
            }
        });
    }

    // Has
    public function statusHistorico(): HasMany
    {
        return $this->hasMany(StatusJustificativa::class, "plano_entrega_id");
    }

    public function latestStatus(): HasOne
    {
        return $this->hasOne(StatusJustificativa::class, "plano_entrega_id")->latestOfMany();
    }

    public function entregas(): HasMany
    {
        return $this->hasMany(PlanoEntregaEntrega::class);
    }

    public function planosEntrega(): HasMany
    {
        return $this->hasMany(PlanoEntrega::class);
    }

    public function planosTrabalho(): HasMany
    {
        return $this->hasMany(PlanoTrabalho::class);
    }

    public function avaliacoes(): HasMany
    {
        return $this->hasMany(Avaliacao::class, 'plano_entrega_id');
    }

    // Belongs
    public function unidade(): BelongsTo
    {
        return $this->belongsTo(Unidade::class);
    }

    public function programa(): BelongsTo
    {
        return $this->belongsTo(Programa::class);
    }

    public function criacaoUsuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'criacao_usuario_id');
    }

    public function criador(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'criacao_usuario_id');
    }

    public function planejamento(): BelongsTo
    {
        return $this->belongsTo(Planejamento::class);
    }

    public function cadeiaValor(): BelongsTo
    {
        return $this->belongsTo(CadeiaValor::class);
    }

    public function planoEntregaSuperior(): BelongsTo
    {
        return $this->belongsTo(PlanoEntrega::class, 'plano_entrega_id');
    }

    public function avaliacao(): BelongsTo
    {
        return $this->belongsTo(Avaliacao::class);
    }

    public function getAuditRelations(): array
    {
        return [
            [
                'model' => \App\Models\PlanoEntregaEntrega::class,
                'foreign_key' => 'plano_entrega_id',
            ],
            [
                'model' => \App\Models\StatusJustificativa::class,
                'foreign_key' => 'plano_entrega_id',
            ],
            [
                'model' => \App\Models\Avaliacao::class,
                'foreign_key' => 'plano_entrega_id',
            ],
            [
                'model' => \App\Models\CadeiaValor::class,
                'foreign_key' => 'id',
                'via' => [
                    'model' => \App\Models\PlanoEntrega::class,
                    'foreign_key' => 'id', // chave primária do próprio PlanoEntrega
                    'local_key' => 'cadeia_valor_id', // coluna que guarda o vínculo
                ]
            ],
            [
                'model' => \App\Models\Planejamento::class,
                'foreign_key' => 'id',
                'via' => [
                    'model' => \App\Models\PlanoEntrega::class,
                    'foreign_key' => 'id',
                    'local_key' => 'planejamento_id',
                ]
            ],
        ];
    }


}
