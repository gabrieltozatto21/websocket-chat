export class InfoUsuario{
    nomeUsuario: string
    nomeSala: string
    linkAvatar: string

    constructor(params?: Partial<InfoUsuario>){
        this.nomeUsuario = params?.nomeUsuario || '';
        this.nomeSala = params?.nomeSala || '';
        this.linkAvatar = params?.linkAvatar || '';
    }
}