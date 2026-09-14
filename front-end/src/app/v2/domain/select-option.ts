export interface SelectOption {
  value: string;
  label: string;
  selected?: boolean;
}

/**
 * Valor sentinela para a opção "Todos"/"Todas" nos `br-select`.
 *
 * @remarks
 * O `br-select-option` do govbr-ds (v2.x) trata `value=''` como valor ausente e deriva
 * o value a partir do `label`, quebrando o padrão de opção vazia. Usamos um token explícito
 * para representar "sem filtro" e o tratamos como ausência de valor na lógica de filtro.
 */
export const TODOS_SENTINEL = '__todos__';
