<?php

use App\Exceptions\ServerException;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Repository\UnidadeRepository;
use App\Services\PlanoEntregaService;
use App\Services\ServiceBase;
use App\Services\UsuarioService;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

const UNIDADE_ID_FAKE = "00000000-0000-0000-0000-000000000000";

/**
 * Cria um PlanoEntregaService com o unidadeRepository substituído por um mock
 * (sem nenhum acesso a banco — a validação em teste deve consultar apenas o
 * repository, nunca o model diretamente).
 */
function criarServiceValidaPermissao(?Unidade $unidade, bool $esperaFindById = true): PlanoEntregaService
{
    $service = new PlanoEntregaService();

    $repoMock = Mockery::mock(UnidadeRepository::class);
    if ($esperaFindById) {
        $repoMock->shouldReceive('findById')->once()->with((string) UNIDADE_ID_FAKE)->andReturn($unidade);
    } else {
        $repoMock->shouldReceive('findById')->never();
    }

    $prop = new ReflectionProperty(PlanoEntregaService::class, "unidadeRepository");
    $prop->setAccessible(true);
    $prop->setValue($service, $repoMock);

    return $service;
}

it("lança erro amigável (não crash 500) quando a unidade não existe ou foi removida", function () {
    $service = criarServiceValidaPermissao(null);

    $excecao = null;
    try {
        $service->validaPermissaoIncluir(["unidade_id" => UNIDADE_ID_FAKE], null);
    } catch (ServerException $e) {
        $excecao = $e;
    }

    expect($excecao)->toBeInstanceOf(ServerException::class)
        // prefixo "Erro ao validar" => HTTP 400 no ControllerBase::statusFromIBaseException
        ->and(str_starts_with($excecao->getMessage(), "Erro ao validar Plano de Entregas"))->toBeTrue()
        ->and(str_contains($excecao->getMessage(), "não existe ou foi removida"))->toBeTrue();
});

it("lança erro amigável sem consultar o repository quando unidade_id está ausente", function () {
    $service = criarServiceValidaPermissao(null, esperaFindById: false);

    $excecao = null;
    try {
        $service->validaPermissaoIncluir(["id" => ""], null);
    } catch (ServerException $e) {
        $excecao = $e;
    }

    expect($excecao)->toBeInstanceOf(ServerException::class)
        ->and(str_contains($excecao->getMessage(), "não existe ou foi removida"))->toBeTrue();
});

it("retorna true quando a unidade existe e o usuário é gestor da unidade do plano", function () {
    $unidade = new Unidade();
    $unidade->id = UNIDADE_ID_FAKE;
    $unidade->unidade_pai_id = null;

    $service = criarServiceValidaPermissao($unidade);

    // mock do service de usuário (property mágica $this->usuario) via o cache interno de services
    $usuarioServiceMock = Mockery::mock(UsuarioService::class);
    $usuarioServiceMock->shouldReceive("isGestorUnidade")->with(UNIDADE_ID_FAKE, true)->once()->andReturn(true);

    $servicesProp = new ReflectionProperty(ServiceBase::class, "_services");
    $servicesProp->setAccessible(true);
    $servicesProp->setValue($service, ["usuario" => $usuarioServiceMock]);

    // $condition2 (hasPermissionTo) é sempre avaliado, mesmo quando $condition1 é true
    $usuarioMock = Mockery::mock(Usuario::class);
    $usuarioMock->shouldReceive("hasPermissionTo")->with("MOD_PENT_QQR_UND")->once()->andReturn(false);

    // obs.: $dataOrEntity é recebido por valor — a chave "unidade" definida dentro do
    // método é usada apenas internamente (checagem de unidade_pai_id), como no código original
    expect($service->validaPermissaoIncluir(["unidade_id" => UNIDADE_ID_FAKE], $usuarioMock))->toBeTrue();
});
