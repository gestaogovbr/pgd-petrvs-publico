/* classe responsável por fazer comunicação entre a extensão e a aplicação Angular */
function AppProxy(callObject, eventName, timeout = 60 * 1000) {

    /* start constructor */
        this.callObject = callObject;
        this.eventName = eventName;
        this.autoId = 0;
        this.timeout = timeout;
        this.init = false;
        this.initCallback = undefined;
        this.executions = [];
        this.waitingInit = [];
        /* listener */  
        var listener = async (event) => {
            //console.log("Event", event);
            const detail = event.detail || {};
            detail.source = detail.source || "angular";
            switch (detail.type) {
                case "return":
                case "error":
                    const index = this.executions.findIndex(x => x.id == detail.id);
                    if(index >= 0) {
                        const exec = this.executions[index];
                        clearTimeout(exec.timeout);
                        if(detail.error) {
                            exec.reject(detail.error);
                        } else {
                            exec.resolve(detail.result);
                        }
                        this.executions.splice(index, 1);
                    }
                    break;
                case "call": 
                    try {
                        const result = await this.callObject[detail.funct](...detail.params);
                        const sendDetail = {
                            id: detail.id,
                            type: "return",
                            source: "extension",
                            result: result
                        };
                        document.dispatchEvent(new CustomEvent(this.eventName + ":" + detail.source, {'detail': sendDetail}));
                    } catch (error) {
                        const sendDetail = {
                            id: detail.id,
                            source: "extension",
                            type: "error",
                            error: error || {message: "unknow"}
                        };
                        document.dispatchEvent(new CustomEvent(this.eventName + ":" + detail.source, {'detail': sendDetail}));
                    }
                    break;
                case "init":
                    this.init = true;
                    //console.log("app-proxy: init");
                    if(this.initCallback) this.initCallback();
                    for(var callAfterInit of this.waitingInit) {
                        this.execute(callAfterInit.funct, callAfterInit.params, callAfterInit.destination).then(callAfterInit.resolve, callAfterInit.reject);
                    }
                    this.waitingInit = [];
                    break;
            }
        };        
        document.addEventListener(this.eventName + ":extension", listener.bind(this));
    /* end constructor */

    this.onInit = (callback) => {
        if(this.init) callback();
        this.initCallback = callback;
        /* Envia a mensagem de init da extensão */
        document.dispatchEvent(new CustomEvent(this.eventName + ":angular", {'detail': {type: "init", source: "extension"}}));
    }

    this.execute = (funct, params, destination = "angular") => {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                const index = this.executions.findIndex(x => x.id == detail.id);
                if(index >= 0) {
                    this.executions.splice(index, 1);
                    reject({message: "timeout"});
                }
            }, this.timeout);
            const detail = {
                id: this.autoId++,
                type: "call",
                funct: funct,
                params: params,
                source: "extension"
            };
            this.executions.push({
                id: detail.id,
                timeout: timeout,
                resolve: resolve,
                reject: reject
            });
            document.dispatchEvent(new CustomEvent(this.eventName + ":" + destination, {'detail': detail}));
        });
    }

    this.executeAfterInit = (funct, params, destination = "angular") => {
        return new Promise((resolve, reject) => {
            if(this.init) {
                this.execute(funct, params, destination).then(resolve, reject);
            } else {
                this.waitingInit.push({
                    funct: funct,
                    params: params,
                    destination: destination,
                    resolve: resolve,
                    reject: reject
                });
            }
        });
    }

}