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
use App\Models\TipoTarefa;
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
        'expediente', /* json; */// Configuração de expediente da unidade
        'avaliacao_hierarquica', /* tinyint; NOT NULL; */// Se permite que unidades superiores façam avaliação
        'texto_complementar_plano', /* longtext; */// Campo de mensagem adicional do plano de trabalho
        'inativo', /* datetime; */// Se a unidade está ou não inativa
        'checklist', /* json; */// Nome dos checklist
        'unidade_id', /* char(36); */
        'entidade_id', /* char(36); NOT NULL; */
        'cidade_id', /* char(36); */
        //'deleted_at', /* timestamp; */
        'gestor_id', /* char(36); */
        'gestor_substituto_id', /* char(36); */
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
        'expediente' => AsJson::class
    ];
    // Has
    public function atividades() { return $this->hasMany(Atividade::class); }//OK//
    public function planosTrabalho() { return $this->hasMany(PlanoTrabalho::class); }//OK//
    public function planosEntrega() { return $this->hasMany(PlanoEntrega::class); }//OK//
    public function entregasPlanoEntrega() { return $this->hasMany(PlanoEntregaEntrega::class); }//OK//
    public function programas() { return $this->hasMany(Programa::class); }//OK//
    public function recursosProjeto() { return $this->hasMany(ProjetoRecurso::class); }//OK//
    public function tiposTarefa() { return $this->hasMany(TipoTarefa::class); }//OK//
    public function notificacoesTemplate() { return $this->hasMany(Template::class); }//OK//
    public function unidades() { return $this->hasMany(Unidade::class); }//OK//
    public function planejamentos() { return $this->hasMany(Planejamento::class); }//OK//
    public function cadeiasValor() { return $this->hasMany(CadeiaValor::class); }//OK//
    public function vinculosUsuario() { return $this->hasMany(UnidadeIntegrante::class); }//OK//
    // Belongs
    public function entidade() { return $this->belongsTo(Entidade::class); }//OK//
    public function cidade() { return $this->belongsTo(Cidade::class); }//OK//  //nullable
    public function unidade() { return $this->belongsTo(Unidade::class); }//OK//    //nullable
    public function integrantes() { return $this->belongsToMany(Usuario::class, 'unidades_integrantes'); }//OK//
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
    public function getGestorAttribute()
    {
        $result = null;
        foreach ($this->vinculosUsuario as $vinculo){ if(count(array_filter($vinculo->atribuicoes->toArray(), fn($a) => $a['atribuicao'] == 'GESTOR' && $a['deleted_at'] == null)) > 0) $result = $vinculo->usuario; }
        return $result;
    }
    public function getGestorSubstitutoAttribute()
    {
        $result = null;
        foreach ($this->vinculosUsuario as $vinculo){ if(count(array_filter($vinculo->atribuicoes->toArray(), fn($a) => $a['atribuicao'] == 'GESTOR_SUBSTITUTO' && $a['deleted_at'] == null)) > 0) $result = $vinculo->usuario; }
        return $result;
    }
    public function getLotadosAttribute()
    {
        $result = [];
        foreach ($this->vinculosUsuario as $vinculo){ if(count(array_filter($vinculo->atribuicoes->toArray(), fn($a) => $a['atribuicao'] == 'LOTADO' && $a['deleted_at'] == null)) > 0) array_push($result, $vinculo->usuario); }
        return $result;
    }
    public function getColaboradoresAttribute()
    {
        $result = [];
        foreach ($this->vinculosUsuario as $vinculo){ if(count(array_filter($vinculo->atribuicoes->toArray(), fn($a) => $a['atribuicao'] == 'COLABORADOR' && $a['deleted_at'] == null)) > 0) array_push($result, $vinculo->usuario); }
        return $result;
    }
    public function getAvaliadoresPlanoEntregaAttribute()
    {
        $result = [];
        foreach ($this->vinculosUsuario as $vinculo){ if(count(array_filter($vinculo->atribuicoes->toArray(), fn($a) => $a['atribuicao'] == 'AVALIADOR_PLANO_ENTREGA' && $a['deleted_at'] == null)) > 0) array_push($result, $vinculo->usuario); }
        return $result;
    }
    public function getAvaliadoresPlanoTrabalhoAttribute()
    {
        $result = [];
        foreach ($this->vinculosUsuario as $vinculo){ if(count(array_filter($vinculo->atribuicoes->toArray(), fn($a) => $a['atribuicao'] == 'AVALIADOR_PLANO_TRABALHO' && $a['deleted_at'] == null)) > 0) array_push($result, $vinculo->usuario); }
        return $result;
    }
    public function getHomologadoresPlanoEntregaAttribute()
    {
        $result = [];
        foreach ($this->vinculosUsuario as $vinculo){ if(count(array_filter($vinculo->atribuicoes->toArray(), fn($a) => $a['atribuicao'] == 'HOMOLOGADOR_PLANO_ENTREGA' && $a['deleted_at'] == null)) > 0) array_push($result, $vinculo->usuario); }
        return $result;
    } 
}