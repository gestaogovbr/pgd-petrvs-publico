import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuestionarioPergunta } from 'src/app/models/questionario-pergunta.model';

@Component({
  selector: 'curriculum-pergunta-card',
  templateUrl: './curriculum-pergunta-card.component.html',
  styleUrls: ['./curriculum-pergunta-card.component.scss']
})
export class CurriculumPerguntaCardComponent implements OnInit {
  @Output() change = new EventEmitter<Event>();
  @Input() indice?: number = undefined;
  @Input() pergunta?: QuestionarioPergunta;
  @Input() control?: FormControl;
  @Input() titulo?: string;
  @Input() size?: number = undefined;
  
  constructor() { }

  ngOnInit() {
  }

  public onChange(event: Event) {
    this.change.emit(event);
  }

}
