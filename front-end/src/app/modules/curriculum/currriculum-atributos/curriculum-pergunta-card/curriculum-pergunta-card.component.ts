import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuestionarioPergunta, QuestionarioPerguntaResposta, QuestionarioPerguntaRespostaDateTime, QuestionarioPerguntaRespostaSearch } from 'src/app/models/questionario-pergunta.model';
import { EntityService } from 'src/app/services/entity.service';
import { LookupItem, LookupService } from 'src/app/services/lookup.service';

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
  
  public JSON = JSON;

  constructor(public lookup: LookupService, public entityService: EntityService) { }

  ngOnInit() {
  }

  public onChange(event: Event) {
    this.change.emit(event);
  }

  public getDao(pergunta: QuestionarioPergunta | undefined) {
    return this.entityService.getDao((pergunta?.respostas as QuestionarioPerguntaRespostaSearch).entity);
  }

  public asLookupItem(items: QuestionarioPerguntaResposta | undefined): LookupItem[] {
    return (items as LookupItem[]) || [];
  }

  public checkDateTimeTipo(pergunta: QuestionarioPergunta | undefined, tipo: string) {
    return (pergunta?.respostas as QuestionarioPerguntaRespostaDateTime)?.tipo == tipo;
  }

}
