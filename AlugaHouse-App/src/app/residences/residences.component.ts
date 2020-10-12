import { Component, OnInit, TemplateRef } from '@angular/core';
import { Residence } from '../_models/Residence';
import { ResidenceType } from '../_models/ResidenceType';
import { ResidenceService } from '../_services/Residence.service';
import { ResidenceTypeService } from '../_services/residenceType.service';

@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.css']
})
export class ResidencesComponent implements OnInit {
  filteredResidences: Residence[];
  residences: Residence[];

  filteredResidenceTypes: ResidenceType[];
  residenceTypes: ResidenceType[];

  _listFilter: string;

  constructor(
    private residenceService: ResidenceService,
    private residenceTypeService: ResidenceTypeService) {
  }

  get listFilter(): string{
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filteredResidences = this.listFilter ? this.filterResidences(this.listFilter) : this.residences;
  }

  ngOnInit() {
    this.getResidences();
    this.getResidenceTypes();
  }

  filterResidences(filtrarPor: string): Residence[] {
    return this.residences.filter(
      residence => residence.zipCode.indexOf(filtrarPor) !== -1
      );
    }

  getResidences() {
    this.residenceService.getAllResidences().subscribe(
    (_residences: Residence[]) => {
      this.residences = _residences;
      this.filteredResidences = this.residences;
    }, error => {
      console.log(error)
    });
  }

  getResidenceTypes() {
    this.residenceTypeService.getAllResidenceTypes().subscribe(
    (_residenceTypes: ResidenceType[]) => {
      this.residenceTypes = _residenceTypes;
      this.filteredResidenceTypes = this.residenceTypes;
    }, error => {
      console.log(error)
    });
  }
}