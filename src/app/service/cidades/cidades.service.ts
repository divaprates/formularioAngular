import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { CidadeBr } from "src/app/models/cidade-br/cidade-br";

@Injectable({
  providedIn: "root",
})
export class CidadesService {
  constructor(private http: HttpClient) {}

  getCidadesBr(id: number) {
    return this.http
      .get<Array<CidadeBr>>("assets/dados/cidadesBr.json")
      .pipe(map((cidades : CidadeBr[]) => cidades.filter(cidade => cidade.estado == id)));
  }
}
