<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PainelUsuarioController extends Controller
{
    public function login(Request $request)
    {

        $credentials = $request->only('email', 'password');

        if (Auth::guard('painel')->attempt($credentials)) {
            // Autenticação bem-sucedida
            return true;
        } else {
            // Autenticação falhou
            return response()->json([
                'error' => 'Credenciais inválidas.'
            ], 401); // Código de status 401 para não autorizado
        }
    }
    public function detail(Request $request)
    {
        // Obtém o usuário autenticado com base no contexto
        $user = $request->user('painel');

        // Verifica se o usuário está autenticado
        if ($user) {
            return response()->json([
                'nome' => $user->nome,
                'email' => $user->email
            ]);
        } else {
            // Usuário não autenticado, retorna uma resposta de erro
            return response()->json([
                'error' => 'Usuário não autenticado'
            ], 401); // Código de status 401 para não autorizado
        }
    }

    public function logout()
    {
        Auth::guard('painel_users')->logout();
        return redirect('/login');
    }

    public function checkAuthentication(Request $request)
    {
        if (Auth::guard('painel')->check()) {
            // Usuário autenticado
            return response()->json(['authenticated' => true]);
        } else {
            // Usuário não autenticado
            return response()->json(['authenticated' => false]);
        }
    }
}
