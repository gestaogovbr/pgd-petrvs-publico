    <div class="row mt-3">
        <label>"Apresente-se"</label>
        <lael><label>
    </div>

    <div class="row mt-3">
        <label>"Dados Residenciais"></label>
        <hr>
    </div>

    <div class="row mt-2">
        <label>Estado</label>
        <label></label>
        <label>Municipio</label>
        <label></label>
        <label>Telefone de contato WhatsAPP<label>
        <label></label>
    </div>

<!--
    <div class="row mt-3">
        <separator title="Estado Civil"></separator>
    </div>
    <div class="row mt-2">
        <input-select [size]="5" label="Estado Civil" icon="fas fa-ring" controlName="estado_civil" [control]="form!.controls.estado_civil" [items]="this.lookup.ESTADO_CIVIL">
        </input-select>
        <input-switch [size]="2" label="Possui Filhos?" icon="fas fa-child" controlName="filhos" [control]="form!.controls.filhos"></input-switch>
        <input-number #qtdefilhos [hidden]="form!.controls.filhos.value ? undefined : 'true'" [size]="1" label="Quantos?" icon="bi bi-arrow-up-right-circle" controlName="quantidade_filhos" [control]="form!.controls.quantidade_filhos" [attr.min]="0" [minValue]="0" (change)="qtdeFilhosOnChange()"></input-number>
    </div>
    <div class="row mt-3">
        <separator title="Idiomas" (click)="togglePopOver()"></separator>
    </div>
    <div class="row mt-3">

        <input-switch [size]="3" label="Fala outros idiomas?" icon="fas fa-language" controlName="radioFalaIdioma" [control]="form!.controls.radioFalaIdioma"></input-switch>
       
        <grid *ngIf="form!.controls.radioFalaIdioma.value" [control]="form!.controls.idiomas" [minHeight]="100" 
            [form]="formIdiomaGrid!" [hasDelete]="true" [add]="addIdiomas.bind(this)" [load]="loadIdiomas.bind(this)" [remove]="removeIdiomas.bind(this)" 
            [save]="saveIdiomas.bind(this)" editable>
            <columns>
                <column title="Idioma" titleHint="Escolha o idioma." [template]="columnIdioma" [editTemplate]="editIdioma">
                    <ng-template let-row="row" #columnIdioma>
                        {{lookup.getValue(lookup.IDIOMAS, row.idioma)}}
                    </ng-template>
                    <ng-template let-row="row" #editIdioma>
                        <input-select [size]="12" label icon controlName="idioma" [items]="this.lookup.IDIOMAS"></input-select>
                    </ng-template>
                </column>
                <column title="Nível de fala" titleHint="Escolha o seu nível de fala." [template]="columnNivelFala" [editTemplate]="editNivelFala">
                    <ng-template let-row="row" #columnNivelFala>
                        {{lookup.getValue(lookup.NIVEL_IDIOMA, row.idiomaFala)}}
                        
                    </ng-template>
                    <ng-template let-row="row" #editNivelFala>
                        <input-select [size]="12" label icon controlName="idiomaFala" [items]="this.lookup.NIVEL_IDIOMA"></input-select>
                    </ng-template>
                </column>
                <column title="Nível de escrita" titleHint="Escolha o seu nível de escrita." [template]="columnNivelEscrita" [editTemplate]="editNivelEscrita">
                    <ng-template let-row="row" #columnNivelEscrita>
                        {{lookup.getValue(lookup.NIVEL_IDIOMA, row.idiomaEscrita)}}
                    </ng-template>
                    <ng-template let-row="row" #editNivelEscrita>
                        <input-select [size]="12" label icon controlName="idiomaEscrita" [items]="this.lookup.NIVEL_IDIOMA"></input-select>
                    </ng-template>
                </column>
                <column title="Nível de entendimento" titleHint="Escolha o seu nível de entendimento." [template]="columnNivelEntendimento" [editTemplate]="editNivelEntendimento">
                    <ng-template let-row="row" #columnNivelEntendimento>
                        {{lookup.getValue(lookup.NIVEL_IDIOMA, row.idiomaEntendimento)}}
                    </ng-template>
                    <ng-template let-row="row" #editNivelEntendimento>
                        <input-select [size]="12" label icon controlName="idiomaEntendimento" [items]="this.lookup.NIVEL_IDIOMA"></input-select>
                    </ng-template>
                </column>
                <column type="options"></column>
            </columns>
        </grid>
    </div>
    <div class="row mt-3">
        <separator title="Graduação e Pós-Graduação - Especialização, Mestrado, Doutorado e Pós Doutorado" (click)="togglePopOver()"></separator>
    </div>
    <div class="row my-3">
        <grid [minHeight]="150" [form]="formGraduacao!" [control]="form!.controls.graduacoes" [hasDelete]="true" [add]="addGraduacao.bind(this)" [load]="loadGraduacao.bind(this)" 
             [remove]="removeGraduacao.bind(this)" [save]="saveGraduacao.bind(this)" editable>
            <columns>
                <column title="Pretende Cursar?" titleHint="Pretende cursar ou já esta concluido." [template]="columnPretende" [editTemplate]="editPretende">
                    <ng-template let-row="row" #columnPretende>
                       {{row.pretensao == 0 ? 'Finalizado' : 'Pretendo Fazer' }}
                    </ng-template>
                    <ng-template let-row="row" #editPretende>
                        <input-switch [size]="2" [label]="formGraduacao!.controls.pretensao.value ? 'Sim' : 'Concluído'" icon="fas fa-user-graduate" controlName="pretensao" [control]="formGraduacao!.controls.pretensao"></input-switch>
                    </ng-template>
                </column>               
                <column title="Área do Conhecimento" titleHint="colha a Área de conhecimento." [template]="columnArea" [editTemplate]="editArea">
                    <ng-template let-row="row" #columnArea>
                       {{row.curso.area_conhecimento.nome}}
                    </ng-template>
                    <ng-template let-row="row" #editArea>
                        <input-search #area [size]="3" [dao]="areaDao" label="Área de conhecimento" [control]="formGraduacao!.controls.area_conhecimento_id" controlName="area_conhecimento_id"></input-search>
                    </ng-template>
                </column> 
                <column title="Título" titleHint="Qual a titulação que se refere ao curso." [template]="columnTitulo" [editTemplate]="editTitulo">
                    <ng-template let-row="row" #columnTitulo>
                        {{lookup.getValue(lookup.TITULOS_CURSOS, row.curso.titulo)}}
                    </ng-template>
                    <ng-template let-row="row" #editTitulo>
                        <input-select [size]="2" label="Titulo" icon="bi bi-mortarboard-fill" controlName="titulo" liveSearch [control]="formGraduacao!.controls.titulo" [items]="this.lookup.TITULOS_CURSOS" (change)="onAreaConhecimentoChange()"></input-select>
                    </ng-template>
                </column>
                <column title="Curso" titleHint="Escolha o curso." [template]="columnCurso" [editTemplate]="editCurso">
                    <ng-template let-row="row" #columnCurso>
                        {{row.curso.nome}}
                    </ng-template>
                    <ng-template let-row="row" #editCurso>
                        <input-select #curso [size]="3" label="Curso" icon="fas fa-graduation-cap" controlName="curso_id" fullEntity liveSearch [control]="formGraduacao!.controls.curso_id" [dao]="cursoDao"  [where]="cursoWhere" [addRoute]="{route: ['raiox','cadastros','curso','new']}"></input-select>
                    </ng-template>
                </column>
                <column type="options"></column>
            </columns>
        </grid>
    </div>