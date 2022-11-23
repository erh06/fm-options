import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FmOptionsComponent } from './fm-options/fm-options.component';
import { TekliComponent } from './tekli/tekli.component';

@NgModule({
  declarations: [
    AppComponent,
    FmOptionsComponent,
    TekliComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
