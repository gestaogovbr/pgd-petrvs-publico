<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Entidade;
use App\Models\Cidade;

class Feriado extends ModelBase
{
    protected $table = 'feriados';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(250); NOT NULL; */// Descrição do feriado
        'dia', /* int; NOT NULL; */// Dia do mês (1~31) ou dia da semana (1-7)
        'mes', /* int; NOT NULL; */// Mês
        'ano', /* int; */// Ano do feriado caso seja data não recorrente
        'tipoDia', /* enum('MES','SEMANA'); NOT NULL; */// Se o campo dia representa o dia da semana
        'recorrente', /* tinyint; NOT NULL; */// Se é uma data única ou repete todos os anos
        'abrangencia', /* enum('NACIONAL','ESTADUAL','MUNICIPAL'); NOT NULL; */// Abrangência do feriado
        'codigo_ibge', /* varchar(8); */// Código da UF ou do município (IBGE)
        'entidade_id', /* char(36); */
        'cidade_id', /* char(36); */
        'uf', /* varchar(2); */// UF para feriados estaduais
        //'deleted_at', /* timestamp; */
    ];

    // Belongs
    public function entidade() { return $this->belongsTo(Entidade::class); }   //OK//    //nullable
    public function cidade() { return $this->belongsTo(Cidade::class); }   //OK//  //nullable
}
