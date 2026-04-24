import { Injectable } from '@angular/core';
import { LookupItem } from './lookup.service';

export type ModalidadePgdValor = 'presencial' | 'integral' | 'parcial' | 'no exterior' | 'no exterior substituicao';

@Injectable({
  providedIn: 'root'
})
export class ModalidadePgdService {
  private readonly modalidadesComPedagio = ['parcial', 'integral', 'no exterior', 'no exterior substituicao'];

  public readonly items: LookupItem[] = [
    { key: null, value: 'Não definida' },
    { key: 'presencial', value: 'Presencial' },
    { key: 'parcial', value: 'Teletrabalho (Parcial)' },
    { key: 'integral', value: 'Teletrabalho (Integral)' },
    { key: 'no exterior', value: 'Teletrabalho no exterior' },
    { key: 'no exterior substituicao', value: 'Teletrabalho no exterior (substituição)' }
  ];

  public normalize(value: unknown): string | null {
    if (value === null || value === undefined) return null;
    if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') return null;

    const original = String(value).trim();
    if (!original) return null;

    const normalized = original.toLocaleLowerCase('pt-BR')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    if (normalized.includes('presencial')) return 'presencial';
    if (normalized.includes('parcial')) return 'parcial';
    if (normalized.includes('integral')) return 'integral';
    if (normalized.includes('substituicao') || normalized.includes('inciso viii')) return 'no exterior substituicao';
    if (normalized.includes('exterior')) return 'no exterior';

    return normalized;
  }

  public label(value: unknown): string {
    const normalized = this.normalize(value);
    const found = this.items.find(item => item.key === normalized);
    if (found?.value) return found.value;
    if (value === null || value === undefined) return 'Não definida';
    if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') return 'Não definida';

    return String(value).trim() || 'Não definida';
  }

  public exigePedagio(value: unknown): boolean {
    const normalized = this.normalize(value);

    return !!normalized && this.modalidadesComPedagio.includes(normalized);
  }

  public atividadeEsforco(_value: unknown): boolean {
    return false;
  }

  public atividadeTempoDespendido(_value: unknown): boolean {
    return false;
  }
}
