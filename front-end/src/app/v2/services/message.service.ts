import { Injectable } from '@angular/core';

export type MessageState = 'success' | 'danger' | 'warning' | 'info';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private container: HTMLElement | null = null;

  show(message: string, state: MessageState, title?: string) {
    const container = this.getOrCreateContainer();

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `<br-message
      state="${state}"
      message="${this.escape(message)}"
      ${title ? `message-title="${this.escape(title)}"` : ''}
      is-closable="true"
      auto-remove="true"
    ></br-message>`;

    const el = wrapper.firstElementChild as HTMLElement;
    container.appendChild(el);

    el.addEventListener('brDidClose', () => el.remove());
    setTimeout(() => { if (el.isConnected) el.remove(); }, 6000);
  }

  private escape(str: string): string {
    return str.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  success(message: string, title?: string) { this.show(message, 'success', title); }
  error(message: string, title?: string) { this.show(message, 'danger', title); }
  warning(message: string, title?: string) { this.show(message, 'warning', title); }
  info(message: string, title?: string) { this.show(message, 'info', title); }

  private getOrCreateContainer(): HTMLElement {
    if (!this.container || !document.body.contains(this.container)) {
      this.container = document.getElementById('messageContainer') ?? this.createContainer();
    }
    return this.container;
  }

  private createContainer(): HTMLElement {
    const div = document.createElement('div');
    div.id = 'messageContainer';
    div.style.cssText = 'position:fixed;top:1rem;right:1rem;z-index:9999;display:flex;flex-direction:column;gap:0.5rem;min-width:320px;max-width:480px;';
    document.body.appendChild(div);
    this.container = div;
    return div;
  }
}
