export class Expediente {
    constructor(value) {
        this.domingo = [];
        this.segunda = [];
        this.terca = [];
        this.quarta = [];
        this.quinta = [];
        this.sexta = [];
        this.sabado = [];
        this.especial = [];
        if (value)
            Object.assign(this, value);
    }
}
//# sourceMappingURL=expediente.model.js.map