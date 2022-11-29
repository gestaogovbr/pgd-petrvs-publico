import { Component, Injector, Input, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { ComponentBase } from '../component-base';

export type AlertType = "alert" | "success" | "warning" | "danger";

@Component({
  selector: 'top-alert',
  templateUrl: './top-alert.component.html',
  styleUrls: ['./top-alert.component.scss']
})
export class TopAlertComponent extends ComponentBase implements OnInit {
  @Input() message?: string;
  @Input() type: AlertType = "alert";  
  @Input() closable?: string;
  @Input() id: string;
  @Input() close?: (id: string) => void;

  public lastMessage?: string;

  constructor(public injector: Injector) {
    super(injector);
    this.id = this.util.md5();
  }

  ngOnInit(): void {
  }

  public get isClosable(): boolean {
    return this.closable != undefined;
  }

  public get alertClass(): string {
    return "mt-2 alert alert-" +
      (this.type == "alert" ? "primary" : 
      this.type == "success" ? "success" : 
      this.type == "warning" ? "warning" : "danger") + 
      (this.isClosable ? " alert-dismissible fade show" : "");
  }

  public get iconClass(): string {
    return "me-2 bi bi-" +  
      (this.type == "alert" ? "info-circle-fill" : 
      this.type == "success" ? "check-circle-fill" : 
      this.type == "warning" ? "exclamation-circle-fill" : "exclamation-triangle-fill");
  }

  public onCloseClick(event: Event) {
    this.lastMessage = this.message;
    if(this.close) this.close(this.id);
  }

}
