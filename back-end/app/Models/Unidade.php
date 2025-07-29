<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\Atividade;
use App\Models\Planejamento;
use App\Models\CadeiaValor;
use App\Models\PlanoTrabalho;
use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Models\Programa;
use App\Models\ProjetoRecurso;
use App\Models\Entidade;
use App\Models\UnidadeIntegrante;
use App\Models\Cidade;
use App\Models\Template;
use App\Models\NotificacaoConfig;
use App\Models\HistoricoLotacao;
use App\Models\HistoricoFuncao;
use App\Models\CurriculumProfissional;
use App\Traits\AutoUuid;

class Unidade extends ModelBase
{
    use AutoUuid;

    protected $table = 'unidades';

    protected $with = ['cidade','gestor', 'gestoresSubstitutos'];

    protected $keyType = 'string';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
        'codigo', /* varchar(12); NOT NULL; */ // Código da unidade
        'sigla', /* varchar(100); NOT NULL; */ // Sigla da unidade
        'nome', /* varchar(256); NOT NULL; */ // Nome da unidade
        'path', /* text; */ // Path dos nós pais separados por /, ou NULL caso sejam nós raiz
        'atividades_arquivamento_automatico', /* tinyint; NOT NULL; */ // Se arquiva automaticamente após conclusão
        'distribuicao_forma_contagem_prazos', /* set('HORAS_CORRIDAS','DIAS_CORRIDOS','HORAS_UTEIS','DIAS_UTEIS'); NOT NULL; DEFAULT: 'DIAS_UTEIS'; */ // Forma da contagem de prazo
        'entrega_forma_contagem_prazos', /* set('HORAS_CORRIDAS','HORAS_UTEIS'); NOT NULL; DEFAULT: 'HORAS_UTEIS'; */ // Forma da contagem de horas para entrega
        'etiquetas', /* json; */ // Configuração das etiquetas que serão utilizadas nas atividades (contém nome, icone e cor)
        'notificacoes', /* json; */ // Configurações das notificações (Se envia e-mail, whatsapp, tipos, templates)
        'expediente', /* json; */ // Configuração de expediente da unidade
        'texto_complementar_plano', /* longtext; */ // Campo de mensagem adicional do plano de trabalho
        'data_inativacao', /* datetime; */ // Se a unidade está ou não inativa
        'instituidora', /* tinyint; NOT NULL; */ // Se a unidade é instituidora (Programas)
        'informal', /* tinyint; NOT NULL; */ // Se a unidade é informal (Time volante, por ex.)
        'checklist', /* json; */ // Nome dos checklist
        'unidade_pai_id', /* char(36); */
        'entidade_id', /* char(36); NOT NULL; */
        'cidade_id', /* char(36); */
        //'deleted_at', /* timestamp; */
        'data_modificacao',
    ];

    public $fillable_relations = [];

    public $fillable_changes = [
        "notificacoes_templates"
    ];

    public $delete_cascade = [];

    protected static function booted()
    {
        static::creating(function ($unidade) {
            $unidade->notificacoes = empty($unidade->notificacoes) ? json_decode('{}') : $unidade->notificacoes;
            $unidade->etiquetas = $unidade->etiquetas ?? [];
        });
    }

    // Casting
    protected $casts = [
        'etiquetas' => AsJson::class,
        'checklist' => AsJson::class,
        'expediente' => AsJson::class,
        'deployed_at' => 'datetime',
    ];

    // Has
    public function atividades()
    {
        return $this->hasMany(Atividade::class);
    }

    public function planosTrabalho()
    {
        return $this->hasMany(PlanoTrabalho::class);
    }

    public function planosEntrega()
    {
        return $this->hasMany(PlanoEntrega::class);
    }

    public function entregasPlanoEntrega()
    {
        return $this->hasMany(PlanoEntregaEntrega::class);
    }

    public function programas()
    {
        return $this->hasMany(Programa::class);
    }

    public function recursosProjeto()
    {
        return $this->hasMany(ProjetoRecurso::class);
    }

    public function notificacoesTemplates()
    {
        return $this->hasMany(Template::class);
    }

    public function unidades()
    {
        return $this->hasMany(Unidade::class);
    }

    public function planejamentos()
    {
        return $this->hasMany(Planejamento::class);
    }

    public function cadeiasValor()
    {
        return $this->hasMany(CadeiaValor::class);
    }

    public function integrantes()
    {
        return $this->hasMany(UnidadeIntegrante::class);
    }

    public function historicosLotacoes()
    {
        return $this->hasMany(HistoricoLotacao::class);
    }

    public function historicosFuncoes()
    {
        return $this->hasMany(HistoricoFuncao::class);
    }

    public function curriculunsProfissionais()
    {
        return $this->hasMany(CurriculumProfissional::class, 'lotacao_atual');
    }

    // Belongs
    public function entidade()
    {
        return $this->belongsTo(Entidade::class);
    }

    public function cidade()
    {
        return $this->belongsTo(Cidade::class);
    }  //nullable

    public function unidadePai()
    {
        return $this->belongsTo(Unidade::class, 'unidade_pai_id');
    }    //nullable

    public function subordinadas()
    {
        return $this->hasMany(Unidade::class, 'unidade_pai_id');
    }

    public function todasSubordinadas()
    {
        return $this->subordinadas()->with('todasSubordinadas');
    }

    // Others relationships
    public function gestor()
    {
        return $this->hasOne(UnidadeIntegrante::class)->has('gestor');
    }

    public function gestoresSubstitutos()
    {
        return $this->hasMany(UnidadeIntegrante::class)->has('gestorSubstituto');
    }

    public function gestoresDelegados()
    {
        return $this->hasMany(UnidadeIntegrante::class)->has('gestorDelegado');
    }

    public function lotados()
    {
        return $this->hasMany(UnidadeIntegrante::class)->has('lotado');
    }

    public function colaboradores()
    {
        return $this->hasMany(UnidadeIntegrante::class)->has('colaborador');
    } // aqueles que possuem TCR

    public function avaliadoresPlanoEntrega()
    {
        return $this->hasMany(UnidadeIntegrante::class)->has('avaliadorPlanoEntrega');
    }

    public function avaliadoresPlanoTrabalho()
    {
        return $this->hasMany(UnidadeIntegrante::class)->has('avaliadorPlanoTrabalho');
    }

    // Mutattors e Casts
    public function getNotificacoesAttribute($value)
    {
        $notificacoes = new NotificacaoConfig();
        return array_replace_recursive((array)$notificacoes, (array)json_decode(empty($value) ? "[]" : $value));
    }

    public function setNotificacoesAttribute($value)
    {
        $this->attributes['notificacoes'] = json_encode($value);
    }

    public function getIntegrantesAtribuicoesAttribute()
    {
        $result = [];
        foreach ($this->integrantes as $integrante) {
            if (count($integrante->atribuicoes) > 0) $result[$integrante->usuario_id] = array_map(fn($a) => $a["atribuicao"], $integrante->atribuicoes?->toArray() ?? []);
        }
        return $result;
    }
}
