
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSelectModule, MatCheckbox, MatIcon, MatOption, MatSelect, MatInput } from '@angular/material';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  multiselect;
  searchable;
  colors = ['red', 'yellow', 'green', 'blue', 'violet', 'brown'];
  constructor() { }

  ngOnInit() {
  }

}
