import { Component, OnInit } from '@angular/core';

declare var particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    particlesJS.load('particles-js', '../../assets/jsons/particles.json', function() {
      console.log('callback - particles.js config loaded');
    });
  }
  
  

}
