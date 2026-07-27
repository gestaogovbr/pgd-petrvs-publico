import { ElementRef, Injectable, signal } from '@angular/core';

/**
 * Service reutilizável para controle de pan/zoom em superfícies SVG.
 *
 * Uso:
 * 1. Instanciar (ou injetar) no componente
 * 2. Chamar `onPanDown` no `(pointerdown)` do SVG
 * 3. Chamar `onPointerMove`/`onPointerUp` nos `@HostListener` de window
 * 4. Usar `viewBoxString()` computed no `[attr.viewBox]` do SVG
 */
@Injectable()
export class SvgPanZoomService {
  readonly zoom = signal(1);
  readonly panX = signal(0);
  readonly panY = signal(0);

  private panDrag: { startX: number; startY: number; originPanX: number; originPanY: number } | null = null;
  private svgRef: ElementRef<SVGSVGElement> | null = null;
  private viewBoxFn: (() => string) | null = null;

  readonly MIN_ZOOM = 0.55;
  readonly MAX_ZOOM = 2.5;
  readonly ZOOM_STEP = 0.1;

  setSvgRef(ref: ElementRef<SVGSVGElement>): void {
    this.svgRef = ref;
  }

  setViewBoxFn(fn: () => string): void {
    this.viewBoxFn = fn;
  }

  reset(): void {
    this.zoom.set(1);
    this.panX.set(0);
    this.panY.set(0);
    this.panDrag = null;
  }

  zoomIn(): void {
    this.zoom.update(v => Math.min(this.MAX_ZOOM, +(v + this.ZOOM_STEP).toFixed(2)));
  }

  zoomOut(): void {
    this.zoom.update(v => Math.max(this.MIN_ZOOM, +(v - this.ZOOM_STEP).toFixed(2)));
  }

  onPanDown(event: PointerEvent): void {
    if (event.button !== 0) return;
    event.preventDefault();
    this.panDrag = {
      startX: event.clientX,
      startY: event.clientY,
      originPanX: this.panX(),
      originPanY: this.panY()
    };
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.panDrag || !this.svgRef?.nativeElement) return;

    const rect = this.svgRef.nativeElement.getBoundingClientRect();
    const viewBox = this.viewBoxFn?.() ?? '0 0 800 500';
    const parts = viewBox.split(' ').map(Number);
    const scaleX = parts[2] / rect.width;
    const scaleY = parts[3] / rect.height;

    this.panX.set(this.panDrag.originPanX - (event.clientX - this.panDrag.startX) * scaleX);
    this.panY.set(this.panDrag.originPanY - (event.clientY - this.panDrag.startY) * scaleY);
  }

  onPointerUp(): void {
    this.panDrag = null;
  }

  /**
   * Calcula o viewBox centrado num ponto focal.
   */
  computeViewBox(canvasW: number, canvasH: number, focalX?: number, focalY?: number): string {
    const z = this.zoom();
    const w = Math.max(canvasW, 800) / z;
    const h = Math.max(canvasH, 520) / z;
    const cx = (focalX ?? canvasW / 2) + this.panX();
    const cy = (focalY ?? canvasH / 2) + this.panY();
    return `${cx - w / 2} ${cy - h / 2} ${w} ${h}`;
  }
}
