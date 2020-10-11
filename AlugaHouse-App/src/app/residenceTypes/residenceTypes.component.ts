import { Component, OnInit } from '@angular/core';
import { ResidenceType } from '../_models/residenceType';
import { ResidenceTypeService } from '../_services/residenceType.service';

@Component({
  selector: 'app-residenceTypes',
  templateUrl: './residenceTypes.component.html',
  styleUrls: ['./residenceTypes.component.css']
})
export class ResidenceTypesComponent implements OnInit {
  filteredResidenceTypes: ResidenceType[];
  residenceTypes: ResidenceType[];
  residenceType: ResidenceType;

  _listFilter: string;

  constructor(
    private residenceTypeService: ResidenceTypeService) { }

  get listFilter(): string{
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filteredResidenceTypes = this.listFilter ? this.filterResidenceTypes(this.listFilter) : this.residenceTypes;
  }

  ngOnInit() {
    this.getResidenceTypes();
  }

  filterResidenceTypes(filtrarPor: string): ResidenceType[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.residenceTypes.filter(
      residenceType => residenceType.residenceTypeName.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      );
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
