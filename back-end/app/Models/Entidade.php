<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\Cidade;
use App\Models\Feriado;
use App\Models\Documento;
use App\Models\Planejamento;
use App\Models\CadeiaValor;
use App\Models\Integracao;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\TipoTarefa;
use App\Models\Template;
use App\Models\TipoModalidade;
use App\Models\NotificacaoConfig;

class Entidade extends ModelBase
{
  protected $table = "entidades";

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'id', /* char(36); NOT NULL; */
    'sigla', /* varchar(100); NOT NULL; */ // Sigla da entidade
    'nome', /* varchar(256); NOT NULL; */ // Nome da entidade
    'abrangencia', /* enum('NACIONAL','ESTADUAL','MUNICIPAL'); NOT NULL; */ // Abrangência da entidade
    'codigo_ibge', /* varchar(8); */ // Código da UF ou do município (IBGE)
    'carga_horaria_padrao', /* int; NOT NULL; DEFAULT: '8'; */ // Carga horária utilizada ao criar plano de trabalho
    'gravar_historico_processo', /* tinyint; NOT NULL; */ // Se grava andamento da atividade dentro do processo vinculado (Caso seja o SEI, será em Consultar Andamento)
    'layout_formulario_atividade', /* enum('COMPLETO','SIMPLIFICADO'); NOT NULL; DEFAULT: 'COMPLETO'; */ // Layout para a tela do formulário de atividades (cadastro simplificado ou completo)
    'campos_ocultos_atividade', /* json; */ // Campos que se deseja ocultar do formulário de atividade, com seu respectivo valor padrão, em caso de NULL será utilizado o valor default do banco
    'tipo_modalidade_id', /* char(36); */
    'cidade_id', /* char(36); */
    'uf', /* varchar(2); */ // UF para feriados estaduais
    'nomenclatura', /* json; */ // Nomenclatura utilizada no sistema
    'gestor_id', /* char(36); */
    'gestor_substituto_id', /* char(36); */
    'notificacoes', /* json; */ // Configurações das notificações (Se envia e-mail, whatsapp, tipos, templates)
    'forma_contagem_carga_horaria', /* enum('DIA','SEMANA','MES'); NOT NULL; DEFAULT: 'DIA'; */ // Forma de contagem padrão da carga horária
    'expediente', /* json; NOT NULL; DEFAULT: '_utf8mb4\'{"domingo":[],"segunda":[],"terca":[],"quarta":[],"quinta":[],"sexta":[],"sabado":[],"especial":[]}\''; */ // Configuração de expediente
    //'deleted_at', /* timestamp; */
    'email_responsavel_siape', /* varchar(100); NULL; */ // Email do Responsável pelas alterações no SIAPE (#818)
    'email_remetente_siape', /* varchar(100); NULL; */ // Email do Remetente a enviar nos relatos de alterações no SIAPE (#818)
    'habilitar_relatos_siape' /* tinyint; NOT NULL; DEFAULT: '0'; */ // Indica se o relato de erros de lotação no SIAPE está habilitado (#818)
  ];

  public $delete_cascade = ['feriados', 'emails'];

  public $fillable_relations = [
    'emails'
  ];

  protected $hidden = [
    'api_public_key',
    'api_private_key'
  ];

  protected static function booted()
  {
    static::creating(function ($entidade) {
      $entidade->campos_ocultos_atividade = json_decode("{'codigo': 'null'}");
    });
  }

  // Casting
  protected $casts = [
    'campos_ocultos_atividade' => AsJson::class,
    'nomenclatura' => AsJson::class,
    'expediente' => AsJson::class
  ];

  public $fillable_changes = [
    "notificacoes_templates"
  ];

  // Has
  public function feriados()
  {
    return $this->hasMany(Feriado::class);
  }
  public function documentos()
  {
    return $this->hasMany(Documento::class);
  }
  public function planejamentos()
  {
    return $this->hasMany(Planejamento::class);
  }
  public function cadeiasValores()
  {
    return $this->hasMany(CadeiaValor::class);
  }
  public function integracoes()
  {
    return $this->hasMany(Integracao::class);
  }
  public function notificacoesTemplates()
  {
    return $this->hasMany(Template::class)->where("especie", "NOTIFICACAO");
  }
  public function relatoriosTemplates()
  {
    return $this->hasMany(Template::class)->where("especie", "RELATORIO");
  }
  public function unidades()
  {
    return $this->hasMany(Unidade::class);
  }
  public function tiposTarefas()
  {
    return $this->hasMany(TipoTarefa::class);
  }
  // Belongs
  public function cidade()
  {
    return $this->belongsTo(Cidade::class);
  }      //nullable
  public function gestor()
  {
    return $this->belongsTo(Usuario::class);
  }     //nullable
  public function gestorSubstituto()
  {
    return $this->belongsTo(Usuario::class);
  }   //nullable
  public function tipoModalidade()
  {
    return $this->belongsTo(TipoModalidade::class);
  }  //nullable
  public function emails()
  {
    return $this->hasMany(EntidadeEmail::class);
  }

  // Mutattors e Casts
  public function getNotificacoesAttribute($value)
  {
    $notificacoes = new NotificacaoConfig();
    return array_replace_recursive((array) $notificacoes, (array) json_decode(empty($value) ? "[]" : $value));
  }
  public function setNotificacoesAttribute($value)
  {
    $this->attributes['notificacoes'] = json_encode($value);
  }
}
