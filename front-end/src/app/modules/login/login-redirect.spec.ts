import { parseLoginRedirect } from './login-redirect';

describe('parseLoginRedirect', () => {
  it('aceita o destino V2 com ID e parâmetros', () => {
    const destination = {
      route: ['gestao', 'plano-trabalho-v2', 'editar', 'plano-sintetico'],
      params: { origem: 'teste' }
    };

    expect(parseLoginRedirect(JSON.stringify(destination))).toEqual(destination);
  });

  it('rejeita destino de login, formato inválido e JSON inválido', () => {
    expect(parseLoginRedirect(JSON.stringify({ route: ['login'] }))).toBeUndefined();
    expect(parseLoginRedirect(JSON.stringify({ route: [] }))).toBeUndefined();
    expect(parseLoginRedirect('{')).toBeUndefined();
  });
});
