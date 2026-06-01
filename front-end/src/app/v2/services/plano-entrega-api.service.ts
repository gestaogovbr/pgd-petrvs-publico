import {Injectable, inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, map} from "rxjs";
import {GlobalsService} from "src/app/services/globals.service";
import { PlanoEntregaEntrega } from "src/app/models/plano-entrega-entrega.model";

export interface PlanoEntregaItem {
	id: string;
	nome: string;
	numero: number;
	status: string;
	data_inicio: string;
	data_fim: string | null;
}

@Injectable()
export class PlanoEntregaApiService {
	private readonly http = inject(HttpClient);
	private readonly gb = inject(GlobalsService);
	private readonly base = "/api/v2/plano-entrega";

	buscarPorUnidade(unidadeId: string, data_inicio: Date | null, data_fim: Date | null): Observable<PlanoEntregaItem[]> {
		const params: Record<string, string> = {unidade_id: unidadeId};
		if (data_inicio) params['data_inicio'] = this.toIsoDate(data_inicio);
		if (data_fim) params['data_fim'] = this.toIsoDate(data_fim);
		return this.http
			.get<{
				success: boolean;
				data: PlanoEntregaItem[];
			}>(`${this.gb.servidorURL}${this.base}`, {params})
			.pipe(
				map((response) => (Array.isArray(response?.data) ? response.data : [])),
			);
	}

	private toIsoDate(date: Date): string {
		const d = date instanceof Date ? date : new Date(date);
		return d.toISOString().split('T')[0];
	}

	queryEntregasPorPlano(planoEntregaId: string): Observable<PlanoEntregaEntrega[]> {
		return this.http
			.get<{
				success: boolean;
				data: PlanoEntregaEntrega[];
			}>(`${this.gb.servidorURL}${this.base}/${planoEntregaId}/entrega`)
			.pipe(map((res) => (Array.isArray(res?.data) ? res.data : [])));
	}
}
