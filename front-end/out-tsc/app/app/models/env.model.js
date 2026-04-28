import { Base } from './base.model';
export class Env extends Base {
    constructor(data) {
        super();
        this.name = "";
        this.value = "";
        this.initialization(data);
    }
}
//# sourceMappingURL=env.model.js.map