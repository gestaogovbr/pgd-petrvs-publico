<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApiSiapeUorg extends Model
{
    use HasFactory;

    protected $table = 'api_siape_uorgs';

    protected $fillable = [
    'id_servo',
    'pai_servo',
    'codigo_siape',
    'pai_siape',
    'codupag',
    'nomeuorg',
    'siglauorg',
    'telefone',
    'email',
    'natureza',
    'fronteira',
    'fuso_horario',
    'cod_uop',
    'cod_unidade',
    'tipo',
    'tipo_desc',
    'na_rodovia',
    'logradouro',
    'bairro',
    'cep',
    'ptn_ge_coordenada',
    'municipio_siafi_siape',
    ':municipio_siscom',
    'municipio_ibge',
    'municipio_nome',
    'municipio_uf',
    'tiva',
    'regimental',
    'datamodificacao',
    'und_nu_adicional',
    'cnpjupag'
    ];
}
