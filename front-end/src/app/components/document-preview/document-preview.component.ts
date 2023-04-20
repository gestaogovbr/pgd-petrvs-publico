import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.scss']
})
export class DocumentPreviewComponent implements OnInit {
  @Input() html?: string;
  @Input() emptyDocumentMensage?: string;
  @Input() noMargin?: string;

  constructor() { }

  ngOnInit(): void {
  }

  public get isNoMargin(): boolean {
    return this.noMargin != undefined;
  }

}
