//@ts-ignore
const URL = typeof EXTENSION_SERVIDOR_URL != "undefined" ? EXTENSION_SERVIDOR_URL : typeof EXTENSION_BASE_URL != "undefined" ? EXTENSION_BASE_URL : GLOBAL_SERVER;
const HOST =  URL.replace(/^https?:\/\//, "").replace(/\/$/, "");
const HTTPS = URL.startsWith("https");
//@ts-ignore
const ENTIDADE = typeof GLOBAL_ENTIDADE != "undefined" ? GLOBAL_ENTIDADE : "PRF";
//@ts-ignore
const LOGO = typeof GLOBAL_LOGO != "undefined" ? GLOBAL_LOGO : "https://suporte.prf.gov.br";
//@ts-ignore
const SUPORTE = typeof GLOBAL_SUPORTE != "undefined" ? GLOBAL_SUPORTE : "logo-login-prf.png";
export const environment = {
  production: true,
  host: HOST,
  https: HTTPS,
  suporte: SUPORTE,
  entidade: ENTIDADE,
  images: {
    login: LOGO
  }
};