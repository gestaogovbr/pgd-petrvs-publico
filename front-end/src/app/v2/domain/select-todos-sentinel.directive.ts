import { Directive, HostListener, OnInit, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { TODOS_SENTINEL } from './select-option';

/**
 * Garante que um `br-select` de filtro (govbr-ds v2.x) nunca fique sem seleção,
 * mantendo sempre ao menos a opção sentinela "Todos".
 *
 * @remarks
 * No modo simples, o `br-select` permite clicar novamente na opção selecionada para
 * desmarcá-la, deixando o valor vazio. Como esses selects de filtro sempre devem ter
 * uma opção ativa — e "sem filtro" já é representado por {@link TODOS_SENTINEL} —, um
 * valor vazio é ambíguo e deixa o campo em branco.
 *
 * A diretiva assegura o invariante "o control nunca fica vazio":
 * - na inicialização, se o control estiver vazio, assume {@link TODOS_SENTINEL};
 * - ao desmarcar (evento `change` com valor vazio), volta para {@link TODOS_SENTINEL}.
 *
 * A diretiva é opt-in: aplique-a apenas em selects de filtro que possuam a opção "Todos".
 * Selects de formulário que aceitam valor vazio não devem usá-la.
 */
@Directive({
  selector: 'br-select[brTodosSentinel]',
  standalone: true,
})
export class SelectTodosSentinelDirective implements OnInit {
  constructor(@Optional() @Self() private readonly ngControl: NgControl) {}

  ngOnInit(): void {
    if (this.isVazio(this.ngControl?.control?.value)) {
      this.aplicarSentinela();
    }
  }

  @HostListener('change', ['$event'])
  onChange(event: Event): void {
    const value = (event.target as HTMLInputElement | null)?.value;
    if (this.isVazio(value)) {
      this.aplicarSentinela();
    }
  }

  private aplicarSentinela(): void {
    this.ngControl?.control?.setValue(TODOS_SENTINEL);
  }

  private isVazio(value: unknown): boolean {
    return value == null || value === '';
  }
}
