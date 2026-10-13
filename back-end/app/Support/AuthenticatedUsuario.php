<?php

declare(strict_types=1);

namespace App\Support;

use App\Models\Usuario;
use App\Repository\UsuarioRepository;
use Illuminate\Support\Facades\Auth;

/**
 * Acesso ao {@link Usuario} autenticado fora de {@see \App\Http\Controllers\ControllerBase}
 * (ex.: controllers V2 que estendem apenas {@see \App\Http\Controllers\Controller}).
 */
final class AuthenticatedUsuario
{
    /** @var null|callable(): (?Usuario) */
    private static $withAreasDeTrabalhoFake = null;

    /**
     * Substitui {@see self::withAreasDeTrabalho()} apenas no teste corrente.
     * Alias do Mockery troca a classe no processo inteiro e, após Mockery::close(),
     * as chamadas seguintes falham com "Call to a member function __call() on null".
     *
     * @param callable(): (?Usuario) $resolver
     */
    public static function fakeWithAreasDeTrabalho(callable $resolver): void
    {
        self::$withAreasDeTrabalhoFake = $resolver;
    }

    public static function clearFakes(): void
    {
        self::$withAreasDeTrabalhoFake = null;
    }

    /** Utilizador da sessão/guard atual, ou null se não autenticado ou tipo inesperado. */
    public static function logged(): ?Usuario
    {
        $user = Auth::user();

        return $user instanceof Usuario ? $user : null;
    }

    /**
     * Recarrega o utilizador autenticado com `areasTrabalho.unidade` (tenant atual).
     * Equivalente a {@see \App\Http\Controllers\ControllerBase::getUsuario}.
     */
    public static function withAreasDeTrabalho(): ?Usuario
    {
        if (self::$withAreasDeTrabalhoFake !== null) {
            return (self::$withAreasDeTrabalhoFake)();
        }

        $logged = self::logged();
        if ($logged === null) {
            return null;
        }

        return app(UsuarioRepository::class)->findByIdComAreasTrabalho($logged->getKey());
    }
}
