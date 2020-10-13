import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResidencesComponent } from './residences/residences.component';
import { ResidenceTypesComponent } from './residenceTypes/residenceTypes.component';

const routes: Routes = [
  {path: '', component: ResidencesComponent},
  {path: 'residencia', component: ResidencesComponent},
  {path: 'tipoResidencia', component: ResidenceTypesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
