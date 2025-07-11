import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, IConfig, provideNgxMask, provideEnvironmentNgxMask } from 'ngx-mask';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { GridComponent } from './grid/grid.component';
import { ColumnComponent } from './grid/column/column.component';
import { ColumnHeaderComponent } from './grid/column-header/column-header.component';
import { ColumnRowComponent } from './grid/column-row/column-row.component';
import { ColumnOptionsComponent } from './grid/column-options/column-options.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FilterComponent } from './grid/filter/filter.component';
import { ColumnsComponent } from './grid/columns/columns.component';
import { EditableFormComponent } from './editable-form/editable-form.component';
import { PaginationComponent } from './grid/pagination/pagination.component';
import { InputContainerComponent } from './input/input-container/input-container.component';
import { InputSwitchComponent } from './input/input-switch/input-switch.component';
import { InputDisplayComponent } from './input/input-display/input-display.component';
import { InputSearchComponent } from './input/input-search/input-search.component';
import { InputButtonComponent } from './input/input-button/input-button.component';
import { InputTextComponent } from './input/input-text/input-text.component';
import { InputTextareaComponent } from './input/input-textarea/input-textarea.component';
import { InputDatetimeComponent } from './input/input-datetime/input-datetime.component';
import { InputRadioComponent } from './input/input-radio/input-radio.component';
import { InputSelectComponent } from './input/input-select/input-select.component';
import { InputMultiselectComponent } from './input/input-multiselect/input-multiselect.component';
import { InputColorComponent } from './input/input-color/input-color.component';
import { InputTimerComponent } from './input/input-timer/input-timer.component';
import { InputRateComponent } from './input/input-rate/input-rate.component';
import { InputMultitoggleComponent } from './input/input-multitoggle/input-multitoggle.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab/tab.component';
import { SeparatorComponent } from './separator/separator.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReportComponent } from './grid/report/report.component';
import { ColumnExpandComponent } from './grid/column-expand/column-expand.component';
import { KanbanComponent } from './kanban/kanban.component';
import { SwimlaneComponent } from './kanban/swimlane/swimlane.component';
import { DockerComponent } from './kanban/docker/docker.component';
import { CardComponent } from './kanban/card/card.component';
import { DndModule } from 'ngx-drag-drop';
import { OrderComponent } from './grid/order/order.component';
import { InputWorkloadComponent } from './input/input-workload/input-workload.component';
import { CommentComponent } from './comment/comment.component';
import { BadgeComponent } from './badge/badge.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { InputNumberComponent } from './input/input-number/input-number.component';
import { TopAlertComponent } from './top-alert/top-alert.component';
import { MapComponent } from './map/map.component';
import { MapItemComponent } from './map/map-item/map-item.component';
import { MapForeachComponent } from './map/map-foreach/map-foreach.component';
import { InputEditorComponent } from './input/input-editor/input-editor.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { GlobalsService } from '../services/globals.service';
import { SidePanelComponent } from './grid/side-panel/side-panel.component';
import { DocumentPreviewComponent } from './document-preview/document-preview.component';
import { InputLevelComponent } from './input/input-level/input-level.component';
import { ActionButtonComponent } from './action-button/action-button.component';
import { AccordionComponent } from './accordion/accordion.component';
import { SectionComponent } from './accordion/section/section.component';
import { CollapseCardComponent } from './collapse-card/collapse-card.component';
import { DoubleScrollbarComponent } from './double-scrollbar/double-scrollbar.component';
import { ButtonDashboardComponent } from './button-dashboard/button-dashboard.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { JsonViewerComponent } from './json-viewer/json-viewer.component';
import { InputChooseComponent } from './input/input-choose/input-choose.component';
import { ReactionComponent } from './reaction/reaction.component';
import { InputCheckComponent } from './input/input-check/input-check.component';
import { HeaderGroupComponent } from './grid/header-group/header-group.component';
import { HeaderGroupsComponent } from './grid/header-groups/header-groups.component';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};


@NgModule({
  declarations: [
    GridComponent,
    ColumnComponent,
    ColumnHeaderComponent,
    ColumnRowComponent,
    ColumnOptionsComponent,
    ToolbarComponent,
    FilterComponent,
    ColumnsComponent,
    EditableFormComponent,
    PaginationComponent,
    InputContainerComponent,
    InputSwitchComponent,
    InputDisplayComponent,
    InputSearchComponent,
    InputButtonComponent,
    InputTextComponent,
    InputTextareaComponent,
    InputDatetimeComponent,
    InputRadioComponent,
    InputSelectComponent,
    InputMultiselectComponent,
    InputColorComponent,
    InputTimerComponent,
    InputRateComponent,
    InputChooseComponent,
    InputMultitoggleComponent,
    TabsComponent,
    TabComponent,
    SeparatorComponent,
    TopAlertComponent,
    ReportComponent,
    ColumnExpandComponent,
    KanbanComponent,
    SwimlaneComponent,
    DockerComponent,
    CardComponent,
    OrderComponent,
    InputWorkloadComponent,
    CommentComponent,
    BadgeComponent,
    ProfilePictureComponent,
    ProgressBarComponent,
    InputNumberComponent,
    MapComponent,
    MapItemComponent,
    MapForeachComponent,
    InputEditorComponent,
    SidePanelComponent,
    DocumentPreviewComponent,
    InputLevelComponent,
    ActionButtonComponent,
    AccordionComponent,
    SectionComponent,
    CollapseCardComponent,
    DoubleScrollbarComponent,
    ButtonDashboardComponent,
    JsonViewerComponent,
    ReactionComponent,
    InputCheckComponent,
    HeaderGroupComponent,
    HeaderGroupsComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    FormsModule,
    DndModule,
    //CurrencyMaskModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    EditorModule,
    NgScrollbarModule,
    TreeModule,
    TreeSelectModule
  ],
  exports: [
    GridComponent,
    ColumnsComponent,
    ColumnComponent,
    FilterComponent,
    ToolbarComponent,
    PaginationComponent,
    EditableFormComponent,
    InputContainerComponent,
    InputSwitchComponent,
    InputDisplayComponent,
    InputSearchComponent,
    InputButtonComponent,
    InputTextComponent,
    InputTextareaComponent,
    InputDatetimeComponent,
    InputRadioComponent,
    InputSelectComponent,
    InputColorComponent,
    InputMultiselectComponent,
    InputTimerComponent,
    InputRateComponent,
    InputChooseComponent,
    InputMultitoggleComponent,
    TabsComponent,
    TabComponent,
    SeparatorComponent,
    TopAlertComponent,
    ReportComponent,
    KanbanComponent,
    SwimlaneComponent,
    DockerComponent,
    CardComponent,
    OrderComponent,
    InputWorkloadComponent,
    CommentComponent,
    BadgeComponent,
    ProfilePictureComponent,
    ProgressBarComponent,
    InputNumberComponent,
    MapComponent,
    MapItemComponent,
    MapForeachComponent,
    InputEditorComponent,
    SidePanelComponent,
    DocumentPreviewComponent,
    InputLevelComponent,
    ActionButtonComponent,
    AccordionComponent,
    SectionComponent,
    CollapseCardComponent,
    ButtonDashboardComponent,
    DoubleScrollbarComponent,
    JsonViewerComponent,
    ReactionComponent,
    InputCheckComponent,
    HeaderGroupComponent,
    HeaderGroupsComponent
  ],
  providers: [
    { 
      provide: TINYMCE_SCRIPT_SRC, //useValue: 'tinymce/tinymce.min.js' 
      useFactory: (gb: GlobalsService) => gb.baseURL + 'tinymce/tinymce.min.js',
      deps: [GlobalsService]
    },
    provideEnvironmentNgxMask(maskConfigFunction),
  ]
})
export class ComponentsModule { }
