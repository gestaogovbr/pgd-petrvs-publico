<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Traits\Version;
use App\Services\NivelAcessoService;
use App\Services\PerfilService;
use App\Services\UtilService;
use App\Models\Perfil;
use App\Models\Usuario;

class UpdatePerfilUsuarios extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $perfilDesenvolvedor = NivelAcessoService::getPerfilDesenvolvedor();
        $perfilAdministradorGeral = NivelAcessoService::getPerfilAdministradorGeral();
        $perfilAdministradorNegocial = NivelAcessoService::getPerfilAdministrador();
        $perfilColaborador = NivelAcessoService::getPerfilColaborador();
        $perfilService = new PerfilService();

        // Garantir que o perfil de administrador negocial esteja criado
        if (!$perfilAdministradorNegocial) {
            DB::insert(
                "INSERT IGNORE INTO perfis (id, nivel, nome, descricao, created_at) VALUES (?, ?, ?, ?, ?)",
                [(new UtilService())->uuid('2'), 2, "Perfil Administrador Negocial", "Representantes de unidades instituidoras", now()]
            );
            $perfilAdministradorNegocial = NivelAcessoService::getPerfilAdministrador();
        }

        // Garantir que o perfil de colaborador esteja criado
        if (!$perfilColaborador) {
            DB::insert(
                "INSERT IGNORE INTO perfis (id, nivel, nome, descricao, created_at) VALUES (?, ?, ?, ?, ?)",
                [(new UtilService())->uuid('6'), 6, "Perfil Colaborador", "Agente públicos não selecionáveis para o PGD (ex: estagiários, terceirizados, etc)", now()]
            );
            $perfilColaborador = NivelAcessoService::getPerfilColaborador();
        }

        if ($perfilAdministradorGeral != null) {           
            // Atualiza perfil de usuários de administrador para administrador negocial 
            Usuario::where('perfil_id', $perfilAdministradorGeral->id)
                ->update(['perfil_id' => $perfilAdministradorNegocial->id]);

            // Atualiza perfil de usuários de desenvolvedor para administrador geral 
            Usuario::where('perfil_id', $perfilDesenvolvedor->id)
                ->update(['perfil_id' => $perfilAdministradorGeral->id]);
       

            // Atualiza os perfis
            foreach ($perfilService->perfis as $registro) {
                $perfil = Perfil::where('nivel', $registro[0])->first();
                $perfil->nome = $registro[1];
                $perfil->descricao = $registro[2];
                $perfil->save();
            };
        }
        
    }

    public function down(): void
    {
        return;
    }
};
