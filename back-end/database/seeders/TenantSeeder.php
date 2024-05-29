<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Artisan;
use App\Services\TenantService;
use App\Models\Tenant;
use Maatwebsite\Excel\Facades\Excel;
use Carbon\Carbon;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Illuminate\Support\Facades\DB;
use App\Models\Entidade;
use App\Models\Cidade;

class TenantSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */

  public $service;

  public function __construct(TenantService $service)
  {
    $this->service = $service;
  }

  public function run()
  {
    try {
      $file = public_path('tenants.xlsx');
      Excel::import(new TenantsImport($this->service), $file);
    } catch (\Exception $e) {
      echo ("Erro ao importar tenants: " . $e->getMessage(). "\n");
      Log::error("Erro ao importar tenants: " . $e->getMessage());
    }
  }
}


class TenantsImport implements ToCollection
{

  public function __construct(public TenantService $service)
  {
  }

  public function collection(Collection $rows)
  {
    foreach ($rows as $row) {

      $payload = [
        "id" => $row[0],
        "created_at" => Carbon::now(),
        "updated_at" => Carbon::now(),
        "deleted_at" => null,
        "tenancy_db_name" => "petrvs_" . $row[0],
        "tenancy_db_host" => env('DB_HOST', '172.31.251.5'),
        "tenancy_db_port" => env('DB_PORT', '3306'),
        "tenancy_db_username" => env('DB_USERNAME', 'petrvs'),
        "tenancy_db_password" => env('DB_PASSWORD', "P3g3D3#20@DB"),
        "log_traffic" => false,
        "log_changes" => false,
        "log_errors" => true,
        "log_host" => env('DB_HOST', '172.31.251.5'),
        "log_database" => "petrvs_" . $row[0] . "_logs",
        "log_port" => env('DB_PORT', '3306'),
        "log_username" => env('DB_USERNAME', 'petrvs'),
        "log_password" => env('DB_PASSWORD', "P3g3D3#20@DB"),
        "notification_petrvs" => true,
        "notification_mail" => false,
        "notification_mail_signature" => "assets/images/signature.png",
        "notification_mail_host" => "",
        "notification_mail_port" => 465,
        "notification_mail_username" => "geisimar.rech87@gmail.com",
        "notification_mail_password" => "petrvs@123",
        "notification_mail_encryption" => "SSL",
        "notification_whatsapp" => false,
        "notification_whatsapp_url" => "",
        "notification_whatsapp_token" => "",
        "email" =>  $row[3],
        "nome_usuario" => $row[1],
        "cpf" => $this->cpfRandom(0),
        "apelido" => $row[1],
        "sigla" =>  $row[0],
        "nome_entidade" => $row[1],
        "abrangencia" => "NACIONAL",
        "codigo_cidade" => 5300108,
        "dominio_url" => $row[2],
        "login_select_entidade" => false,
        "login_google_client_id" => "710267922367-hbup6m7jddgs6g298ahkbtjb6m5kiqri.apps.googleusercontent.com",
        "login_firebase_client_id" => "",
        "login_azure_client_id" => "",
        "login_azure_secret" => "",
        "login_azure_redirect_uri" => "",
        "login_login_unico_client_id" => "",
        "login_login_unico_secret" => "",
        "login_google" => true,
        "login_azure" => false,
        "login_login_unico" => false,
        "tipo_integracao" => null,
        "integracao_auto_incluir" => true,
        "integracao_cod_unidade_raiz" => "",
        "integracao_siape_url" => "",
        "integracao_siape_upag" => "",
        "integracao_siape_sigla" => "",
        "integracao_siape_nome" => "",
        "integracao_siape_cpf" => "",
        "integracao_siape_senha" => "",
        "integracao_siape_codorgao" => "",
        "integracao_siape_uorg" => "",
        "integracao_siape_existepag" => "",
        "integracao_siape_tipovinculo" => "",
        "integracao_wso2_url" => "",
        "integracao_wso2_unidades" => "",
        "integracao_wso2_pessoas" => "",
        "integracao_wso2_token_url" => "",
        "integracao_wso2_token_authorization" => "",
        "integracao_wso2_token_acesso" => "",
        "integracao_wso2_token_user" => "",
        "integracao_wso2_token_password" => "",
        "integracao_usuario_comum" => "Participante",
        "integracao_usuario_chefe" => "Chefia de Unidade Executora",
        "modulo_sei_habilitado" => false,
        "modulo_sei_private_key" => "",
        "modulo_sei_public_key" => "",
        "modulo_sei_url" => ""
      ];

      $existingTenant = Tenant::where('id', $payload['id'])->first();

      if (!$existingTenant) {
          try {
            $tenant =  Tenant::create($payload);
            $tenant->domains()->create(['domain' => $payload['dominio_url']]);        
            $this->runMigrationsForTenant($tenant);
            $this->createEntity($tenant);
            $this->runSeederForTenant($tenant);
            Log::info("Tenant '{$payload['id']}' criado com sucesso.");
            echo ("Tenant '{$tenant->id}' criado com sucesso.\n");
          } catch (\Exception $e) {
              echo ($e->getMessage());
              Log::error( $e->getMessage());
              throw $e;
          }
      }else{
          echo ("Tenant '{$payload['id']}' já existe.\n");
          Log::info("Tenant '{$payload['id']}' já existe.");
      }
    }
  }

  protected function runMigrationsForTenant($tenant)
  {

    tenancy()->initialize($tenant);
    Artisan::call('tenants:migrate --tenants=' .$tenant['id']);
    tenancy()->end();
  }

  protected function runSeederForTenant($tenant)
  {

    tenancy()->initialize($tenant);
    Artisan::call('tenants:seed --tenants=' .$tenant['id']. ' --class=DeployTreinaSeeder');
    tenancy()->end();
  }

  protected function createEntity($tenant) {
    tenancy()->initialize($tenant);
    $entidade = new Entidade([
      'sigla' => $tenant['id'],
      'nome' => $tenant['nome_entidade'],
      "abrangencia" => "NACIONAL",
      'layout_formulario_atividade' => 'COMPLETO',
      'campos_ocultos_atividade' => [],
      'nomenclatura' => [],
    ]);
    $entidade->save();
    tenancy()->end();
  }


  public static function cpfRandom($mascara = "1")
  {
    $n1 = rand(0, 9);
    $n2 = rand(0, 9);
    $n3 = rand(0, 9);
    $n4 = rand(0, 9);
    $n5 = rand(0, 9);
    $n6 = rand(0, 9);
    $n7 = rand(0, 9);
    $n8 = rand(0, 9);
    $n9 = rand(0, 9);
    $d1 = $n9 * 2 + $n8 * 3 + $n7 * 4 + $n6 * 5 + $n5 * 6 + $n4 * 7 + $n3 * 8 + $n2 * 9 + $n1 * 10;
    $d1 = 11 - (self::mod($d1, 11));
    if ($d1 >= 10) {
      $d1 = 0;
    }
    $d2 = $d1 * 2 + $n9 * 3 + $n8 * 4 + $n7 * 5 + $n6 * 6 + $n5 * 7 + $n4 * 8 + $n3 * 9 + $n2 * 10 + $n1 * 11;
    $d2 = 11 - (self::mod($d2, 11));
    if ($d2 >= 10) {
      $d2 = 0;
    }
    $retorno = '';
    if ($mascara == 1) {
      $retorno = '' . $n1 . $n2 . $n3 . "." . $n4 . $n5 . $n6 . "." . $n7 . $n8 . $n9 . "-" . $d1 . $d2;
    } else {
      $retorno = '' . $n1 . $n2 . $n3 . $n4 . $n5 . $n6 . $n7 . $n8 . $n9 . $d1 . $d2;
    }
    return $retorno;
  }

  private static function mod($dividendo, $divisor)
  {
    return round($dividendo - (floor($dividendo / $divisor) * $divisor));
  }
}
