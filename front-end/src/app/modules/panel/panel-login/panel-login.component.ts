import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthPanelService} from "../../../services/auth-panel.service";
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import {FormHelperService} from "../../../services/form-helper.service";

@Component({
    selector: 'app-panel-login',
    templateUrl: './panel-login.component.html',
    styleUrls: ['./panel-login.component.scss']
})
export class PanelLoginComponent {

    public login: FormGroup;
    constructor(
        private router: Router,
        private authService: AuthPanelService,
        public fh: FormHelperService,
        public formBuilder: FormBuilder
    ) {
        this.login = this.fh.FormBuilder({
            email: { default: "" },
            password: { default: "" }
        });

    }

    public loginPanel() {
        const form = this.login.controls;
        this.authService.loginPanel(form.email.value, form.password.value)
            .then((success) => {
                if (success) {
                    // Navegar para a rota desejada após o login bem-sucedido
                    this.router.navigate(['/panel']); // Substitua '/panel' pela rota desejada
                } else {
                    alert('Credenciais inválidas. Por favor, tente novamente.');
                }
            })
            .catch(error => {
                alert('Erro durante o login:'+error.error.error);
                console.error('Erro durante o login:', error.error.error);
            });
    }

}
