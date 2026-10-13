import { Injectable } from '@angular/core';

export type MessageState = 'success' | 'danger' | 'warning' | 'info';

export interface MessageOptions {
  /** When true, `message` is treated as HTML and rendered in the message-body slot. */
  html?: boolean;
}

@Injectable({ providedIn: 'root' })
export class MessageService {
  private container: HTMLElement | null = null;

  show(message: string, state: MessageState, title?: string, options?: MessageOptions) {
    const container = this.getOrCreateContainer();
    const el = options?.html
      ? this.createHtmlMessage(message, state, title)
      : this.createTextMessage(message, state, title);

    container.appendChild(el);
    el.addEventListener('brDidClose', () => el.remove());
    setTimeout(() => { if (el.isConnected) el.remove(); }, options?.html ? 10000 : 6000);
  }

  success(message: string, title?: string, options?: MessageOptions) {
    this.show(message, 'success', title, options);
  }
  error(message: string, title?: string, options?: MessageOptions) {
    this.show(message, 'danger', title, options);
  }
  warning(message: string, title?: string, options?: MessageOptions) {
    this.show(message, 'warning', title, options);
  }
  info(message: string, title?: string, options?: MessageOptions) {
    this.show(message, 'info', title, options);
  }

  private createTextMessage(message: string, state: MessageState, title?: string): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `<br-message
      state="${state}"
      message="${this.escape(message)}"
      ${title ? `message-title="${this.escape(title)}"` : ''}
      is-closable="true"
      auto-remove="true"
    ></br-message>`;
    return wrapper.firstElementChild as HTMLElement;
  }

  private createHtmlMessage(messageHtml: string, state: MessageState, title?: string): HTMLElement {
    const el = document.createElement('br-message');
    el.setAttribute('state', state);
    // Non-empty message keeps the standard layout; slotted body replaces the text.
    el.setAttribute('message', ' ');
    if (title) {
      el.setAttribute('message-title', title);
    }
    el.setAttribute('is-closable', 'true');
    el.setAttribute('auto-remove', 'true');

    const body = document.createElement('span');
    body.slot = 'message-body';
    body.innerHTML = messageHtml;
    el.appendChild(body);
    return el;
  }

  private escape(str: string): string {
    return str.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

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
