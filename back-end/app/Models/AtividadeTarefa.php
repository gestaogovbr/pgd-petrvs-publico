<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Atividade;
use App\Models\Documento;
use App\Models\TipoTarefa;
use App\Models\Usuario;
use App\Models\Comentario;

class AtividadeTarefa extends ModelBase
{
    protected $table = 'atividades_tarefas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'descricao', /* text; */// Descrição da tarefa
        'data_hora', /* datetime; NOT NULL; */// Data hora do lançamento da tarefa
        'tempo_estimado', /* double(8,2); NOT NULL; */// Tempo estimado para a execução da tarefa (Horas decimais)
        'concluido', /* tinyint; NOT NULL; */// Se a tarefa foi concluída
        'documento_id', /* char(36); */
        'usuario_id', /* char(36); NOT NULL; */
        'tipo_tarefa_id', /* char(36); */
        'atividade_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
    ];
    
    public $fillable_changes = [
        'comentarios'
    ];

    public $delete_cascade = ['comentarios'];

    // Has
    public function comentarios() { return $this->hasMany(Comentario::class); }    
    public function documentos() { return $this->hasMany(Documento::class); }    
    // Belongs
    public function documento() { return $this->belongsTo(Documento::class); }    //nullable  
    public function usuario() { return $this->belongsTo(Usuario::class); }    
    public function tipoTarefa() { return $this->belongsTo(TipoTarefa::class); }      //nullable
    public function atividade() { return $this->belongsTo(Atividade::class); }    
}