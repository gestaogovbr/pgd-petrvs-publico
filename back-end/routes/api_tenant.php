<?php

use App\Http\Controllers\AfastamentoController;
use App\Http\Controllers\AreaAtividadeExternaController;
use App\Http\Controllers\AreaConhecimentoController;
use App\Http\Controllers\AreaTematicaController;
use App\Http\Controllers\AtividadeController;
use App\Http\Controllers\AtividadeTarefaController;
use App\Http\Controllers\AvaliacaoController;
use App\Http\Controllers\BatchController;
use App\Http\Controllers\CadeiaValorController;
use App\Http\Controllers\CadeiaValorProcessoController;
use App\Http\Controllers\CalendarioController;
use App\Http\Controllers\CapacidadeController;
use App\Http\Controllers\CapacidadeTecnicaController;
use App\Http\Controllers\CargoController;
use App\Http\Controllers\CatalogoController;
use App\Http\Controllers\CentroTreinamentoController;
use App\Http\Controllers\ChangeController;
use App\Http\Controllers\CidadeController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ComparecimentoController;
use App\Http\Controllers\ControllerBase;
use App\Http\Controllers\CurriculumController;
use App\Http\Controllers\CurriculumGraduacaoController;
use App\Http\Controllers\CurriculumProfissionalController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\DisciplinaController;
use App\Http\Controllers\DocumentoController;
use App\Http\Controllers\EixoTematicoController;
use App\Http\Controllers\EntidadeController;
use App\Http\Controllers\EntregaController;
use App\Http\Controllers\EnvioController;
use App\Http\Controllers\EnvioItemController;
use App\Http\Controllers\ErrorController;
use App\Http\Controllers\FeriadoController;
use App\Http\Controllers\FuncaoController;
use App\Http\Controllers\GrupoEspecializadoController;
use App\Http\Controllers\HistoricoAtividadeExternaController;
use App\Http\Controllers\HistoricoAtividadeInternaController;
use App\Http\Controllers\HistoricoCursoExternoController;
use App\Http\Controllers\HistoricoCursoInternoController;
use App\Http\Controllers\HistoricoDocenciaExternaController;
use App\Http\Controllers\HistoricoDocenciaInternaController;
use App\Http\Controllers\HistoricoFuncaoController;
use App\Http\Controllers\HistoricoLotacaoController;
use App\Http\Controllers\ImpersonationController;
use App\Http\Controllers\IntegracaoController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MaterialServicoController;
use App\Http\Controllers\NotificacaoController;
use App\Http\Controllers\OcorrenciaController;
use App\Http\Controllers\PerfilController;
use App\Http\Controllers\PetrvsController;
use App\Http\Controllers\PlanejamentoController;
use App\Http\Controllers\PlanejamentoObjetivoController;
use App\Http\Controllers\PlanoEntregaController;
use App\Http\Controllers\PlanoEntregaEntregaController;
use App\Http\Controllers\PlanoEntregaEntregaProgressoController;
use App\Http\Controllers\PlanoTrabalhoConsolidacaoController;
use App\Http\Controllers\PlanoTrabalhoController;
use App\Http\Controllers\PlanoTrabalhoEntregaController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\ProgramaController;
use App\Http\Controllers\ProgramaParticipanteController;
use App\Http\Controllers\ProjetoController;
use App\Http\Controllers\QuestionarioController;
use App\Http\Controllers\QuestionarioPerguntaController;
use App\Http\Controllers\QuestionarioPerguntaRespostaController;
use App\Http\Controllers\QuestionarioPreenchimentoController;
use App\Http\Controllers\ReacaoController;
use App\Http\Controllers\RelatoController;
use App\Http\Controllers\RelatorioAgenteController;
use App\Http\Controllers\RelatorioController;
use App\Http\Controllers\RelatorioPlanoEntregaController;
use App\Http\Controllers\RelatorioUnidadeController;
use App\Http\Controllers\RotinaDiariaController;
use App\Http\Controllers\SiapeIndividualController;
use App\Http\Controllers\SolucaoController;
use App\Http\Controllers\SolucaoUnidadeController;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\TipoAtividadeController;
use App\Http\Controllers\TipoAvaliacaoController;
use App\Http\Controllers\TipoAvaliacaoNotaController;
use App\Http\Controllers\TipoCapacidadeController;
use App\Http\Controllers\TipoClienteController;
use App\Http\Controllers\TipoCursoController;
use App\Http\Controllers\TipoDocumentoController;

use App\Http\Controllers\TipoJustificativaController;
use App\Http\Controllers\TipoModalidadeController;
use App\Http\Controllers\TipoMotivoAfastamentoController;
use App\Http\Controllers\TipoProcessoController;
use App\Http\Controllers\TipoTarefaController;
use App\Http\Controllers\UnidadeController;
use App\Http\Controllers\UnidadeIntegranteAtribuicaoController;
use App\Http\Controllers\UnidadeIntegranteController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;








/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Rotas utilizadas por todo o sistema.
| ATENÇÃO: As rotas têm o nome do controller em CamelCase e o as actions
| com nome-composto separados por -
*/

$actions = config('petrvs')['actions']['api'];

/* Testes */
Route::get('/teste', function (Request $request) {
  return ["OK"];
});



/* Rotinas diárias */
Route::get('/rotinas-diarias', [RotinaDiariaController::class, 'run']);

/* Login */
Route::post('/login-user-password', [LoginController::class, $actions['login-user-password']]);
Route::post('/login-firebase-token', [LoginController::class, $actions['login-firebase-token']]);
Route::post('/login-google-token', [LoginController::class, $actions['login-google-token']]);
Route::post('/login-institucional', [LoginController::class, $actions['login-institucional']]);
Route::post('/generate-session-token', [LoginController::class, $actions['generate-session-token']]);
Route::get('/logout', [LoginController::class, 'logout']);
Route::middleware(['auth:sanctum'])->post('/horario', [LoginController::class, 'horarioUnidade']);
Route::middleware(['auth:sanctum'])->post('/seleciona-unidade', [LoginController::class, 'selecionaUnidade']);
Route::middleware(['auth:sanctum'])->get('/validate-token', [LoginController::class, 'validateApiToken']);
Route::middleware(['auth:sanctum'])->post('/login-session', [LoginController::class, 'authenticateApiSession']);

/* Geral */
Route::middleware('auth:sanctum')->post('/search-text', [ControllerBase::class, 'searchText']);
Route::middleware('auth:sanctum')->post('/usuarios/query', [UsuarioController::class, 'query']);
Route::get('/integracao', [IntegracaoController::class, 'sincronizar']);
Route::middleware('auth:sanctum')->prefix('Calendario')->group(function () {
  Route::post('feriados', [CalendarioController::class, 'feriados']);
  Route::post('feriados-cadastrados', [CalendarioController::class, 'feriadosCadastrados']);
});
Route::middleware('auth:sanctum')->prefix('Notificacao')->group(function () {
  defaultRoutes(NotificacaoController::class);
  Route::post('nao-lidas', [NotificacaoController::class, 'naoLidas']);
  Route::post('marcar-como-lido', [NotificacaoController::class, 'marcarComoLido']);
});

/* Desenvolvedor */
Route::middleware('auth:sanctum')->prefix('Change')->group(function () {
  Route::post('query', [ChangeController::class, 'query']);
  Route::post('get-by-id', [ChangeController::class, 'getById']);
  Route::post('showResponsaveis', [ChangeController::class, 'showResponsaveis']);
  Route::post('list-models', [ChangeController::class, 'loadModels']);
});
Route::middleware('auth:sanctum')->prefix('Error')->group(function () {
  Route::post('query', [ErrorController::class, 'query']);
  Route::post('get-by-id', [ErrorController::class, 'getById']);
  Route::post('showResponsaveis', [ErrorController::class, 'showResponsaveis']);
});
Route::middleware('auth:sanctum')->prefix('Envio')->group(function () {
  Route::post('query', [EnvioController::class, 'query']);
  Route::post('get-by-id', [EnvioController::class, 'getById']);
});
Route::middleware('auth:sanctum')->prefix('EnvioItem')->group(function () {
  Route::post('query', [EnvioItemController::class, 'query']);
  Route::post('get-by-id', [EnvioItemController::class, 'getById']);
});
Route::middleware('auth:sanctum')->prefix('Traffic')->group(function () {
});
Route::middleware('auth:sanctum')->post('/Petrvs/showTables', [PetrvsController::class, 'showTables']);
Route::middleware(['auth:sanctum'])->prefix('Integracao')->group(function () {
  Route::post('store', [IntegracaoController::class, 'sincronizarPetrvs']);
  Route::post('query', [IntegracaoController::class, 'query']);
  Route::post('destroy', [IntegracaoController::class, 'destroy']);
  Route::post('showResponsaveis', [IntegracaoController::class, 'showResponsaveis']);
  Route::post('get-by-id', [IntegracaoController::class, 'getById']);
  Route::get('busca-processamentos-pendentes', [IntegracaoController::class, 'buscaProcessamentosPendentes']);
});

/* Testes */
//Route::middleware(['auth:sanctum', 'can:ADMINISTRADOR'])->get('/teste', function (Request $request) { return ["OK"]; });

Route::middleware('auth:sanctum')->post('/Teste/calculaDataTempoUnidade', [UsuarioController::class, 'calculaDataTempoUnidade']);

/* Batch */
Route::middleware(['auth:sanctum'])->post('batch', [BatchController::class, 'run']);

/* Modulos: Cadastros */
Route::middleware(['auth:sanctum'])->prefix('Cidade')->group(function () {
  defaultRoutes(CidadeController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Documento')->group(function () {
  defaultRoutes(DocumentoController::class);
  Route::post('pendente-sei', [DocumentoController::class, 'pendenteSei']);
  Route::post('assinar', [DocumentoController::class, 'assinar']);
  Route::get('gerarPDF', [DocumentoController::class, 'gerarPDF']);
});
Route::middleware(['auth:sanctum'])->prefix('EixoTematico')->group(function () {
  defaultRoutes(EixoTematicoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Entrega')->group(function () {
  defaultRoutes(EntregaController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Feriado')->group(function () {
  defaultRoutes(FeriadoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('MaterialServico')->group(function () {
  defaultRoutes(MaterialServicoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('PlanejamentoObjetivo')->group(function () {
  defaultRoutes(PlanejamentoObjetivoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Programa')->group(function () {
  defaultRoutes(ProgramaController::class);
  Route::post('concluir', [ProgramaController::class, 'concluir']);
});
Route::middleware(['auth:sanctum'])->prefix('ProgramaParticipante')->group(function () {
  defaultRoutes(ProgramaParticipanteController::class);
  Route::post('quantidade-planos-trabalho-ativos', [ProgramaParticipanteController::class, 'quantidadePlanosTrabalhoAtivos']);
  Route::post('habilitar', [ProgramaParticipanteController::class, 'habilitar']);
  Route::post('notificar', [ProgramaParticipanteController::class, 'notificar']);
});
Route::middleware(['auth:sanctum'])->prefix('TipoTarefa')->group(function () {
  defaultRoutes(TipoTarefaController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Template')->group(function () {
  defaultRoutes(TemplateController::class);
  Route::post('teste', [TemplateController::class, 'teste']);
  Route::post('gera-relatorio', [TemplateController::class, 'geraRelatorio']);
  Route::post('carrega-dataset', [TemplateController::class, 'carregaDataset']);
});
Route::middleware(['auth:sanctum'])->prefix('CadeiaValor')->group(function () {
  defaultRoutes(CadeiaValorController::class);
});
Route::middleware(['auth:sanctum'])->prefix('CadeiaValorProcesso')->group(function () {
  defaultRoutes(CadeiaValorProcessoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('TipoAtividade')->group(function () {
  defaultRoutes(TipoAtividadeController::class);
});
Route::middleware(['auth:sanctum'])->prefix('TipoJustificativa')->group(function () {
  defaultRoutes(TipoJustificativaController::class);
});
Route::middleware(['auth:sanctum'])->prefix('TipoAvaliacao')->group(function () {
  defaultRoutes(TipoAvaliacaoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('TipoAvaliacaoNota')->group(function () {
  Route::post('query', [TipoAvaliacaoNotaController::class, 'query']);
});
Route::middleware(['auth:sanctum'])->prefix('TipoModalidade')->group(function () {
  defaultRoutes(TipoModalidadeController::class);
});
Route::middleware(['auth:sanctum'])->prefix('TipoMotivoAfastamento')->group(function () {
  defaultRoutes(TipoMotivoAfastamentoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('TipoCapacidade')->group(function () {
  defaultRoutes(TipoCapacidadeController::class);
});
Route::middleware(['auth:sanctum'])->prefix('TipoDocumento')->group(function () {
  defaultRoutes(TipoDocumentoController::class);
  Route::post('atualizar', [TipoDocumentoController::class, 'atualizar']);
});
Route::middleware(['auth:sanctum'])->prefix('TipoProcesso')->group(function () {
  defaultRoutes(TipoProcessoController::class);
  Route::post('atualizar', [TipoProcessoController::class, 'atualizar']);
});

/* Modulos: Gestão */
Route::middleware(['auth:sanctum'])->prefix('Afastamento')->group(function () {
  defaultRoutes(AfastamentoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Ocorrencia')->group(function () {
  defaultRoutes(OcorrenciaController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Atividade')->group(function () {
  defaultRoutes(AtividadeController::class);
  Route::post('prazo', [AtividadeController::class, 'prazo']);
  Route::post('iniciadas', [AtividadeController::class, 'iniciadas']);
  Route::post('iniciar', [AtividadeController::class, 'iniciar']);
  Route::post('cancelar-inicio', [AtividadeController::class, 'cancelarInicio']);
  Route::post('concluir', [AtividadeController::class, 'concluir']);
  Route::post('cancelar-conclusao', [AtividadeController::class, 'cancelarConclusao']);
  Route::post('pausar', [AtividadeController::class, 'pausar']);
  Route::post('reiniciar', [AtividadeController::class, 'reiniciar']);
  Route::post('prorrogar', [AtividadeController::class, 'prorrogar']);
  Route::post('arquivar', [AtividadeController::class, 'arquivar']);
  Route::post('hierarquia', [AtividadeController::class, 'hierarquia']);
});
Route::middleware(['auth:sanctum'])->prefix('AtividadeTarefa')->group(function () {
  defaultRoutes(AtividadeTarefaController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Avaliacao')->group(function () {
  defaultRoutes(AvaliacaoController::class);
  Route::post('cancelar-avaliacao', [AvaliacaoController::class, 'cancelarAvaliacao']);
  Route::post('recorrer', [AvaliacaoController::class, 'recorrer']);
});
Route::middleware(['auth:sanctum'])->prefix('Planejamento')->group(function () {
  defaultRoutes(PlanejamentoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('PlanoTrabalho')->group(function () {
  defaultRoutes(PlanoTrabalhoController::class);
  Route::post('cancelar-plano', [PlanoTrabalhoController::class, 'cancelarPlano']);
  Route::post('cancelar-assinatura', [PlanoTrabalhoController::class, 'cancelarAssinatura']);
  Route::post('cancelar-avaliacao', [PlanoTrabalhoController::class, 'cancelarAvaliacao']);
  Route::post('ativar', [PlanoTrabalhoController::class, 'ativar']);
  Route::post('reativar', [PlanoTrabalhoController::class, 'reativar']);
  Route::post('suspender', [PlanoTrabalhoController::class, 'suspender']);
  Route::post('arquivar', [PlanoTrabalhoController::class, 'arquivar']);
  Route::post('enviar-para-assinatura', [PlanoTrabalhoController::class, 'enviarParaAssinatura']);
  Route::post('metadados-plano', [PlanoTrabalhoController::class, 'metadadosPlano']);
  Route::post('get-by-usuario', [PlanoTrabalhoController::class, 'getByUsuario']);
});
Route::middleware(['auth:sanctum'])->prefix('Comparecimento')->group(function () {
  defaultRoutes(ComparecimentoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('PlanoTrabalhoEntrega')->group(function () {
  defaultRoutes(PlanoTrabalhoEntregaController::class);
});
Route::middleware(['auth:sanctum'])->prefix('PlanoTrabalhoConsolidacao')->group(function () {
  defaultRoutes(PlanoTrabalhoConsolidacaoController::class);
  Route::post('consolidacao-dados', [PlanoTrabalhoConsolidacaoController::class, 'consolidacaoDados']);
  Route::post('concluir', [PlanoTrabalhoConsolidacaoController::class, 'concluir']);
  Route::post('cancelar-conclusao', [PlanoTrabalhoConsolidacaoController::class, 'cancelarConclusao']);
});
Route::middleware(['auth:sanctum'])->prefix('PlanoEntrega')->group(function () {
  defaultRoutes(PlanoEntregaController::class);
  Route::post('arquivar', [PlanoEntregaController::class, 'arquivar']);
  Route::post('cancelar-avaliacao', [PlanoEntregaController::class, 'cancelarAvaliacao']);
  Route::post('cancelar-conclusao', [PlanoEntregaController::class, 'cancelarConclusao']);
  Route::post('cancelar-homologacao', [PlanoEntregaController::class, 'cancelarHomologacao']);
  Route::post('cancelar-plano', [PlanoEntregaController::class, 'cancelarPlano']);
  Route::post('concluir', [PlanoEntregaController::class, 'concluir']);
  Route::post('desativar', [PlanoEntregaController::class, 'desativar']);
  Route::post('homologar', [PlanoEntregaController::class, 'homologar']);
  Route::post('liberar-homologacao', [PlanoEntregaController::class, 'liberarHomologacao']);
  Route::post('reativar', [PlanoEntregaController::class, 'reativar']);
  Route::post('retirar-homologacao', [PlanoEntregaController::class, 'retirarHomologacao']);
  Route::post('suspender', [PlanoEntregaController::class, 'suspender']);
  Route::post('planos-impactados-por-alteracao-entrega', [PlanoEntregaController::class, 'planosImpactadosPorAlteracaoEntrega']);
  Route::post('permissao-incluir', [PlanoEntregaController::class, 'permissaoIncluir']);
});
Route::middleware(['auth:sanctum'])->prefix('PlanoEntregaEntrega')->group(function () {
  defaultRoutes(PlanoEntregaEntregaController::class);
  Route::post('hierarquia', [PlanoEntregaEntregaController::class, 'hierarquia']);
  Route::post('possui-vinculos-excluidos', [PlanoEntregaEntregaController::class, 'possuiVinculosExcluidos']);
});

Route::middleware(['auth:sanctum'])->prefix('Projeto')->group(function () {
  defaultRoutes(ProjetoController::class);
});

/* Modulos: Configurações */
Route::middleware(['auth:sanctum'])->prefix('Usuario')->group(function () {
  defaultRoutes(UsuarioController::class);
  Route::post('atualiza-pedagio', [UsuarioController::class, 'atualizaPedagio']);
  Route::post('remove-pedagio', [UsuarioController::class, 'removerPedagio']);
});
Route::middleware(['auth:sanctum'])->prefix('Perfil')->group(function () {
  defaultRoutes(PerfilController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Entidade')->group(function () {
  defaultRoutes(EntidadeController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Unidade')->group(function () {
  defaultRoutes(UnidadeController::class);
  Route::post('metadados-area', [UnidadeController::class, 'metadadosArea']);
  Route::post('mesma-sigla', [UnidadeController::class, 'mesmaSigla']);
  Route::post('unificar', [UnidadeController::class, 'unificar']);
  Route::post('dashboards', [UnidadeController::class, 'dashboards']);
  Route::post('inativar', [UnidadeController::class, 'inativar']);
  Route::post('lotados', [UnidadeController::class, 'lotados']);
  Route::post('hierarquia', [UnidadeController::class, 'hierarquia']);
  Route::post('filhas', [UnidadeController::class, 'filhas']);
  Route::post('subordinadas', [UnidadeController::class, 'subordinadas']);
  Route::post('linhaAscendente', [UnidadeController::class, 'linhaAscendente']);
  Route::post('lookup-todas-unidades', [UnidadeController::class, 'lookupTodasUnidades']);
  Route::post('obter-instituidora', [UnidadeController::class, 'obterInstitudora']);
});
Route::middleware(['auth:sanctum'])->prefix('UnidadeIntegrante')->group(function () {
  Route::post('carregar-integrantes', [UnidadeIntegranteController::class, 'carregarIntegrantes']);
  Route::post('salvar-integrantes', [UnidadeIntegranteController::class, 'salvarIntegrantes']);
});
Route::middleware(['auth:sanctum'])->prefix('UnidadeIntegranteAtribuicao')->group(function () {
  Route::post('destroy', [UnidadeIntegranteAtribuicaoController::class, 'destroy']);
});
Route::middleware(['auth:sanctum'])->prefix('Capacidade')->group(function () {
  defaultRoutes(CapacidadeController::class);
});

/* Modulos: Curriculum */
Route::middleware(['auth:sanctum'])->prefix('AreaConhecimento')->group(function () {
  defaultRoutes(AreaConhecimentoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('AreaAtividadeExterna')->group(function () {
  defaultRoutes(AreaAtividadeExternaController::class);
});
Route::middleware(['auth:sanctum'])->prefix('AreaTematica')->group(function () {
  defaultRoutes(AreaTematicaController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Curso')->group(function () {
  defaultRoutes(CursoController::class);
  Route::post('id-institucional', [CursoController::class, 'idInstitucional']);
});
Route::middleware(['auth:sanctum'])->prefix('CapacidadeTecnica')->group(function () {
  defaultRoutes(CapacidadeTecnicaController::class);
});
Route::middleware(['auth:sanctum'])->prefix('TipoCurso')->group(function () {
  defaultRoutes(TipoCursoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Disciplina')->group(function () {
  defaultRoutes(DisciplinaController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Curriculum')->group(function () {
  defaultRoutes(CurriculumController::class);
  Route::post('lookups-curriculum', [CurriculumController::class, 'lookupsCurriculum']);
});
Route::middleware(['auth:sanctum'])->prefix('CurriculumGraduacao')->group(function () {
  defaultRoutes(CurriculumGraduacaoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('CurriculumProfissional')->group(function () {
  defaultRoutes(CurriculumProfissionalController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Funcao')->group(function () {
  defaultRoutes(FuncaoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('CentroTreinamento')->group(function () {
  defaultRoutes(CentroTreinamentoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('GrupoEspecializado')->group(function () {
  defaultRoutes(GrupoEspecializadoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Cargo')->group(function () {
  defaultRoutes(CargoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Questionario')->group(function () {
  defaultRoutes(QuestionarioController::class);
});
Route::middleware(['auth:sanctum'])->prefix('QuestionarioPreenchimento')->group(function () {
  defaultRoutes(QuestionarioPreenchimentoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('QuestionarioPergunta')->group(function () {
  defaultRoutes(QuestionarioPerguntaController::class);
});
Route::middleware(['auth:sanctum'])->prefix('QuestionarioPerguntaResposta')->group(function () {
  defaultRoutes(QuestionarioPerguntaRespostaController::class);
});
Route::middleware(['auth:sanctum'])->prefix('HistoricoAtividadeExternaProfissional')->group(function () {
  defaultRoutes(HistoricoAtividadeExternaController::class);
});
Route::middleware(['auth:sanctum'])->prefix('HistoricoAtividadeInternaProfissional')->group(function () {
  defaultRoutes(HistoricoAtividadeInternaController::class);
});
Route::middleware(['auth:sanctum'])->prefix('HistoricoCursoExternoProfissional')->group(function () {
  defaultRoutes(HistoricoCursoExternoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('HistoricoCursoInternoProfissional')->group(function () {
  defaultRoutes(HistoricoCursoInternoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('HistoricoDocenciaExternaProfissional')->group(function () {
  defaultRoutes(HistoricoDocenciaExternaController::class);
});
Route::middleware(['auth:sanctum'])->prefix('HistoricoDocenciaInternaProfissional')->group(function () {
  defaultRoutes(HistoricoDocenciaInternaController::class);
});
Route::middleware(['auth:sanctum'])->prefix('HistoricoFuncaoProfissional')->group(function () {
  defaultRoutes(HistoricoFuncaoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('HistoricoLotacaoProfissional')->group(function () {
  defaultRoutes(HistoricoLotacaoController::class);
});

Route::middleware(['auth:sanctum'])->prefix('Reacao')->group(function () {
  defaultRoutes(ReacaoController::class);
});

Route::middleware(['auth:sanctum'])->prefix('PlanoEntregaEntregaProgresso')->group(function () {
  defaultRoutes(PlanoEntregaEntregaProgressoController::class);
});

Route::middleware(['auth:sanctum'])->prefix('Relato')->group(function () {
  Route::post('store', [RelatoController::class, 'store']);
  Route::get('confirmar/{email}/{nome}', [RelatoController::class, 'confirmar']);
});
Route::middleware(['auth:sanctum'])->prefix('Produto')->group(function () {
  defaultRoutes(ProdutoController::class);
  Route::post('ativar-todos', [ProdutoController::class, 'atribuirTodos']);
  Route::post('desativar-todos', [ProdutoController::class, 'desatribuirTodos']);
});
Route::middleware(['auth:sanctum'])->prefix('Catalogo')->group(function () {
    defaultRoutes(CatalogoController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Solucao')->group(function () {
    defaultRoutes(SolucaoController::class);
    Route::post('ativar-todos', [SolucaoController::class, 'atribuirTodos']);
    Route::post('desativar-todos', [SolucaoController::class, 'desatribuirTodos']);
});
Route::middleware(['auth:sanctum'])->prefix('TipoCliente')->group(function () {
  defaultRoutes(TipoClienteController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Cliente')->group(function () {
  defaultRoutes(ClienteController::class);
});
Route::middleware(['auth:sanctum'])->prefix('Relato')->group(function () {
  Route::post('store', [RelatoController::class, 'store']);
  Route::get('confirmar/{email}/{nome}', [RelatoController::class, 'confirmar']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/usuario/consultar-cpf-siape', [UsuarioController::class, 'consultarCPFSiape']);
    Route::post('/usuario/exportar-cpf-siape', [UsuarioController::class, 'exportarCPFSiape']);
    Route::post('/usuario/download-cpf-siape', [UsuarioController::class, 'downloadLogSiape']);
    Route::post('/unidade/consultar-unidade-siape', [UnidadeController::class, 'consultaUnidadeSiape']);
    Route::post('/unidade/exportar-unidade-siape', [UnidadeController::class, 'exportarUnidadeSiape']);
    Route::post('/unidade/download-unidade-siape', [UnidadeController::class, 'downloadLogSiape']);
    Route::post('/usuario/processar-siape', [SiapeIndividualController::class, 'processaServidor']);
    Route::post('/unidade/processar-siape', [SiapeIndividualController::class, 'processaUnidade']);

    Route::prefix('SolucaoUnidade')->group(function () {
        defaultRoutes(SolucaoUnidadeController::class);
    });
});

Route::middleware(['auth:sanctum'])->prefix('Relatorio')->group(function () {
    Route::post('planos-trabalho/query', [RelatorioController::class, 'queryPlanosTrabalho']);
    //Route::post('planos-trabalho/csv', [RelatorioController::class, 'queryPlanosTrabalho']);
    Route::post('planos-trabalho/xls', [RelatorioController::class, 'queryPlanosTrabalho']);

    Route::post('planos-trabalho-detalhado/query', [RelatorioController::class, 'queryPlanosTrabalhoDetalhado']);
    //Route::post('planos-trabalho-detalhado/csv', [RelatorioController::class, 'queryPlanosTrabalhoDetalhado']);
    Route::post('planos-trabalho-detalhado/xls', [RelatorioController::class, 'queryPlanosTrabalhoDetalhado']);

    Route::post('planos-entrega/query', [RelatorioPlanoEntregaController::class, 'query']);
    Route::post('planos-entrega/xls', [RelatorioPlanoEntregaController::class, 'query']);
});

Route::middleware(['auth:sanctum'])->prefix('RelatorioAgente')->group(function () {
    Route::post('query', [RelatorioAgenteController::class, 'query']);
    Route::post('xls', [RelatorioAgenteController::class, 'query']);
});

Route::middleware(['auth:sanctum'])->prefix('RelatorioUnidade')->group(function () {
    Route::post('query', [RelatorioUnidadeController::class, 'query']);
    Route::post('xls', [RelatorioUnidadeController::class, 'query']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/impersonate', [ImpersonationController::class, 'impersonate'])
        ->middleware('auth:sanctum')
        ->name('impersonate');
  Route::get('/impersonate/stop', [ImpersonationController::class, 'stopImpersonating'])->name('impersonate.stop');
});

Route::middleware(['auth:sanctum'])->prefix('Relatorio')->group(function () {
    Route::post('planos-trabalho/query', [RelatorioController::class, 'queryPlanosTrabalho']);
    Route::post('planos-trabalho/csv', [RelatorioController::class, 'queryPlanosTrabalho']);
    Route::post('planos-trabalho/xls', [RelatorioController::class, 'queryPlanosTrabalho']);

    Route::post('planos-trabalho-detalhado/query', [RelatorioController::class, 'queryPlanosTrabalhoDetalhado']);
    Route::post('planos-trabalho-detalhado/csv', [RelatorioController::class, 'queryPlanosTrabalhoDetalhado']);
    Route::post('planos-trabalho-detalhado/xls', [RelatorioController::class, 'queryPlanosTrabalhoDetalhado']);
});
