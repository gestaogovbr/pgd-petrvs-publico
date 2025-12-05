<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Stancl\Tenancy\Database\Models\Domain;

class TenantConfigurationsService
{
    private const DOMAIN_CACHE_TTL_SECONDS = 900;
    private const HTTPS_PORT = 443;

    public function handle(string $tenantId = null, $domain = null): ?Domain
    {
        $tenant = null;
        if ($tenantId) {
            $tenant = Cache::remember('domain:tenant_id:'.$tenantId, self::DOMAIN_CACHE_TTL_SECONDS, function () use ($tenantId) {
                return Domain::where('tenant_id', $tenantId)->with('tenant')->first();
            });
        }
        if (!$tenant && $domain) {
            $tenant = Cache::remember('domain:domain:'.$domain, self::DOMAIN_CACHE_TTL_SECONDS, function () use ($domain) {
                return Domain::where('domain', $domain)->with('tenant')->first();
            });
        }

        if (!$tenant) {
            $entidade = env('PETRVS_ENTIDADE');
            $tenant = Cache::remember('domain:tenant_id:'.$entidade, self::DOMAIN_CACHE_TTL_SECONDS, function () use ($entidade) {
                return Domain::where('tenant_id', $entidade)->with('tenant')->first();
            });
        }

        if ($tenant) {
            $this->loadingConfigs($tenant);
        }
        return $tenant;
    }

    private function loadingConfigs($tenant) : void
    {
        # Pega os dados salvos no Panel
        $settings = json_decode($tenant['tenant'], true);
        // Log::info("Settings: " . json_encode($settings));

        # Obtém a URL do aplicativo do arquivo de configuração
        $appUrl = config('app.url');
        $protocol = parse_url($appUrl, PHP_URL_SCHEME);

        # Setagem das informações nos configs ###
        config(['app.url' => $protocol . "://" . $settings['dominio_url']]);
        config(['session.domain' => $settings['dominio_url']]);
        config(['sanctum.stateful' => [
            $settings['dominio_url'],
            $settings['dominio_url'] . ":" . self::HTTPS_PORT
        ]]);
        #Petrvs
        config(['petrvs.schemas.base' => $settings['id']]);
        config(['petrvs.schemas.tenant_aplicacao' => $settings['tenancy_db_name']]);
        config(['petrvs.schemas.tenant_log' => $settings['log_database']]);


        # LOGIN UNICO - GOVBR
        config(['services.govbr.client_secret'          => $settings['login_login_unico_secret']                ?? env('LOGIN_UNICO_CLIENT_SECRET')]);
        config(['services.govbr.client_id'              => $settings['login_login_unico_client_id']             ?? env('LOGIN_UNICO_CLIENT_ID')]);
        config(['services.govbr.redirect'               => $settings['login_login_unico_redirect']              ?? "https://" . $settings['dominio_url'] . "/login-unico/"]);
        config(['services.govbr.code_verifier'          => $settings['login_login_unico_code_verifier']         ?? env('LOGIN_UNICO_CODE_CHALLENGE')]);
        config(['services.govbr.code_challenge'         => $settings['login_login_unico_code_challenge']        ?? env('LOGIN_UNICO_CODE_CHALLENGE_HASH')]);
        config(['services.govbr.code_challenge_method'  => $settings['login_login_unico_code_challenge_method'] ?? env('LOGIN_UNICO_CODE_CHALLENGE_METHOD')]);
        config(['services.govbr.environment'            => $settings['login_login_unico_environment']           ?? env('LOGIN_UNICO_ENV', 'staging')]);

        #AZURE - MICROSOFT
        config(['services.azure.client_secret'          => $settings['login_azure_secret']                ?? env('AZURE_CLIENT_SECRET')]);
        config(['services.azure.client_id'              => $settings['login_azure_client_id']             ?? env('AZURE_CLIENT_ID')]);

        # SIAPE
        config(['integracao.tipo'                       => $settings['tipo_integracao']                         ?? env('INTEGRACAO_TIPO')]);
        config(['integracao.codigoUnidadeRaiz'          => $settings['integracao_cod_unidade_raiz']             ?? env('INTEGRACAO_CODIGO_UNIDADE_RAIZ')]);
        config(['integracao.auto_incluir'               => $settings['integracao_auto_incluir']                 ?? env('INTEGRACAO_AUTO_INCLUIR')]);

        config(['integracao.siape.upag'                 => $settings['integracao_siape_upag']                   ?? env('INTEGRACAO_SIAPE_UPAG')]);
        config(['integracao.siape.url'                  => $settings['integracao_siape_url']                    ?? env('INTEGRACAO_SIAPE_URL')]);
        config(['integracao.siape.siglaSistema'         => $settings['integracao_siape_sigla']                  ?? env('INTEGRACAO_SIAPE_SIGLASISTEMA')]);
        config(['integracao.siape.nomeSistema'          => $settings['integracao_siape_nome']                   ?? env('INTEGRACAO_SIAPE_NOMESISTEMA')]);
        config(['integracao.siape.senha'                => $settings['integracao_siape_senha']                  ?? env('INTEGRACAO_SIAPE_SENHA')]);
        config(['integracao.siape.cpf'                  => $settings['integracao_siape_cpf']                    ?? env('INTEGRACAO_SIAPE_CPF')]);
        config(['integracao.siape.codOrgao'             => $settings['integracao_siape_codorgao']               ?? env('INTEGRACAO_SIAPE_CODORGAO')]);
        config(['integracao.siape.codUorg'              => $settings['integracao_siape_uorg']                   ?? env('INTEGRACAO_SIAPE_CODUORG')]);
        config(['integracao.siape.parmExistPag'         => $settings['integracao_siape_existepag']              ?? env('INTEGRACAO_SIAPE_PARMEXISTPAG')]);
        config(['integracao.siape.parmTipoVinculo'      => $settings['integracao_siape_tipovinculo']            ?? env('INTEGRACAO_SIAPE_PARMTIPOVINCULO')]);
        config(['integracao.siape.conectagov_chave'     => $settings['integracao_siape_conectagov_chave']       ?? env('INTEGRACAO_SIAPE_CONECTAGOV_CHAVE')]);
        config(['integracao.siape.conectagov_senha'     => $settings['integracao_siape_conectagov_senha']       ?? env('INTEGRACAO_SIAPE_CONECTAGOV_SENHA')]);
        config(['integracao.siape.conectagov_qtd_max_requisicoes'     => $settings['integracao_siape_conectagov_qtd_max_requisicoes']       ?? env('INTEGRACAO_SIAPE_CONECTAGOV_QTD_MAX_REQUISICOES')]);

        config(['integracao.perfilComum'          => $settings['integracao_usuario_comum']            ?? env('INTEGRACAO_USUARIO_COMUM')]);
        config(['integracao.perfilChefe'          => $settings['integracao_usuario_chefe']            ?? env('INTEGRACAO_USUARIO_CHEFE')]);

        // Log::info("Configs carregadas: " . json_encode(config('integracao')));
    }
}
