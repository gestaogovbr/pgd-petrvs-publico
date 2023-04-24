<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Demanda;
use App\Models\Lotacao;
use App\Models\Plano;
use App\Models\Programa;
use App\Models\Atividade;
use App\Models\Entidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeOrigemAtividade;
use App\Models\Cidade;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class UnidadeNotificacoes {
    public $enviar_email = true;
    public $enviar_whatsapp = true;
    public $notifica_demanda_distribuicao = true;
    public $notifica_demanda_conclusao = true;
    public $notifica_demanda_avaliacao = true;
    public $notifica_demanda_modificacao = true;
    public $notifica_demanda_comentario = true;
    public $template_demanda_distribuicao = "";
    public $template_demanda_conclusao = "";
    public $template_demanda_avaliacao = "";
    public $template_demanda_modificacao = "";
    public $template_demanda_comentario = "";
}

class Unidade extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'unidades';

    protected $with = ['cidade'];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'codigo', /* varchar(12); NOT NULL; */// Código da unidade
        'sigla', /* varchar(100); NOT NULL; */// Sigla da unidade
        'nome', /* varchar(256); NOT NULL; */// Nome da unidade
        'path', /* text; */// Path dos nós pais separados por /, ou null caso sejam nós raiz
        'atividades_arquivamento_automatico', /* tinyint; NOT NULL; */// Se arquiva automaticamente após avaliação
        'atividades_avaliacao_automatico', /* tinyint; NOT NULL; */// Se avalia automaticamente ao final do prazo para avaliação com nota 10 (pela IN65/2020-ME é 45 dias após a entrega)
        'planos_prazo_comparecimento', /* int; NOT NULL; DEFAULT: '1'; */// Prazo de antecedência para comunicar o usuário de seu comparecimento na unidade
        'planos_tipo_prazo_comparecimento', /* set('HORAS','DIAS'); NOT NULL; DEFAULT: 'DIAS'; */// Unidade de medida para contagem do planos_prazo_comparecimento
        'horario_trabalho_inicio', /* time; NOT NULL; DEFAULT: '00:00:00'; */// Referência do início da jornada de trabalho diária da unidade para fins de distribuição de demanda (contar a partir deste horário)
        'horario_trabalho_fim', /* time; NOT NULL; DEFAULT: '24:00:00'; */// Referência do fim da jornada de trabalho diária da unidade para fins de distribuição de demanda (até este horário, caso seja superior será contado do dia seguinte)
        'horario_trabalho_intervalo', /* time; NOT NULL; DEFAULT: '00:00:00'; */// Intervalo realizado dentro da jornada de trabalho (Ex.: horário de almoço). Para fins de computo de jornada de trabalho na ausência do plano de trabalho.
        'distribuicao_forma_contagem_prazos', /* set('HORAS_CORRIDAS','DIAS_CORRIDOS','HORAS_UTEIS','DIAS_UTEIS'); NOT NULL; DEFAULT: 'DIAS_UTEIS'; */// Forma da contagem de prazo
        'entrega_forma_contagem_prazos', /* set('HORAS_CORRIDAS','HORAS_UTEIS'); NOT NULL; DEFAULT: 'HORAS_UTEIS'; */// Forma da contagem de horas para entrega
        'autoedicao_subordinadas', /* tinyint; NOT NULL; DEFAULT: '1'; */// Permitir a autoedição de informações gerais pelas unidades subordinadas (nome, sigla, codigo_pai)
        'etiquetas', /* json; */// Configuração das etiquetas que serão utilizadas nas demandas (contém nome, icone e cor)
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        'notificacoes', /* json; */// Configurações das notificações (Se envia email, whatsapp, tipos, templates)
        'unidade_id', /* char(36); */
        'gestor_id', /* char(36); */
        'gestor_substituto_id', /* char(36); */
        'entidade_id', /* char(36); NOT NULL; */
        'cidade_id', /* char(36); */
        'expediente', /* json; */// Configuração de expediente
        'avaliacao_hierarquica',
        //'checklist', /* json; */// Nome dos checklist predefinidas
        //'data_fim', /* datetime; */// Data final da vigência
        //'inativo', /* datetime; */// Se a unidade está inativa
        //'texto_complementar_plano', /* longtext; */// Campo de mensagem adicional do plano de trabalho
    ];

    public $fillable_relations = [
        "unidades_origem_atividades"
    ];

    public $delete_cascade = ['unidadesOrigemAtividades', 'unidadesDestinoAtividades'];

    protected static function booted()
    {
        static::creating(function ($unidade) {
            //$unidade->notificacoes = empty($unidade->distribuicao_notificacao) ? json_decode('{"texto_criacao": "Prezado(a) {usuario}, \n\nInformo a edição da {requisicao}, relativa à atividade {atividade}: \n\nProcesso: {processo} \n\nAssunto: {assunto} \n\nPrazo: {prazo} dias úteis \n\nAtenciosamente,", "texto_conclusao": "Prezado(a), \n\nInformo a criação do documento {documento_produto} para a apreciação Gerencial, relativa à atividade {atividade}: \n\nProcesso: {processo} \n\nAssunto: {assunto} \n\nData de Entrega: até {data_entrega} \n\nObservações: {observacoes} \n\nAtenciosamente,"}') : $unidade->distribuicao_notificacao;
            $unidade->notificacoes = empty($unidade->notificacoes) ? json_decode('{}') : $unidade->notificacoes;
            $unidade->etiquetas = $unidade->etiquetas ?? [];
        });
    }

    // Has
    public function demandas() { return $this->hasMany(Demanda::class); }
    public function lotacoes() { return $this->hasMany(Lotacao::class); }
    public function planos() { return $this->hasMany(Plano::class); }
    public function programas() { return $this->hasMany(Programa::class); }
    public function atividades() { return $this->hasMany(Atividade::class); }
    public function integrantes() { return $this->hasMany(UnidadeIntegrante::class); }
    public function unidadesOrigemAtividades() { return $this->hasMany(UnidadeOrigemAtividade::class); }
    public function unidadesDestinoAtividades() { return $this->hasMany(UnidadeOrigemAtividade::class, 'unidade_origem_atividade_id'); }
    // Belongs
    public function gestor() { return $this->belongsTo(Usuario::class); }
    public function gestorSubstituto() { return $this->belongsTo(Usuario::class); }
    public function entidade() { return $this->belongsTo(Entidade::class); }
    public function cidade() { return $this->belongsTo(Cidade::class); }
    public function unidade() { return $this->belongsTo(Unidade::class); }
    // Mutattors e Casts
    public function getChecklistAttribute($value)
    {
        return json_decode($value);
    }
    public function setChecklistAttribute($value)
    {
        $this->attributes['checklist'] = json_encode($value);
    }
    public function getEtiquetasAttribute($value)
    {
        return json_decode($value);
    }
    public function setEtiquetasAttribute($value)
    {
        $this->attributes['etiquetas'] = json_encode($value);
    }
    public function getNotificacoesAttribute($value)
    {
        $notificacoes = new UnidadeNotificacoes();
        return array_replace_recursive((array) $notificacoes, (array) json_decode(empty($value) ? "[]" : $value));
    }
    public function setNotificacoesAttribute($value)
    {
        $this->attributes['notificacoes'] = json_encode($value);
    }
    public function getExpedienteAttribute($value)
    {
        return json_decode($value);
    }   
    public function setExpedienteAttribute($value)
    {
        $this->attributes['expediente'] = json_encode($value);
    }
}
