<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Demanda;
use App\Models\Usuario;
use App\Models\Tarefa;

class DemandaEntrega extends ModelBase
{
    protected $table = 'demandas_entregas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'descricao', /* text; */// Descrição da tarefa
        'data_hora', /* datetime; NOT NULL; */// Data hora do lançamento da tarefa
        'tempo_estimado', /* double(8,2); NOT NULL; */// Tempo estimado para a execução da tarefa (Horas decimais)
        'id_processo', /* int; */// ID do processo de entrega, caso seja Sei será o ID do procedimento
        'numero_processo', /* varchar(50); */// Número do processo de entrega, com a formatação de origem
        'id_documento', /* int; */// ID da entrega, caso seja o Sei será o ID_Documento
        'numero_documento', /* varchar(11); */// Numero do documento de entrega, caso seja o Sei é o numero Sei
        'titulo_documento', /* text; */// Numeração do tipo de documento no sistema integrado
        'concluido', /* tinyint; NOT NULL; */// Se a tarefa foi concluída
        'demanda_id', /* char(36); NOT NULL; */
        'usuario_id', /* char(36); NOT NULL; */
        'tarefa_id', /* char(36); */
        'tipo_documento_id', /* char(36); */
        'tipo_processo_id', /* char(36); */
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