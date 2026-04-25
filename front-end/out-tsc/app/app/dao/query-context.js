export class QueryContext {
    static { this.DEFAULT_LIMIT = 50; }
    set loading(value) {
        if (this._loading != value) {
            this._loading = value;
            if (this.onLoadingChange)
                this.onLoadingChange(value);
        }
    }
    get loading() {
        return this._loading;
    }
    constructor(dao, collection, subject, options = {}, events = {}) {
        this.dao = dao;
        this.collection = collection;
        this.subject = subject;
        this.options = options;
        this.events = events;
        this.rows = [];
        this.cumulate = false;
        this._loading = false;
        /* Pagination */
        this.page = 1;
        this.count = 0;
        this.enablePrior = false;
        this.enableNext = false;
    }
    asPromise() {
        return new Promise((resolve, reject) => this.subject.asObservable().subscribe(resolve, reject));
    }
    firstOrDefault(emptyResult = undefined) {
        return new Promise((resolve, reject) => this.subject.asObservable().subscribe(value => resolve(value?.length ? value[0] : emptyResult), reject));
    }
    order(orderBy) {
        this.options.orderBy = orderBy;
        this.rows = [];
        this.refresh();
    }
    nextPage() {
        this.dao.nextPage(this);
    }
    priorPage() {
        this.dao.priorPage(this);
    }
    refresh() {
        return this.dao.refresh(this);
    }
    refreshId(id, extraJoin) {
        let join = [...(this.options.join || []), ...(extraJoin || [])];
        this.loadingId = id;
        return this.dao.getById(id, join || []).then(row => {
            const index = this.rows.findIndex(r => r.id == id);
            if (row) {
                if (index >= 0) {
                    this.rows[index] = row;
                }
                else {
                    this.rows.push(row);
                }
                this.subject.next(this.rows);
            }
            return row;
        }).finally(() => this.loadingId = undefined);
    }
    removeId(id) {
        const index = this.rows.findIndex(x => x.id == id);
        if (index >= 0)
            this.rows.splice(index, 1);
        this.subject.next(this.rows);
    }
    reload(options) {
        if (options) {
            this.options = Object.assign(this.options, options);
        }
        this.page = 1;
        this.count = 0;
        this.enablePrior = false;
        this.enableNext = false;
        this.rows = [];
        this.dao.contextQuery(this);
    }
    getAll() {
        return new Promise((resolve, reject) => {
            const options = this.options ? Object.keys(this.options).filter(key => key != "limit").reduce((res, key) => (res[key] = this.options[key], res), {}) : undefined;
            this.dao.query(options, { resolve: resolve, reject: reject });
        });
    }
    getAllIds(extraFields = []) {
        const options = this.options ? Object.keys(this.options).filter(key => key != "limit").reduce((res, key) => (res[key] = this.options[key], res), {}) : undefined;
        return this.dao.getAllIds(options, extraFields);
    }
}
//# sourceMappingURL=query-context.js.map