import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FilterStorageService {
  save(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // localStorage indisponível ou cheio — ignorar silenciosamente
    }
  }

  load<T>(key: string): T | null {
    try {
      const saved = localStorage.getItem(key);
      return saved ? (JSON.parse(saved) as T) : null;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  }

  clear(key: string): void {
    localStorage.removeItem(key);
  }
}
