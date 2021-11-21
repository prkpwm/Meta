import { Component, HostListener, OnInit } from '@angular/core';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  constructor( ) { }

  deferredPrompt: any;
  showButton = false;
  @HostListener('window:beforeinstallprompt', ['$event'])
  title:string;

  ngOnInit(){
    try {
      this.title = window.location.href.split("/")[3]
      if(this.title == '')
        this.title = "Dashboard"

    }
    catch(err) {
      console.log(err)
    }
  }

  onClickPage(name:string){
    localStorage.setItem('title',name)
  }
  

  onbeforeinstallprompt(e) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
    
  }
  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
    .then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    this.deferredPrompt = null;
  });
  
}
}
