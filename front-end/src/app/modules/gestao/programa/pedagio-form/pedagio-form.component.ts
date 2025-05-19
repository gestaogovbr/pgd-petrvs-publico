import {Component, Injector, ViewChild} from "@angular/core";
import {AbstractControl, FormGroup} from "@angular/forms";
import moment from "moment";
import {EditableFormComponent} from "src/app/components/editable-form/editable-form.component";
import {UsuarioDaoService} from "src/app/dao/usuario-dao.service";
import {IIndexable} from "src/app/models/base.model";
import {Usuario} from "src/app/models/usuario.model";
import {PageFormBase} from "src/app/modules/base/page-form-base";
import {LookupItem} from "src/app/services/lookup.service";

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
		{
			key: "1",
			value:
				"Art 10, §2º, INC SEGES/SPGRT nº 24/2024- Primeiro ano do Estágio Probatório.",
		},
		{
			key: "2",
			value:
				"Art 10, §3º, INC SEGES/SPGRT nº 24/2024- Movimentação entre órgãos há menos de 6 (seis) meses.",
		},
	];

	constructor(public injector: Injector) {
		super(injector, Usuario, UsuarioDaoService);

		this.form = this.fh.FormBuilder(
			{
				tipo_pedagio: {default: ""},
				data_inicial_pedagio: {default: ""},
				data_final_pedagio: {default: ""},
			},
			this.cdRef,
			this.validate
		);
	}

	public validate = (control: AbstractControl, controlName: string) => {
		let result = null;
		return result;
	};

	public formValidation = (form?: FormGroup) => {
		let result = null;
		if (
			this.form?.controls.data_final_pedagio.value &&
			this.form?.controls.data_inicial_pedagio.value
		) {
			if (
				moment(this.form?.controls.data_final_pedagio.value).isBefore(
					moment(this.form?.controls.data_inicial_pedagio.value)
				)
			) {
				result = "Data de início não pode ser maior que a data de fim.";
			}
			// opção == 1 data fim deve ser maior ou igual 365 dias
			if (this.form?.controls.tipo_pedagio.value == "1") {
				if (
					moment(this.form?.controls.data_final_pedagio.value).diff(
						moment(this.form?.controls.data_inicial_pedagio.value),
						"days"
					) < 364
				) {
					result = "Data de fim deve ser maior que 365 dias.";
				}
			}
			// opção == 2 data fim deve ser maior ou igual 180 dias
			if (this.form?.controls.tipo_pedagio.value == "2") {
				if (
					moment(this.form?.controls.data_final_pedagio.value).diff(
						moment(this.form?.controls.data_inicial_pedagio.value),
						"days"
					) < 179
				) {
					result = "Data de fim deve ser maior que 180 dias.";
				}
			}
		}
		return result;
	};

	public async loadData(entity: Usuario, form: FormGroup) {
		this.entity = this.metadata?.usuario || entity;
		this.form = form;
		this.form.patchValue(entity);
		this.form.controls.data_inicial_pedagio.setValue(
			moment(entity.data_inicial_pedagio).toDate()
		);
		this.form.controls.data_final_pedagio.setValue(
			moment(entity.data_final_pedagio).toDate()
		);
		this.form.controls.tipo_pedagio.setValue(entity.tipo_pedagio);
	}

	public async saveData(form: IIndexable): Promise<Usuario | undefined> {
		return new Promise<Usuario>((resolve, reject) => {
			const usuario = this.util.fill(new Usuario(), this.entity!);
			resolve(this.util.fillForm(usuario, this.form!.value));
		});
	}

	public initializeData(form: FormGroup): void {
		this.entity = new Usuario();
		this.loadData(this.entity, form);
	}

	public async atualizaPedagio(): Promise<Usuario> {
		console.log("atualizaPedagio");
		
		const data = {
			usuario_id: this.entity?.id,
			data_inicial_pedagio: this.form?.controls.data_inicial_pedagio.value,
			data_final_pedagio: this.form?.controls.data_final_pedagio.value,
			tipo_pedagio: this.form?.controls.tipo_pedagio.value,
		};

		try {
			const response = await this.dao?.atualizaPedagio(data);
			if (response) {
				this.entity = response;
			}
			if (!this.entity) {
				throw new Error("Entity is undefined.");
			}
			return this.entity;
		} catch (error) {
			// this.dialog.alert("Erro ao atualizar pedagio!", error);
			throw error;
		}
	}

	public updateDates(event: any): void {
		const opcao = event.target.value;
		const dataInicial = moment().startOf("day").toDate();

		this.form?.controls.data_inicial_pedagio.setValue(dataInicial);

		if (opcao === "1") {
			this.form?.controls.data_final_pedagio.setValue(
				moment(dataInicial).add(365, "days").toDate()
			);
		} else if (opcao === "2") {
			this.form?.controls.data_final_pedagio.setValue(
				moment(dataInicial).add(180, "days").toDate()
			);
		}
	}
	public onDataInicioChange(event: any) {}
	public onDataFimChange(event: any) {}
}
