<?php

use App\Http\Controllers\AreaAtividadeExternaController;
use App\Http\Controllers\AreaConhecimentoController;
use App\Http\Controllers\AreaTematicaController;
use App\Http\Controllers\CapacidadeTecnicaController;
use App\Http\Controllers\CargoController;
use App\Http\Controllers\CentroTreinamentoController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\CurriculumController;
use App\Http\Controllers\CurriculumGraduacaoController;
use App\Http\Controllers\CurriculumProfissionalController;
use App\Http\Controllers\DisciplinaController;
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
use App\Http\Controllers\QuestionarioController;
use App\Http\Controllers\QuestionarioPerguntaController;
use App\Http\Controllers\QuestionarioPerguntaRespostaController;
use App\Http\Controllers\QuestionarioPreenchimentoController;
use App\Http\Controllers\TipoCursoController;
use Illuminate\Support\Facades\Route;

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
