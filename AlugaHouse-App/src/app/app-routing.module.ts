import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResidenceTypesComponent } from './residenceTypes/residenceTypes.component';

const routes: Routes = [
  {path: 'tipoResidencia', component: ResidenceTypesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
