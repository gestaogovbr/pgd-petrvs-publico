import { Component, Input } from '@angular/core';
import { Documento } from 'src/app/models/documento.model';
import { DocumentoService } from '../documento.service';

@Component({
  selector: 'documentos-badge',
  templateUrl: './documentos-badge.component.html',
  styleUrls: ['./documentos-badge.component.scss']
})
export class DocumentosBadgeComponent {
  @Input() documento?: Documento;
  @Input() emptyMessage?: string;
  @Input() signatures?: string;
  @Input() maxWidth?: number;
  @Input() noRounded?: string;
  @Input() withLink?: string;
  @Input() color: string = "light";

  constructor(public documentoService: DocumentoService) {}

  public get show(): boolean {
    return !!this.documento || !!this.emptyMessage?.length;
  }

  public get icon(): string {
    return this.isLinkUrl ? "bi bi-link-45deg" :
      this.isLinkSei ? (this.documento?.link?.numero_processo?.length ? 'bi bi-folder-symlink' : 'bi bi-x-lg') : 
      this.isPdf ? "bi bi-file-earmark-pdf" : "bi bi-filetype-html";
  }  

  public get linkIcon(): string {
    return this.documento?.link?.tipo == "SEI" ? (this.documento?.link?.numero_processo?.length ? 'bi bi-folder-symlink' : 'bi bi-x-lg') : "bi bi-link-45deg";
  }

  public get hasLink(): boolean {
    return ["SEI", "URL"].includes(this.documento?.link?.tipo || "");
  }

  public get isLinkSei(): boolean {
    return this.documento?.tipo == "LINK" && this.documento?.link?.tipo == "SEI";
  }

  public get isLinkUrl(): boolean {
    return this.documento?.tipo == "LINK" && this.documento?.link?.tipo == "URL";
  }

  public get isHtml(): boolean {
    return this.documento?.tipo == "HTML";
  }

  public get isPdf(): boolean {
    return this.documento?.tipo == "PDF";
  }

  public get isSignatures(): boolean {
    return this.signatures != undefined;
  }

  public get isNoRounded(): boolean {
    return this.noRounded != undefined;
  }

  public get isWithLink(): boolean {
    return this.withLink != undefined;
  }
}

