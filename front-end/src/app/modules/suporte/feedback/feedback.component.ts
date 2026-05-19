import { Component, OnInit } from '@angular/core';
import { PageBase } from '../../base/page-base';

@Component({
    selector: 'feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss'],
    standalone: false
})
export class FeedbackComponent extends PageBase implements OnInit {
}
