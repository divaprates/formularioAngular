import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { distinctUntilChanged, empty, map, switchMap, tap } from 'rxjs';
import { CidadeBr } from '../models/cidade-br/cidade-br';
import { EstadoBr } from '../models/estado-br/estado-br';
import { CepServiceService } from '../service/cep-service.service';
import { CidadesService } from '../service/cidades/cidades.service';
import { EstadosService } from '../service/estados/estados.service';
import { BaseFormComponent } from '../shared/base-form/base-form.component';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent extends BaseFormComponent{
  
  estados: EstadoBr[] = [];
  cidades: CidadeBr[]  = [];
  
  constructor(private formBuilder: FormBuilder,
    private cepService: CepServiceService,
    private estadosService: EstadosService,
    private cidadesService: CidadesService
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
        
      this.formulario.get('endereco.uf')?.valueChanges
      .pipe(
        tap(estado => console.log('estado: ', estado)),
        map(estado => this.estados.filter(e => e.sigla === estado)),
        map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
        switchMap(estadoId => this.cidadesService.getCidadesBr(Number(estadoId))),
        tap()
      )
      .subscribe(
        cidades => this.cidades = cidades
        );
      
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

      listarCidades(idEstado: number) {
        this.cidadesService.getCidadesBr(idEstado).subscribe(res => {
          this.cidades = res;
        })
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
