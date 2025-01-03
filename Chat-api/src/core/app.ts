import express from "express"
import { Server, createServer } from "http";
import { Server as Io } from "socket.io";
import { Mensagem } from "../models/responses/mensagem";

class App{
    public App: express.Application;
    public server: Server;
    private socketIo: Io;

    constructor(){
        this.App = express();
        this.server = createServer(this.App);
        this.socketIo = new Io(this.server, {
            cors: {
                origin: '*'
            }
        });

        this.socketIo.on('connection', socket =>{
            socket.on("entrarSala", ({nomeUsuario, nomeSala}) => {
                
                socket.join(nomeSala);

                socket.broadcast
                .to(nomeSala)
                .emit('mensagem', `${nomeUsuario} entrou no chat!`);

                socket.on('chatMensagem', (texto: any) =>{

                    var mensagem = new Mensagem({
                        mensagem: texto,
                        usuario: nomeUsuario,
                        horario: new Date()
                    });

                    console.log(mensagem);

                    socket.broadcast
                    .to(nomeSala)
                    .emit('mensagem', mensagem);
                })

                socket.on('disconnect', () =>{
                    this.socketIo
                    .to(nomeSala)
                    .emit('mensagem', `${nomeUsuario} saiu do chat!`);
                });
            })

        })
    }
}

export default App;