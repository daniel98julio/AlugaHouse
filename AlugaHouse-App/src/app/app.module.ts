import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TooltipModule} from 'ngx-bootstrap/tooltip';
import { ModalModule} from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ResidenceService } from './_services/Residence.service';
import { ResidenceTypeService } from './_services/residenceType.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ResidencesComponent } from './residences/residences.component';
import { ResidenceTypesComponent } from './residenceTypes/residenceTypes.component';

@NgModule({
  declarations: [				
    AppComponent,
      NavbarComponent,
      ResidencesComponent,
      ResidenceTypesComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot( {
      preventDuplicates: true}),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ResidenceService,
    ResidenceTypeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
