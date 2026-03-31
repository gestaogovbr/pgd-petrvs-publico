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

	buscarPorUnidade(unidadeId: string): Observable<PlanoEntregaItem[]> {
		return this.http
			.get<{
				success: boolean;
				data: PlanoEntregaItem[];
			}>(`${this.gb.servidorURL}${this.base}`, {params: {unidade_id: unidadeId}})
			.pipe(
				map((response) => (Array.isArray(response?.data) ? response.data : [])),
			);
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
