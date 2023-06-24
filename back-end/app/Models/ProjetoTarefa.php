<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Projeto;
use App\Models\Usuario;
use App\Models\Demanda;
use App\Models\ProjetoAlocacao;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;
use App\Casts\AsJson;

class ProjetoTarefa extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'projetos_tarefas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'indice', /* int; NOT NULL; */// Indice da sequencia da tarefa
        'path', /* text; NOT NULL; */// Path dos nós pais
        'nome', /* varchar(256); NOT NULL; */// Nome da tarefa
        'descricao', /* varchar(256); NOT NULL; */// Descricao da tarefa
        'id_processo', /* int; */// ID do processo SEI
        'numero_processo', /* varchar(50); */// Número do processo SEI
        'id_documento', /* int; */// ID do documento SEI
        'numero_documento', /* varchar(50); */// Numero do documento SEI
        'inicio', /* datetime; */// Inicio da tarefa
        'termino', /* datetime; */// Termino da tarefa
        'duracao', /* double(8,2); NOT NULL; */// Duração da atividade. Se a duração for 0 e sintéfico for falso então irá se comportar apenas como um grupo
        'progresso', /* decimal(5,2); NOT NULL; DEFAULT: '0.00'; */// Percentual de progresso da tarefa
        'inicio_marco', /* tinyint; NOT NULL; */// Se o inicio é um marco
        'termino_marco', /* tinyint; NOT NULL; */// Se o termino é um marco
        'tem_filhos', /* tinyint; NOT NULL; */// Se é um registro sintético (resumo)
        'agrupador', /* tinyint; NOT NULL; */// Se é apenas um registro para agrupar tarefas filhas (somente se tem_filhos e não possui progresso)
        'soma_progresso_filhos', /* tinyint; NOT NULL; DEFAULT: '1'; */// Se o progresso é calculado pela média do progresso dos filhos ou lançado manual (somente se tem_filhos)
        'status', /* enum('PLANEJADO','INICIADO','CONCLUIDO','FALHO','SUSPENSO','CANCELADO','AGUARDANDO'); NOT NULL; */// Status
        'contraido', /* tinyint; NOT NULL; */// Se esta contraído
        'custo', /* decimal(15,2); NOT NULL; */// Custo: Será a soma dos recursos, ou a soma dos filhos caso tem_filhos e soma_custos_filhos
        'calcula_intervalo', /* tinyint; NOT NULL; DEFAULT: '1'; */// Se calcula o inicio e termino automaticamente pelos filhos (somente se tem_filhos)
        'aloca_proprios_recursos', /* tinyint; NOT NULL; DEFAULT: '1'; */// Se possui recursos próprios (somente se tem_filhos)
        'soma_recusos_alocados_filhos', /* tinyint; NOT NULL; DEFAULT: '1'; */// Mostra o somatório dos recursos filhos (somente se tem_filhos)
        'custos_proprios', /* tinyint; NOT NULL; DEFAULT: '1'; */// Se possui custos próprios (somente se tem_filhos), se não tem filhos sempre será true
        'soma_custos_filhos', /* tinyint; NOT NULL; DEFAULT: '1'; */// Se possui custos filhos (somente se tem_filhos)
        'projeto_id', /* char(36); NOT NULL; */
        'tarefa_pai_id', /* char(36); */
        'demanda_id', /* char(36); */
        'usuario_id', /* char(36); */
        //'tarefa_projeto_id', /* char(36); */
        //'etiquetas', /* json; */
        //'data_inicio', /* datetime; NOT NULL; DEFAULT: 'CURRENT_TIMESTAMP'; */// Data inicio da vigência
        //'data_fim', /* datetime; */// Data fim da vigência
    ];

    public $fillable_changes = ["alocacoes"];

    public $fillable_relations = [];

    public $delete_cascade = ["alocacoes"];

    // Casting
    protected $casts = [
        'etiquetas' => AsJson::class
    ];

    // Has
    public function alocacoes() { return $this->hasMany(ProjetoAlocacao::class, "tarefa_id"); }    
    // Belongs
    public function projeto() { return $this->belongsTo(Projeto::class); }    
    public function demanda() { return $this->belongsTo(Demanda::class); }    
    public function usuario() { return $this->belongsTo(Usuario::class); }    
    
}