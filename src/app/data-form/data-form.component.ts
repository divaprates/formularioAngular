import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CepServiceService } from '../service/cep-service.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private cepService: CepServiceService
  ) {
    this.formulario = this.formBuilder.group({
      cep: [null],
      bairro: [null],
      complemento: [null],
      ddd: [null],
      rua: [null],
      cidade: [null],
      uf: [null]
    });
  }

  ngOnInit() { }

  consultarCEP() {
    let cep = this.formulario.get('cep')?.value;

    if (cep != '') {
      this.cepService.buscar(cep).subscribe(res => {
        this.popularDados(res);
      });
    }
  }

  popularDados(dados: any) {
    this.formulario.setValue({
      cep: dados.cep,
      bairro: dados.bairro,
      complemento: dados.complemento,
      ddd: dados.ddd,
      rua: dados.logradouro,
      cidade: dados.localidade,
      uf: dados.uf,
    })
  }

  onSubmit() {
    console.log(this.formulario.value);
  }

  reset() {
    this.formulario.reset();
  }

}
