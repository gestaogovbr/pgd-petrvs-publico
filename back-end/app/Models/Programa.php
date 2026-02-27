<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalho;
use App\Models\Template;
use App\Models\Documento;
use App\Models\TipoDocumento;
use App\Models\ProgramaParticipante;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $nome
 * @property string $normativa
 * @property string $link_normativa
 * @property string $link_autorizacao
 * @property array $config
 * @property \DateTime $data_inicio
 * @property \DateTime $data_fim
 * @property int $prazo_max_plano_entrega
 * @property int $termo_obrigatorio
 * @property string $periodicidade_consolidacao
 * @property int $periodicidade_valor
 * @property int $dias_tolerancia_consolidacao
 * @property int $dias_tolerancia_avaliacao
 * @property int $dias_tolerancia_recurso_avaliacao
 * @property array $nota_padrao_avaliacao
 * @property array $checklist_avaliacao_entregas_plano_entrega
 * @property array $checklist_avaliacao_entregas_plano_trabalho
 * @property int $registra_comparecimento
 * @property int $plano_trabalho_assinatura_participante
 * @property int $plano_trabalho_assinatura_gestor_unidade
 * @property int $plano_trabalho_assinatura_gestor_lotacao
 * @property int $plano_trabalho_assinatura_gestor_entidade
 * @property array $plano_trabalho_criterios_avaliacao
 * @property string $tipo_documento_tcr_id
 * @property string $tipo_justificativa_id
 * @property string $tipo_avaliacao_plano_trabalho_id
 * @property string $tipo_avaliacao_plano_entrega_id
 * @property string $tipo_avaliacao_id
 * @property string $documento_id
 * @property string $unidade_id
 * @property string $template_tcr_id
 * @property Unidade $unidade
 */
class Programa extends ModelBase
{
  protected $table = 'programas';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'nome', /* varchar(255); NOT NULL; */ // Nome do programa
    'normativa', /* varchar(255); */ // Normativa que regula o programa de gestão
    'link_normativa', /* varchar(255); */ // Link da Normativa que regula o programa de gestão
    'link_autorizacao', /* varchar(255); */ // Link da Normativa que autoriza o programa de gestão
    'config', /* json; */ // Configurações do programa
    'data_inicio', /* datetime; NOT NULL; */ // Inicio da vigência do programa
    'data_fim', /* datetime; NOT NULL; */ // Fim da vigência do programa
    'prazo_max_plano_entrega', /* int; NOT NULL; */ // Limite máximo de dias corridos para o plano de entregas (Zero para não limitar)
    'termo_obrigatorio', /* tinyint; NOT NULL; DEFAULT: '1';*/ // Se o termo é ou não obrigatório
    'periodicidade_consolidacao', /* enum('DIAS','SEMANAL','QUINZENAL','MENSAL','BIMESTRAL','TRIMESTRAL','SEMESTRAL'); NOT NULL; DEFAULT: 'MENSAL'; */ // Período para avaliação do plano de trabalho
    'periodicidade_valor', /* int; NOT NULL; DEFAULT: '1'; */ // Representa quantidade de dias para DIAS; dia da semana para SEMANAL e QUINZENAL; e dia do mês para o restante
    'dias_tolerancia_consolidacao', /* int; NOT NULL; DEFAULT: '10'; */ // Dias de tolerância para o lançamento do registro das atividades na consolidação, após esses dias será liberado automaticamente para avaliação
    'dias_tolerancia_avaliacao', /* int; NOT NULL; DEFAULT: '10'; */ // Dias de tolerância para o lançamento do registro das atividades na consolidação, após esses dias será liberado automaticamente para avaliação
    'dias_tolerancia_recurso_avaliacao', /* int; NOT NULL; DEFAULT: '10'; */ // Dias de tolerância para o lançamento do registro das atividades na consolidação, após esses dias será liberado automaticamente para avaliação
    'nota_padrao_avaliacao',
    'checklist_avaliacao_entregas_plano_entrega',
    'checklist_avaliacao_entregas_plano_trabalho',
    'registra_comparecimento',
    'plano_trabalho_assinatura_participante', /* tinyint; NOT NULL; DEFAULT: '1'; */ // Exigir assinatura do usuário no plano de trabalho
    'plano_trabalho_assinatura_gestor_unidade', /* tinyint; NOT NULL; DEFAULT: '1'; */ // Exigir assinatura do gestor da unidade do plano de trabalho
    'plano_trabalho_assinatura_gestor_lotacao', /* tinyint; NOT NULL; DEFAULT: '1'; */ // Exigir assinatura do gestor da unidade de lotacao do participante do plano de trabalho
    'plano_trabalho_assinatura_gestor_entidade', /* tinyint; NOT NULL; DEFAULT: '1'; */ // Exigir assinatura do gestor da entidade do plano de trabalho
    'plano_trabalho_criterios_avaliacao',
    'tipo_documento_tcr_id', /* char(36); */
    'tipo_justificativa_id', /* char(36); NOT NULL; */
    'tipo_avaliacao_plano_trabalho_id', /* char(36); NOT NULL; */
    'tipo_avaliacao_plano_entrega_id', /* char(36); NOT NULL; */
    'tipo_avaliacao_id', /* char(36); NOT NULL; */
    'documento_id', /* char(36); */
    'unidade_id', /* char(36); NOT NULL; */
    // 'unidade_autorizadora_id', /* char(36); */
    'template_tcr_id', /* char(36); */
    //'deleted_at', /* timestamp; */
    /*'periodo_avaliacao',*/ // REMOVED
  ];

  public $delete_cascade = ['documento', 'participantes'];

  public $fillable_changes = ['participantes'];

  protected $casts = [
    "nota_padrao_avaliacao" => AsJson::class,
    "plano_trabalho_criterios_avaliacao" =>  AsJson::class,
    "checklist_avaliacao_entregas_plano_entrega" => AsJson::class,
    "checklist_avaliacao_entregas_plano_trabalho" => AsJson::class,
  ];

  // HasMany
  public function participantes()
  {
    return $this->hasMany(ProgramaParticipante::class);
  }

  // BelongsTo
  public function documento()
  {
    return $this->belongsTo(Documento::class);
  }
  
  public function tipoDocumentoTcr()
  {
    return $this->belongsTo(TipoDocumento::class, 'tipo_documento_tcr_id');
  }

  public function templateTcr()
  {
    return $this->belongsTo(Template::class, 'template_tcr_id');
  }

  public function unidade(): BelongsTo
  {
      return $this->belongsTo(Unidade::class);
  }

}
