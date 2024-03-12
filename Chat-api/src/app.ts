import express from "express"
import { Server, createServer } from "http";
import { Server as Io } from "socket.io";

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
            socket.on("entrarSala", ({nomeUsuario, sala}) => {

                socket.join(sala);

                socket.broadcast
                .to(sala)
                .emit('mensagem', `${nomeUsuario} entrou no chat!`);

                socket.on('mensagem', (mensagem: any) =>{
                    this.socketIo
                    .to(sala)
                    .emit('mensagem', mensagem);
                })

                socket.on('disconnect', () =>{
                    this.socketIo
                    .to(sala)
                    .emit('mensagem', `${nomeUsuario} saiu do chat!`);
                });
            })

        })
    }
}

export default App;