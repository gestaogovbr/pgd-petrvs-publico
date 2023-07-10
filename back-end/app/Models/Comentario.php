<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\Projeto;
use App\Models\ProjetoTarefa;

class Comentario extends ModelBase
{
    protected $table = 'comentarios';
   
    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'texto', /* text; NOT NULL; */// Texto do comentário
        'path', /* text; */// Path dos ids dos comentários
        'data_hora', /* datetime; NOT NULL; */// Data e horário que foi feito o comentário
        'tipo', /* enum('COMENTARIO','TECNICO','GERENCIAL','AVALIACAO','TAREFA','ATIVIDADE'); NOT NULL; DEFAULT: 'COMENTARIO'; */// Tipo do comentário
        'privacidade', /* enum('PUBLICO','PRIVADO'); NOT NULL; DEFAULT: 'PUBLICO'; */// Nível de acesso ao comentário
        'usuario_id', /* char(36); NOT NULL; */
        'comentario_id', /* char(36); */
        'projeto_id', /* char(36); */
        'projeto_tarefa_id', /* char(36); */
        'atividade_id', /* char(36); */
        'atividade_tarefa_id', /* char(36); */
    ];

    public $delete_cascade = ['comentarios'];

    // Has
    public function comentarios() { return $this->hasMany(Comentario::class); }
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class, 'usuario_id'); }    
    public function comentario() { return $this->belongsTo(Comentario::class, 'comentario_id'); } 
    public function atividade() { return $this->belongsTo(Atividade::class, 'atividade_id'); } 
    public function atividadeTarefa() { return $this->belongsTo(AtividadeTarefa::class, 'atividade_tarefa_id'); } 
    public function projeto() { return $this->belongsTo(Projeto::class, 'projeto_id'); } 
    public function projetoTarefa() { return $this->belongsTo(ProjetoTarefa::class, 'projeto_tarefa_id'); } 
}
