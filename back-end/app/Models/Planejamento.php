<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Entidade;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;
use App\Models\PlanejamentoObjetivo;
use Illuminate\Database\Eloquent\Casts\AsArrayObject;

class Planejamento extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'planejamentos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'inicio', /* datetime; NOT NULL; */// Data inicio do planejamento
        'fim', /* datetime; */// Data fim do planejamento
        'nome', /* varchar(256); NOT NULL; */// Nome do planejamento estratégico
        'unidade_id', /* char(36); */
        'missao', /* text; NOT NULL; */// Missão da entidade/unidade
        'visao', /* text; NOT NULL; */// Visão da entidade/unidade
        'valores', /* json; NOT NULL; */// Valores da entidade/unidade
        'entidade_id', /* char(36); NOT NULL; */
        //'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência do registro
        //'data_fim', /* datetime; */// Data fim da vigência do registro
    ];

    public function proxyFill(&$dataOrEntity, $unidade, $action) {
        $dataOrEntity['entidade_id'] = $unidade->entidade_id;
        return $this->fill($dataOrEntity);
    }

    // Has
    public function objetivos() { return $this->hasMany(PlanejamentoObjetivo::class); }    
    // Belongs
    public function unidade() { return $this->belongsTo(Unidade::class); }
    public function entidade() { return $this->belongsTo(Entidade::class); }

    //Casting
    protected $casts = [
        'valores' => AsArrayObject::class,
    ];
/*     public function getTiposProcessoAttribute($value) {
        return json_decode($value);
    }
    public function setTiposProcessoAttribute($value)
    {
        $this->attributes['tipos_processo'] = json_encode($value);
    } */
}
