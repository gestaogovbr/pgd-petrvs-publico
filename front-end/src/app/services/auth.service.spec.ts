import { TestBed } from '@angular/core/testing';
import { Usuario } from '../models/usuario.model';
import { AuthService } from './auth.service';
import { DialogService } from './dialog.service';

describe('AuthService popup login', () => {
  it('retoma o destino solicitado após autenticação e remove o listener ao sair da tela', async () => {
    TestBed.configureTestingModule({});
    const auth = TestBed.inject(AuthService);
    const usuario = {} as Usuario;
    const destination = {
      route: ['gestao', 'plano-trabalho-v2', 'editar', 'plano-sintetico'],
      params: { origem: 'teste' }
    };
    auth.usuario = usuario;
    spyOnProperty(auth, 'dialogs', 'get').and.returnValue({ closeSppinerOverlay: () => undefined } as DialogService);
    spyOn(auth, 'authSession').and.resolveTo(true);
    const navigate = spyOn(auth, 'success');
    const unregister = auth.registerPopupLoginResultListener(() => destination);

    try {
      window.dispatchEvent(new MessageEvent('message', { data: 'COMPLETAR_LOGIN' }));
      await Promise.resolve();
      expect(navigate).toHaveBeenCalledOnceWith(usuario, destination);

      unregister();
      window.dispatchEvent(new MessageEvent('message', { data: 'COMPLETAR_LOGIN' }));
      await Promise.resolve();
      expect(navigate).toHaveBeenCalledTimes(1);
    } finally {
      unregister();
    }
  });
});
