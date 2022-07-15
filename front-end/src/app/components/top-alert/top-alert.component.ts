import { Component, Input, OnInit } from '@angular/core';

export type AlertType = "alert" | "success" | "warning" | "danger";

@Component({
  selector: 'top-alert',
  templateUrl: './top-alert.component.html',
  styleUrls: ['./top-alert.component.scss']
})
export class TopAlertComponent implements OnInit {
  @Input() message?: string;
  @Input() type: AlertType = "alert";  
  @Input() closable?: string;

  public lastMessage?: string;

  constructor() { }

  ngOnInit(): void {
  }

  public get isClosable(): boolean {
    return this.closable != undefined;
  }

  public get alertClass(): string {
    return "mt-2 alert alert-" + 
      (this.type == "alert" ? "primary" : 
      this.type == "success" ? "success" : 
      this.type == "warning" ? "warning" : "danger");
  }

  public get iconClass(): string {
    return "bi bi-" +  
      (this.type == "alert" ? "info-circle-fill" : 
      this.type == "success" ? "check-circle-fill" : 
      this.type == "warning" ? "exclamation-circle-fill" : "exclamation-triangle-fill");
  }

  public onCloseClick(event: Event) {
    this.lastMessage = this.message;
  }

}
