<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\Demanda;
use App\Models\Unidade;
use App\Models\TipoProcesso;

class TipoAtividade extends ModelBase
{
    protected $table = 'tipos_atividades';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome',
        'esforco',
        'dias_planejado',
        'etiquetas',
        'checklist',
        'comentario',
        //'deleted_at', /* timestamp; */
        //'numero', /* int; NOT NULL; */// Número da atividade (Gerado pelo sistema)
        //'assunto', /* text; */// Assunto da atividade
        //'data_distribuicao', /* datetime; NOT NULL; */// Data de cadastro da atividade
        //'carga_horaria', /* double(8,2); */// Carga horária que será utilizada para todos os cálculos (vinda do plano de trabalho)
        //'tempo_planejado', /* double(8,2); NOT NULL; */// Diferença entre data_distribuicao e prazo_entrega em horas (úteis ou corridas, configurada na unidade)
        //'prazo_entrega', /* datetime; NOT NULL; */// Data estipulada para entrega da demanda
        //'data_entrega', /* datetime; */// Data da entrega
        //'esforco', /* double(8,2); NOT NULL; */// Tempo calculado a partir da atividade e utilizando o fator_complexidade
        //'tempo_despendido', /* double(8,2); */// Calculado no fim da atividade, sendo o tempo líquido (considerando pausas)
        //'data_arquivamento', /* datetime; */// Data de arquivamento da demanda
        //'etiquetas', /* json; */// Etiquetas
        //'checklist', /* json; */// Checklist
        //'prioridade', /* int; */// Nível de prioridade
        //'progresso', /* decimal(5,2); NOT NULL; DEFAULT: '0.00'; */// Progresso da realização da atividade
        //'plano_trabalho_id', /* char(36); */
        //'plano_trabalho_entrega_id', /* char(36); */
        //'demandante_id', /* char(36); NOT NULL; */
        //'usuario_id', /* char(36); */
        //'documento_requisicao_id', /* char(36); */
        //'documento_entrega_id', /* char(36); */
        /*'parametros_adotados',*/// REMOVED
        /*'entregas_esperadas',*/// REMOVED
        /*'homologado',*/// REMOVED
        /*'data_homologacao',*/// REMOVED
    ];

    protected static function booted()
    {
        static::creating(function ($tipoAtividade) {
            $tipoAtividade->etiquetas = $tipoAtividade->etiquetas ?? [];
            $tipoAtividade->checklist = $tipoAtividade->checklist ?? [];
        });
    }
    
    // Casting
    protected $casts = [
        'checklist' => AsJson::class,
        'etiquetas' => AsJson::class,
    ];

    // Has
    // Belongs
}