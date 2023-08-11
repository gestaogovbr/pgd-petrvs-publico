<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalho;
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
        'prazo_max_plano_entrega', /* int; NOT NULL; */// Limite máximo de dias corridos para o plano de entregas (Zero para não limitar)
        'periodo_avaliacao', /* enum('SEMANAL','QUINZENAL','MENSAL','BIMESTRAL','TRIMESTRAL','SEMESTRAL'); NOT NULL; DEFAULT: 'MENSAL'; */// Período para avaliação do plano de trabalho
        'termo_obrigatorio', /* tinyint; NOT NULL; */// Se o termo é ou não obrigatório
        'periodicidade_consolidacao',
        'periodicidade_valor',
        'dias_tolerancia_consolidacao',
        'tipo_documento_tcr_id', /* char(36); */
        'tipo_avaliacao_id',
        'documento_id', /* char(36); */
        'unidade_id', /* char(36); NOT NULL; */
        'template_tcr_id', /* char(36); */
        //'deleted_at', /* timestamp; */
    ];

    public $delete_cascade = ['documento'];

    public $fillable_changes = ['participantes'];
    
    // Has
    public function participantes() { return $this->hasMany(ProgramaParticipante::class); }
    public function planosEntrega() { return $this->hasMany(PlanoEntrega::class); }
    public function planosTrabalho() { return $this->hasMany(PlanoTrabalho::class); }
    // Belongs
    public function tipoAvaliacao() { return $this->belongsTo(TipoAvaliacao::class); }
    public function tipoDocumentoTcr() { return $this->belongsTo(TipoDocumento::class); }    //nullable
    public function templateTcr() { return $this->belongsTo(Template::class); }    //nullable
    public function unidade() { return $this->belongsTo(Unidade::class); }    
    public function documento() { return $this->belongsTo(Documento::class); }        //nullable 
}