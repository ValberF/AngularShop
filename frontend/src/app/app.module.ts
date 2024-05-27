import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire'; // Importe o módulo AngularFireModule
import { AngularFireDatabaseModule } from '@angular/fire/database'; // Importe o módulo AngularFireDatabaseModule
import { environment } from '../app/environments/environment'; // Importe a configuração do Firebase

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Configure o AngularFireModule com a configuração do Firebase
    AngularFireDatabaseModule // Importe o AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
