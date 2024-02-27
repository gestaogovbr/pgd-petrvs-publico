<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TipoCapacidade;
use App\Models\Capacidade;
use App\Models\Perfil;
use App\Services\TipoCapacidadeService;
use App\Services\UtilService;

class TipoCapacidadeSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $tiposCapacidadesService = new TipoCapacidadeService();
    $utilService = new UtilService();

    //garantir que existe o Perfil Desenvolvedor
    $perfilDesenvolvedor = Perfil::firstOrCreate(
      ['nome' => 'Desenvolvedor'],
      [
        'id' => $utilService->uuid("Desenvolvedor"),
        'nivel' => 0,
        'descricao' => 'Perfil de Desenvolvedor - Todas as permissões',
      ]
    );
    $developerId = $perfilDesenvolvedor->id;

    // carrega os tipos de capacidades do vetor declarado no serviço TipoCapacidadeService
    $dadosModulosCapacidades = $tiposCapacidadesService->tiposCapacidades;

    foreach ($dadosModulosCapacidades as $modulo) {
      $tipoCapacidadePai = TipoCapacidade::withTrashed()->updateOrCreate(
        ['id' => $utilService->uuid($modulo['codigo'])],
        [
          'codigo' => $modulo['codigo'],
          'descricao' => $modulo['descricao'],
          'grupo_id' => NULL,
          'deleted_at' => NULL
        ]
      );

      // Garante que o perfil de Desenvolvedor tenha todos os tipos de capacidades filhas
      foreach ($modulo['capacidades'] as $capacidadeFilha) {
        $tipoCapacidadeFilha = TipoCapacidade::withTrashed()->updateOrCreate(
          ['id' => $utilService->uuid($capacidadeFilha[0])],
          [
            'codigo' => $capacidadeFilha[0],
            'descricao' => $capacidadeFilha[1],
            'grupo_id' => $tipoCapacidadePai->id,
            'deleted_at' => NULL
          ]
        );

        $capacidade = Capacidade::withTrashed()->where('perfil_id', $developerId)->where('tipo_capacidade_id', $tipoCapacidadeFilha->id)->first();
        if ($capacidade) {
          if ($capacidade->trashed()) {
            $capacidade->restore();
          }
        } else {
          $capacidade = Capacidade::create([
            'id' => $utilService->uuid(),
            'perfil_id' => $developerId,
            'tipo_capacidade_id' => $tipoCapacidadeFilha->id
          ]);
        }

      }

      // Garante que o perfil de Desenvolvedor tenha todos os tipos de permissão
      $capacidadePai = Capacidade::withTrashed()->where('perfil_id', $developerId)->where('tipo_capacidade_id', $tipoCapacidadePai->id)->first();

      if ($capacidadePai) {
        if ($capacidadePai->trashed()) {
          $capacidadePai->restore();
        }
      } else {
        $capacidadePai = Capacidade::create([
          'id' => $utilService->uuid(),
          'perfil_id' => $developerId,
          'tipo_capacidade_id' => $tipoCapacidadePai->id
        ]);
      }
    }

    // exclui os tipos de capacidades filhas que não existem mais no vetor declarado no serviço TipoCapacidadeService 
    foreach ($dadosModulosCapacidades as $modulo) {
      $capacidades = array_map(fn($z) => $z[0], $modulo['capacidades']);
      // representa todos os tipos de capacidade existentes na tabela, filhas do módulo, que não existem mais
      $filhosNulos = TipoCapacidade::where('grupo_id', $utilService->uuid($modulo['codigo']))->whereNotIn('codigo', $capacidades)->get();
      foreach ($filhosNulos as $filhoNulo)
        $filhoNulo->deleteCascade();
    }

    // Apagar os tipos de capacidades referentes aos próprios módulos (pais) que não contêm mais filhas, e aqueles módulos (pais) que mudaram de nome
    $modulos = array_column($dadosModulosCapacidades, 'codigo');
    $modulosNulos = TipoCapacidade::whereNull('grupo_id')->whereNotIn('codigo', $modulos)->get();
    foreach ($modulosNulos as $moduloNulo)
      $moduloNulo->deleteCascade();
  }
}
