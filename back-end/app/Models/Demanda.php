<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\DemandaPausa;
use App\Models\DemandaVinculo;
use App\Models\DemandaAvaliacao;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\Atividade;
use App\Models\Anexo;
use App\Models\TipoDocumento;
use App\Models\Plano;
use App\Models\Comentario;
use App\Models\DemandaEntrega;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


class Demanda extends ModelBase
{
    protected $table = 'demandas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'numero', /* int; NOT NULL; */// Número da demanda (Gerado pelo sistema)
        'id_requisicao', /* int; */// ID da requisição do sistema integrado, caso seja o Sei será o ID_Documento
        'numero_requisicao', /* varchar(11); */// Numero do documento de requisição, caso seja o Sei é o numero Sei
        'id_processo', /* int; */// ID do processo, caso seja Sei será o ID do procedimento
        'numero_processo', /* varchar(50); */// Número do processo, com a formatação de origem
        'assunto', /* text; */// Assunto da demanda
        'data_distribuicao', /* datetime; NOT NULL; */// Data de cadastro da demanda
        'tempo_planejado', /* double(8,2); NOT NULL; */// Diferença entre data_distribuicao e prazo_entrega em horas (úteis ou corridas, configurada na unidade)
        'carga_horaria', /* double(8,2); */// Carga horária que será utilizada para todos os cálculos (vinda do plano de trabalho)
        'prazo_entrega', /* datetime; NOT NULL; */// Data estipulada para entrega da demanda
        'data_inicio', /* datetime; */// Data em que o usuário iniciou a atividade
        'data_entrega', /* datetime; */// Data da entrega
        'tempo_pactuado', /* double(8,2); NOT NULL; */// Tempo calculado a partir da atividade e utilizando o fator_complexidade
        'fator_complexidade', /* double(8,2); NOT NULL; DEFAULT: '1.00'; */// Multiplicador do tempo da atividade
        'tempo_despendido', /* double(8,2); */// Calculado no fim da demanda, sendo o tempo líquido (considerando pausas)
        'id_processo_entrega', /* int; */// ID do processo de entrega, caso seja Sei será o ID do procedimento
        'numero_processo_entrega', /* varchar(50); */// Número do processo de entrega, com a formatação de origem
        'id_documento_entrega', /* int; */// ID da entrega, caso seja o Sei será o ID_Documento
        'numero_documento_entrega', /* varchar(11); */// Numero do documento de entrega, caso seja o Sei é o numero Sei
        'titulo_documento_entrega', /* text; */// Numeração do tipo de documento no sistema integrado
        'data_arquivamento', /* datetime; */// Data de arquivamento da demanda
        'tempo_homologado', /* double(8,2); */// Caso a avaliação seja positiva será igual ao tempo pactuado
        'produtividade', /* double(8,2); */// Diferença entre o tempo pactuado e o despendido
        'etiquetas', /* json; */// Etiquetas
        'checklist', /* json; */// Checklist
        'prioridade', /* int; */// Nível de prioridade
        'recalcula_prazo', /* tinyint; NOT NULL; */// Recalcula data de entrega baseado nos dias planejado
        'atividade_id', /* char(36); */
        'demandante_id', /* char(36); NOT NULL; */
        'usuario_id', /* char(36); */
        'unidade_id', /* char(36); NOT NULL; */
        'tipo_documento_requisicao_id', /* char(36); */
        'tipo_documento_entrega_id', /* char(36); */
        'avaliacao_id', /* char(36); */
        'plano_id', /* char(36); */
        'tipo_processo_id', /* char(36); */
    ];

    public $fillable_changes = [
        'comentarios',
        'entregas'
    ];

    protected static function booted()
    {
        static::creating(function ($demanda) {
            $demanda->numero = DB::select("CALL sequence_demanda_numero()")[0]->number;
        }); 
    }

    public $delete_cascade = ['entregas', 'pausas', 'vinculos', 'avaliacoes', 'comentarios'];

    // Casting
    protected $casts = [
        'etiquetas' => AsJson::class,
        'checklist' => AsJson::class
    ];

    // Has
    public function entregas() { return $this->hasMany(DemandaEntrega::class); }    
    //public function anexos() { return $this->hasMany(Anexo::class); }
    public function pausas() { return $this->hasMany(DemandaPausa::class); }
    public function vinculos() { return $this->hasMany(DemandaVinculo::class); }
    public function avaliacoes() { return $this->hasMany(DemandaAvaliacao::class); }    
    public function comentarios() { return $this->hasMany(Comentario::class); }    
    // Belongs
    public function atividade() { return $this->belongsTo(Atividade::class); }
    public function demandante() { return $this->belongsTo(Usuario::class); }    
    public function usuario() { return $this->belongsTo(Usuario::class); }    
    public function unidade() { return $this->belongsTo(Unidade::class); }    
    public function tipoDocumentoRequisicao() { return $this->belongsTo(TipoDocumento::class, 'tipo_documento_requisicao_id'); }    
    public function tipoDocumentoEntrega() { return $this->belongsTo(TipoDocumento::class, 'tipo_documento_entrega_id'); }    
    public function avaliacao() { return $this->belongsTo(DemandaAvaliacao::class); }    
    public function plano() { return $this->belongsTo(Plano::class); }    

    // Escopos
    public function scopeDoUsuario($query, $usuario_id) { return $query->where("usuario_id", $usuario_id); }
    public function scopeDosPlanos($query, $planos_ids) { return $query->whereIn("plano_id", $planos_ids); }
    public function scopeAvaliadas($query) { return $query->whereNotNull("avaliacao_id"); }
    public function scopeNaoIniciadas($query) { return $query->whereNull('data_inicio'); }
    public function scopeConcluidas($query) { return $query->whereNotNull('data_entrega'); }
    public function scopeNaoConcluidas($query) { return $query->whereNotNull('data_inicio')->whereNull('data_entrega'); }
    public function scopeAtrasadas($query){ return $query->whereNotNull('data_inicio')->whereNull('data_entrega')->whereDate('prazo_entrega', '<', Carbon::today()); }

}
