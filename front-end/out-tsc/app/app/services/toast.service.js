import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ToastService = class ToastService {
    showError(message, title = 'Erro') {
        this.showToast(message, title, 'bg-danger text-white');
    }
    showSuccess(message, title = 'Sucesso') {
        this.showToast(message, title, 'bg-success text-white');
    }
    showToast(message, title, className) {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer)
            return;
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
        const toastBootstrap = new window.bootstrap.Toast(toastEl, { delay: 5000 });
        toastBootstrap.show();
        toastEl.addEventListener('hidden.bs.toast', () => {
            toastEl.remove();
        });
    }
};
ToastService = __decorate([
    Injectable({ providedIn: 'root' })
], ToastService);
export { ToastService };
//# sourceMappingURL=toast.service.js.map