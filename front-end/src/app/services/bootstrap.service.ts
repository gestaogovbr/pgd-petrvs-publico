import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BootstrapService {

  constructor() {
    //@ts-ignore
    jQuery.cachedScript = function( url, options ) {
      options = $.extend( options || {}, {
        dataType: "script",
        cache: true,
        url: url
      });
      return jQuery.ajax( options );
    };
  }

  public loadJsAsPromise(file: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if($('script[src="' + file + '"]').length) {
        resolve("Already loaded");
      } else {
        var script = document.createElement('script'); 
        script.src = file;
        script.charset = "utf-8";
        script.async = false; 
        script.defer = false;
        script.onload = function (event) {
            resolve("Success");
        };
        script.onerror = function (event) {
            reject("Erro ao carregar o arquivo " + file);
        };
        document.head.appendChild(script);
        /* /@ts-ignore
        $.cachedScript(file).done((script, textStatus) => {
          resolve(textStatus);
        }).fail(() => {
          reject({error: "Erro ao tentar carregar arquivo " + file});
        });*/
      }
    });
  }

  public loadCssAsPromise(file: string, mediaPrint?: boolean): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if($('link[href="' + file + '"]').length) {
        resolve("already loaded");
      } else {
        let attrs: any = {
          type: 'text/css', 
          rel: 'stylesheet',
          href: file
        };
        if(mediaPrint) attrs.media = "print";
        $('<link>').appendTo('head').attr(attrs);
        resolve("Success");
      }
    });
  }

  public load(list: string[], cssPrint?: string[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let all = list.map(x => /.*\.js$/.test(x) ? this.loadJsAsPromise(x) : this.loadCssAsPromise(x));
      if(cssPrint) all.push(...cssPrint.map(x => this.loadCssAsPromise(x, true)));
      Promise.all(all).then(promises => {
        $(() => {
          resolve();
        });
      }).catch(reject);
    });
  }

}
