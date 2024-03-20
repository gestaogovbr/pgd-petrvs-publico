<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Casts\AsJson;

class OrgaoCentralExportacao extends Model
{
  use HasFactory;

  protected $table = 'orgao_central_exportacoes';

  protected $fillable = ['data_exportacao', 'tipo', 'parametros', 'versao', 'corpo', 'retorno', 'hashs'];

  protected $casts = [
    'parametros' => AsJson::class,
    'corpo' => AsJson::class,
    'retorno' => AsJson::class,
    'hashs' => AsJson::class
  ];
}
