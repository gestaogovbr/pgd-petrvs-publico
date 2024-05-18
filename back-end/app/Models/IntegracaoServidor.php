<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoUuid;

class IntegracaoServidor extends ModelBase
{
  use AutoUuid;

  protected $table = 'integracao_servidores';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'cpf_ativo', /* varchar(50); */
    'data_modificacao', /* datetime; */
    'cpf', /* varchar(50); */
    'nome', /* varchar(100); */
    'emailfuncional', /* varchar(100); */
    'sexo', /* varchar(50); */
    'municipio', /* varchar(100); */
    'uf', /* varchar(50); */
    'data_nascimento', /* varchar(50); */
    'telefone', /* varchar(50); */
    'vinculo_ativo', /* varchar(50); */
    'matriculasiape', /* varchar(50); */
    'codigo_cargo', /* varchar(100); */
    'coduorgexercicio', /* varchar(50); */
    'coduorglotacao', /* varchar(50); */
    'codigo_servo_exercicio', /* varchar(50); */
    'nomeguerra', /* varchar(100); */
    'codigo_situacao_funcional', /* varchar(50); */ // Registra Código da Situação Funcional informado pelo Siape.
    'situacao_funcional', /* varchar(50); */
    'codupag', /* varchar(50); */
    'dataexercicionoorgao', /* varchar(50); */
    'funcoes', /* json; */
    'cpf_chefia_imediata', /* varchar(50); */ // Registra CPF da chefia imediata informado pelo Siape.
    'email_chefia_imediata', /* varchar(50); */ // Registra e-mail da chefia imediata informado pelo Siape.
    'nome_jornada', 
    'cod_jornada', 
    //'deleted_at', /* timestamp; */
  ];

  protected $keyType = 'string';

  protected $casts = [
    'deployed_at' => 'datetime',
  ];
}
