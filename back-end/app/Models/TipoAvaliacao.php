<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\DemandaAvaliacao;
use App\Models\TipoAvaliacaoJustificativa;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class TipoAvaliacao extends ModelBase
{
    protected $table = 'tipos_avaliacoes';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nota_atribuida', /* int; */// Nota atribuida de 0 a 10
        'nome', /* varchar(256); NOT NULL; */// Descrição da nota atribuida
        'aceita_entrega', /* tinyint; NOT NULL; DEFAULT: '1'; */// Se a entrega vai ser aceita e as horas pactuadas serão homologadas
        'pergunta', /* text; NOT NULL; */// Pergunta motivacional, o porque você selecionou essa nota
        'icone', /* varchar(100); NOT NULL; */// Classe do icone relacionado a avaliação
        'cor', /* varchar(100); NOT NULL; */// Código da cor em hex
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        //'data_fim', /* datetime; */// Data final da vigência
    ];

    public $fillable_relations = [
        'tipos_avaliacoes_justificativas'
    ];
    
    public $delete_cascade = [
        'tiposAvaliacoesJustificativas'
    ];
    
    // Has
    public function avaliacoes() { return $this->hasMany(DemadaAvaliacao::class, 'tipo_avaliacao_id'); }    
    public function tiposAvaliacoesJustificativas() { return $this->hasMany(TipoAvaliacaoJustificativa::class, 'tipo_avaliacao_id'); }    
}
