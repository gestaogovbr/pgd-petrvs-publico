import { ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {AuthPanelService} from "../../../services/auth-panel.service";
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import {FormHelperService} from "../../../services/form-helper.service";
import { GlobalsService } from 'src/app/services/globals.service';
import { DOCUMENT } from '@angular/common';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';

@Component({
    selector: 'app-panel-login',
    templateUrl: './panel-login.component.html',
    styleUrls: ['./panel-login.component.scss']
})
export class PanelLoginComponent {

    public login: FormGroup;
    @ViewChild('loginForm') loginForm!: EditableFormComponent;

    constructor(
        public globals: GlobalsService,
        private router: Router,
        private authService: AuthPanelService,
        public fh: FormHelperService,
        public formBuilder: FormBuilder,
        public cdRef: ChangeDetectorRef,
        @Inject(DOCUMENT) private document: any
    ) {
        this.document.body.classList.add('login');
        this.login = this.fh.FormBuilder({
            email: { default: "" },
            password: { default: "" }
        }, this.cdRef, this.validate);
    }

    public submitForm() {
        if (this.loginForm) {
            this.loginForm.onSubmit();
        }
    }

    public validate = (control: AbstractControl, controlName: string) => {
        let result = null;

        if (['email', 'password'].indexOf(controlName) >= 0 && !control.value?.length) {
            result = "Obrigatório";
        }

        return result;
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
