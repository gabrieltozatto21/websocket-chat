import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { InfoUsuario } from '../models/infoUsuario';

@Injectable({
    providedIn: "root",
})

export class SessaoService {
    constructor(private readonly cookiesService: CookieService) { }

    registrar(sessao: InfoUsuario){
        this.cookiesService.set('infoUsuario', JSON.stringify(sessao), 1, '/', undefined, false, "Lax");
    }

    recuperar(): InfoUsuario {
        const cookie = this.recuperarCookie();

        return cookie ? new InfoUsuario(cookie) : new InfoUsuario({});
    }

    remover(): void {
        this.cookiesService.delete('infoUsuario', '/');
    }

    isRegistrado(): boolean {
        const cookie = this.cookiesService.get('infoUsuario');

        const resposta = cookie ? true : false;

        return resposta;
    }

    private recuperarCookie(): any {
        const cookie = this.cookiesService.get('infoUsuario');
        return cookie ? JSON.parse(cookie) : null;
    }
}
