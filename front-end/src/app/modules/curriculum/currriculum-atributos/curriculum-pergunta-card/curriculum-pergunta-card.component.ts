import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuestionarioPergunta } from 'src/app/models/questionario-pergunta.model';

@Component({
  selector: 'app-curriculum-pergunta-card',
  templateUrl: './curriculum-pergunta-card.component.html',
  styleUrls: ['./curriculum-pergunta-card.component.scss']
})
export class CurriculumPerguntaCardComponent implements OnInit {
  @Output() change = new EventEmitter<Event>();
  @Input() indice: number = 0;
  @Input() pergunta: QuestionarioPergunta = new QuestionarioPergunta();
  @Input() control: FormControl = new FormControl();
  
  constructor() { }

  ngOnInit() {
  }

  public onChange(event: Event) {
    this.change.emit(event);
  }

}
