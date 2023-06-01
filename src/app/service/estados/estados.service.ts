import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoBr } from 'src/app/models/estado-br/estado-br';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  constructor(private http: HttpClient) { }

  getEstadosBr() {
    return this.http.get<Array<EstadoBr>>('assets/dados/estadosBr.json');
  }
}
