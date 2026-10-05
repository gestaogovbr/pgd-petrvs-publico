<?php

declare(strict_types=1);

namespace App\V2\RelatorioGeracao;

use App\Enums\RelatorioGeracaoTipo;
use App\Exceptions\ServerException;
use App\Models\Usuario;
use App\Services\RelatorioAgenteAuthorization;
use App\Services\RelatorioLacunaPlanoTrabalhoAuthorization;
use App\Services\RelatorioPlanoEntregaAuthorization;
use App\Services\RelatorioPlanoTrabalhoAuthorization;
use App\Services\RelatorioUnidadeAuthorization;
use App\Support\AuthenticatedUsuario;
use App\V2\RelatorioEntrega\RelatorioEntregaAuthorization;

class RelatorioGeracaoAuthorization
{
    public function usuarioAutorizadoParaTipo(RelatorioGeracaoTipo $tipo, string $mensagem): Usuario
    {
        $usuario = AuthenticatedUsuario::withAreasDeTrabalho();
        if ($usuario === null) {
            throw new ServerException('RelatorioCapacidade', $mensagem);
        }

        foreach ($this->capacidadesDoTipo($tipo) as $capacidade) {
            if ($usuario->hasPermissionTo($capacidade)) {
                return $usuario;
            }
        }

        throw new ServerException('RelatorioCapacidade', $mensagem);
    }

    public function usuarioAutorizado(string $capacidade, string $mensagem): Usuario
    {
        $usuario = AuthenticatedUsuario::withAreasDeTrabalho();
        if ($usuario === null || ! $usuario->hasPermissionTo($capacidade)) {
            throw new ServerException('RelatorioCapacidade', $mensagem);
        }

        return $usuario;
    }

    /**
     * @return list<string>
     */
    private function capacidadesDoTipo(RelatorioGeracaoTipo $tipo): array
    {
        return match ($tipo) {
            RelatorioGeracaoTipo::PLANO_TRABALHO,
            RelatorioGeracaoTipo::PLANO_TRABALHO_DETALHADO => [RelatorioPlanoTrabalhoAuthorization::CAPACIDADE],
            RelatorioGeracaoTipo::PLANO_ENTREGA => [RelatorioPlanoEntregaAuthorization::CAPACIDADE],
            RelatorioGeracaoTipo::AGENTE => [RelatorioAgenteAuthorization::CAPACIDADE],
            RelatorioGeracaoTipo::UNIDADE => [RelatorioUnidadeAuthorization::CAPACIDADE],
            RelatorioGeracaoTipo::ENTREGA => RelatorioEntregaAuthorization::CAPACIDADES,
            RelatorioGeracaoTipo::LACUNA_PLANO_TRABALHO => [RelatorioLacunaPlanoTrabalhoAuthorization::CAPACIDADE],
        };
    }
}
