import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, NgxMaskOptions, provideNgxMask } from 'ngx-mask';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { GridComponent } from '../components/grid/grid.component';
import { ColumnComponent } from '../components/grid/column/column.component';
import { ColumnHeaderComponent } from '../components/grid/column-header/column-header.component';
import { ColumnRowComponent } from '../components/grid/column-row/column-row.component';
import { ColumnOptionsComponent } from '../components/grid/column-options/column-options.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { FilterComponent } from '../components/grid/filter/filter.component';
import { ColumnsComponent } from '../components/grid/columns/columns.component';
import { EditableFormComponent } from '../components/editable-form/editable-form.component';
import { PaginationComponent } from '../components/grid/pagination/pagination.component';
import { InputContainerComponent } from '../components/input/input-container/input-container.component';
import { InputSwitchComponent } from '../components/input/input-switch/input-switch.component';
import { InputDisplayComponent } from '../components/input/input-display/input-display.component';
import { InputSearchComponent } from '../components/input/input-search/input-search.component';
import { InputButtonComponent } from '../components/input/input-button/input-button.component';
import { InputTextComponent } from '../components/input/input-text/input-text.component';
import { InputTextareaComponent } from '../components/input/input-textarea/input-textarea.component';
import { InputDatetimeComponent } from '../components/input/input-datetime/input-datetime.component';
import { InputRadioComponent } from '../components/input/input-radio/input-radio.component';
import { InputSelectComponent } from '../components/input/input-select/input-select.component';
import { InputMultiselectComponent } from '../components/input/input-multiselect/input-multiselect.component';
import { InputColorComponent } from '../components/input/input-color/input-color.component';
import { InputTimerComponent } from '../components/input/input-timer/input-timer.component';
import { InputRateComponent } from '../components/input/input-rate/input-rate.component';
import { InputMultitoggleComponent } from '../components/input/input-multitoggle/input-multitoggle.component';
import { TabsComponent } from '../components/tabs/tabs.component';
import { TabComponent } from '../components/tabs/tab/tab.component';
import { SeparatorComponent } from '../components/separator/separator.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReportComponent } from '../components/grid/report/report.component';
import { ColumnExpandComponent } from '../components/grid/column-expand/column-expand.component';
import { KanbanComponent } from '../components/kanban/kanban.component';
import { SwimlaneComponent } from '../components/kanban/swimlane/swimlane.component';
import { DockerComponent } from '../components/kanban/docker/docker.component';
import { CardComponent } from '../components/kanban/card/card.component';
import { DndModule } from 'ngx-drag-drop';
import { OrderComponent } from '../components/grid/order/order.component';
import { InputWorkloadComponent } from '../components/input/input-workload/input-workload.component';
import { CommentComponent } from '../components/comment/comment.component';
import { BadgeComponent } from '../components/badge/badge.component';
import { ProfilePictureComponent } from '../components/profile-picture/profile-picture.component';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar.component';
import { InputNumberComponent } from '../components/input/input-number/input-number.component';
import { TopAlertComponent } from '../components/top-alert/top-alert.component';
import { MapComponent } from '../components/map/map.component';
import { MapItemComponent } from '../components/map/map-item/map-item.component';
import { MapForeachComponent } from '../components/map/map-foreach/map-foreach.component';
import { InputEditorComponent } from '../components/input/input-editor/input-editor.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { GlobalsService } from '../services/globals.service';
import { SidePanelComponent } from '../components/grid/side-panel/side-panel.component';
import { DocumentPreviewComponent } from '../components/document-preview/document-preview.component';
import { InputLevelComponent } from '../components/input/input-level/input-level.component';
import { ActionButtonComponent } from '../components/action-button/action-button.component';
import { AccordionComponent } from '../components/accordion/accordion.component';
import { SectionComponent } from '../components/accordion/section/section.component';
import { CollapseCardComponent } from '../components/collapse-card/collapse-card.component';
import { DoubleScrollbarComponent } from '../components/double-scrollbar/double-scrollbar.component';
import { ButtonDashboardComponent } from '../components/button-dashboard/button-dashboard.component';
import { JsonViewerComponent } from '../components/json-viewer/json-viewer.component';
import { InputChooseComponent } from '../components/input/input-choose/input-choose.component';
import { ReactionComponent } from '../components/reaction/reaction.component';
import { InputCheckComponent } from '../components/input/input-check/input-check.component';
import { HeaderGroupComponent } from '../components/grid/header-group/header-group.component';
import { HeaderGroupsComponent } from '../components/grid/header-groups/header-groups.component';

const maskConfigFunction: () => NgxMaskOptions = () => {
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
    provideNgxMask(maskConfigFunction),
  ]
})
export class SharedModule { }
