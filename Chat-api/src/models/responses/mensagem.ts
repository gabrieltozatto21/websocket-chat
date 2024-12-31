export class Mensagem {
    mensagem: string;
    usuario: string;
    horario: Date;

    public constructor(params?: Partial<Mensagem>){
        this.mensagem = params?.mensagem || '';
        this.usuario = params?.usuario || '';
        this.horario = params?.horario || new Date();
    }
    

    public criarMensagem(mensagem: string, usuario: string){
        return new Mensagem({
            mensagem: mensagem,
            usuario: usuario,
            horario: new Date()
        })
    }
}