import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TekliComponent} from "./tekli/tekli.component";

const routes: Routes = [
  {
    path: '', component: TekliComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
