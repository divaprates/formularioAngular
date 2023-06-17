import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent implements OnInit{

  formulario!: FormGroup;
  
  abstract submit(): any;

  constructor() {}

  ngOnInit() {
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    }else{
      console.log("Formulario inválido...");
    }
  }

  reset() {
    this.formulario.reset();
  }

}
