import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  private socket = io('http://localhost:3000');
  
  constructor() { }
  
  enviarMensagem(mensagem: string){
    this.socket.emit('novaMensagem', mensagem);
  }

  receberMensagens(): Observable<any>{
    let observer =new Observable<any>(observador => {

      this.socket.on('mensagem', (dados) =>{
        return observador.next(dados);
      });

      return () => { this.socket.disconnect(); };
      
    });

    return observer;
  }

}
