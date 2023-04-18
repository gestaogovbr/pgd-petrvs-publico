<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Documento;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class Programa extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'programas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(255); NOT NULL; */// Nome do programa de gestão
        'normativa', /* varchar(255); NOT NULL; */// Normativa que regula o programa de gestão
        'config', /* json; */
        'data_inicio_vigencia', /* datetime; NOT NULL; */// Inicio do programa
        'data_fim_vigencia', /* datetime; NOT NULL; */// Fim do programa
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        'documento_id', /* char(36); */
        'unidade_id', /* char(36); NOT NULL; */
        //'data_fim', /* datetime; */// Data fim da vigência
        //'periodo_avaliacao', /* enum('SEMANAL','QUINZENAL','MENSAL','BIMESTRAL','TRIMESTRAL','SEMESTRAL'); NOT NULL; DEFAULT: 'MENSAL'; */// Período para avaliação do plano
        //'termo_obrigatorio', /* tinyint; NOT NULL; */// Se o termo é obrigatório
        //'template_tcr_id', /* char(36); */
        //'tipo_documento_tcr_id', /* char(36); */
    ];

    public $delete_cascade = ['documento'];
    
    // Belongs
    public function unidade() { return $this->belongsTo(Unidade::class); }    
    public function documento() { return $this->belongsTo(Documento::class, 'documento_id'); }    

}
