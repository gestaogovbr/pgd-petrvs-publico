import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { TipoObjetivoFacade } from '../application/tipo-objetivo.facade';
import { TipoObjetivo, Estrutura } from '../domain/types';
import { MessageService } from 'src/app/v2/services/message.service';

interface SelectOption { value: string; label: string; }

@Component({
  selector: 'app-tipo-objetivo-v2-list-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, WebcomponentsAngularModule, BreadcrumbComponent],
  templateUrl: './list.page.html'
})
export class TipoObjetivoV2ListPage implements OnInit {
  readonly facade = inject(TipoObjetivoFacade);
  private readonly fb = inject(FormBuilder);
  private readonly message = inject(MessageService);

  readonly filtroNome = signal('');
  readonly itemEmEdicao = signal<TipoObjetivo | null>(null);
  readonly itemParaExcluir = signal<TipoObjetivo | null>(null);
  readonly modalFormularioAberto = signal(false);

  readonly estruturaSelectOptions: SelectOption[] = [
    { value: 'planejamento_institucional', label: 'Planejamento Institucional' },
    { value: 'cadeia_de_valor', label: 'Cadeia de Valor' }
  ];

  readonly form = this.fb.nonNullable.group({
    estrutura: ['', [Validators.required]],
    nome: ['', [Validators.required, Validators.maxLength(250)]],
    descricao: ['', [Validators.maxLength(1000)]]
  });

  readonly itensPlanejamento = computed(() => {
    const termo = this.filtroNome().trim().toLowerCase();
    return this.facade.items()
      .filter(item => item.estrutura === 'planejamento_institucional')
      .filter(item => !termo.length || item.nome.toLowerCase().includes(termo));
  });

  readonly itensCadeiaValor = computed(() => {
    const termo = this.filtroNome().trim().toLowerCase();
    return this.facade.items()
      .filter(item => item.estrutura === 'cadeia_de_valor')
      .filter(item => !termo.length || item.nome.toLowerCase().includes(termo));
  });

  ngOnInit(): void {
    this.facade.load();
  }

  atualizarFiltro(valor: string) {
    this.filtroNome.set(valor ?? '');
  }

  abrirNovo() {
    this.itemEmEdicao.set(null);
    this.form.reset({ estrutura: '', nome: '', descricao: '' });
    this.modalFormularioAberto.set(true);
  }

  abrirEdicao(item: TipoObjetivo) {
    this.itemEmEdicao.set(item);
    this.form.reset({
      estrutura: item.estrutura,
      nome: item.nome,
      descricao: item.descricao ?? ''
    });
    this.modalFormularioAberto.set(true);
  }

  fecharModalFormulario() {
    this.modalFormularioAberto.set(false);
    this.itemEmEdicao.set(null);
    this.form.reset({ estrutura: '', nome: '', descricao: '' });
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const item = this.itemEmEdicao();
    const payload = {
      estrutura: this.form.controls.estrutura.value as Estrutura,
      nome: this.form.controls.nome.value.trim(),
      descricao: this.form.controls.descricao.value.trim() || null
    };

    if (!payload.nome.length) {
      this.form.controls.nome.setErrors({ required: true });
      return;
    }

    if (item) {
      this.facade.update(item.id, payload, () => {
        this.message.success('Elemento atualizado com sucesso.');
        this.fecharModalFormulario();
      });
      return;
    }

    this.facade.create(payload, () => {
      this.message.success('Elemento cadastrado com sucesso.');
      this.fecharModalFormulario();
    });
  }

  abrirExclusao(item: TipoObjetivo) {
    this.itemParaExcluir.set(item);
  }

  cancelarExclusao() {
    this.itemParaExcluir.set(null);
  }

  confirmarExclusao() {
    const item = this.itemParaExcluir();
    if (!item) return;

    this.facade.remove(item.id, () => {
      this.message.success('Elemento removido com sucesso.');
      this.itemParaExcluir.set(null);
    });
  }
}
