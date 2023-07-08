<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\Feriado;
use App\Models\Usuario;
use App\Models\Template;
use App\Models\NotificacoesConfig;

class Entidade extends ModelBase
{
    protected $table = "entidades";
    
    protected $with = [];

    public $fillable = [ // TYPE; NULL?; DEFAULT?; // COMMENT

    ];

    public $delete_cascade = ['feriados'];

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
    public function feriados() { return $this->hasMany(Feriado::class, 'entidade_id'); }        
    public function notificacoesTemplates() { return $this->hasMany(Template::class, 'entidade_id'); }
    // Belongs
    public function cidade() { return $this->belongsTo(Cidade::class, 'cidade_id'); }   
    public function gestor() { return $this->belongsTo(Usuario::class); }
    public function gestorSubstituto() { return $this->belongsTo(Usuario::class); }
    public function tipoModalidade() { return $this->belongsTo(TipoModalidade::class); }
    
    // Mutattors e Casts
    public function getNotificacoesAttribute($value)
    {
        $notificacoes = new NotificacoesConfig();
        return array_replace_recursive((array) $notificacoes, (array) json_decode(empty($value) ? "[]" : $value));
    }   
    public function setNotificacoesAttribute($value)
    {
        $this->attributes['notificacoes'] = json_encode($value);
    }
}
/* //         'id', // char(36); NOT NULL; 
'sigla', // varchar(100); NOT NULL; // Sigla da entidade
'nome', // varchar(256); NOT NULL; // Nome da entidade
'abrangencia', // enum('NACIONAL','ESTADUAL','MUNICIPAL'); NOT NULL; // Abrangência da entidade
'codigo_ibge', // varchar(8); // Código da UF ou do município (IBGE)
'carga_horaria_padrao', // int; NOT NULL; DEFAULT: '8'; // Carga horária utilizada ao criar plano de trabalho
'gravar_historico_processo', // tinyint; NOT NULL; // Se grava andamento da demanda dentro do processo vinculado (Caso seja o Sei, será em Consultar Andamento)
'layout_formulario_atividade', // enum('COMPLETO','SIMPLIFICADO'); NOT NULL; DEFAULT: 'COMPLETO'; // Layout para a tela do formulário de demandas (cadastro simplificado ou completo)
'campos_ocultos_atividade', // json; // Campos que se deseja ocultar do formulário de daemanda, com seu respectivo valor padrão, em caso de null será utilizado o valor default do banco
'tipo_modalidade_id', // char(36); // Tipo de modalidade utilizada ao criar plano de trabalho
'cidade_id', // char(36); 
'uf', // varchar(2); // UF para feriados estaduais
'url_sei', // varchar(100); // URL base do sei da entidade
'nomenclatura', // json; // Nomenclatura utilizada no sistema
'gestor_id', // char(36); 
'gestor_substituto_id', // char(36); 
'notificacoes', // json; // Configurações das notificações (Se envia email, whatsapp, tipos, templates)
'forma_contagem_carga_horaria', // enum('DIA','SEMANA','MES'); NOT NULL; DEFAULT: 'DIA'; // Forma de contagem padrão da carga horária
'data_inicio', // datetime; NOT NULL; DEFAULT: 'CURRENT_TIMESTAMP'; // Data inicio da vigência
'expediente', // json; NOT NULL; DEFAULT: '_utf8mb4\'{"domingo":[],"segunda":[],"terca":[],"quarta":[],"quinta":[],"sexta":[],"sabado":[],"especial":[]}\''; // Configuração de expediente
//'data_fim', // datetime; // Data fim da vigência
//'api_public_key', // text; // Chave pública de API
//'api_private_key', // text; // Chave privada de API  */