<?php

namespace App\Services;

use App\Models\JobAgendado;
use App\Services\ServiceBase;

class JobAgendadoService extends ServiceBase {

    public function listar(){
        return JobAgendado::where('ativo', true)->get();
    }

    public function updateJob($id, $dados)
    {
        $job = JobAgendado::find($id);

        if (!$job) {
            return ['success' => false, 'message' => 'Job não encontrado.'];
        }

        $job->update($dados);
        return ['success' => true, 'message' => 'Job atualizado com sucesso.'];
    }
}