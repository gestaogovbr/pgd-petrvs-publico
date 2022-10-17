<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Demanda;
use App\Models\Lotacao;
use App\Models\Plano;
use App\Models\Programa;
use App\Models\Atividade;
use App\Models\Entidade;
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

    protected $with = ['cidade'];

    public $fillable_relations = [
        "unidades_origem_atividades"
    ];

    public $fillable = [
        'codigo',
        'sigla',
        'nome',
        'path',
        'atividades_arquivamento_automatico',
        'atividades_avaliacao_automatico',
        'planos_prazo_comparecimento',
        'planos_tipo_prazo_comparecimento',
        'horario_trabalho_inicio',
        'horario_trabalho_fim',
        'horario_trabalho_intervalo',
        'distribuicao_forma_contagem_prazos',
        'entrega_forma_contagem_prazos',
        'autoedicao_subordinadas',
        'etiquetas',
        'data_inicio' ,
        //'data_fim' ,
        'notificacoes',
        'unidade_id',
        'gestor_id',
        'gestor_substituto_id',
        'entidade_id',
        'cidade_id'
    ];

    protected $table = 'unidades';

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
}
