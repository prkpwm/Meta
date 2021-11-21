import {
  Component,
  OnInit
} from '@angular/core';


import {
  ActivatedRoute
} from "@angular/router";


@Component({
  selector: 'app-country',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class aboutComponent{

  constructor(private route: ActivatedRoute) {}



}