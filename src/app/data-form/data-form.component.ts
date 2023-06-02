import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CepServiceService } from '../service/cep-service.service';
import { EstadosService } from '../service/estados/estados.service';
import { EstadoBr } from '../models/estado-br/estado-br';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent {

  formulario: FormGroup;

  estados!: EstadoBr[];

  constructor(private formBuilder: FormBuilder,
    private cepService: CepServiceService,
    private estadosService: EstadosService
  ) {
    this.formulario = this.formBuilder.group({
      nome: [null],
      aceite: [null],
      endereco: this.formBuilder.group({
        cep: [null],
        bairro: [null],
        complemento: [null],
        ddd: [null],
        rua: [null],
        cidade: [null],
        uf: [null]
      }),
    });
  }

  ngOnInit() { 
    this.listarEstados();
  }

  consultarCEP() {
    let cep = this.formulario.get('endereco.cep')?.value;

    if (cep != '' && cep != null) {
      this.cepService.buscar(cep).subscribe(res => {
        this.popularDados(res);
      });
    }
  }

  listarEstados() {
    this.estadosService.getEstadosBr().subscribe(res => {
        this.estados = res;
      });
  }

  popularDados(dados: any) {
    this.formulario.patchValue({
      endereco: ({
        cep: dados.cep,
        bairro: dados.bairro,
        complemento: dados.complemento,
        ddd: dados.ddd,
        rua: dados.logradouro,
        cidade: dados.localidade,
        uf: dados.uf,
      })
    })
  }

  onSubmit() {
    console.log(this.formulario.value);
  }

  reset() {
    this.formulario.reset();
  }

}
