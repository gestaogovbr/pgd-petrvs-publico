<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Projeto;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\MaterialServico;

class ProjetoRecurso extends ModelBase
{
  protected $table = 'projetos_recursos';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'nome', /* varchar(256); NOT NULL; */ // Nome do recurso
    'tipo', /* enum('HUMANO','MATERIAL','SERVICO','CUSTO','DEPARTAMENTO'); NOT NULL; */ // Tipo do recurso
    'unidade_medida', /* enum('UNIDADE','CAIXA','METRO','KILO','LITRO','DUZIA','MONETARIO','HORAS','DIAS','PACOTE'); NOT NULL; */ // Unidade do recurso
    'valor', /* decimal(15,2); NOT NULL; */ // Valor
    'projeto_id', /* char(36); NOT NULL; */
    'usuario_id', /* char(36); */
    'unidade_id', /* char(36); */
    'material_servico_id', /* char(36); */
    //'deleted_at', /* timestamp; */
  ];

  public $fillable_changes = [];

  public $fillable_relations = [];

  public $delete_cascade = [];

  // Has
  public function alocacoes()
  {
    return $this->hasMany(ProjetoAlocacao::class, 'recurso_id');
  }
  // Belongs
  public function projeto()
  {
    return $this->belongsTo(Projeto::class);
  }
  public function usuario()
  {
    return $this->belongsTo(Usuario::class);
  }        //nullable
  public function unidade()
  {
    return $this->belongsTo(Unidade::class);
  }        //nullable
  public function materialServico()
  {
    return $this->belongsTo(MaterialServico::class);
  }        //nullable
}
