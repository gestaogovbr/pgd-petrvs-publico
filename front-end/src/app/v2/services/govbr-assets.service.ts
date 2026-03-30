import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { defineCustomElements } from '@govbr-ds/webcomponents/dist/loader';

@Injectable()
export class GovBrAssetsService {
  private readonly document = inject(DOCUMENT);
  private loaded = false;

  load() {
    if (this.loaded) return;
    if (typeof window !== 'undefined') {
      defineCustomElements(window);
    }
    this.injectStylesheet('https://unpkg.com/@govbr-ds/core/dist/core-tokens.min.css', 'govbr-core-tokens');
    this.injectStylesheet('https://unpkg.com/@govbr-ds/core/dist/core.min.css', 'govbr-core');
    this.loaded = true;
  }

  private injectStylesheet(href: string, id: string) {
    if (this.document.getElementById(id)) return;
    const link = this.document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = href;
    this.document.head.appendChild(link);
  }

  private injectScript(src: string, id: string) {
    if (this.document.getElementById(id)) return;
    const script = this.document.createElement('script');
    script.id = id;
    script.type = 'text/javascript';
    script.src = src;
    this.document.body.appendChild(script);
  }
}
