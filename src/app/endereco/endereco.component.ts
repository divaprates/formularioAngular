import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CepServiceService } from '../service/cep-service.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent {

  constructor(private cepService: CepServiceService) { }

  consultarCEP(cep: any, form: any) {
    cep = cep.target.value;
    if (cep != "") {
      this.cepService.buscar(cep).subscribe(res => {
        this.popularDados(res, form);
      });
    }
  }

  popularDados(dados: any, form: any) {
    form.setValue({
      bairro: dados.bairro,
      complemento: dados.complemento,
      ddd: dados.ddd,
      rua: dados.logradouro,
      cidade: dados.localidade,
      UF: dados.uf,
    })
  }

}
