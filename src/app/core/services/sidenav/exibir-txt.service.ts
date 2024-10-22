import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private _exibirTxt: boolean = true;

  setExibirTxt(value: boolean) {
    this._exibirTxt = value;
  }

  getExibirTxt(): boolean {
    return this._exibirTxt;
  }
}
