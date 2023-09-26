<?php

use App\Http\Controllers\AdesaoController;
use App\Http\Controllers\CadeiaValorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\IntegracaoController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\PerfilController;
use App\Http\Controllers\ControllerBase;
use App\Http\Controllers\EntidadeController;
use App\Http\Controllers\UnidadeController;
use App\Http\Controllers\CidadeController;
use App\Http\Controllers\ChangeController;
use App\Http\Controllers\EntregaController;
use App\Http\Controllers\EixoTematicoController;
use App\Http\Controllers\ErrorController;
use App\Http\Controllers\ProgramaController;
use App\Http\Controllers\ProgramaParticipanteController;
use App\Http\Controllers\PlanejamentoController;
use App\Http\Controllers\PlanejamentoObjetivoController;
use App\Http\Controllers\PlanoTrabalhoController;
use App\Http\Controllers\PlanoEntregaController;
use App\Http\Controllers\PlanoEntregaEntregaController;
use App\Http\Controllers\PetrvsController;
use App\Http\Controllers\DocumentoController;
use App\Http\Controllers\TipoAvaliacaoController;
use App\Http\Controllers\TipoDocumentoController;
use App\Http\Controllers\TipoProcessoController;
use App\Http\Controllers\TipoJustificativaController;
use App\Http\Controllers\TipoAtividadeController;
use App\Http\Controllers\TipoMotivoAfastamentoController;
use App\Http\Controllers\TipoModalidadeController;
use App\Http\Controllers\TipoCapacidadeController;
use App\Http\Controllers\CapacidadeController;
use App\Http\Controllers\FeriadoController;
use App\Http\Controllers\AfastamentoController;
use App\Http\Controllers\CadeiaValorProcessoController;
use App\Http\Controllers\AtividadeController;
use App\Http\Controllers\CalendarioController;
use App\Http\Controllers\TipoTarefaController;
use App\Http\Controllers\MaterialServicoController;
use App\Http\Controllers\ProjetoController;
use App\Http\Controllers\RotinaDiariaController;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\AreaConhecimentoController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\TipoCursoController;
use App\Http\Controllers\CurriculumController;
use App\Http\Controllers\CurriculumGraduacaoController;
use App\Http\Controllers\CentroTreinamentoController;
use App\Http\Controllers\FuncaoController;
use App\Http\Controllers\GrupoEspecializadoController;
use App\Http\Controllers\CargoController;
use App\Http\Controllers\NotificacaoController;
use App\Http\Controllers\PlanoTrabalhoEntregaController;
use App\Http\Controllers\PlanoTrabalhoConsolidacaoController;
use App\Http\Controllers\UnidadeIntegranteController;
use App\Http\Controllers\UnidadeIntegranteAtribuicaoController;
use App\Http\Controllers\MateriaController;
use App\Http\Controllers\CurriculumProfissionalController;
use App\Http\Controllers\AreaAtividadeExternaController;
use App\Http\Controllers\AreaTematicaController;
use App\Http\Controllers\AtividadeTarefaController;
use App\Http\Controllers\CapacidadeTecnicaController;
use App\Http\Controllers\HistoricoAtividadeExternaCurriculumController;
use App\Http\Controllers\HistoricoAtividadeInternaCurriculumController;
use App\Http\Controllers\HistoricoCursoExternoCurriculumController;
use App\Http\Controllers\HistoricoCursoInternoCurriculumController;
use App\Http\Controllers\HistoricoDocenciaExternaCurriculumController;
use App\Http\Controllers\HistoricoDocenciaInternaCurriculumController;
use App\Http\Controllers\HistoricoFuncaoCurriculumController;
use App\Http\Controllers\HistoricoLotacaoCurriculumController;
use App\Http\Controllers\PlanoTrabalhoConsolidacaoOcorrenciaController;
use App\Http\Controllers\ComparecimentoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Rotas utilizadas por todo o sistema.
| ATENÇÃO: As rotas têm o nome do controller em CamelCase e o as actions
| com nome-composto separados por -
*/

function defaultRoutes($controllerClass, $capacidades = []) {
    Route::post('search-text', [$controllerClass, 'searchText']);
    Route::post('search-key', [$controllerClass, 'searchKey']);
    Route::post('store', [$controllerClass, 'store']);
    Route::post('update', [$controllerClass, 'update']);
    Route::post('update-json', [$controllerClass, 'updateJson']);
    Route::post('destroy', [$controllerClass, 'destroy']);
    Route::post('get-by-id', [$controllerClass, 'getById']);
    Route::post('get-all-ids', [$controllerClass, 'getAllIds']);
    Route::post('query', [$controllerClass, 'query']);
    Route::post('upload', [$controllerClass, 'upload']);
    Route::post('download-url', [$controllerClass, 'downloadUrl']);
    Route::post('delete-file', [$controllerClass, 'deleteFile']);
}
$actions = config('petrvs')['actions']['api'];

/* Testes */
Route::get('/teste', function (Request $request) { return ["OK"]; });

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
});
Route::middleware('auth:sanctum')->prefix('Error')->group(function () {
    Route::post('query', [ErrorController::class, 'query']);
    Route::post('get-by-id', [ErrorController::class, 'getById']);
    Route::post('showResponsaveis', [ErrorController::class, 'showResponsaveis']);
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
});

/* Testes */
//Route::middleware(['auth:sanctum', 'can:ADMINISTRADOR'])->get('/teste', function (Request $request) { return ["OK"]; });
Route::get('/teste', function (Request $request) { return ["OK"]; });
Route::middleware('auth:sanctum')->post('/Teste/calculaDataTempoUnidade', [UsuarioController::class, 'calculaDataTempoUnidade']);
//Route::middleware(['auth:sanctum', 'can:ADMINISTRADOR'])->get('/teste', function (Request $request) { return ["OK"]; });

/* Modulos: Cadastros */
Route::middleware(['auth:sanctum'])->prefix('Afastamento')->group(function () { defaultRoutes(AfastamentoController::class); });
Route::middleware(['auth:sanctum'])->prefix('Cidade')->group(function () { defaultRoutes(CidadeController::class); });
Route::middleware(['auth:sanctum'])->prefix('Documento')->group(function () {
    defaultRoutes(DocumentoController::class);
    Route::post('pendente-sei', [DocumentoController::class, 'pendenteSei']);
    Route::post('assinar', [DocumentoController::class, 'assinar']);
});
Route::middleware(['auth:sanctum'])->prefix('EixoTematico')->group(function () { defaultRoutes(EixoTematicoController::class); });
Route::middleware(['auth:sanctum'])->prefix('Entrega')->group(function () { defaultRoutes(EntregaController::class); });
Route::middleware(['auth:sanctum'])->prefix('Feriado')->group(function () { defaultRoutes(FeriadoController::class); });
Route::middleware(['auth:sanctum'])->prefix('MaterialServico')->group(function () { defaultRoutes(MaterialServicoController::class); });
Route::middleware(['auth:sanctum'])->prefix('PlanejamentoObjetivo')->group(function () { defaultRoutes(PlanejamentoObjetivoController::class); });
Route::middleware(['auth:sanctum'])->prefix('Programa')->group(function () { 
    //Route::post('assinaturas-exigidas', [ProgramaController::class, 'assinaturasExigidas']);
    defaultRoutes(ProgramaController::class);
 });
Route::middleware(['auth:sanctum'])->prefix('ProgramaParticipante')->group(function () {
     defaultRoutes(ProgramaParticipanteController::class); 
     Route::post('habilitar', [ProgramaParticipanteController::class, 'habilitar']);
     Route::post('notificar', [ProgramaParticipanteController::class, 'notificar']);
});
Route::middleware(['auth:sanctum'])->prefix('TipoTarefa')->group(function () { defaultRoutes(TipoTarefaController::class); });
Route::middleware(['auth:sanctum'])->prefix('Template')->group(function () { defaultRoutes(TemplateController::class); });
Route::middleware(['auth:sanctum'])->prefix('CadeiaValor')->group(function () { defaultRoutes(CadeiaValorController::class); });
Route::middleware(['auth:sanctum'])->prefix('CadeiaValorProcesso')->group(function () { defaultRoutes(CadeiaValorProcessoController::class); });
Route::middleware(['auth:sanctum'])->prefix('TipoAtividade')->group(function () { defaultRoutes(TipoAtividadeController::class); });
Route::middleware(['auth:sanctum'])->prefix('TipoJustificativa')->group(function () { defaultRoutes(TipoJustificativaController::class); });
Route::middleware(['auth:sanctum'])->prefix('TipoAvaliacao')->group(function () { defaultRoutes(TipoAvaliacaoController::class); });
Route::middleware(['auth:sanctum'])->prefix('TipoModalidade')->group(function () { defaultRoutes(TipoModalidadeController::class); });
Route::middleware(['auth:sanctum'])->prefix('TipoMotivoAfastamento')->group(function () { defaultRoutes(TipoMotivoAfastamentoController::class); });
Route::middleware(['auth:sanctum'])->prefix('TipoCapacidade')->group(function () { defaultRoutes(TipoCapacidadeController::class); });
Route::middleware(['auth:sanctum'])->prefix('TipoDocumento')->group(function () {
    defaultRoutes(TipoDocumentoController::class);
    Route::post('atualizar', [TipoDocumentoController::class, 'atualizar']);
});
Route::middleware(['auth:sanctum'])->prefix('TipoProcesso')->group(function () {
    defaultRoutes(TipoProcessoController::class);
    Route::post('atualizar', [TipoProcessoController::class, 'atualizar']);
});

/* Modulos: Gestão */
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
});
Route::middleware(['auth:sanctum'])->prefix('AtividadeTarefa')->group(function () { defaultRoutes(AtividadeTarefaController::class); });
Route::middleware(['auth:sanctum'])->prefix('Planejamento')->group(function () { defaultRoutes(PlanejamentoController::class); });
Route::middleware(['auth:sanctum'])->prefix('PlanoTrabalho')->group(function () {
    defaultRoutes(PlanoTrabalhoController::class);
    Route::post('avaliar', [PlanoTrabalhoController::class, 'avaliar']);
    Route::post('cancelar-plano', [PlanoTrabalhoController::class, 'cancelarPlano']);
    Route::post('cancelar-assinatura', [PlanoTrabalhoController::class, 'cancelarAssinatura']);
    Route::post('cancelar-avaliacao', [PlanoTrabalhoController::class, 'cancelarAvaliacao']);
    Route::post('ativar', [PlanoTrabalhoController::class, 'ativar']);
    Route::post('reativar', [PlanoTrabalhoController::class, 'reativar']);
    Route::post('suspender', [PlanoTrabalhoController::class, 'suspender']);
    Route::post('arquivar', [PlanoTrabalhoController::class, 'arquivar']);
    Route::post('desarquivar', [PlanoTrabalhoController::class, 'desarquivar']);
    Route::post('enviar-para-assinatura', [PlanoTrabalhoController::class, 'enviarParaAssinatura']);
    Route::post('metadados-plano', [PlanoTrabalhoController::class, 'metadadosPlano']);
    Route::post('get-by-usuario', [PlanoTrabalhoController::class, 'getByUsuario']);
});
Route::middleware(['auth:sanctum'])->prefix('Comparecimento')->group(function () { defaultRoutes(ComparecimentoController::class); });
Route::middleware(['auth:sanctum'])->prefix('PlanoTrabalhoEntrega')->group(function () { defaultRoutes(PlanoTrabalhoEntregaController::class); });
Route::middleware(['auth:sanctum'])->prefix('PlanoTrabalhoConsolidacaoOcorrencia')->group(function () { defaultRoutes(PlanoTrabalhoConsolidacaoOcorrenciaController::class); });
Route::middleware(['auth:sanctum'])->prefix('PlanoTrabalhoConsolidacao')->group(function () {
    defaultRoutes(PlanoTrabalhoConsolidacaoController::class);
    Route::post('consolidacao-dados', [PlanoTrabalhoConsolidacaoController::class, 'consolidacaoDados']);
    Route::post('concluir', [PlanoTrabalhoConsolidacaoController::class, 'concluir']);
    Route::post('cancelar-conclusao', [PlanoTrabalhoConsolidacaoController::class, 'cancelarConclusao']);
});
Route::middleware(['auth:sanctum'])->prefix('PlanoEntrega')->group(function () {
    defaultRoutes(PlanoEntregaController::class);
    Route::post('arquivar', [PlanoEntregaController::class, 'arquivar']);
    Route::post('avaliar', [PlanoEntregaController::class, 'avaliar']);
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
});
Route::middleware(['auth:sanctum'])->prefix('PlanoEntregaEntrega')->group(function () { defaultRoutes(PlanoEntregaEntregaController::class); });

Route::middleware(['auth:sanctum'])->prefix('Adesao')->group(function () {
    defaultRoutes(AdesaoController::class);
});

Route::middleware(['auth:sanctum'])->prefix('Projeto')->group(function () { defaultRoutes(ProjetoController::class); });

/* Modulos: Configurações */
Route::middleware(['auth:sanctum'])->prefix('Usuario')->group(function () {
    defaultRoutes(UsuarioController::class);
    Route::post('dashboard', [UsuarioController::class, 'dashboard']);
    Route::post('dashboard_gestor', [UsuarioController::class, 'dashboard_gestor']);
    //Route::post('ja-assinou-tcr', [UsuarioController::class, 'jaAssinouTCR']);
});
Route::middleware(['auth:sanctum'])->prefix('Perfil')->group(function () { defaultRoutes(PerfilController::class); });
Route::middleware(['auth:sanctum'])->prefix('Entidade')->group(function () {
    defaultRoutes(EntidadeController::class);
    Route::post('generate-api-key', [EntidadeController::class, 'generateApiKey']);
});
Route::middleware(['auth:sanctum'])->prefix('Unidade')->group(function () {
    defaultRoutes(UnidadeController::class);
    Route::post('metadados-area', [UnidadeController::class, 'metadadosArea']);
    Route::post('mesma-sigla', [UnidadeController::class, 'mesmaSigla']);
    Route::post('unificar', [UnidadeController::class, 'unificar']);
    Route::post('dashboards', [UnidadeController::class, 'dashboards']);
    Route::post('inativo', [UnidadeController::class, 'inativo']);
    Route::post('lotados', [UnidadeController::class, 'lotados']);
    Route::post('hierarquia', [UnidadeController::class, 'hierarquia']);
    Route::post('filhas', [UnidadeController::class, 'filhas']);
    Route::post('lookup-todas-unidades', [UnidadeController::class, 'lookupTodasUnidades']);//Carlos para Curriculum Profissional
});
Route::middleware(['auth:sanctum'])->prefix('UnidadeIntegrante')->group(function () {
    Route::post('load-integrantes', [UnidadeIntegranteController::class, 'loadIntegrantes']);
    Route::post('save-integrante', [UnidadeIntegranteController::class, 'saveIntegrante']);
});
Route::middleware(['auth:sanctum'])->prefix('UnidadeIntegranteAtribuicao')->group(function () {
    Route::post('destroy', [UnidadeIntegranteAtribuicaoController::class, 'destroy']);
});
Route::middleware(['auth:sanctum'])->prefix('Capacidade')->group(function () { defaultRoutes(CapacidadeController::class); });

/* Modulos: Curriculum */
Route::middleware(['auth:sanctum'])->prefix('AreaConhecimento')->group(function () { defaultRoutes(AreaConhecimentoController::class); });
Route::middleware(['auth:sanctum'])->prefix('AreaAtividadeExterna')->group(function () { defaultRoutes(AreaAtividadeExternaController::class); });
Route::middleware(['auth:sanctum'])->prefix('AreaTematica')->group(function () { defaultRoutes(AreaTematicaController::class); });
Route::middleware(['auth:sanctum'])->prefix('Curso')->group(function () { defaultRoutes(CursoController::class); });
Route::middleware(['auth:sanctum'])->prefix('CapacidadeTecnica')->group(function () { defaultRoutes(CapacidadeTecnicaController::class); });
Route::middleware(['auth:sanctum'])->prefix('TipoCurso')->group(function () { defaultRoutes(TipoCursoController::class); });
Route::middleware(['auth:sanctum'])->prefix('Materia')->group(function () { defaultRoutes(MateriaController::class); });
Route::middleware(['auth:sanctum'])->prefix('Curriculum')->group(function () { 
    defaultRoutes(CurriculumController::class);
    Route::post('lookups-curriculum', [CurriculumController::class, 'lookupsCurriculum']);//Carlos para Curriculum Profissional 
});
Route::middleware(['auth:sanctum'])->prefix('CurriculumGraduacao')->group(function () { defaultRoutes(CurriculumGraduacaoController::class); });
Route::middleware(['auth:sanctum'])->prefix('CurriculumProfissional')->group(function () { defaultRoutes(CurriculumProfissionalController::class); });
Route::middleware(['auth:sanctum'])->prefix('Funcao')->group(function () { defaultRoutes(FuncaoController::class); });
Route::middleware(['auth:sanctum'])->prefix('CentroTreinamento')->group(function () { defaultRoutes(CentroTreinamentoController::class); });
Route::middleware(['auth:sanctum'])->prefix('GrupoEspecializado')->group(function () { defaultRoutes(GrupoEspecializadoController::class); });
Route::middleware(['auth:sanctum'])->prefix('Cargo')->group(function () { defaultRoutes(CargoController::class); });
Route::middleware(['auth:sanctum'])->prefix('Questionario')->group(function () { defaultRoutes(QuestionarioController::class); });
Route::middleware(['auth:sanctum'])->prefix('RespostaQuestionario')->group(function () { defaultRoutes(RespostaQuestionarioController::class); });
Route::middleware(['auth:sanctum'])->prefix('HistoricoAtividadeExternaCurriculumProfissional')->group(function () { defaultRoutes(HistoricoAtividadeExternaCurriculumController::class); });
Route::middleware(['auth:sanctum'])->prefix('HistoricoAtividadeInternaCurriculumProfissional')->group(function () { defaultRoutes(HistoricoAtividadeInternaCurriculumController::class); });
Route::middleware(['auth:sanctum'])->prefix('HistoricoCursoExternoCurriculumProfissional')->group(function () { defaultRoutes(HistoricoCursoExternoCurriculumController::class); });
Route::middleware(['auth:sanctum'])->prefix('HistoricoCursoInternoCurriculumProfissional')->group(function () { defaultRoutes(HistoricoCursoInternoCurriculumController::class); });
Route::middleware(['auth:sanctum'])->prefix('HistoricoDocenciaExternaCurriculumProfissional')->group(function () { defaultRoutes(HistoricoDocenciaExternaCurriculumController::class); });
Route::middleware(['auth:sanctum'])->prefix('HistoricoDocenciaInternaCurriculumProfissional')->group(function () { defaultRoutes(HistoricoDocenciaInternaCurriculumController::class); });
Route::middleware(['auth:sanctum'])->prefix('HistoricoFuncaoCurriculumProfissional')->group(function () { defaultRoutes(HistoricoFuncaoCurriculumController::class); });
Route::middleware(['auth:sanctum'])->prefix('HistoricoLotacaoCurriculumProfissional')->group(function () { defaultRoutes(HistoricoLotacaoCurriculumController::class); });
