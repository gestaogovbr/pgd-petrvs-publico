import { ModalidadePgdService } from 'src/app/services/modalidade-pgd.service';
import { modalidadeDivergenteDoSiape } from './modalidade-divergente';

describe('modalidadeDivergenteDoSiape', () => {
  const service = new ModalidadePgdService();

  it('retorna false quando nenhuma modalidade foi selecionada', () => {
    expect(modalidadeDivergenteDoSiape(service, '', 'integral')).toBeFalse();
  });

  it('retorna true quando o SIAPE não possui modalidade registrada', () => {
    expect(modalidadeDivergenteDoSiape(service, 'integral', null)).toBeTrue();
  });

  it('retorna false quando os valores normalizados são equivalentes', () => {
    expect(modalidadeDivergenteDoSiape(service, 'integral', 'Teletrabalho (Integral)')).toBeFalse();
  });

  it('retorna true quando os valores normalizados divergem', () => {
    expect(modalidadeDivergenteDoSiape(service, 'parcial', 'integral')).toBeTrue();
  });
});
