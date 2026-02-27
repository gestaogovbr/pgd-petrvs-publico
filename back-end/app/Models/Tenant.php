<?php

namespace App\Models;

use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;
use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;

/**
 * @property string $id
 * @property string $tenancy_db_name
 * @property string|null $log_host
 * @property string|null $log_database
 * @property string|null $log_port
 * @property string|null $log_username
 * @property string|null $log_password
 * @property bool|null $log_traffic
 * @property bool|null $log_changes
 * @property bool|null $log_errors
 * @property bool|null $notification_petrvs
 * @property bool|null $notification_mail
 * @property string|null $notification_mail_signature
 * @property string|null $notification_mail_host
 * @property string|null $notification_mail_port
 * @property string|null $notification_mail_username
 * @property string|null $notification_mail_password
 * @property string|null $notification_mail_encryption
 * @property bool|null $notification_whatsapp
 * @property string|null $notification_whatsapp_url
 * @property string|null $notification_whatsapp_token
 * @property string|null $login_select_entidade
 * @property string|null $login_google_client_id
 * @property string|null $login_firebase_client_id
 * @property string|null $login_azure_client_id
 * @property string|null $login_azure_secret
 * @property string|null $login_azure_redirect_uri
 * @property string|null $login_login_unico_client_id
 * @property string|null $login_login_unico_secret
 * @property string|null $tipo_integracao
 * @property string|null $api_cod_unidade_autorizadora
 * @property string|null $api_url
 * @property string|null $version
 */
class Tenant extends BaseTenant implements TenantWithDatabase
{
  use HasDatabase, HasDomains;

  protected $table = "tenants";

  // Has
  public function tenantsLogs()
  {
    return $this->hasMany(TenantsLogs::class);
  }

  public function userPanels()
  {
      return $this->belongsToMany(PainelUsuario::class, 'users_panel_tenants');
  }
}
