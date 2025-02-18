<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Usuario;

class ImpersonationController extends Controller
{
    /**
     * Iniciar impersonação e gerar token Sanctum
     */
    public function impersonate($userId)
    {
        $admin = Auth::guard('sanctum')->user(); // Obtém usuário autenticado pelo Sanctum
        $user = Usuario::findOrFail($userId);

        if (!$admin || !$admin->canImpersonate()) {
            return response()->json(['error' => 'Você não tem permissão para impersonar usuários.'], 403);
        }

        // Salvar ID do admin original na sessão
        session(['original_user_id' => $admin->id]);

        // Iniciar impersonação
        $admin->impersonate($user, 'sanctum');

        // Revogar tokens anteriores do usuário impersonado
        $user->tokens()->delete();

        // Criar novo token Sanctum
        $token = $user->createToken('Impersonation')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Agora você está logado como ' . $user->name,
            'token' => $token
        ]);
    }

    /**
     * Encerrar impersonação e retornar ao admin original
     */
    public function stopImpersonating()
    {
        $user = Auth::guard('sanctum')->user(); // Obtém usuário atual pelo Sanctum

        if (!$user || !$user->isImpersonated()) {
            return response()->json(['error' => 'Você não está impersonando nenhum usuário.'], 400);
        }

        // Recuperar usuário original
        $originalUserId = session('original_user_id');
        session()->forget('original_user_id');

        $admin = Usuario::find($originalUserId);

        // Encerrar impersonação
        $user->leaveImpersonation();

        // Revogar tokens antigos do admin
        $admin->tokens()->delete();

        // Criar novo token para o admin
        $token = $admin->createToken('AdminToken')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Você voltou à sua conta original.',
            'token' => $token
        ]);
    }
}
