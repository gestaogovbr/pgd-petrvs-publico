<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Feriado;

class FeriadoSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */

  public $timenow;

  public function __construct()
  {
    $this->timenow = now();
  }

  public function run()
  {
    $feriados = array(
      array(
        "id" => "8ea425f9-e4ea-486a-85a7-c61f55691783",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Confraternização Universal",
        "dia" => 1,
        "mes" => 1,
        "ano" => NULL,
        "tipoDia" => "MES",
        "recorrente" => 0,
        "abrangencia" => "NACIONAL",
        "codigo_ibge" => NULL,
        "uf" => NULL,
        "entidade_id" => NULL,
        "cidade_id" => NULL,
      ),
      array(
        "id" => "1839dce1-3676-42e1-8e3f-ab0839b1acfa",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Tiradentes",
        "dia" => 21,
        "mes" => 4,

        "ano" => NULL,
        "tipoDia" => "MES",
        "recorrente" => 0,
        "abrangencia" => "NACIONAL",
        "codigo_ibge" => NULL,
        "uf" => NULL,
        "entidade_id" => NULL,
        "cidade_id" => NULL,
      ),
      array(
        "id" => "492c4925-ba17-4a48-98c6-37427a1969f0",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Dia Mundial do Trabalho",
        "dia" => 1,
        "mes" => 5,
        "ano" => NULL,
        "tipoDia" => "MES",
        "recorrente" => 0,
        "abrangencia" => "NACIONAL",
        "codigo_ibge" => NULL,
        "uf" => NULL,
        "entidade_id" => NULL,
        "cidade_id" => NULL,
      ),
      array(
        "id" => "66804be2-24d0-43f3-9499-787025164a00",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Independência do Brasil",
        "dia" => 7,
        "mes" => 9,
        "ano" => NULL,
        "tipoDia" => "MES",
        "recorrente" => 0,
        "abrangencia" => "NACIONAL",
        "codigo_ibge" => NULL,
        "uf" => NULL,
        "entidade_id" => NULL,
        "cidade_id" => NULL,
      ),
      array(
        "id" => "b7d5da9e-fc34-4edf-a69c-c53d41e98fd8",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Nossa Senhora Aparecida",
        "dia" => 12,
        "mes" => 10,
        "ano" => NULL,
        "tipoDia" => "MES",
        "recorrente" => 0,
        "abrangencia" => "NACIONAL",
        "codigo_ibge" => NULL,
        "uf" => NULL,
        "entidade_id" => NULL,
        "cidade_id" => NULL,
      ),
      array(
        "id" => "7cd85f0d-90d6-4e9d-a852-b4910f4a1859",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Finados",
        "dia" => 2,
        "mes" => 11,
        "ano" => NULL,
        "tipoDia" => "MES",
        "recorrente" => 0,
        "abrangencia" => "NACIONAL",
        "codigo_ibge" => NULL,
        "uf" => NULL,
        "entidade_id" => NULL,
        "cidade_id" => NULL,
      ),
      array(
        "id" => "864688a8-eb7e-4f97-bd44-94535c05e9b5",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Proclamação da República",
        "dia" => 15,
        "mes" => 11,
        "ano" => NULL,
        "tipoDia" => "MES",
        "recorrente" => 0,
        "abrangencia" => "NACIONAL",
        "codigo_ibge" => NULL,
        "uf" => NULL,
        "entidade_id" => NULL,
        "cidade_id" => NULL,
      ),
      array(
        "id" => "3bda258a-2b1e-4a5d-8cf7-178ab1883171",
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "nome" => "Natal",
        "dia" => 25,
        "mes" => 12,
        "ano" => NULL,
        "tipoDia" => "MES",
        "recorrente" => 0,
        "abrangencia" => "NACIONAL",
        "codigo_ibge" => NULL,
        "uf" => NULL,
        "entidade_id" => NULL,
        "cidade_id" => NULL,
      ),
    );

    foreach ($feriados as $feriado) {
      Feriado::firstOrCreate(['id' => $feriado['id']], $feriado);
    }

  }
}