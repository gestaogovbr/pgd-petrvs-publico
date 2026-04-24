<?php

namespace App\V2\Usuario;

use Illuminate\Http\Request;

class UsuarioValidacoes
{

    public static function buscarPorNomeMatricula(Request $request): array
    {
        return $request->validate([
            'nome_matricula' => ['required', 'string', 'min:3'],
        ], [
            'nome_matricula.required' => 'O nome ou matrícula é obrigatório para a busca.',
            'nome_matricula.min' => 'O termo deve ter ao menos 3 caracteres.',
        ]);
    }

    public static function buscarPorId(Request $request, string $usuarioId): array
    {
        $request->merge(['id' => $usuarioId]);

        return $request->validate([
            'id' => ['required', 'uuid'],
        ], [
            'id.required' => 'O id do usuário é obrigatório.',
            'id.uuid' => 'O valor informado para o usuário é inválido.',
        ]);
    }

    public static function buscarUnidadesVinculadas(Request $request, string $cpf): array
    {
        $cpfNumerico = preg_replace('/\D/', '', $cpf);
        $request->merge(['cpf' => $cpfNumerico]);

        return $request->validate([
            'cpf' => ['required', 'regex:/^\d{11}$/'],
        ], [
            'cpf.required' => 'O CPF é obrigatório.',
            'cpf.regex' => 'O CPF deve conter 11 dígitos.',
        ]);
    }
}
