<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Demanda;
use App\Models\Usuario;
use App\Models\Tarefa;

class DemandaEntrega extends ModelBase
{

    protected $table = 'demandas_entregas';

    public $fillable = [
        'descricao',
        'data_hora',
        'tempo_estimado',
        'id_processo',
        'numero_processo',
        'id_documento',
        'numero_documento',
        'titulo_documento',
        'concluido',
        'demanda_id',
        'usuario_id',
        'tarefa_id',
        'tipo_documento_id',
        'tipo_processo_id'
    ];
    
    public $fillable_changes = [
        'comentarios'
    ];

    public $delete_cascade = ['comentarios'];

    // Has
    public function comentarios() { return $this->hasMany(Comentario::class); }    
    // Belongs
    public function demanda() { return $this->belongsTo(Demanda::class); }    
    public function usuario() { return $this->belongsTo(Usuario::class); }    
    public function tarefa() { return $this->belongsTo(Tarefa::class); }    
}