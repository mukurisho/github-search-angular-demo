import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-query-history-list-item',
  templateUrl: './query-history-list-item.component.html',
  styleUrls: ['./query-history-list-item.component.scss']
})
export class QueryHistoryListItemComponent {

  @Input() listItem: any;

  constructor() { }

}
