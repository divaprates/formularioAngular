import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnderecoComponent } from './endereco/endereco.component';
import { DataFormComponent } from './data-form/data-form.component';
import { DataFormModule } from './data-form/data-form.module';
import { MatSelectModule } from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    AppComponent,
    EnderecoComponent,
    DataFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    DataFormModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
