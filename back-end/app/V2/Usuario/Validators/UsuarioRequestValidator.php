<?php

declare(strict_types=1);

namespace App\V2\Usuario\Validators;

use Illuminate\Http\Request;

class UsuarioRequestValidator
{
    public static function store(Request $request): array
    {
        return $request->validate([
            'cpf' => ['required', 'string', 'regex:/^\d{11}$/'],
            'email' => ['required', 'email', 'max:100'],
            'nome' => ['required', 'string', 'max:256'],
            'perfil_id' => ['required', 'uuid'],
            'atribuicoes' => ['required', 'array', 'min:1'],
            'atribuicoes.*.unidade_id' => ['required', 'uuid'],
            'atribuicoes.*.atribuicoes' => ['sometimes', 'array'],
            'apelido' => ['sometimes', 'nullable', 'string', 'max:100'],
            'telefone' => ['sometimes', 'nullable', 'string', 'max:50'],
            'data_nascimento' => ['sometimes', 'nullable', 'date'],
            'uf' => ['sometimes', 'nullable', 'string', 'size:2'],
            'sexo' => ['sometimes', 'nullable', 'string', 'in:MASCULINO,FEMININO'],
            'matricula' => ['sometimes', 'nullable', 'string', 'max:50'],
        ], [
            'cpf.required' => 'O CPF é obrigatório.',
            'cpf.regex' => 'O CPF deve conter exatamente 11 dígitos numéricos.',
            'email.required' => 'O e-mail é obrigatório.',
            'email.email' => 'O e-mail informado é inválido.',
            'nome.required' => 'O nome é obrigatório.',
            'nome.max' => 'O nome deve ter no máximo 256 caracteres.',
            'perfil_id.required' => 'O perfil é obrigatório.',
            'perfil_id.uuid' => 'O valor informado para o perfil é inválido.',
            'atribuicoes.required' => 'É necessário ao menos uma unidade.',
            'atribuicoes.min' => 'É necessário ao menos uma unidade.',
            'atribuicoes.*.unidade_id.required' => 'A unidade é obrigatória.',
            'atribuicoes.*.unidade_id.uuid' => 'O valor informado para a unidade é inválido.',
            'matricula.max' => 'A matrícula deve ter no máximo 50 caracteres.',
            'telefone.max' => 'O telefone deve ter no máximo 50 caracteres.',
        ]);
    }

    public static function dadosPessoais(Request $request): array
    {
        return $request->validate([
            'telefone' => ['sometimes', 'nullable', 'string', 'max:50'],
            'nome' => ['sometimes', 'string', 'max:256'],
            'email' => ['sometimes', 'nullable', 'email', 'max:100'],
            'cpf' => ['sometimes', 'string', 'regex:/^\d{11}$/'],
            'data_nascimento' => ['sometimes', 'nullable', 'date'],
            'uf' => ['sometimes', 'nullable', 'string', 'size:2'],
        ], [
            'telefone.max' => 'O telefone deve ter no máximo 50 caracteres.',
            'nome.max' => 'O nome deve ter no máximo 256 caracteres.',
            'email.email' => 'O e-mail informado é inválido.',
            'cpf.regex' => 'O CPF deve conter exatamente 11 dígitos numéricos.',
            'uf.size' => 'A UF deve ter 2 caracteres.',
        ]);
    }

    public static function textoComplementar(Request $request): array
    {
        return $request->validate([
            'texto_complementar_plano' => ['nullable', 'string'],
        ]);
    }

    public static function perfil(Request $request): array
    {
        return $request->validate([
            'perfil_id' => ['required', 'uuid'],
        ], [
            'perfil_id.required' => 'O perfil é obrigatório.',
            'perfil_id.uuid' => 'O valor informado para o perfil é inválido.',
        ]);
    }

    public static function atribuicoes(Request $request): array
    {
        return $request->validate([
            'atribuicoes' => ['required', 'array', 'min:1'],
            'atribuicoes.*.unidade_id' => ['required', 'uuid'],
            'atribuicoes.*.atribuicoes' => ['sometimes', 'array'],
        ], [
            'atribuicoes.required' => 'As atribuições são obrigatórias.',
            'atribuicoes.min' => 'É necessário ao menos uma atribuição.',
            'atribuicoes.*.unidade_id.required' => 'A unidade é obrigatória em cada atribuição.',
            'atribuicoes.*.unidade_id.uuid' => 'O valor informado para a unidade é inválido.',
        ]);
    }

    public static function nomeSocial(Request $request): array
    {
        return $request->validate([
            'nome_social' => ['nullable', 'string', 'max:100'],
        ], [
            'nome_social.max' => 'O nome social deve ter no máximo 100 caracteres.',
        ]);
    }

    public static function searchByNomeMatricula(Request $request): array
    {
        return $request->validate([
            'nome_matricula' => ['required', 'string', 'min:3'],
        ], [
            'nome_matricula.required' => 'O nome ou matrícula é obrigatório para a busca.',
            'nome_matricula.min' => 'O termo deve ter ao menos 3 caracteres.',
        ]);
    }

    public static function show(Request $request, string $usuarioId): array
    {
        $request->merge(['id' => $usuarioId]);

        return $request->validate([
            'id' => ['uuid'],
        ], [
            'id.uuid' => 'O valor informado para o usuário é inválido.',
        ]);
    }

    public static function unidadesVinculadasPorCpf(Request $request, string $cpf): array
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
