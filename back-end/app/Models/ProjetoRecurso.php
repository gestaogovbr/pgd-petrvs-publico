<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Projeto;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\MaterialServico;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class ProjetoRecurso extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'projetos_recursos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome do recurso
        'tipo', /* enum('HUMANO','MATERIAL','SERVICO','CUSTO','DEPARTAMENTO'); NOT NULL; */// Tipo do recurso
        'unidade_medida', /* enum('UNIDADE','CAIXA','METRO','KILO','LITRO','DUZIA','FARDO','HORAS','DIAS','PACOTE','FRASCO'); NOT NULL; */// Unidade do recurso
        'valor', /* decimal(15,2); NOT NULL; */// Valor
        'data_inicio', /* datetime; NOT NULL; */// Data de criação
        'projeto_id', /* char(36); NOT NULL; */
        'usuario_id', /* char(36); */
        'unidade_id', /* char(36); */
        'material_servico_id', /* char(36); */
        //'data_fim', /* datetime; */// Data final do registro
    ];

    /*public $fillable_changes = [
    ];

    public $fillable_relations = [
    ];*/

    public $delete_cascade = [];

    // Has
    //public function () { return $this->hasMany(::class); }    
    // Belongs
    public function projeto() { return $this->belongsTo(Projeto::class); }    
    public function usuario() { return $this->belongsTo(Usuario::class); }    
    public function unidade() { return $this->belongsTo(Unidade::class); }    
    public function materialServico() { return $this->belongsTo(MaterialServico::class); }    
}