import { ModalidadePgdService } from 'src/app/services/modalidade-pgd.service';

/** Indica se a modalidade selecionada diverge da registrada no SIAPE para o participante. */
export function modalidadeDivergenteDoSiape(
  modalidadePgdService: ModalidadePgdService,
  selecionada: string | null | undefined,
  modalidadeSiape: string | null | undefined
): boolean {
  const selecionadaNorm = modalidadePgdService.normalize(selecionada);
  if (!selecionadaNorm) return false;

  const siapeNorm = modalidadePgdService.normalize(modalidadeSiape);
  if (!siapeNorm) return true;

  return selecionadaNorm !== siapeNorm;
}

export function modalidadeSiapeNormalizada(
  modalidadePgdService: ModalidadePgdService,
  modalidadeSiape: string | null | undefined
): string {
  return modalidadePgdService.normalize(modalidadeSiape) ?? '';
}
