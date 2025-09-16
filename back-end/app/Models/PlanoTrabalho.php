<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\Atividade;
use App\Models\Programa;
use App\Models\Documento;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\TipoModalidade;
use Illuminate\Support\Facades\DB;

class PlanoTrabalho extends ModelBase
{
    protected $table = 'planos_trabalhos';

    protected $with = [];

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
        'tipo_modalidade_id', /* char(36); NOT NULL; */
        'data_inicio', /* datetime; NOT NULL; */ // Inicio do plano de trabalho
        'data_fim', /* datetime; NOT NULL; */ // Fim do plano de trabalho
        'data_arquivamento', /* datetime; */ // Data de arquivamento do plano de trabalho
        'criterios_avaliacao',
        //'deleted_at', /* timestamp; */
        //'numero', /* int; NOT NULL; */// Número do plano de trabalho (Gerado pelo sistema)
    ];

  public const STATUSES = [
    'INCLUIDO' => 'Incluído',
    'AGUARDANDO_ASSINATURA' => 'Aguardando Assinatura',
    'ATIVO' => 'Ativo',
    'CONCLUIDO' => 'Concluído',
    'AVALIADO' => 'Avaliado',
    'SUSPENSO' => 'Suspenso',
    'CANCELADO' => 'Cancelado'
  ];

  public $fillable_changes = ['entregas', 'documentos'];

    public $delete_cascade = ['documentos'];

    protected $casts = [
        "criterios_avaliacao" => AsJson::class
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

    public function latestStatus()
    {
        return $this->hasOne(StatusJustificativa::class, "plano_trabalho_id")->latestOfMany();
    }

    public function entregas()
    {
        return $this->hasMany(PlanoTrabalhoEntrega::class);
    }

    public function documentos()
    {
        return $this->hasMany(Documento::class)->orderBy('numero', 'desc');
    }

    public function atividades()
    {
        return $this->hasMany(Atividade::class);
    }

    public function ocorrencias()
    {
        return $this->hasMany(Ocorrencia::class, "plano_trabalho_id");
    }

    public function consolidacoes()
    {
        return $this->hasMany(PlanoTrabalhoConsolidacao::class)->orderBy('data_inicio');
    }

    // Belongs
    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }

    public function criador()
    {
        return $this->belongsTo(Usuario::class, 'criacao_usuario_id');
    }

    public function programa()
    {
        return $this->belongsTo(Programa::class);
    }

    public function unidade()
    {
        return $this->belongsTo(Unidade::class);
    }

    public function tipoModalidade()
    {
        return $this->belongsTo(TipoModalidade::class);
    }

    public function documento()
    {
        return $this->belongsTo(Documento::class);
    }    //nullable

    public function ultimaAssinatura()
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

}
