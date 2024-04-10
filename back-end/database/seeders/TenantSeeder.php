<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;
use App\Services\TenantService;
use App\Models\Tenant; 
use Maatwebsite\Excel\Facades\Excel;
use Carbon\Carbon;

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
       $file = public_path('./arquivos_csv/tenants.xlsx'); 

       Excel::load($file, function ($reader) {
           $reader->each(function ($row) {
               $payload = [
                    "id" => $row->SIGLA,
                    "created_at" => Carbon::now(),
                    "updated_at" => Carbon::now(),
                    "deleted_at" => null,
                    "tenancy_db_name" => "petrvs_".$row->SIGLA,
                    "tenancy_db_host" => "petrvs_db",
                    "tenancy_db_port" => 3308,
                    "tenancy_db_username" => "root",
                    "tenancy_db_password" => "PsEeTnRhVaS",
                    "log_traffic" => false,
                    "log_changes" => false,
                    "log_errors" => true,
                    "log_host" => "petrvs_db",
                    "log_database" => "petrvs_".$row->SIGLA."_logs",
                    "log_port" => 3308,
                    "log_username" => "root",
                    "log_password" => "PsEeTnRhVaS",
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
                    "email" => $row->EMAIL,
                    "nome_usuario" => $row->NOME,
                    "cpf" => "01798651106",
                    "apelido" => "Geisimar",
                    "sigla" => "",
                    "nome_entidade" => $row->NOME,
                    "abrangencia" => "NACIONAL",
                    "codigo_cidade" => 5300108,
                    "dominio_url" => "loca.treina",
                    "login_select_entidade" => false,
                    "login_google_client_id" => "",
                    "login_firebase_client_id" => "",
                    "login_azure_client_id" => "",
                    "login_azure_secret" => "",
                    "login_azure_redirect_uri" => "",
                    "login_login_unico_client_id" => "",
                    "login_login_unico_secret" => "",
                    "login_google" => false,
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

               // Verifique se o tenant já existe na base de dados
               $existingTenant = Tenant::where('id', $payload['id'])->first();

               if ($existingTenant) {
                   Log::info("Tenant '{$payload['id']}' já existe.");
               } else {
                   $this->service->store($payload);
                   Log::info("Tenant '{$payload['id']}' criado com sucesso.");
               }
           });
       });
   }
}
