//@ts-ignore
const webBrowser = typeof chrome != "undefined" ? chrome : typeof browser != "undefined" ? browser : undefined;
const defaultExtensionOptionsConfig = { /* Configuração utilizada para acessas as configurações da extensão */
    api_url: webBrowser?.runtime?.getURL ? webBrowser.runtime.getURL("") : "",
    suporte_url: "https://suporte.prf.gov.br",
    entidade: "PRF",
    logo_url: "logo-login-prf.png",
    versao: "1.0.0",
    login: {
        google_client_id: "",
        gsuit: true,
        azure: true,
        institucional: false,
        firebase: false,
        user_password: false
    }
};
//@ts-ignore
const global: any = typeof PETRVS_GLOBAL_CONFIG != "undefined" ? PETRVS_GLOBAL_CONFIG : defaultExtensionOptionsConfig;
//@ts-ignore
const baseUrl = typeof EXTENSION_BASE_URL != "undefined" ? EXTENSION_BASE_URL : typeof PETRVS_BASE_URL != "undefined" ? PETRVS_BASE_URL : undefined;
//@ts-ignore
const servidorUrl = typeof EXTENSION_SERVIDOR_URL !== "undefined" ? EXTENSION_SERVIDOR_URL : typeof PETRVS_SERVIDOR_URL != "undefined" ? PETRVS_SERVIDOR_URL : undefined;
const URL = servidorUrl || baseUrl || global.api_url;
const HOST = URL.replace(/^https?:\/\//, "").replace(/\/$/, "");
const HTTPS = URL.startsWith("https");

export const environment = {
    production: true,
    host: HOST,
    https: HTTPS,
    suporte: global?.suporte_url || "https://suporte.prf.gov.br",
    entidade: global?.entidade || "PRF",
    images: { login: global?.logo_url || "logo-login-prf.png" },
    versao: global?.versao || "1.0.0",
    login: global?.login || {
        google_client_id: global?.google_client_id || "",
        gsuit: true,
        azure: true,
        institucional: false,
        firebase: false,
        user_password: false
    }
};