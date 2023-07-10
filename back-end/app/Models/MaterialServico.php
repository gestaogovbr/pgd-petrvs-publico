<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\ProjetoRecurso;

class MaterialServico extends ModelBase
{
    protected $table = 'materiais_servicos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'tipo', /* enum('MATERIAL','SERVICO'); NOT NULL; DEFAULT: 'MATERIAL'; */// Tipo
        'codigo', /* varchar(100); */// Código
        'referencia', /* varchar(100); */// Referência
        'descricao', /* varchar(256); NOT NULL; */// Descrição
        'unidade_medida', /* enum('UNIDADE','CAIXA','METRO','KILO','LITRO','DUZIA','MONETARIO','HORAS','DIAS','PACOTE'); NOT NULL; */// Unidade
        //'deleted_at', /* timestamp; */
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