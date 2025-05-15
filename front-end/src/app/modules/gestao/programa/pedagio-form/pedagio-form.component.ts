import {Component, Injector, ViewChild} from "@angular/core";
import {AbstractControl, FormGroup} from "@angular/forms";
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
	}

	public validate = (control: AbstractControl, controlName: string) => {
		let result = null;
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


  updateValidators(): void {}
}
