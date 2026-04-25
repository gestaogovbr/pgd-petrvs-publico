var UtilService_1;
import { __decorate, __param } from "tslib";
import { Inject, Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import moment from 'moment';
import { NgxMaskService } from 'ngx-mask';
import { DOCUMENT } from '@angular/common';
import { AuthService } from './auth.service';
let UtilService = class UtilService {
    static { UtilService_1 = this; }
    static { this.ISO8601_VALIDATE = /^[0-9]{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))((T|\s)(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9])(:(0[0-9]|[1-5][0-9])(\.([0-9]{3}|[0-9]{6}))?)?)?Z?$/; }
    static { this.ISO8601_FORMAT = "YYYY-MM-DDTHH:mm:ss"; }
    static { this.TIME_VALIDATE = /^(([01][0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?)|(24:00(:00)?)$/; }
    constructor(injector, document, rendererFactory) {
        this.injector = injector;
        this.document = document;
        this.maskService = injector.get(NgxMaskService);
        this.auth = injector.get(AuthService);
        this.maskService.thousandSeparator = ".";
        this.renderer = rendererFactory.createRenderer(null, null);
    }
    copyToClipboard(text) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = text;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }
    clone(source) {
        if (typeof source == "object") {
            if (Array.isArray(source)) {
                return source.map(x => this.clone(x));
            }
            else if (source instanceof Date) {
                return new Date(source.getTime());
            }
            else if (typeof source == "undefined") {
                return undefined;
            }
            else { /* Object */
                if (source == null)
                    return null;
                let result = {};
                for (let [key, value] of Object.entries(source)) {
                    result[key] = this.clone(value);
                }
                return result;
            }
        }
        else {
            return source;
        }
    }
    round(num, decimal) {
        const factor = Math.pow(10, decimal);
        return Math.round((num + Number.EPSILON) * factor) / factor;
    }
    avg(array) {
        var i = 0, summ = 0, arrayLen = array.length;
        while (i < arrayLen) {
            summ = summ + array[i++];
        }
        return summ / arrayLen;
    }
    max(array) {
        var result = array.reduce(function (a, b) {
            return Math.max(a, b);
        }, -Infinity);
        return result;
    }
    trunc(num, decimal) {
        const factor = Math.pow(10, decimal);
        return Math.trunc((num + Number.EPSILON) * factor) / factor;
    }
    strZero(num, size) {
        return Array(Math.max(size - num.toString().length, 0)).join('0') + num;
    }
    format(value, mask) {
        return this.maskService.applyMask(value.toString(), mask);
    }
    formatDecimal(value, decimals = 2) {
        return this.maskService.applyMask(value.toString(), "separator." + decimals);
    }
    getNested(source, path) {
        return path.replace(/\[/g, '.').replace(/\]/g, '.').replace(/^\./g, "").split('.').filter(x => x.length).reduce((a, o) => a && a[Array.isArray(a) && !isNaN(+o) ? parseInt(o) : o], source);
    }
    setNested(source, path, value) {
        let tree = path.replace('[', '.').replace(']', '.').replace(/^\./g, "").split('.');
        let leaf = tree.pop();
        let last = tree.reduce((a, o) => a[Array.isArray(a) ? parseInt(o) : o], source);
        if (last && leaf)
            last[leaf] = value;
        return;
    }
    validateLookupItem(lista, key) {
        let retorno = true;
        if (key.indexOf(lista) < 0) {
            lista.forEach(t => {
                if (t.key == key || key == 'd41d8cd98f00b204e9800998ecf8427e') { //MD5 gerado quando o VALUE é vazio ("");
                    retorno = false;
                }
                else
                    true;
            });
        }
        else if (key == 'd41d8cd98f00b204e9800998ecf8427e')
            retorno = false; //MD5 gerado quando o VALUE é vazio ("");
        return retorno;
    }
    commonBegin(strA, strB) {
        let result = [];
        let a = Array.isArray(strA) ? strA : strA.split("");
        let b = Array.isArray(strB) ? strB : strB.split("");
        const maxIndex = Math.min(a.length, b.length);
        for (let i = 0; i < maxIndex && a[i] == b[i]; i++)
            result.push(a[i]);
        return Array.isArray(strA) ? result : result.join();
    }
    validarCPF(numero) {
        if (typeof numero !== 'string')
            return false;
        numero = numero.replace(/[^\d]+/g, '');
        if (numero.length !== 11 || !!numero.match(/(\d)\1{10}/))
            return false;
        let cpf = numero.split('');
        const validator = cpf
            .filter((digit, index, array) => index >= array.length - 2 && digit)
            .map(el => +el);
        const toValidate = (pop) => cpf
            .filter((digit, index, array) => index < array.length - pop && digit)
            .map(el => +el);
        const rest = (count, pop) => (toValidate(pop)
            .reduce((soma, el, i) => soma + el * (count - i), 0) * 10) % 11 % 10;
        return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]);
    }
    validarEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    onlyNumbers(text) {
        return text ? [...text].filter(c => /[0-9]/.test(c)).join("") : "";
    }
    onlyAlphanumeric(url) {
        return url.replace(/[^a-z0-9]/gi, '');
    }
    fill(destination, source) {
        if (destination) {
            Object.keys(destination).forEach(key => {
                if (source && source[key] && Array.isArray(source[key])) {
                    if (!Array.isArray(destination[key]) || typeof destination[key] == "undefined")
                        destination[key] = [];
                    destination[key].push(...source[key]);
                }
                else if (typeof destination[key] == "object" && source && typeof source[key] !== "undefined" && source[key] && !(destination[key] instanceof Date) && !(source[key] instanceof Date)) {
                    destination[key] = this.fill(destination[key], source[key]);
                }
                else if (source && typeof source[key] !== "undefined") {
                    destination[key] = source[key];
                }
            });
            /* caso exista o campo _status no source */
            if (source && source["_status"])
                destination["_status"] = source["_status"];
        }
        return destination;
    }
    assign(destination, source) {
        if (destination) {
            const keys = Object.keys(destination);
            keys.forEach(key => {
                if (Array.isArray(destination[key]) && source && source[key] && Array.isArray(source[key])) {
                    destination[key] = [...source[key]];
                }
                else if (typeof destination[key] == "object" && source && typeof source[key] !== "undefined" && source[key] && !(destination[key] instanceof Date) && !(source[key] instanceof Date)) {
                    destination[key] = this.assign(destination[key], source[key]);
                }
                else if (source && typeof source[key] !== "undefined") {
                    destination[key] = source[key];
                }
            });
            Object.entries(source || {}).forEach(([key, value]) => {
                if (!keys.includes(key))
                    destination[key] = value;
            });
        }
        return destination;
    }
    getParameters(func) {
        return typeof func == "function" ? new RegExp('(?:' + func.name + '\\s*|^)\\s*\\((.*?)\\)').exec(func.toString().replace(/\n/g, ''))[1].replace(/\/\*.*?\*\//g, '').replace(/ /g, '') : [];
    }
    mergeArrayOfObject(destination, source, compare, removeDst = true, insertOrHandler, update, remove) {
        const isHandler = insertOrHandler && this.getParameters(insertOrHandler).length > 1;
        for (let src of source) {
            let dst = destination.find(x => typeof compare == "string" ? x[compare] == src[compare] : compare(x, src));
            if (dst) { /* Update*/
                if (update) {
                    update(dst, src);
                }
                else if (isHandler) {
                    insertOrHandler("EDIT", dst, src);
                }
                else {
                    Object.assign(dst, src);
                }
            }
            else { /* Insert */
                let add = insertOrHandler ? (isHandler ? insertOrHandler("ADD", undefined, src) : insertOrHandler(src)) : src;
                if (add)
                    destination.push(add);
            }
        }
        if (removeDst) {
            for (let i = 0; i < destination.length; i++) {
                let dst = destination[i];
                if (!source.find(x => typeof compare == "string" ? x[compare] == dst[compare] : compare(dst, x))) {
                    let splice = remove ? remove(dst) : isHandler ? insertOrHandler("DELETE", dst) : true;
                    if (splice) {
                        destination.splice(i, 1);
                        i--;
                    }
                }
            }
        }
        return destination;
    }
    writeToFile(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    md5(text) {
        return Md5.hashStr(text || Math.random().toString());
    }
    fillForm(destination, source) {
        if (destination && source) {
            Object.keys(destination).forEach(key => {
                if (typeof source[key] != "undefined") {
                    destination[key] = source[key];
                }
                else if (key.indexOf("_") > 0 && typeof source[key.substr(0, key.indexOf("_"))] !== "undefined") {
                    let subprop = source[key.substr(0, key.indexOf("_"))];
                    if (subprop && typeof subprop[key.substr(key.indexOf("_") + 1)] !== "undefined") {
                        destination[key] = subprop[key.substr(key.indexOf("_") + 1)];
                    }
                }
                else if (key.indexOf("$") > 0) {
                    const field = key.substr(0, key.indexOf("$"));
                    const value = key.substr(key.indexOf("$") + 1);
                    destination[key] = !!(source[field]?.indexOf(value) >= 0);
                }
                else if (typeof destination[key] == "object" && typeof source[key] != "undefined") {
                    if (Array.isArray(destination[key])) {
                        destination[key] = Object.entries(source).filter(([k, v]) => k.startsWith(key) && v).map(([k, v]) => k) || [];
                    }
                    else {
                        Object.keys(destination[key]).forEach(subKey => {
                            if (typeof source[key + "_" + subKey] !== "undefined") {
                                destination[key][subKey] = source[key + "_" + subKey];
                            }
                        });
                    }
                }
            });
        }
        return destination;
    }
    empty(data) {
        if (data == null || data == undefined)
            return true;
        if (typeof data == "string")
            return !data.length;
        if (typeof data == "object" && data instanceof Date)
            return (typeof data.getMonth !== 'function') || data <= new Date(0);
        return false;
    }
    deepEach(collection, eachAndNextEach, removeUndefined = false, path = []) {
        if (collection) {
            for (let [key, value] of Array.isArray(collection) ? collection.entries() : Object.entries(collection)) {
                let pathCurrent = [...path, key];
                let nextItems = eachAndNextEach(value, key, collection, pathCurrent);
                if (removeUndefined && nextItems == undefined) {
                    if (Array.isArray(collection)) {
                        delete collection[key];
                    }
                    else {
                        delete collection[key];
                    }
                }
                if (nextItems)
                    this.deepEach(nextItems, eachAndNextEach, removeUndefined, pathCurrent);
            }
        }
    }
    removeAcentos(source) {
        const comAcentos = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
        const semAcentos = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
        return [...source].map(c => {
            let index = comAcentos.indexOf(c);
            return index >= 0 ? semAcentos[index] : c;
        }).join("");
    }
    textHash(text) {
        return this.md5(this.removeAcentos(text.toLowerCase()));
    }
    apelidoOuNome(usuario, capitalize = false) {
        const name = usuario?.apelido?.length ? usuario.apelido : usuario?.nome || "";
        return name && capitalize ? this.capitalCase(name) : name;
    }
    shortName(name) {
        let temp = name.replace(/\s\s+/g, " ").split(" ");
        let result = "";
        for (let nibble of temp) {
            result += result.length < 5 ? " " + nibble[0].toUpperCase() + nibble.substring(1).toLowerCase() : "";
        }
        return result.trim().replace(" ", "%");
    }
    capitalCase(text) {
        return text.toLowerCase().replace(/(^\w|\.\w|\s\w)/g, (letter) => letter.toUpperCase());
    }
    contrastColor(bgColor) {
        const color = this.colorHexToRGB(bgColor);
        return (((color.r * 0.299) + (color.g * 0.587) + (color.b * 0.114)) > 186) ? "#000000" : "#ffffff";
    }
    colorHexToRGB(colorHex) {
        const color = (colorHex.charAt(0) === '#') ? colorHex.substring(1, 7) : colorHex;
        return {
            r: parseInt(color.substring(0, 2), 16),
            g: parseInt(color.substring(2, 4), 16),
            b: parseInt(color.substring(4, 6), 16)
        };
    }
    getBackgroundColor(level = 0, numLevels = 20, hue = 51, saturation = 62, lightness = 51) {
        const palette = [];
        // valores defaults = um tom de amarelo usado nos comentários
        for (let i = 0; i <= numLevels; i++) {
            const newhue = (i * hue) / numLevels;
            const color = `hsl(${newhue}, ${saturation}%, ${lightness}%)`;
            palette.push(color);
        }
        // Retorna uma cor do array
        return palette[numLevels - (level % (numLevels + 1))];
    }
    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    isTimeValid(timer) {
        return UtilService_1.TIME_VALIDATE.test(timer);
    }
    isDataValid(data) {
        const dataRef = !!data && typeof data == "string" ? new Date(data) : data;
        return !!dataRef && (moment(dataRef).isValid() || (Object.prototype.toString.call(dataRef) === '[object Date]' && !isNaN(dataRef)));
    }
    isDeveloper() {
        return this.auth.usuario?.perfil?.nivel == 0;
    }
    decimalToTimer(value, onlyHours = false, hoursPerDay = 24) {
        const hours = onlyHours ? Math.trunc(value) : Math.trunc(value) % hoursPerDay;
        const minutes = Math.round((value % 1) * 60);
        const days = onlyHours ? 0 : Math.trunc(value - hours) / hoursPerDay;
        return { days, hours, minutes };
    }
    decimalToTimerFormated(value, onlyHours = false, hoursPerDay = 24) {
        let result = "";
        if (value !== undefined) {
            const timer = this.decimalToTimer(value, onlyHours, hoursPerDay);
            result += timer.days ? timer.days + (timer.days == 1 ? " dia" : " dias") : "";
            result += timer.hours ? (timer.days ? ", " : "") + this.strZero(timer.hours, 2) + "h" : "";
            result += timer.minutes ? (timer.days && !timer.hours ? ", " : "") + this.strZero(timer.minutes, 2) + "min" : "";
            result += !result.length ? " - Zero - " : "";
        }
        return result;
    }
    between(middle, interval) {
        const start = typeof interval.start == "number" ? interval.start : interval.start.getTime();
        const end = typeof interval.end == "number" ? interval.end : interval.end.getTime();
        middle = typeof middle == "number" ? middle : middle.getTime();
        return middle >= start && middle <= end;
    }
    asDate(dateTime, result = null) {
        if (dateTime instanceof Date) {
            result = dateTime;
        }
        else if (typeof dateTime == "number") {
            result = new Date(dateTime);
        }
        else if (typeof dateTime == "string" && moment(dateTime).isValid()) {
            result = moment(dateTime).toDate();
        }
        return result;
    }
    asTimestamp(dateTime, result = -1) {
        return this.asDate(dateTime)?.getTime() || result;
    }
    asDateInterval(interval) {
        return {
            start: interval.start instanceof Date ? interval.start : new Date(interval.start),
            end: interval.end instanceof Date ? interval.end : new Date(interval.end)
        };
    }
    asTimeInterval(interval) {
        return {
            start: interval.start instanceof Date ? interval.start.getTime() : interval.start,
            end: interval.end instanceof Date ? interval.end.getTime() : interval.end
        };
    }
    intersection(intervals) {
        const isDate = (intervals[0])?.start instanceof Date;
        let result = undefined;
        if (intervals.length > 1) {
            result = this.asTimeInterval(intervals[0]);
            for (let i = 1; i < intervals.length && result; i++) {
                const compare = this.asTimeInterval(intervals[i]);
                result = result.end >= compare.start && result.start <= compare.end ? {
                    start: Math.max(result.start, compare.start),
                    end: Math.min(result.end, compare.end)
                } : undefined;
            }
        }
        return result && isDate ? this.asDateInterval(result) : result;
    }
    union(intervals) {
        if (intervals.length < 2) {
            return intervals;
        }
        else {
            const isDate = (intervals[0])?.start instanceof Date;
            let intervalos = intervals.map(x => this.asTimeInterval(x));
            let result = [];
            result.push(intervalos[0]);
            intervalos.shift();
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < intervalos.length; j++) {
                    if (result[i].end >= intervalos[j].start && result[i].start <= intervalos[j].end) {
                        result[i] = {
                            start: Math.min(result[i].start, intervalos[j].start),
                            end: Math.max(result[i].end, intervalos[j].end)
                        };
                        intervalos.splice(j, 1);
                        j = -1;
                    }
                }
                if (intervalos.length) {
                    result.push(intervalos[0]);
                    intervalos.shift();
                }
            }
            return isDate ? result.map(x => this.asDateInterval(x)) : result;
        }
    }
    merge(aItems, bItems, role) {
        let result = [...(aItems || [])];
        (bItems || []).forEach(b => {
            if (!result.find(a => role(a, b)))
                result.push(b);
        });
        return result;
    }
    getDateFormatted(dataHora) {
        return dataHora ? moment(dataHora).format("DD/MM/YYYY") : "";
    }
    getBooleanFormatted(n) {
        return n == 0 ? "não" : "sim";
    }
    getTimeFormatted(dataHora) {
        return dataHora ? moment(dataHora).format("HH:mm") : "";
    }
    getTimeFormattedUSA(dataHora) {
        return dataHora ? moment(dataHora).format("YYYY-MM-DD HH:mm:ss") : "";
    }
    getDateTimeFormatted(dataHora, separator = " ") {
        if (!dataHora) {
            return "";
        }
        else if ((dataHora instanceof Date) || (typeof dataHora == "string" && dataHora.match(UtilService_1.ISO8601_VALIDATE))) {
            return this.getDateFormatted(dataHora) + separator + this.getTimeFormatted(dataHora);
        }
        else {
            return JSON.stringify(dataHora);
        }
    }
    static dateToIso8601(date) {
        return moment(date).format(UtilService_1.ISO8601_FORMAT);
    }
    /* Obrigatoriamente deve conter a hora, mesmo que seja T00:00:00 */
    static iso8601ToDate(iso8601) {
        //const hasTimeZone = /([+-]\d\d(:?\d\d)?)|Z$/g;
        const hasTime = /.+[\sT]\d\d:\d\d(:\d\d)?(\.\d+Z)?$/;
        let date = new Date(iso8601.match(hasTime) ? iso8601 : iso8601 + 'T00:00:00');
        return date;
        //const userTimezoneOffset = date.getTimezoneOffset() * 60000;
        //return new Date(date.getTime() + userTimezoneOffset);
    }
    timestamp(dateRef) {
        const userTimezoneOffset = dateRef.getTimezoneOffset() * 60000;
        return Math.floor((dateRef.getTime() - userTimezoneOffset) / 1000);
    }
    /**  */
    daystamp(dateRef) {
        const userTimezoneOffset = dateRef.getTimezoneOffset() * 60000;
        return Math.floor((dateRef.getTime() - userTimezoneOffset) / (1000 * 60 * 60 * 24));
    }
    setTime(dateRef, hour, min, sec) {
        const result = new Date(dateRef.getTime());
        result.setHours(hour, min, sec);
        return result;
    }
    setStrTime(dateRef, time) {
        const aTime = time.split(":").map(x => parseInt(x));
        return this.setTime(dateRef, aTime[0] || 0, aTime[1] || 0, aTime[2] || 0);
    }
    /* Caso dateTime seja numérico deverá representar um intervalo, e não o .getTime() de uma data */
    getTimeHours(dateTime) {
        const userTimezoneOffset = (new Date()).getTimezoneOffset() * 60000; // recupera o fuso horário em milisegundos
        const dateRef = dateTime instanceof Date ? dateTime : new Date(dateTime == 0 ? "0" : dateTime + userTimezoneOffset);
        return dateRef.getHours() + (dateRef.getMinutes() / 60) + (dateRef.getSeconds() / (60 * 60));
    }
    secondsToTimer(secounds) {
        return {
            hours: Math.floor(secounds / 3600),
            minutes: Math.floor(secounds % 3600 / 60),
            secounds: Math.floor(secounds % 3600 % 60)
        };
    }
    getHoursBetween(start, end) {
        const timestamp = Math.floor(((end instanceof Date ? end.getTime() : end) - (start instanceof Date ? start.getTime() : start)) / 1000);
        const timer = this.secondsToTimer(timestamp);
        return timer.hours + (timer.minutes / 60) + (timer.secounds / (60 * 60));
    }
    getStrTimeHours(time) {
        const aTime = time.split(":").map(x => parseInt(x));
        return aTime[0] + ((aTime[1] || 0) / 60) + ((aTime[2] || 0) / (60 * 60));
    }
    addTimeHours(dateRef, hours) {
        let result = new Date(dateRef.getTime());
        result.setTime(result.getTime() + (hours * 60 * 60 * 1000));
        return result;
    }
    startOfDay(dateRef) {
        return this.setTime(dateRef, 0, 0, 0);
    }
    endOfDay(dateRef) {
        return this.setTime(dateRef, 23, 59, 59);
    }
    minDate(...dates) {
        return dates.reduce(function (a, b) { return !a || !b ? a || b : (a.getTime() < b.getTime() ? a : b); });
    }
    maxDate(...dates) {
        return dates.reduce(function (a, b) { return !a || !b ? a || b : (a.getTime() > b.getTime() ? a : b); });
    }
    loadScript(src) {
        const script = this.renderer.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        this.renderer.appendChild(this.document.body, script);
        return script;
    }
    clearControl(control, value = null) {
        control.setValue(value);
        control.setErrors(null);
        control.markAsUntouched();
    }
    /**
     * Retorna um array com a diferença A-B (elementos que estão no vetor A mas não estão no vetor B)
     * @param arrayA
     * @param arrayB
     * @returns
     */
    array_diff(arrayA, arrayB) {
        return arrayA.filter(elem => !arrayB.includes(elem));
    }
    /**
     * Retorna um array com a diferença simétrica entre os vetores A e B (elementos que pertencem a um ou a outro, mas não a ambos)
     * @param arrayA
     * @param arrayB
     * @returns
     */
    array_diff_simm(arrayA, arrayB) {
        let uniao = [...new Set([...arrayA, ...arrayB])];
        let intersecao = arrayA.filter(item => arrayB.includes(item));
        return this.array_diff(uniao, intersecao);
    }
    /**
     * Retorna um array com valores únicos, exceto se seus elementos forem objetos
     * @param array Array original
     * @returns
     */
    uniqueArray(array) {
        return array.filter((elem, i) => array.indexOf(elem) === i);
    }
    decodeUnicode(str) {
        return str.replace(/\\u[\dA-F]{4}/gi, function (match) {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
        });
    }
    slugify(str) {
        return str.trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }
};
UtilService = UtilService_1 = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(1, Inject(DOCUMENT))
], UtilService);
export { UtilService };
//# sourceMappingURL=util.service.js.map