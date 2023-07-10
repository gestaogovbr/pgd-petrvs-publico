<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\Atividade;
use App\Models\Usuario;
use App\Models\Lotacao;
use App\Models\PlanoTrabalho;
use App\Models\PlanoEntrega;
use App\Models\Programa;
use App\Models\TipoAtividade;
use App\Models\Entidade;
use App\Models\UnidadeIntegrante;
use App\Models\Cidade;
use App\Models\Template;
use App\Models\NotificacaoConfig;

class Unidade extends ModelBase
{
    protected $table = 'unidades';

    protected $with = ['cidade'];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'codigo', /* varchar(12); NOT NULL; */// Código da unidade
        'sigla', /* varchar(100); NOT NULL; */// Sigla da unidade
        'nome', /* varchar(256); NOT NULL; */// Nome da unidade
        'path', /* text; */// Path dos nós pais separados por /, ou NULL caso sejam nós raiz
        'atividades_arquivamento_automatico', /* tinyint; NOT NULL; */// Se arquiva automaticamente após avaliação
        'atividades_avaliacao_automatico', /* tinyint; NOT NULL; */// Se avalia automaticamente ao final do prazo para avaliação com nota 10 (pela IN65/2020-ME é 45 dias após a entrega)
        'planos_prazo_comparecimento', /* int; NOT NULL; DEFAULT: '1'; */// Prazo de antecedência para comunicar o usuário de seu comparecimento na unidade
        'planos_tipo_prazo_comparecimento', /* set('HORAS','DIAS'); NOT NULL; DEFAULT: 'DIAS'; */// Unidade de medida para contagem do planos_prazo_comparecimento
        'distribuicao_forma_contagem_prazos', /* set('HORAS_CORRIDAS','DIAS_CORRIDOS','HORAS_UTEIS','DIAS_UTEIS'); NOT NULL; DEFAULT: 'DIAS_UTEIS'; */// Forma da contagem de prazo
        'entrega_forma_contagem_prazos', /* set('HORAS_CORRIDAS','HORAS_UTEIS'); NOT NULL; DEFAULT: 'HORAS_UTEIS'; */// Forma da contagem de horas para entrega
        'autoedicao_subordinadas', /* tinyint; NOT NULL; DEFAULT: '1'; */// Permitir a autoedição de informações gerais pelas unidades subordinadas (nome, sigla, codigo_pai)
        'etiquetas', /* json; */// Configuração das etiquetas que serão utilizadas nas atividades (contém nome, icone e cor)
        'notificacoes', /* json; */// Configurações das notificações (Se envia e-mail, whatsapp, tipos, templates)
        'unidade_id', /* char(36); */
        'gestor_id', /* char(36); */
        'gestor_substituto_id', /* char(36); */
        'entidade_id', /* char(36); NOT NULL; */
        'cidade_id', /* char(36); */
        'expediente', /* json; */// Configuração de expediente da unidade
        'avaliacao_hierarquica', /* tinyint; NOT NULL; */// Se permite que unidades superiores façam avaliação
        //'deleted_at', /* timestamp; */
        //'texto_complementar_plano', /* longtext; */// Campo de mensagem adicional do plano de trabalho
        //'inativo', /* datetime; */// Se a unidade está ou não inativa
        //'checklist', /* json; */// Nome dos checklist
        /*'horario_trabalho_inicio',*/// REMOVED
        /*'horario_trabalho_fim',*/// REMOVED
        /*'horario_trabalho_intervalo',*/// REMOVED
        /*'data_inicio',*/// REMOVED
    ];

    public $fillable_relations = [];

    public $fillable_changes = [
        "notificacoes_templates"
    ];

    public $delete_cascade = ['unidades_origem_atividades', 'unidades_destino_atividades'];

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
        'expediente' => AsJson::class
    ];

    // Has
    public function atividades() { return $this->hasMany(Atividade::class); }
    public function lotacoes() { return $this->hasMany(Lotacao::class); }
    public function planosTrabalhos() { return $this->hasMany(PlanoTrabalho::class); }
    public function planosEntregas() { return $this->hasMany(PlanoEntrega::class); }
    public function programas() { return $this->hasMany(Programa::class); }
    public function tiposAtividades() { return $this->hasMany(TipoAtividade::class); }
    public function integrantes() { return $this->hasMany(UnidadeIntegrante::class); }
    public function notificacoesTemplates() { return $this->hasMany(Template::class, 'unidade_id'); }
    // Belongs
    public function gestor() { return $this->belongsTo(Usuario::class); }
    public function gestorSubstituto() { return $this->belongsTo(Usuario::class); }
    public function entidade() { return $this->belongsTo(Entidade::class); }
    public function cidade() { return $this->belongsTo(Cidade::class); }
    public function unidade() { return $this->belongsTo(Unidade::class); }
    // Mutattors e Casts
    public function getNotificacoesAttribute($value)
    {
        $notificacoes = new NotificacaoConfig();
        return array_replace_recursive((array) $notificacoes, (array) json_decode(empty($value) ? "[]" : $value));
    }
    public function setNotificacoesAttribute($value)
    {
        $this->attributes['notificacoes'] = json_encode($value);
    }

}