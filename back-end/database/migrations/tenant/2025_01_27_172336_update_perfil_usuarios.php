<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Traits\Version;
use App\Services\NivelAcessoService;

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

        // Update perfil de usuários de administrador para administrador negocial 
        DB::table('usuarios')
            ->where('perfil_id', $perfilAdministradorGeral->id)
            ->update(['perfil_id' => $perfilAdministradorNegocial->id]);

        // Update perfil de usuários de desenvolvedor para administrador geral 
        DB::table('usuarios')
            ->where('perfil_id', $perfilDesenvolvedor->id)
            ->update(['perfil_id' => $perfilAdministradorGeral->id]);

        
        
        
    }

    public function down(): void
    {
        return;
    }
};
