<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\DemandaAvaliacao;
use App\Models\TipoAvaliacaoJustificativa;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class TipoAvaliacao extends ModelBase
{
    use AutoDataInicio, HasDataFim;
    protected $table = 'tipos_avaliacoes';

    public $fillable_relations = [
        'tipos_avaliacoes_justificativas'
    ];

    public $fillable = [
        'nota_atribuida',
        'nome',
        'aceita_entrega',
        'pergunta',
        'icone',
        'cor',
        'data_inicio',
        //'data_fim'
    ];

    public $delete_cascade = ['tiposAvaliacoesJustificativas'];
    
    // Has
    public function avaliacoes() { return $this->hasMany(DemadaAvaliacao::class, 'tipo_avaliacao_id'); }    
    public function tiposAvaliacoesJustificativas() { return $this->hasMany(TipoAvaliacaoJustificativa::class, 'tipo_avaliacao_id'); }    
}
