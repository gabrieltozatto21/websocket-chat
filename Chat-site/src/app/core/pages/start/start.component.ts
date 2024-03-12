import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  public formEntrarChat: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService){

  }

  ngOnInit(): void {
    this.criarEntrarChatForm();

  }

  private criarEntrarChatForm(){
    this.formEntrarChat = this.formBuilder.group({
      nomeUsuario: ['', [Validators.required]],
      nomeSala: ['', Validators.required]
    })
  }

  entrarChat(){
    let infoUsuario = JSON.stringify(this.formEntrarChat.getRawValue());
    this.cookieService.set("infoUsuario", infoUsuario)

    this.router.navigate(['/chat'])
  }


}
