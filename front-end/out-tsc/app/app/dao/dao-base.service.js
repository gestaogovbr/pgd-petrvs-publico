import { Subject } from 'rxjs';
import { GlobalsService } from '../services/globals.service';
import { ServerService } from '../services/server.service';
import { QueryContext } from './query-context';
import { v4 as uuid } from 'uuid';
import { UtilService } from '../services/util.service';
export class DaoBaseService {
    get gb() {
        this._gb = this._gb || this.injector.get(GlobalsService);
        return this._gb;
    }
    get server() {
        this._server =
            this._server || this.injector.get(ServerService);
        return this._server;
    }
    get util() {
        this._util = this._util || this.injector.get(UtilService);
        return this._util;
    }
    constructor(collection, injector) {
        this.collection = collection;
        this.injector = injector;
        //public searchFields: string[] = [];
        this.inputSearchConfig = { searchFields: [] };
        this.PREFIX_URL = 'api';
    }
    datasource(entity, deeps) {
        return this.values(entity, this.dataset(deeps));
    }
    dataset(deeps) {
        return [];
    }
    values(entity, dataset) {
        return dataset.reduce((a, v) => {
            const empty = typeof entity[v.field] == 'undefined' || entity[v.field] == null;
            if (v.type == 'OBJECT' && !empty) {
                a[v.field] = this.values(entity[v.field], v.fields || []);
            }
            else if (v.type == 'ARRAY' && Array.isArray(entity[v.field])) {
                a[v.field] = entity[v.field].map((x) => this.values(x, v.fields || []));
            }
            else if ((!v.type || v.type == 'VALUE') && !empty) {
                a[v.field] = v.lookup
                    ? v.lookup.find((x) => x.key == entity[v.field])?.value ||
                        entity[v.field]
                    : entity[v.field];
            }
            else if (v.type == 'TEMPLATE' && !empty) {
                a[v.field] = entity[v.field];
            }
            else if (v.type == 'DATE' && !empty) {
                a[v.field] = this.util.getDateFormatted(entity[v.field]);
            }
            else if (v.type == 'DATETIME' && !empty) {
                a[v.field] = this.util.getDateTimeFormatted(entity[v.field]);
            }
            else if (v.type == 'LAMBDA' && v.lambda) {
                a[v.field] = v.lambda(entity);
            }
            return a;
        }, {});
    }
    deepsFilter(fields, deeps) {
        fields = fields.filter((x) => typeof deeps == 'undefined' ||
            !['ARRAY', 'OBJECT'].includes(x.type || 'VALUE') ||
            deeps?.includes(x.field));
        return fields.map((x) => ['ARRAY', 'OBJECT'].includes(x.type || 'VALUE') && x.dao
            ? Object.assign(x, { fields: x.dao.dataset([]) })
            : x);
    }
    deep(deeps, field, label, type, dao) {
        return typeof deeps == 'undefined' || deeps.includes(field)
            ? { field, label, type, fields: dao.dataset([]) }
            : undefined;
    }
    getSelectItemText(values) {
        return this.inputSearchConfig.display
            ? this.inputSearchConfig.display(values)
            : (values || []).join(' - ');
    }
    searchText(query, fieldsToSearch, where, orderBy) {
        return new Promise((resolve, reject) => {
            try {
                const fields = fieldsToSearch || this.inputSearchConfig.searchFields;
                const first = fields.length > 1 && query.includes(' - ') ? query.split(' - ')[0] : query;
                this.server.post(this.PREFIX_URL + '/' + this.collection + '/search-text', {
                    collection: this.collection,
                    query: first,
                    fields: fields,
                    orderBy: orderBy || [],
                    where: where || [],
                }).subscribe({
                    next: (response) => {
                        if (response?.error) {
                            reject(response?.error);
                        }
                        else {
                            resolve(response?.values?.map((item) => ({
                                value: item[0],
                                text: this.getSelectItemText(this.iso8601ToDate(item[1])),
                                order: item[2],
                            })) || []);
                        }
                    },
                    error: (error) => reject(error)
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    entityToSelectItem(entity, fieldsToSearch) {
        const fields = fieldsToSearch || this.inputSearchConfig.searchFields || [];
        const text = this.getSelectItemText(fields.map((x) => this.util.getNested(entity, x) || ''));
        return {
            value: entity.id,
            text: text,
            entity: entity,
        };
    }
    searchKey(key, fieldsToSearch, join) {
        return new Promise((resolve, reject) => {
            try {
                let fields = fieldsToSearch || this.inputSearchConfig.searchFields;
                let request = this.server
                    .post(this.PREFIX_URL + '/' + this.collection + '/search-key', {
                    collection: this.collection,
                    key: key,
                    fields: fields,
                    with: join || [],
                })
                    .subscribe((response) => {
                    let data = this.iso8601ToDate(response?.value);
                    if (!data) {
                        resolve(null);
                    }
                    else {
                        resolve({
                            value: data.value,
                            text: this.getSelectItemText(data.data),
                            entity: data.entity,
                        });
                    }
                }, (error) => reject(error));
            }
            catch (error) {
                reject(error);
            }
        });
    }
    getDownloadUrl(file) {
        return new Promise((resolve, reject) => {
            let formData = new FormData();
            formData.append('file', file);
            this.server
                .post(this.PREFIX_URL + '/' + this.collection + '/download-url', formData)
                .subscribe((response) => resolve(response.url), (error) => reject(error));
        });
    }
    uploadFile(path, name, file) {
        let formData = new FormData();
        formData.append('file', file, name);
        formData.append('name', name);
        formData.append('path', path);
        return new Promise((resolve, reject) => {
            this.server.post(this.PREFIX_URL + '/' + this.collection + '/upload', formData)
                .subscribe((response) => resolve(response), (error) => reject(error));
        });
    }
    deleteFile(filePath) {
        let formData = new FormData();
        formData.append('file', filePath);
        return new Promise((resolve, reject) => {
            this.server.post(this.PREFIX_URL + '/' + this.collection + '/delete-file', formData)
                .subscribe((response) => resolve(response), (error) => reject(error));
        });
    }
    async dataUrlToFile(url, name, dataType) {
        let data = await fetch(url);
        let bytes = await data.arrayBuffer();
        return new File([bytes], name, { type: dataType });
    }
    getDateFormatted(dataHora) {
        return this.util.getDateFormatted(dataHora);
    }
    getTimeFormatted(dataHora) {
        return this.util.getTimeFormatted(dataHora);
    }
    getDateTimeFormatted(dataHora, separator = ' ') {
        return this.util.getDateTimeFormatted(dataHora, separator);
    }
    validDateTime(date) {
        return this.util.isDataValid(date);
    }
    generateUuid() {
        return uuid();
    }
    dateToIso8601(document) {
        const deepIteraction = (obj) => {
            if (obj) {
                Object.entries(obj).forEach(([key, value]) => {
                    if (value instanceof Date) {
                        obj[key] = UtilService.dateToIso8601(value);
                    }
                    else if (Array.isArray(value)) {
                        value.forEach((item, index) => {
                            if (typeof item == 'object')
                                deepIteraction(item);
                        });
                    }
                    else if (typeof value == 'object') {
                        deepIteraction(value);
                    }
                });
            }
        };
        if (document)
            deepIteraction(document);
        return document;
    }
    iso8601ToDate(document) {
        const deepIteraction = (obj) => {
            if (obj) {
                Object.entries(obj).forEach(([key, value]) => {
                    if (typeof value == 'string' &&
                        UtilService.ISO8601_VALIDATE.test(value)) {
                        obj[key] = UtilService.iso8601ToDate(value);
                    }
                    else if (Array.isArray(value)) {
                        value.forEach((item, index) => {
                            if (typeof item == 'object')
                                deepIteraction(item);
                        });
                    }
                    else if (typeof value == 'object') {
                        deepIteraction(value);
                    }
                });
            }
        };
        if (document)
            deepIteraction(document);
        return document;
    }
    getById(id, join = []) {
        return new Promise((resolve, reject) => {
            if (id?.length) {
                this.server
                    .post(this.PREFIX_URL + '/' + this.collection + '/get-by-id', {
                    id: id,
                    with: join,
                })
                    .subscribe((response) => {
                    resolve(response.data ? this.getRow(response.data) : null);
                }, (error) => {
                    reject(error);
                });
            }
            else {
                resolve(null);
            }
        });
    }
    getByIds(ids) {
        return new Promise((resolve, reject) => {
            this.query({ where: [['id', 'in', ids]] }, { resolve: resolve, reject: reject });
        });
    }
    mergeExtra(rows, extra) {
        if (extra?.merge) {
            const relations = Object.keys(extra.merge);
            for (let row of rows) {
                for (let relation of relations) {
                    if (row.hasOwnProperty(relation + '_id') &&
                        extra.merge[relation].hasOwnProperty(row[relation + '_id'])) {
                        row[relation] = extra.merge[relation][row[relation + '_id']];
                    }
                }
            }
        }
    }
    getAllIds(options = {}, extraFields) {
        return new Promise((resolve, reject) => {
            try {
                let request = this.server
                    .post(this.PREFIX_URL + '/' + this.collection + '/get-all-ids', {
                    where: DaoBaseService.prepareWhere(options.where || []),
                    with: options.join || [],
                    fields: extraFields,
                })
                    .subscribe((response) => {
                    if (response?.error) {
                        reject(response?.error);
                    }
                    else {
                        let result = {
                            rows: response?.rows || [],
                            extra: response?.extra,
                        };
                        this.mergeExtra(result.rows, result.extra);
                        resolve(result);
                    }
                }, (error) => reject(error));
            }
            catch (error) {
                reject(error);
            }
        });
    }
    getRow(row) {
        return this.iso8601ToDate(row);
    }
    toPDF(response) {
        if (response) {
            const blob = new Blob([response], { type: 'application/pdf' });
            let url = window.URL.createObjectURL(blob);
            window.open(url);
        }
        else {
            console.error('Conteúdo do PDF inválido.');
        }
    }
    getRawRow(row) {
        return this.iso8601ToDate(row);
    }
    getRows(queryResult, after) {
        var rows = [];
        if (queryResult.rows?.length) {
            queryResult.rows.forEach((row) => {
                rows.push(this.getRow(row));
            });
        }
        return rows;
    }
    static prepareWhere(where) {
        for (const [key, value] of where.entries()) {
            if (Array.isArray(value)) {
                DaoBaseService.prepareWhere(value);
            }
            else if (value instanceof Date) {
                where[key] = UtilService.dateToIso8601(value);
            }
        }
        return where;
    }
    intersectionWhere(fieldStart, fieldEnd, startValue, endValue) {
        return [
            [fieldEnd, '>=', startValue],
            [fieldStart, '<=', endValue],
        ];
    }
    query(options = {}, events = {}) {
        return this.contextQuery(new QueryContext(this, this.collection, new Subject(), options, events));
    }
    contextQuery(context) {
        if (context.events.before)
            context.events.before();
        context.loading = true;
        context.enablePrior = false;
        context.enableNext = false;
        if (!context.cumulate || context.page <= 1)
            context.subject.next(null);
        const subscriber = this.server.post(this.PREFIX_URL + '/' + context.collection + '/query', {
            where: DaoBaseService.prepareWhere(context.options.where || []),
            orderBy: context.options.orderBy || [],
            limit: context.options.limit || 0,
            with: context.options.join || [],
            deleted: context.options.deleted,
            join: context.options.leftJoin,
            fields: context.options.fields,
            page: context.page,
        });
        subscriber.subscribe((response) => {
            if (response.error) {
                context.subject.error(response.error);
            }
            else {
                context.rows = !context.cumulate || !context.rows?.length ? [] : context.rows;
                context.rows.push(...this.getRows(response).filter((x) => !context.rows.find((y) => y.id == x.id)));
                context.extra = this.iso8601ToDate(response.extra);
                context.enablePrior = context.page > 1;
                context.enableNext = !!context.options.limit && response.count > (context.page - 1) * context.options.limit + response.rows.length;
                context.loading = false;
                this.mergeExtra(context.rows, context.extra);
                context.subject.next(context.rows);
                if (context.events.resolve)
                    context.events.resolve(context.rows);
                if (context.events.after)
                    context.events.after();
            }
        }, (error) => {
            context.subject.error(error);
            this.server.errorHandle(error, subscriber);
            if (context.events.reject)
                context.events.reject(error);
        });
        return context;
    }
    nextPage(context) {
        if (context.enableNext) {
            context.page++;
            this.contextQuery(context);
        }
    }
    priorPage(context) {
        if (context.enablePrior) {
            context.page--;
            this.contextQuery(context);
        }
    }
    refresh(context) {
        context.rows = [];
        return this.contextQuery(context).asPromise();
    }
    prepareToSave(data, relations) {
        let result = data;
        if (data instanceof Date) {
            result = UtilService.dateToIso8601(data);
        }
        else if (typeof data == 'object' && data) {
            if (Array.isArray(data)) {
                data.forEach((item, index) => (result[index] = this.prepareToSave(item)));
            }
            else {
                result = typeof relations != 'undefined' ? {} : result;
                Object.entries(data).forEach(([key, value]) => {
                    try {
                        let found = (relations || []).filter((x) => (x + '.').substring(0, key.length + 1) == key + '.');
                        let newRelations = found.map((x) => x.substring(key.length + 1)).filter((x) => x.length);
                        let isObject = typeof value == 'object' && !(value instanceof Date);
                        if (!relations || !isObject || found.length)
                            result[key] = typeof value == 'object' && value instanceof DaoBaseService ? undefined : this.prepareToSave(value, newRelations.length ? newRelations : undefined);
                    }
                    catch (erro) {
                        console.log('Erro ao tentar atribuir valor a ' + key);
                    }
                });
            }
        }
        return result;
    }
    save(entity, join = [], rellations) {
        return new Promise((resolve, reject) => {
            try {
                this.server.post(this.PREFIX_URL + '/' + this.collection + '/store', {
                    entity: this.prepareToSave(entity, rellations),
                    with: join,
                }).subscribe({
                    next: (response) => {
                        if (response.error) {
                            reject(response.error);
                        }
                        else {
                            const rows = this.getRows(response);
                            resolve(rows[0]);
                        }
                    },
                    error: (error) => reject(error)
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    update(id, data, join = []) {
        return new Promise((resolve, reject) => {
            if (data.id)
                delete data.id;
            this.server.post(this.PREFIX_URL + '/' + this.collection + '/update', {
                id: id,
                data: this.prepareToSave(data),
                with: join,
            }).subscribe({
                next: (response) => {
                    if (response.error) {
                        reject(response.error);
                    }
                    else {
                        const rows = this.getRows(response);
                        resolve(rows[0]);
                    }
                },
                error: (error) => reject(error)
            });
        });
    }
    updateJson(id, field, data, join = []) {
        return new Promise((resolve, reject) => {
            this.server
                .post(this.PREFIX_URL + '/' + this.collection + '/update-json', {
                id: id,
                field: field,
                data: data,
                with: join,
            }).subscribe((response) => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    var rows = this.getRows(response);
                    resolve(rows[0]);
                }
            }, (error) => reject(error));
        });
    }
    delete(entity) {
        return new Promise((resolve, reject) => {
            this.server
                .post(this.PREFIX_URL + '/' + this.collection + '/destroy', {
                id: typeof entity == 'string' ? entity : entity.id,
            }).subscribe((response) => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve();
                }
            }, (error) => reject(error));
        });
    }
}
//# sourceMappingURL=dao-base.service.js.map