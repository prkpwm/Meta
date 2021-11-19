import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countup',
  templateUrl: './countup.component.html',
  styleUrls: ['./countup.component.scss']
})
export class CountupComponent implements OnInit {

  constructor() { }

  public timer: any;
  public oldDate = new Date(("2019-12-01"));

  ngOnInit(): void {
    setInterval(() => {
      this.timer = this.dhms(Math.floor((new Date().getTime())));
    }, 1000)
  }


  dhms(difference) {
    return {
      days: new Date().getDate(),
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
      seconds: new Date().getSeconds()
    };
  }

}
