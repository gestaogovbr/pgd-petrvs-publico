<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Entidade;
use App\Models\Usuario;

class Integracao extends ModelBase
{
    protected $table = 'integracoes';

    protected $with = ['usuario'];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'data_execucao', /* datetime; NOT NULL; */// Data em que a rotina de integração foi executada
        'usuario_id', /* char(36); */
        'entidade_id', /* char(36); NOT NULL; */
        'atualizar_unidades', /* tinyint(1); NOT NULL; */// Define se a rotina deve atualizar as unidades
        'atualizar_servidores', /* tinyint(1); NOT NULL; */// Define se a rotina deve atualizar os servidores
        'atualizar_gestores', /* tinyint(1); NOT NULL; */// Define se a rotina deve atualizar os gestores
        'usar_arquivos_locais', /* tinyint(1); NOT NULL; */// Define se a rotina deve importar os dados de um arquivo local em formato XML
        'gravar_arquivos_locais', /* tinyint(1); NOT NULL; */// Define se a rotina deve salvar os dados importados do SIAPE em um arquivo local em formato XML
        'resultado', /* json; NOT NULL; */// Resultado da execução da rotina de integração
    ];

    protected $casts = [
        'data_execucao' => 'datetime'
    ];

    // Belongs
    public function entidade() { return $this->belongsTo(Entidade::class); }   
    public function usuario() { return $this->belongsTo(Usuario::class); }   

}
