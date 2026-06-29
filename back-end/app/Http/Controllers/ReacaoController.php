<?php

namespace App\Http\Controllers;

use App\Models\Reacao;
use App\Services\ReacaoService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;

class ReacaoController extends ControllerBase {
    public $updatable = ["tipo"];
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {}

    protected function validateStore(Request $request) {
        return $request->validate([
            'entity' => ['required'],
            'entity.tipo' => ['required', 'in:like,love,care,haha,wow,sad,angry'],
            'entity.usuario_id' => ['required', 'exists:usuarios,id'],
            'entity.atividade_id' => ['nullable', 'exists:atividades,id'],
            'entity.plano_trabalho_entrega_id' => ['nullable', 'exists:planos_trabalhos_entregas,id'],
            'entity.plano_entrega_entrega_id' => ['nullable', 'exists:planos_entregas_entregas,id'],
            'with' => ['array']
        ], [
            'entity.tipo.required' => 'O tipo da reação é obrigatório.',
            'entity.tipo.in' => 'O tipo da reação é inválido.',
            'entity.usuario_id.required' => 'O usuário é obrigatório.',
            'entity.usuario_id.exists' => 'O usuário informado não existe.',
            'entity.atividade_id.exists' => 'A atividade informada não existe.',
            'entity.plano_trabalho_entrega_id.exists' => 'A entrega do plano de trabalho informada não existe.',
            'entity.plano_entrega_entrega_id.exists' => 'A entrega do plano de entrega informada não existe.',
        ]);
    }
}
