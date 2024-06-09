import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from './chat.service';
import { CookieService } from 'ngx-cookie-service';
import { InfoUsuario } from './models/infoUsuario';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public mensagemForm: FormGroup;
  private mensagemContainer: ElementRef<any>;
  public infoUsuario: InfoUsuario;
  public usuariasConectados: Array<InfoUsuario>;

  @ViewChild("mensagens", {static: true}) public mensagensView: ElementRef<any>;

  constructor(private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private chatService: ChatService,
    private cookieService: CookieService){
    
  }

  ngOnInit(): void {
    this.criarMensagemForm();

    this.recuperarDadosUsuario();

    this.recuperarUsuariosConectados();

    this.chatService.entrarNoGrupo(this.infoUsuario);

    this.chatService.receberMensagens()
      .subscribe(dados => {
        this.adicionarMensagem(dados);
      });
  }
  
  recuperarUsuariosConectados() {
    this.usuariasConectados = new Array<InfoUsuario>(
      {nomeUsuario: "Larissa", nomeSala: 'teste', linkAvatar: 'https://media4.giphy.com/media/9JIXRFfzne5PyIDwT5/giphy.gif?cid=6c09b9521yff7nlgizd37zrdf8innj2q5h4cfb7j5s0mpci9&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s'},
      {nomeUsuario: "Paulo", nomeSala: 'teste', linkAvatar: 'https://s2.glbimg.com/KIqJ85ydDfupxMuEkz59l8jB5y8=/0x0:480x270/1000x0/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2020/t/t/XYABdGQK6T9MEA5NIi2A/animated-gif-downsized-large-1-.gif'},
      {nomeUsuario: "Ayka", nomeSala: 'teste', linkAvatar: 'https://media.tenor.com/5P0-xmeMUt0AAAAM/vasco-vegetti.gif'},
    );
  }

  private recuperarDadosUsuario() {
    var jsonUsuario = this.cookieService.get("infoUsuario");
    this.infoUsuario = JSON.parse(jsonUsuario) as InfoUsuario;
  }

  criarMensagemForm(){
    this.mensagemForm = this.formBuilder.group({
      mensagem: ['', [Validators.required]]
    })
  }

  adicionarMensagem(mensagem: any){
    let elemento = this.mensagensView.nativeElement;
    var elementoMensagem = this.renderer.createElement("p");
    var div = this.renderer.createElement("div");
    div.classList.add("w-100");
    div.classList.add("d-flex");
    div.classList.add("justify-content-end");
    elementoMensagem.classList.add("mensagem");
    elementoMensagem.classList.add("d-flex");
    elementoMensagem.classList.add("justify-content-end");
    elementoMensagem.classList.add("mensagem-esquerda");
    elementoMensagem.innerText = mensagem;
    div.appendChild(elementoMensagem);
    elemento.appendChild(div);
  }

  enviar(){
    let resposta = this.mensagemForm.getRawValue();
    this.adicionarMensagem(resposta.mensagem);

    this.chatService.enviarMensagem(resposta.mensagem);
    
  }
}
