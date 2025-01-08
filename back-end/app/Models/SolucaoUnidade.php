<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SolucaoUnidade extends ModelBase
{
    use HasFactory, SoftDeletes;

    protected $table = 'solucoes_unidades';

    protected $fillable = [
        'id_unidade',
        'id_solucao',
        'status'
    ];

    protected $casts = [
        'id' => 'string',
        'id_unidade' => 'string',
        'id_solucao' => 'string',
        'status' => 'integer'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];


    public function unidade()
    {
        return $this->belongsTo(Unidade::class, 'id_unidade', 'id');
    }

}
