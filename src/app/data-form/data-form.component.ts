import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { distinctUntilChanged, empty, switchMap, tap } from 'rxjs';
import { EstadoBr } from '../models/estado-br/estado-br';
import { CepServiceService } from '../service/cep-service.service';
import { EstadosService } from '../service/estados/estados.service';
import { BaseFormComponent } from '../shared/base-form/base-form.component';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent extends BaseFormComponent{
  
  estados!: EstadoBr[];
  
  constructor(private formBuilder: FormBuilder,
    private cepService: CepServiceService,
    private estadosService: EstadosService
    ) {
      super();
      
      this.formulario = this.formBuilder.group({
        nome: [null],
        email: [null],
        aceite: [null],
        endereco: this.formBuilder.group({
          cep: [null, Validators.minLength(8)],
          bairro: [null],
          complemento: [null],
          ddd: [null],
          rua: [null],
          cidade: [null],
          uf: [null]
        }),
      });
      
      this.formulario.get('endereco.cep')?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log("pipe - valor do cep: ", value)),
        switchMap(status => status === 'VALID' ?
        this.cepService.buscar(this.formulario.get('endereco.cep')?.value)
        : empty()
        )
        )
        .subscribe(dados => dados ?  this.popularDados(dados) : {});
      }
      
      override ngOnInit() {
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
      
      submit() {
        console.log(this.formulario.value);
      }

}
