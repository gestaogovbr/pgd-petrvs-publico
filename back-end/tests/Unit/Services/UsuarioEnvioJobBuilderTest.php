<?php

namespace Tests\Unit\Services;

use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use App\Services\API_PGD\Builder\UsuarioEnvioJobBuilder;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Tests\TenantTestCase;

uses(TenantTestCase::class);

function usuarioComPlanoTrabalho(): Usuario
{
    $usuario = new Usuario();
    $usuario->id = 'user-1';
    $usuario->matricula = '123';
    $usuario->setRelation('planosTrabalho', new Collection([new PlanoTrabalho()]));

    return $usuario;
}

describe('UsuarioEnvioJobBuilder', function () {
    it('agenda participante quando nunca foi enviado e possui plano de trabalho', function () {
        $usuario = usuarioComPlanoTrabalho();
        $usuario->data_envio_api_pgd = null;
        $usuario->updated_at = Carbon::parse('2026-06-01 10:00:00');

        expect(UsuarioEnvioJobBuilder::deveAgendarParticipante($usuario))->toBeTrue();
        expect(UsuarioEnvioJobBuilder::make('tenant-1', $usuario))->not->toBeNull();
    });

    it('não agenda participante quando não possui plano de trabalho', function () {
        $usuario = new Usuario();
        $usuario->id = 'user-1';
        $usuario->matricula = '123';
        $usuario->data_envio_api_pgd = null;
        $usuario->updated_at = Carbon::parse('2026-06-01 10:00:00');
        $usuario->setRelation('planosTrabalho', new Collection());

        expect(UsuarioEnvioJobBuilder::possuiPlanoTrabalho($usuario))->toBeFalse();
        expect(UsuarioEnvioJobBuilder::deveAgendarParticipante($usuario))->toBeFalse();
        expect(UsuarioEnvioJobBuilder::make('tenant-1', $usuario))->toBeNull();
    });

    it('não agenda participante quando data de envio é maior ou igual à última alteração', function () {
        $usuario = usuarioComPlanoTrabalho();
        $usuario->data_envio_api_pgd = Carbon::parse('2026-06-10 12:00:00');
        $usuario->updated_at = Carbon::parse('2026-06-10 10:00:00');

        expect(UsuarioEnvioJobBuilder::deveAgendarParticipante($usuario))->toBeFalse();
        expect(UsuarioEnvioJobBuilder::make('tenant-1', $usuario))->toBeNull();
    });

    it('não agenda participante quando data de envio é igual à última alteração', function () {
        $usuario = usuarioComPlanoTrabalho();
        $quando = Carbon::parse('2026-06-10 12:00:00');
        $usuario->data_envio_api_pgd = $quando;
        $usuario->updated_at = $quando;

        expect(UsuarioEnvioJobBuilder::deveAgendarParticipante($usuario))->toBeFalse();
        expect(UsuarioEnvioJobBuilder::make('tenant-1', $usuario))->toBeNull();
    });

    it('agenda participante quando houve alteração após o último envio', function () {
        $usuario = usuarioComPlanoTrabalho();
        $usuario->data_envio_api_pgd = Carbon::parse('2026-06-10 10:00:00');
        $usuario->updated_at = Carbon::parse('2026-06-10 12:00:00');

        expect(UsuarioEnvioJobBuilder::deveAgendarParticipante($usuario))->toBeTrue();
        expect(UsuarioEnvioJobBuilder::make('tenant-1', $usuario))->not->toBeNull();
    });
});
