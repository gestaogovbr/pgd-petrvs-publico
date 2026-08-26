import { Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { MuralAviso } from '../models/mural-aviso.model';
import { DaoBaseService, queryEvents } from './dao-base.service';
import { QueryContext } from './query-context';
import { QueryOptions } from './query-options';

@Injectable({ providedIn: 'root' })
export class MuralAvisoDaoService extends DaoBaseService<MuralAviso> {

  constructor(protected injector: Injector) {
    super("MuralAviso", injector);
  }

  private get baseUrl(): string {
    return 'api/mural-aviso';
  }

  public getById(id: string, join: string[] = []): Promise<MuralAviso | null> {
    return new Promise<MuralAviso | null>((resolve, reject) => {
      this.server.get(this.baseUrl + '/' + id).subscribe({
        next: (response: any) => {
          const data = response?.data;
          resolve(data ? this.getRow(data) : null);
        },
        error: (error: any) => reject(error)
      });
    });
  }

  public query(options: QueryOptions = {}, events: queryEvents = {}): QueryContext<MuralAviso> {
    const context = new QueryContext<MuralAviso>(
      this, 'MuralAviso', new Subject<any>(), options, events
    );
    return this.contextQuery(context);
  }

  public contextQuery(context: QueryContext<MuralAviso>): QueryContext<MuralAviso> {
    if (context.events.before) context.events.before();
    context.loading = true;
    context.enablePrior = false;
    context.enableNext = false;

    this.server.get(this.baseUrl).subscribe({
      next: (response: any) => {
        const rows = (response?.data?.data || []).map((row: any) => this.getRow(row));
        context.rows = rows;
        context.loading = false;
        context.enableNext = false;
        context.enablePrior = false;
        context.subject.next(rows);
        if (context.events.resolve) context.events.resolve(rows);
        if (context.events.after) context.events.after();
      },
      error: (error: any) => {
        context.subject.error(error);
        if (context.events.reject) context.events.reject(error);
      }
    });

    return context;
  }

  public save(entity: MuralAviso, join: string[] = []): Promise<MuralAviso> {
    return new Promise<MuralAviso>((resolve, reject) => {
      const payload = {
        titulo: entity.titulo,
        conteudo: entity.conteudo,
        destinatario: entity.destinatario,
        tenant_id: entity.destinatario === 'TODOS' ? null : entity.tenant_id,
        data_publicacao: this.toLocalDateTimeString(entity.data_publicacao),
        data_expiracao: this.toLocalDateTimeString(entity.data_expiracao),
      };

      const isNew = !entity.id || entity.id.length === 0;

      if (isNew) {
        this.server.post(this.baseUrl, payload).subscribe({
          next: (response: any) => resolve(this.getRow(response?.data)),
          error: (error: any) => reject(error)
        });
      } else {
        this.server.post(this.baseUrl + '/' + entity.id + '?_method=PUT', payload).subscribe({
          next: (response: any) => resolve(this.getRow(response?.data)),
          error: (error: any) => reject(error)
        });
      }
    });
  }

  private toLocalDateTimeString(date: any): string {
    if (!date) return '';
    const d = date instanceof Date ? date : new Date(date);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  public delete(entity: MuralAviso | string): Promise<void> {
    const id = typeof entity === 'string' ? entity : entity.id;
    return new Promise<void>((resolve, reject) => {
      this.server.delete(this.baseUrl + '/' + id).subscribe({
        next: () => resolve(),
        error: (error: any) => reject(error)
      });
    });
  }
}
