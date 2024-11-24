import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RelatorioDeAnaliseService {
  private _mustConfirm = true;

  constructor() {
    this.setupBeforeUnloadListener();
  }

  private setupBeforeUnloadListener(): void {
    window.addEventListener('beforeunload', (event: BeforeUnloadEvent) => {
      if (this._mustConfirm) {
        event.preventDefault();
        event.returnValue = 'Você precisa confirmar a saída ou salvar os dados antes de sair.';
        return 'Você precisa confirmar a saída ou salvar os dados antes de sair.';
      }
    });
  }

  // Método para liberar o fechamento da página
  allowClose(): void {
    this._mustConfirm = false;
  }

  // Método para bloquear o fechamento da página
  blockClose(): void {
    this._mustConfirm = true;
  }

  // Verificar se ainda precisa confirmar
  needsConfirmation(): boolean {
    return this._mustConfirm;
  }
}