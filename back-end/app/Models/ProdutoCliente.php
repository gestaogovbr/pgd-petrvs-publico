<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProdutoCliente extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'produto_clientes';

    public $fillable = [
        'produto_id',
        'cliente_id'
    ];

    protected $casts = [
        'id' => 'string',
        'produto_id' => 'string',
        'cliente_id' => 'string',
    ];

    public function produto()
    {
        return $this->belongsTo(Produto::class);
    }

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }   
}
