import {
  Component,
  OnInit,
  NgZone,
  OnDestroy,
  DoCheck
} from '@angular/core';
import COUNTRY_CODES from "../../shared/utils/countries"

import {
  ActivatedRoute
} from "@angular/router";


import {
  GetdataService
} from "./../../core/services/getdata.service";

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-country',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class contactComponent implements OnInit {


  constructor(private route: ActivatedRoute, private _getDataService: GetdataService, private zone: NgZone, public translate : TranslateService) {}

  title:string;
  
  ngOnInit(){
    localStorage.setItem("title","About")
  }


}