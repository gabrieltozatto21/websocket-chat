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
            console.log("conectado");

            this.socketIo.emit('mensagem', `${socket.id} entrou no chat!`);


            socket.on('mensagem', (mensagem: any) =>{
                socket.broadcast.emit('mensagem', mensagem);
            })


            socket.on('disconnect', () =>{
                this.socketIo.emit('mensagem', `${socket.id} saiu do chat!`);

                console.log("desconectado"); 
            });
        })
    }
}

export default App;