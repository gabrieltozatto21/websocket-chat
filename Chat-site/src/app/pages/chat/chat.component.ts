import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public mensagemForm: FormGroup;
  private mensagemContainer: ElementRef<any>

  @ViewChild("exibirMensagens", {static: true}) public mensagensView: ElementRef<any>;

  constructor(private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private chatService: ChatService){
    
  }

  ngOnInit(): void {
    this.criarMensagemForm();
    
    this.chatService.receberMensagens()
      .subscribe(dados => {
        this.adicionarMensagem(dados);
      });
  }

  criarMensagemForm(){
    this.mensagemForm = this.formBuilder.group({
      mensagem: ['', [Validators.required]]
    })
  }

  adicionarMensagem(mensagem: any){
    let elemento = this.mensagensView.nativeElement;
    var elementoMensagem = this.renderer.createElement("p");
    elementoMensagem.classList.add("d-block");
    elementoMensagem.innerText = mensagem;
    elemento.appendChild(elementoMensagem);
  }

  enviar(){
    let resposta = this.mensagemForm.getRawValue();
    this.adicionarMensagem(resposta.mensagem);

    this.chatService.enviarMensagem(resposta.mensagem);
    
  }
}
