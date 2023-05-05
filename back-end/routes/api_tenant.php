<?php

use App\Http\Controllers\AdesaoController;
use App\Http\Controllers\CadeiaValorController;
use App\Http\Controllers\MacroprocessoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\IntegracaoController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\PerfilController;
use App\Http\Controllers\AtividadeController;
use App\Http\Controllers\ControllerBase;
use App\Http\Controllers\EntidadeController;
use App\Http\Controllers\LotacaoController;
use App\Http\Controllers\UnidadeController;
use App\Http\Controllers\CidadeController;
use App\Http\Controllers\ChangeController;
use App\Http\Controllers\EntregaController;
use App\Http\Controllers\EixoTematicoController;
use App\Http\Controllers\ErrorController;
use App\Http\Controllers\TrafficController;
use App\Http\Controllers\ProgramaController;
use App\Http\Controllers\ProgramaParticipanteController;
use App\Http\Controllers\PlanejamentoController;
use App\Http\Controllers\PlanejamentoObjetivoController;
use App\Http\Controllers\PlanoController;
use App\Http\Controllers\PlanoEntregaController;
use App\Http\Controllers\PlanoEntregaEntregaController;
use App\Http\Controllers\PetrvsController;
use App\Http\Controllers\DocumentoController;
use App\Http\Controllers\TipoDocumentoController;
use App\Http\Controllers\TipoProcessoController;
use App\Http\Controllers\TipoJustificativaController;
use App\Http\Controllers\TipoAvaliacaoController;
use App\Http\Controllers\TipoAtividadeController;
use App\Http\Controllers\TipoMotivoAfastamentoController;
use App\Http\Controllers\TipoModalidadeController;
use App\Http\Controllers\TipoCapacidadeController;
use App\Http\Controllers\CapacidadeController;
use App\Http\Controllers\FeriadoController;
use App\Http\Controllers\AfastamentoController;
use App\Http\Controllers\CadeiaValorProcessoController;
use App\Http\Controllers\DemandaController;
use App\Http\Controllers\CalendarioController;
use App\Http\Controllers\TarefaController;
use App\Http\Controllers\MaterialServicoController;
use App\Http\Controllers\DemandaEntregaController;
use App\Http\Controllers\ProjetoController;
use App\Http\Controllers\RotinaDiariaController;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\AreaGraduacaoController;

use App\Http\Controllers\UnidadeIntegranteController;

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

/* Desenvolvedor */
Route::middleware('auth:sanctum')->prefix('Change')->group(function () {
    defaultRoutes(ChangeController::class);
    Route::post('showResponsaveis', [ChangeController::class, 'showResponsaveis']);
});
Route::middleware('auth:sanctum')->prefix('Error')->group(function () {
    defaultRoutes(ErrorController::class);
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
Route::middleware(['auth:sanctum'])->prefix('Atividade')->group(function () {
    defaultRoutes(AtividadeController::class);
    Route::post('atividade-dashboard', [AtividadeController::class, 'atividadeDashboard']);
    Route::post('homologar', [AtividadeController::class, 'homologar']);
});
Route::middleware(['auth:sanctum'])->prefix('Cidade')->group(function () { defaultRoutes(CidadeController::class); });
Route::middleware(['auth:sanctum'])->prefix('Documento')->group(function () {
    defaultRoutes(DocumentoController::class);
    Route::post('pendente-sei', [DocumentoController::class, 'pendenteSei']);
    Route::post('assinar', [DocumentoController::class, 'assinar']);
});
Route::middleware(['auth:sanctum'])->prefix('EixoTematico')->group(function () { defaultRoutes(EixoTematicoController::class); });
Route::middleware(['auth:sanctum'])->prefix('Entrega')->group(function () { defaultRoutes(EntregaController::class); });
Route::middleware(['auth:sanctum'])->prefix('Macroprocesso')->group(function () { defaultRoutes(MacroprocessoController::class); });
Route::middleware(['auth:sanctum'])->prefix('Feriado')->group(function () { defaultRoutes(FeriadoController::class); });
Route::middleware(['auth:sanctum'])->prefix('MaterialServico')->group(function () { defaultRoutes(MaterialServicoController::class); });
Route::middleware(['auth:sanctum'])->prefix('PlanejamentoObjetivo')->group(function () { defaultRoutes(PlanejamentoObjetivoController::class); });
Route::middleware(['auth:sanctum'])->prefix('Programa')->group(function () { defaultRoutes(ProgramaController::class); });
Route::middleware(['auth:sanctum'])->prefix('ProgramaParticipante')->group(function () { defaultRoutes(ProgramaParticipanteController::class); });
Route::middleware(['auth:sanctum'])->prefix('Tarefa')->group(function () { defaultRoutes(TarefaController::class); });
Route::middleware(['auth:sanctum'])->prefix('Template')->group(function () { defaultRoutes(TemplateController::class); });
Route::middleware(['auth:sanctum'])->prefix('CadeiaValor')->group(function () { defaultRoutes(CadeiaValorController::class); });
Route::middleware(['auth:sanctum'])->prefix('CadeiaValorProcesso')->group(function () { defaultRoutes(CadeiaValorProcessoController::class); });
Route::middleware(['auth:sanctum'])->prefix('TipoJustificativa')->group(function () { defaultRoutes(TipoJustificativaController::class); });
Route::middleware(['auth:sanctum'])->prefix('TipoAtividade')->group(function () { defaultRoutes(TipoAtividadeController::class); });
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
Route::middleware(['auth:sanctum'])->prefix('Demanda')->group(function () {
    defaultRoutes(DemandaController::class);
    Route::post('prazo', [DemandaController::class, 'prazo']);
    Route::post('iniciadas', [DemandaController::class, 'iniciadas']);
    Route::post('iniciar', [DemandaController::class, 'iniciar']);
    Route::post('cancelar-inicio', [DemandaController::class, 'cancelarInicio']);
    Route::post('concluir', [DemandaController::class, 'concluir']);
    Route::post('cancelar-conclusao', [DemandaController::class, 'cancelarConclusao']);
    Route::post('avaliadas', [DemandaController::class, 'avaliadas']);
    Route::post('avaliar', [DemandaController::class, 'avaliar']);
    Route::post('cancelar-avaliacao', [DemandaController::class, 'cancelarAvaliacao']);
    Route::post('pausar', [DemandaController::class, 'pausar']);
    Route::post('reiniciar', [DemandaController::class, 'reiniciar']);
    Route::post('prorrogar', [DemandaController::class, 'prorrogar']);
    Route::post('arquivar', [DemandaController::class, 'arquivar']);
});
Route::middleware(['auth:sanctum'])->prefix('DemandaEntrega')->group(function () { defaultRoutes(DemandaEntregaController::class); });
Route::middleware(['auth:sanctum'])->prefix('Planejamento')->group(function () { defaultRoutes(PlanejamentoController::class); });
Route::middleware(['auth:sanctum'])->prefix('Plano')->group(function () {
    defaultRoutes(PlanoController::class);
    Route::post('avaliar', [PlanoController::class, 'avaliar']);
    Route::post('cancelar-avaliacao', [PlanoController::class, 'cancelarAvaliacao']);
    Route::post('arquivar', [PlanoController::class, 'arquivar']);
    Route::post('metadadosPlano', [PlanoController::class, 'metadadosPlano']);
});

Route::middleware(['auth:sanctum'])->prefix('PlanoEntrega')->group(function () { 
    defaultRoutes(PlanoEntregaController::class);
    Route::post('liberar-homologacao', [PlanoEntregaController::class, 'liberarHomologacao']);
    Route::post('retirar-homologacao', [PlanoEntregaController::class, 'retirarHomologacao']);
    Route::post('homologar', [PlanoEntregaController::class, 'homologar']);
    Route::post('cancelar-homologacao', [PlanoEntregaController::class, 'cancelarHomologacao']);
    Route::post('concluir', [PlanoEntregaController::class, 'concluir']);
    Route::post('cancelar-conclusao', [PlanoEntregaController::class, 'cancelarConclusao']);
    Route::post('avaliar', [PlanoEntregaController::class, 'avaliar']);
    Route::post('cancelar-avaliacao', [PlanoEntregaController::class, 'cancelarAvaliacao']);
    Route::post('arquivar', [PlanoEntregaController::class, 'arquivar']);
    Route::post('reativar', [PlanoEntregaController::class, 'reativar']);
});
Route::middleware(['auth:sanctum'])->prefix('PlanoEntregaEntrega')->group(function () { defaultRoutes(PlanoEntregaEntregaController::class); });


Route::middleware(['auth:sanctum'])->prefix('Adesao')->group(function () {
    defaultRoutes(AdesaoController::class);
//    Route::post('avaliar', [PlanoController::class, 'avaliar']);
//    Route::post('cancelar-avaliacao', [PlanoController::class, 'cancelarAvaliacao']);
//    Route::post('arquivar', [PlanoController::class, 'arquivar']);
//    Route::post('metadadosPlano', [PlanoController::class, 'metadadosPlano']);
});

Route::middleware(['auth:sanctum'])->prefix('Projeto')->group(function () { defaultRoutes(ProjetoController::class); });

/* Modulos: Configurações */
Route::middleware(['auth:sanctum'])->prefix('Usuario')->group(function () {
    defaultRoutes(UsuarioController::class);
    Route::post('dashboard', [UsuarioController::class, 'dashboard']);
    Route::post('dashboard_gestor', [UsuarioController::class, 'dashboard_gestor']);
});
Route::middleware(['auth:sanctum'])->prefix('Perfil')->group(function () { defaultRoutes(PerfilController::class); });
Route::middleware(['auth:sanctum'])->prefix('Entidade')->group(function () {
    defaultRoutes(EntidadeController::class);
    Route::post('generate-api-key', [EntidadeController::class, 'generateApiKey']);
});
Route::middleware(['auth:sanctum'])->prefix('Lotacao')->group(function () { defaultRoutes(LotacaoController::class); });
Route::middleware(['auth:sanctum'])->prefix('Unidade')->group(function () {
    defaultRoutes(UnidadeController::class);
    Route::post('metadados-area', [UnidadeController::class, 'metadadosArea']);
    Route::post('mesma-sigla', [UnidadeController::class, 'mesmaSigla']);
    Route::post('unificar', [UnidadeController::class, 'unificar']);
    Route::post('dashboards', [UnidadeController::class, 'dashboards']);
    Route::post('inativo', [UnidadeController::class, 'inativo']);
});
Route::middleware(['auth:sanctum'])->prefix('UnidadeIntegrante')->group(function () {
    //defaultRoutes(UnidadeIntegranteController::class);
    Route::post('load-integrantes', [UnidadeIntegranteController::class, 'loadIntegrantes']);
    Route::post('save-integrante', [UnidadeIntegranteController::class, 'saveIntegrante']);
});
Route::middleware(['auth:sanctum'])->prefix('Capacidade')->group(function () { defaultRoutes(CapacidadeController::class); });

/* Modulos: RAIO X */
Route::middleware(['auth:sanctum'])->prefix('AreaGraduacao')->group(function () { defaultRoutes(AreaGraduacaoController::class); });
