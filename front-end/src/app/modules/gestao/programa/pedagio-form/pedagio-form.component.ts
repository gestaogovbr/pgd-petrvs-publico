import {Component, Injector, ViewChild} from "@angular/core";
import {AbstractControl, FormGroup} from "@angular/forms";
import moment from "moment";
import {EditableFormComponent} from "src/app/components/editable-form/editable-form.component";
import {UsuarioDaoService} from "src/app/dao/usuario-dao.service";
import {IIndexable} from "src/app/models/base.model";
import {Usuario} from "src/app/models/usuario.model";
import {PageFormBase} from "src/app/modules/base/page-form-base";
import { LookupItem } from "src/app/services/lookup.service";

@Component({
	selector: "app-pedagio-form",
	templateUrl: "./pedagio-form.component.html",
	styleUrls: ["./pedagio-form.component.scss"],
})
export class PedagioFormComponent extends PageFormBase<
	Usuario,
	UsuarioDaoService
> {
	@ViewChild(EditableFormComponent, {static: false})
	public editableForm?: EditableFormComponent;

  public OPTIONS: LookupItem[] = [
    { key: "1", value: "Art 10, §2º, INC SEGES/SPGRT nº 24/2024- Primeiro ano do Estágio Probatório." },
    { key: "2", value: "Art 10, §3º, INC SEGES/SPGRT nº 24/2024- Movimentação entre órgãos há menos de 6 (seis) meses."  }
  ];

	constructor(public injector: Injector) {
		super(injector, Usuario, UsuarioDaoService);

		this.form = this.fh.FormBuilder({
      opcao: { default: "" },
			data_inicio: { default: "" },
			data_fim: { default: "" },
    }, this.cdRef, this.validate);
	}

	public validate = (control: AbstractControl, controlName: string) => {
		let result = null;
		return result;
	};

	public formValidation = (form?: FormGroup) => {
    let result = null;		
		if (this.form?.controls.data_fim.value && this.form?.controls.data_inicio.value) {
			if (moment(this.form?.controls.data_fim.value).isBefore(moment(this.form?.controls.data_inicio.value))) {
				result = "Data de início não pode ser maior que a data de fim.";
			}
			// opção == 1 data fim deve ser maior ou igual 365 dias
			if (this.form?.controls.opcao.value == "1") {
				if (moment(this.form?.controls.data_fim.value).diff(moment(this.form?.controls.data_inicio.value), "days") < 364) {
					result = "Data de fim deve ser maior que 365 dias.";
				}
			}
			// opção == 2 data fim deve ser maior ou igual 180 dias
			if (this.form?.controls.opcao.value == "2") {
				if (moment(this.form?.controls.data_fim.value).diff(moment(this.form?.controls.data_inicio.value), "days") < 179) {
					result = "Data de fim deve ser maior que 180 dias.";
				}
			}
		}
		return result;
	};

	public async loadData(entity: Usuario, form: FormGroup) {}

	public initializeData(form: FormGroup): void {
		form.patchValue(new Usuario());
	}

	public saveData(form: IIndexable): Promise<Usuario> {
		return new Promise<Usuario>((resolve, reject) => {
			const usuario = this.util.fill(new Usuario(), this.entity!);
			resolve(this.util.fillForm(usuario, this.form!.value));
		});
	}


  public updateDates(event: any) {
		let opcao = event.target.value;
		if (opcao == "1") {
			this.form?.controls.data_inicio.setValue(moment().startOf("day").toDate());
			this.form?.get("data_fim")?.setValue(moment().startOf("day").add(365, "days").toDate());
		}
		if (opcao == "2") {
			this.form?.controls.data_inicio.setValue(moment().startOf("day").toDate());
			this.form?.get("data_fim")?.setValue(moment().startOf("day").add(180, "days").toDate());
		}

	}
  public onDataInicioChange(event: any) {}
  public onDataFimChange(event: any) {}
}
