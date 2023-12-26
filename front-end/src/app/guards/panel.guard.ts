import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class PanelGuard {
  private loginFormSubject = new Subject<boolean>();

  constructor(private router: Router,private auth: AuthService) {}

  showLoginForm(): Observable<boolean> {
    const form = document.createElement('form');
    form.innerHTML = `
    <div id="loginForm" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
      <div class="row">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
      </div>
      <div class="row">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password"  required>
      </div>
      <div class="row">
        <button type="button" id="submitBtn">Login</button>
      </div>
    </div>
  `;

    const submitButton = form.querySelector('#submitBtn');

    if (submitButton) {
      submitButton.addEventListener('click', () => {
        const username = (form.querySelector('#username') as HTMLInputElement).value;
        const password = (form.querySelector('#password') as HTMLInputElement).value;

        Promise.all([
          this.auth.loginPanel(username, password)
        ]).then(results => {
          console.log(results[0]);
          const loginResult = results[0];

          // Verifique se o login foi bem-sucedido
          if (loginResult === true) {
            // Emitir o resultado para que o canActivate aguarde
            this.loginFormSubject.next(true);

            form.remove();
          } else {
            let msg='Erro ao fazer login.';
            alert(msg);
            console.error(msg);
            this.loginFormSubject.next(false);
          }
        }).catch(error => {
          console.error('Erro ao autenticar:', error);
          this.loginFormSubject.next(false);
        });

      });
    } else {
      console.error('Elemento #submitBtn não encontrado no formulário.');
    }

    // Adicione o formulário à DOM
    document.body.appendChild(form);

    return this.loginFormSubject.asObservable();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // Mostrar o formulário de login e aguardar o resultado
    return this.showLoginForm();
  }
}
