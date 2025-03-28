<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\PlanoTrabalho;
use App\Models\DocumentoAssinatura;
use App\Models\Atividade;
use App\Models\AtividadeTarefa;
use App\Models\ProjetoTarefa;
use App\Models\Programa;
use App\Models\Template;
use App\Models\TipoDocumento;
use App\Models\TipoProcesso;
use App\Models\Entidade;
use App\Models\Usuario;
use Illuminate\Support\Facades\DB;

class Documento extends ModelBase
{
  protected $table = 'documentos';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'titulo', /* varchar(256); NOT NULL; */ // Titulo do documento
    'tipo', /* enum('HTML','PDF','LINK','REPORT'); */
    'especie', /* enum('SEI','TCR','OUTRO','NOTIFICACAO','RELATORIO'); */
    'conteudo', /* longtext; */ // Conteúdo do arquivo
    'metadados', /* json; */ // Metadados
    'link', /* json; */ // Informações sobre o link, caso o tipo seja LINK
    'status', /* enum('GERADO','AGUARDANDO_SEI'); NOT NULL; DEFAULT: 'GERADO'; */ // Status do documento: GERADO (documento gerado); AGUARDANDO_SEI (Aguardando abrir o documento no sei para colar o conteúdo dentro)
    'template', /* longtext; */ // Campo de Template
    'datasource', /* json; */ // Conjunto de dados do template
    'dataset', /* json; */ // Definição das variáveis disponíveis para o template
    'entidade_id', /* char(36); */
    'tipo_documento_id', /* char(36); */
    'tipo_processo_id', /* char(36); */
    'atividade_id', /* char(36); */
    'atividade_tarefa_id', /* char(36); */
    'plano_trabalho_id', /* char(36); */
    'template_id', /* char(36); */
    'usuario_id', /* char(36); */
    //'deleted_at', /* timestamp; */
    //'numero', /* int; NOT NULL; */// Número do documento (Gerado pelo sistema)
  ];

  public $delete_cascade = ['assinaturas'];

  protected static function booted()
  {
    static::creating(function ($documento) {
      $documento->numero = DB::select("CALL sequence_documento_numero()")[0]->number;
    });
  }

  // Casting
  protected $casts = [
    'metadados' => AsJson::class,
    'datasource' => AsJson::class,
    'dataset' => AsJson::class,
    'link' => AsJson::class,
  ];

  // Has
  public function assinaturas()
  {
    return $this->hasMany(DocumentoAssinatura::class);
  }
  public function tarefasAtividade()
  {
    return $this->hasMany(AtividadeTarefa::class);
  }
  public function tarefasProjeto()
  {
    return $this->hasMany(ProjetoTarefa::class);
  }
  public function programas()
  {
    return $this->hasMany(Programa::class);
  }
  public function planosTrabalho()
  {
    return $this->hasMany(PlanoTrabalho::class);
  }
  public function atividadesRequisitadas()
  {
    return $this->hasMany(Atividade::class, 'documento_requisicao_id');
  }
  public function atividadesEntregues()
  {
    return $this->hasMany(Atividade::class, 'documento_entrega_id');
  }
  // Belongs
  public function template()
  {
    return $this->belongsTo(Template::class);
  }  //nullable
  public function planoTrabalho()
  {
    return $this->belongsTo(PlanoTrabalho::class);
  }    //nullable
  public function tipoDocumento()
  {
    return $this->belongsTo(TipoDocumento::class);
  }    //nullable
  public function tipoProcesso()
  {
    return $this->belongsTo(TipoProcesso::class);
  }      //nullable
  public function entidade()
  {
    return $this->belongsTo(Entidade::class);
  }      //nullable
  public function atividade()
  {
    return $this->belongsTo(Atividade::class);
  }    //nullable  
  public function atividadeTarefa()
  {
    return $this->belongsTo(AtividadeTarefa::class);
  }    //nullable  
  public function usuario()
  {
    return $this->belongsTo(Usuario::class);
  }    //nullable  

}
