<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JobAgendado;

class JobAgendadoSeeder extends Seeder
{
    public function run() {
        $job = new JobAgendado([
            'nome_do_job' => 'PGDCarregarDadosFila',
            'diario' => true,
            'horario' => '07:00:00',
            'ativo' => false
        ]);
    }
}
