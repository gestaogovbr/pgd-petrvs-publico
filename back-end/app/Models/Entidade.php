<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Feriado;
use App\Models\Usuario;

class EntidadeNotificacoes {
    public $enviar_email = true;
    public $enviar_whatsapp = true;
    public $notifica_demanda_distribuicao = true;
    public $notifica_demanda_conclusao = true;
    public $notifica_demanda_avaliacao = true;
    public $notifica_demanda_modificacao = true;
    public $notifica_demanda_comentario = true;
    public $template_demanda_distribuicao = "Uma nova demanda foi atribuída a você, acesse o PETRVS para visualizá-la! (ID: #{{demanda_numero}})";
    public $template_demanda_conclusao = "A demanda #{{demanda_numero}}, atribuída à\ao {{demanda_responsavel}}, foi concluída, acesse o PETRVS para visualizá-la!";
    public $template_demanda_avaliacao = "Sua demanda #{{demanda_numero}} foi avaliada, acesse o PETRVS para avaliá-la!";
    public $template_demanda_modificacao = "A demanda #{{demanda_numero}}, atribuída à {{demanda_responsavel}}, foi atualizada, acesse o PETRVS para visualizá-la!";
    public $template_demanda_comentario = "Foi inserido um comentário na demanda #{{demanda_numero}}, atribuída a {{demanda_responsavel}}, acesse o PETRVS para visualizá-la!";
}

class Entidade extends ModelBase
{
    public $fillable = [
        'id',
        'sigla',
        'nome',
        'config',
        'sigla',
        'nome',
        'abrangencia',
        'codigo_ibge',
        'carga_horaria_padrao',
        'gravar_historico_processo',
        'layout_formulario_demanda',
        'campos_ocultos_demanda',
        'tipo_modalidade_id',
        'cidade_id',
        'uf',
        'url_sei',
        'nomenclatura',
        'gestor_id',
        'gestor_substituto_id',
        'notificacoes',
        'forma_contagem_carga_horaria'
    ];

    public $delete_cascade = ['feriados'];

    protected static function booted()
    {
        static::creating(function ($entidade) {
            $entidade->campos_ocultos_demanda = json_decode("{'codigo': 'null'}");
        });
    }

    // Has
    public function feriados() { return $this->hasMany(Feriado::class, 'entidade_id'); }        
    // Belongs
    public function cidade() { return $this->belongsTo(Cidade::class, 'cidade_id'); }   
    public function gestor() { return $this->belongsTo(Usuario::class); }
    public function gestorSubstituto() { return $this->belongsTo(Usuario::class); }
    public function tipoModalidade() { return $this->belongsTo(TipoModalidade::class, 'tipo_modalidade_id'); }
    
    // Mutattors e Casts
    public function getCamposOcultosDemandaAttribute($value)
    {
        return json_decode($value);
    }   
    public function setCamposOcultosDemandaAttribute($value)
    {
        $this->attributes['campos_ocultos_demanda'] = json_encode($value);
    }
    public function getNomenclaturaAttribute($value)
    {
        return json_decode($value);
    }   
    public function setNomenclaturaAttribute($value)
    {
        $this->attributes['nomenclatura'] = json_encode($value);
    }
    public function getNotificacoesAttribute($value)
    {
        $notificacoes = new EntidadeNotificacoes();
        return array_replace_recursive((array) $notificacoes, (array) json_decode(empty($value) ? "[]" : $value));
    }   
    public function setNotificacoesAttribute($value)
    {
        $this->attributes['notificacoes'] = json_encode($value);
    }
}
