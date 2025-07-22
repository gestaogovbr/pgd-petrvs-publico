import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  showError(message: string, title = 'Erro') {
    this.showToast(message, title, 'bg-danger text-white');
  }

  showSuccess(message: string, title = 'Sucesso') {
    this.showToast(message, title, 'bg-success text-white');
  }

  private showToast(message: string, title: string, className: string) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toastEl = document.createElement('div');
    toastEl.className = `toast ${className}`;
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    toastEl.innerHTML = `
      <div class="toast-header ${className}">
        <strong class="me-auto">${title}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Fechar"></button>
      </div>
      <div class="toast-body">${message}</div>
    `;

    toastContainer.appendChild(toastEl);
    const toastBootstrap = new (window as any).bootstrap.Toast(toastEl, { delay: 5000 });
    toastBootstrap.show();

    toastEl.addEventListener('hidden.bs.toast', () => {
      toastEl.remove();
    });
  }
}
