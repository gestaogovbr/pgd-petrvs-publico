<?php

namespace App\Models;

use App\Traits\AutoDataInicio;
use App\Models\ModelBase;
use App\Models\ProjetoRecurso;
use App\Traits\HasDataFim;

class MaterialServico extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'materiais_servicos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'tipo', /* enum('MATERIAL','SERVICO'); NOT NULL; DEFAULT: 'MATERIAL'; */// Tipo
        'codigo', /* varchar(100); */// Código
        'referencia', /* varchar(100); */// Referência
        'descricao', /* varchar(256); NOT NULL; */// Descrição
        'unidade_medida', /* enum('UNIDADE','CAIXA','METRO','KILO','LITRO','DUZIA','FARDO','HORAS','DIAS','PACOTE','FRASCO'); NOT NULL; */// Unidade
        //'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        //'data_fim', /* datetime; */// Data final da vigência
    ];

    /*public $fillable_changes = [
    ];

    public $fillable_relations = [
    ];*/

    //public $delete_cascade = [];

    // Has
    public function projetosRecursos() { return $this->hasMany(ProjetoRecurso::class); }    
    // Belongs
    //public function () { return $this->belongsTo(::class); }    
}