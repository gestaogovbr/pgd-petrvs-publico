<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Entidade;
use App\Models\PlanoEntrega;
use App\Models\PlanejamentoObjetivo;

class Planejamento extends ModelBase
{
    protected $table = 'planejamentos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
        'data_inicio', /* datetime; NOT NULL; */ // Data de inicio do planejamento institucional
        'data_fim', /* datetime; NOT NULL; */ // Data do fim do planejamento institucional
        'nome', /* varchar(256); NOT NULL; */ // Nome do planejamento institucional
        'missao', /* text; NOT NULL; */ // Missão da entidade/unidade
        'visao', /* text; NOT NULL; */ // Visão da entidade/unidade
        'valores', /* json; NOT NULL; */ // Valores da entidade/unidade
        'resultados_institucionais', /* json; */ // Resultados da entidade/unidade
        'data_arquivamento', /* datetime; */ // Data de arquivamento do planejamento institucional
        'entidade_id', /* char(36); NOT NULL; */
        'unidade_id', /* char(36); */
        'planejamento_superior_id', /* char(36); */
        //'deleted_at', /* timestamp; */
    ];

    // Casting
    protected $casts = [
        'valores' => AsJson::class,
        'resultados_institucionais' => AsJson::class,
    ];

    public $fillable_changes = ['objetivos'];

    public $fillable_relations = [];

    public $delete_cascade = ["objetivos"];

    public function proxyFill(&$dataOrEntity, $unidade, $action)
    {
        $dataOrEntity['entidade_id'] = $unidade->entidade_id;
        return $this->fill($dataOrEntity);
    }

    // Has
    function objetivosOkr()
    {
        return $this->hasMany(PlanejamentoObjetivo::class)->where('planejamentos_objetivos.integra_okr', '=', true);
    }

    public function objetivos()
    {
        return $this->hasMany(PlanejamentoObjetivo::class);
    }

    public function planejamentos()
    {
        return $this->hasMany(Planejamento::class, 'planejamento_superior_id');
    }

    public function planosEntrega()
    {
        return $this->hasMany(PlanoEntrega::class);
    }

    // Belongs
    public function unidade()
    {
        return $this->belongsTo(Unidade::class);
    }    //nullable

    public function entidade()
    {
        return $this->belongsTo(Entidade::class);
    }

    public function planejamentoSuperior()
    {
        return $this->belongsTo(Planejamento::class, 'planejamento_superior_id');
    }   //nullable

    public function getAuditRelations(): array
    {
        return [
            [
                'model' => \App\Models\PlanoEntrega::class,
                'foreign_key' => 'planejamento_id',
            ],
            [
                'model' => \App\Models\PlanejamentoObjetivo::class,
                'foreign_key' => 'planejamento_id',
            ],
            [
                'model' => \App\Models\Entidade::class,
                'foreign_key' => 'id',
                'via' => [
                    'model' => \App\Models\Planejamento::class,
                    'foreign_key' => 'id',
                    'local_key' => 'entidade_id',
                ]
            ],
            [
                'model' => \App\Models\Unidade::class,
                'foreign_key' => 'id',
                'via' => [
                    'model' => \App\Models\Planejamento::class,
                    'foreign_key' => 'id',
                    'local_key' => 'unidade_id',
                ]
            ],
        ];
    }

}
