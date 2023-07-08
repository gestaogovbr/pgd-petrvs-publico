<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\Demanda;
use App\Models\Unidade;
use App\Models\TipoProcesso;

class Atividade extends ModelBase
{
    protected $table = 'atividades';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome da classe de atividade
        'tempo_pactuado', /* double(8,2); NOT NULL; */// Tempo previsto para a execução da atividade (Horas decimais)
        'dias_planejado', /* double(8,2); NOT NULL; */// Sugestão de dias para conclusão da atividade independente de quando iniciado (influencia no prazo da demanda)
        'tempo_minimo', /* double(8,2); NOT NULL; DEFAULT: '20.00'; */// Tempo despendido mínimo aceitável para a atividade (% do tempo pactuado)
        'recalcula_prazo', /* tinyint; NOT NULL; */// Recalcular o prazo de entrega depois de iniciada a demanda
        'desativa_produtividade', /* tinyint; NOT NULL; */// Desativar o cálculo de produtividade e controle de tempo de execução (para atividades do tipo monitoramento)
        'complexidade', /* json; */// Graus de complexidade da atividade (complexidade, fator, tempo_pactuado, default)
        'tipos_processo', /* json; */// Configuração predefinidos de tipos associados de processos do Sei
        'etiquetas_predefinidas', /* json; */// Nome das etiquetas predefinidas para a demanda
        'checklist_predefinidos', /* json; */// Nome dos checklist predefinidas para a demanda
        'comentario_predefinido', /* text; */// Comentário predefinida para a demanda
        'parametros_adotados', /* json; */// Parametros adotados para definir a entrega da atividade (textual, para cumprir a IN65/2020-ME)
        'entregas_esperadas', /* json; */// Quais as entregas esperadas (textual, para cumprir a IN65/2020-ME)
        'homologado', /* tinyint; NOT NULL; */// Se a atividade foi homologada pela unidade gestora do teletrabalho
        'data_homologacao', /* datetime; NOT NULL; */// Data em que houve a homologação
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        'unidade_id', /* char(36); NOT NULL; */
        'tipo_atividade_id', /* char(36); */
        //'data_fim', /* datetime; */// Data fim da vigência
    ];

    protected static function booted()
    {
        static::creating(function ($atividade) {
            $atividade->etiquetas = $atividade->etiquetas ?? [];
            $atividade->checklist = $atividade->checklist ?? [];
        });  
    }
    
    // Casting
    protected $casts = [
        'checklist' => AsJson::class,
        'etiquetas' => AsJson::class,
    ];

    // Has
    public function demandas() { return $this->hasMany(Demanda::class); }
    // Belongs
    public function unidade() { return $this->belongsTo(Unidade::class); }
    public function tipoAtividade() { return $this->belongsTo(TipoAtividade::class); }
    public function tipoProcesso() { return $this->belongsTo(TipoProcesso::class); }
}