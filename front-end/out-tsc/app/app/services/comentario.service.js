import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Comentario } from '../models/comentario';
let ComentarioService = class ComentarioService {
    constructor(util, auth, dao) {
        this.util = util;
        this.auth = auth;
        this.dao = dao;
    }
    comentarioLevel(comentario) {
        return (comentario.path || "").split("").filter(x => x == "/");
    }
    orderComentarios(comentarios) {
        /* O algoritimo irá falhar se existir algum filho com data_comentario anterior a de seu pai, mas isso não deve acontecer nunca */
        let ordered = comentarios?.sort((a, b) => {
            a.path = a.path || ""; /* Garante que o campo não esteja null */
            b.path = b.path || ""; /* Garante que o campo não esteja null */
            if (a.path == b.path) { /* Situação 1: Paths iguais */
                return a.data_comentario.getTime() < b.data_comentario.getTime() ? -1 : 1;
            }
            else { /* Situação 2: Paths diferentes, deverá ser encontrado o menor nível comum entre eles para poder comparar */
                let pathA = a.path.split("/");
                let pathB = b.path.split("/");
                let common = this.util.commonBegin(pathA, pathB);
                let dataHoraA = (comentarios.find(x => x.id == (pathA[common.length] || a.id) && x.id != b.id) || a).data_comentario.getTime();
                let dataHoraB = (comentarios.find(x => x.id == (pathB[common.length] || b.id) && x.id != a.id) || b).data_comentario.getTime();
                return dataHoraA == dataHoraB ? 0 : (dataHoraA < dataHoraB ? -1 : 1);
            }
        }) || [];
        return ordered;
    }
    newComentario(controlOrItems, grid, pai) {
        const comentario = new Comentario();
        const comentarios = Array.isArray(controlOrItems) ? controlOrItems : controlOrItems.value || [];
        comentario.id = this.dao.generateUuid();
        comentario.path = pai ? pai.path + "/" + pai.id : "";
        comentario.data_comentario = this.auth.hora;
        comentario.usuario_id = this.auth.usuario.id;
        comentario.comentario_id = pai?.id || null;
        comentario.usuario = this.auth.usuario;
        comentario._status = "ADD";
        comentarios.push(comentario);
        if (Array.isArray(controlOrItems)) {
            controlOrItems = this.orderComentarios(comentarios);
        }
        else {
            controlOrItems.setValue(this.orderComentarios(comentarios));
        }
        grid.adding = true;
        grid.edit(comentario);
        return comentario;
    }
};
ComentarioService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ComentarioService);
export { ComentarioService };
//# sourceMappingURL=comentario.service.js.map