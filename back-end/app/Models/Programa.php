<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Template;
use App\Models\Documento;
use App\Models\TipoDocumento;
use App\Models\ProgramaParticipante;

class Programa extends ModelBase
{
    protected $table = 'programas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(255); NOT NULL; */// Nome do programa
        'normativa', /* varchar(255); */// Normativa que regula o programa de gestão
        'config', /* json; */// Configurações do programa
        'data_inicio_vigencia', /* datetime; NOT NULL; */// Inicio da vigência do programa
        'data_fim_vigencia', /* datetime; NOT NULL; */// Fim da vigência do programa
        'documento_id', /* char(36); */
        'unidade_id', /* char(36); NOT NULL; */
        'template_tcr_id', /* char(36); */
        'periodo_avaliacao', /* enum('SEMANAL','QUINZENAL','MENSAL','BIMESTRAL','TRIMESTRAL','SEMESTRAL'); NOT NULL; DEFAULT: 'MENSAL'; */// Período para avaliação do plano de trabalho
        'termo_obrigatorio', /* tinyint; NOT NULL; */// Se o termo é ou não obrigatório
        'tipo_documento_tcr_id', /* char(36); */
        'prazo_execucao', /* int; NOT NULL; */// Limite máximo de dias corridos para o plano de entregas (Zero para não limitar)
        //'deleted_at', /* timestamp; */
    ];

    public $delete_cascade = ['documento'];

    public $fillable_changes = ['participantes'];
    
    // Has
    public function participantes() { return $this->hasMany(ProgramaParticipante::class); }
    // Belongs
    public function tipoDocumentoTcr() { return $this->belongsTo(TipoDocumento::class, 'tipo_documento_tcr_id'); }
    public function templateTcr() { return $this->belongsTo(Template::class, 'template_tcr_id'); }   
    public function unidade() { return $this->belongsTo(Unidade::class); }    
    public function documento() { return $this->belongsTo(Documento::class, 'documento_id'); }    
}