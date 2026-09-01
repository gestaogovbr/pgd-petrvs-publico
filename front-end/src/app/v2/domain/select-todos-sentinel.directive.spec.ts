import { FormControl, NgControl } from '@angular/forms';

import { SelectTodosSentinelDirective } from './select-todos-sentinel.directive';
import { TODOS_SENTINEL } from './select-option';

/**
 * Cria a diretiva com um `NgControl` real (via `FormControl`) para exercitar a
 * escrita no control sem depender do `ControlValueAccessor` da lib do govbr-ds.
 */
function criarDiretiva(valorInicial: string | null): {
  directive: SelectTodosSentinelDirective;
  control: FormControl;
} {
  const control = new FormControl(valorInicial);
  const ngControl = { control } as unknown as NgControl;
  return { directive: new SelectTodosSentinelDirective(ngControl), control };
}

function changeEvent(value: string): Event {
  const event = new Event('change');
  Object.defineProperty(event, 'target', { value: { value }, enumerable: true });
  return event;
}

describe('SelectTodosSentinelDirective', () => {
  describe('inicialização', () => {
    it('assume o sentinela quando o control inicia vazio', () => {
      const { directive, control } = criarDiretiva('');
      directive.ngOnInit();
      expect(control.value).toBe(TODOS_SENTINEL);
    });

    it('assume o sentinela quando o control inicia nulo', () => {
      const { directive, control } = criarDiretiva(null);
      directive.ngOnInit();
      expect(control.value).toBe(TODOS_SENTINEL);
    });

    it('mantém o valor real quando o control já inicia preenchido', () => {
      const { directive, control } = criarDiretiva('modalidade-1');
      directive.ngOnInit();
      expect(control.value).toBe('modalidade-1');
    });

    it('mantém o sentinela quando o control já inicia com o sentinela', () => {
      const { directive, control } = criarDiretiva(TODOS_SENTINEL);
      directive.ngOnInit();
      expect(control.value).toBe(TODOS_SENTINEL);
    });
  });

  describe('ao desmarcar (change com valor vazio)', () => {
    it('volta para o sentinela quando o valor emitido é vazio', () => {
      const { directive, control } = criarDiretiva('modalidade-1');
      directive.onChange(changeEvent(''));
      expect(control.value).toBe(TODOS_SENTINEL);
    });

    it('não sobrescreve quando o change emite um valor real', () => {
      const { directive, control } = criarDiretiva('modalidade-2');
      directive.onChange(changeEvent('modalidade-2'));
      expect(control.value).toBe('modalidade-2');
    });
  });

  describe('sem NgControl', () => {
    it('não lança erro quando não há control associado', () => {
      const directive = new SelectTodosSentinelDirective(null as unknown as NgControl);
      expect(() => directive.ngOnInit()).not.toThrow();
      expect(() => directive.onChange(changeEvent(''))).not.toThrow();
    });
  });
});
