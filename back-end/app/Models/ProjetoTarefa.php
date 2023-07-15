<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Projeto;
use App\Models\Usuario;
use App\Models\Demanda;
use App\Models\ProjetoAlocacao;
use App\Casts\AsJson;

class ProjetoTarefa extends ModelBase
{
    protected $table = 'projetos_tarefas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'indice', /* int; NOT NULL; */// Indice da sequencia da tarefa
        'path', /* text; NOT NULL; */// Path dos nós pais
        'nome', /* varchar(256); NOT NULL; */// Nome da tarefa
        'descricao', /* varchar(256); NOT NULL; */// Descricao da tarefa
        'inicio', /* datetime; */// Inicio da tarefa
        'termino', /* datetime; */// Fim da tarefa
        'inicio_baseline', /* datetime; */// Inicio do projeto (Baseline)
        'termino_baseline', /* datetime; */// Fim do projeto (Baseline)
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
        'soma_custos_filhos', /* tinyint; NOT NULL; DEFAULT: '1'; */// Mostra o somatório dos custos filhos (somente se tem_filhos)
        'projeto_id', /* char(36); NOT NULL; */
        'tarefa_pai_id', /* char(36); */
        'usuario_id', /* char(36); */
        //'deleted_at', /* timestamp; */
        //'etiquetas', /* json; */// Etiquetas
        //'documento_id', /* char(36); */
        //'tarefa_projeto_id', /* char(36); */
        //'atividade_id', /* char(36); */
    ];

    public $fillable_changes = ["alocacoes"];

    public $fillable_relations = [];

    public $delete_cascade = ["alocacoes"];

    // Casting
    protected $casts = [
        'etiquetas' => AsJson::class
    ];

    // Has
    public function alocacoes() { return $this->hasMany(ProjetoAlocacao::class, "tarefa_id"); }   //OK// 
    public function tarefas() { return $this->hasMany(ProjetoTarefa::class, "tarefa_pai_id"); }   //OK// 
    public function comentarios() { return $this->hasMany(Comentario::class); }   //OK// 
    // Belongs
    public function projeto() { return $this->belongsTo(Projeto::class); }   //OK// 
    public function tarefaProjeto() { return $this->belongsTo(Projeto::class, 'tarefa_projeto_id'); }   //OK//  //nullable
    public function documento() { return $this->belongsTo(Documento::class); }    //OK//    //nullable
    public function atividade() { return $this->belongsTo(Atividade::class); }    //OK//    //nullable
    public function usuario() { return $this->belongsTo(Usuario::class); }    //OK//    //nullable
    public function tarefaPai() { return $this->belongsTo(ProjetoTarefa::class); }    //OK//   //nullable
}