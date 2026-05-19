import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { TipoObjetivoFacade } from '../application/tipo-objetivo.facade';
import { TipoObjetivo } from '../domain/types';
import { MessageService } from 'src/app/v2/services/message.service';

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

  readonly form = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.maxLength(250)]],
    descricao: ['', [Validators.maxLength(1000)]]
  });

  readonly itensFiltrados = computed(() => {
    const termo = this.filtroNome().trim().toLowerCase();
    if (!termo.length) return this.facade.items();
    return this.facade.items().filter(item => item.nome.toLowerCase().includes(termo));
  });

  ngOnInit(): void {
    this.facade.load();
  }

  atualizarFiltro(valor: string) {
    this.filtroNome.set(valor ?? '');
  }

  abrirNovo() {
    this.itemEmEdicao.set(null);
    this.form.reset({ nome: '', descricao: '' });
    this.modalFormularioAberto.set(true);
  }

  abrirEdicao(item: TipoObjetivo) {
    this.itemEmEdicao.set(item);
    this.form.reset({
      nome: item.nome,
      descricao: item.descricao ?? ''
    });
    this.modalFormularioAberto.set(true);
  }

  fecharModalFormulario() {
    this.modalFormularioAberto.set(false);
    this.itemEmEdicao.set(null);
    this.form.reset({ nome: '', descricao: '' });
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const item = this.itemEmEdicao();
    const payload = {
      nome: this.form.controls.nome.value.trim(),
      descricao: this.form.controls.descricao.value.trim() || null
    };

    if (!payload.nome.length) {
      this.form.controls.nome.setErrors({ required: true });
      return;
    }

    if (item) {
      this.facade.update(item.id, payload, () => {
        this.message.success('Tipo de objetivo atualizado com sucesso.');
        this.fecharModalFormulario();
      });
      return;
    }

    this.facade.create(payload, () => {
      this.message.success('Tipo de objetivo cadastrado com sucesso.');
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
      this.message.success('Tipo de objetivo removido com sucesso.');
      this.itemParaExcluir.set(null);
    });
  }
}
