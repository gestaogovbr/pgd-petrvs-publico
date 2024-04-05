<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JobAgendado;

class JobAgendadoSeeder extends Seeder
{
  public function run()
  {
    $jobs = [
      [
          'nome_do_job' => 'SincronizarPetrvsJob',
          'diario' => true,
          'horario' => '10:00:00',
          'ativo' => true
      ],
      [
          'nome_do_job' => 'SincronizarPetrvsJob',
          'diario' => true,
          'horario' => '11:00:00',
          'ativo' => true
      ],
      [
          'nome_do_job' => 'SincronizarPetrvsJob',
          'diario' => true,
          'horario' => '12:00:00',
          'ativo' => true
      ],
      [
          'nome_do_job' => 'SincronizarPetrvsJob',
          'diario' => true,
          'horario' => '14:00:00',
          'ativo' => true
      ],
      [
          'nome_do_job' => 'SincronizarPetrvsJob',
          'diario' => true,
          'horario' => '15:00:00',
          'ativo' => true
      ],
      [
          'nome_do_job' => 'SincronizarPetrvsJob',
          'diario' => true,
          'horario' => '17:00:00',
          'ativo' => true
      ],
      [
        'nome_do_job' => 'LogJob',
        'diario' => true,
        'horario' => '10:31:00',
        'ativo' => true
      ],
      [
          'nome_do_job' => 'LogJob',
          'diario' => true,
          'horario' => '16:31:00',
          'ativo' => true
      ],
      [
        'nome_do_job' => 'LogJob',
        'diario' => true,
        'horario' => '17:01:00',
        'ativo' => true
      ]
    ];

    foreach ($jobs as $jobData) {
          JobAgendado::firstOrCreate([
            'nome_do_job' => $jobData['nome_do_job'],
            'horario' => $jobData['horario']
        ], $jobData);
    }
    
  }
}
