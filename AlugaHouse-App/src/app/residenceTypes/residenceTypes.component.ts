import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Constants } from 'src/util/Constants';
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

  registerForm: FormGroup;
  bodyDeleteResidence = '';
  operationType = Constants.PutOperation;

  _listFilter: string;

  constructor(
    private residenceTypeService: ResidenceTypeService,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) { }

  get listFilter(): string{
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filteredResidenceTypes = this.listFilter ? this.filterResidenceTypes(this.listFilter) : this.residenceTypes;
  }

  ngOnInit() {
    this.validation();
    this.getResidenceTypes();
  }

  newResidenceType(add: any){
    this.operationType = Constants.PostOperation;
    this.openModal(add);
  }
  
  editResidenceType(residenceType: ResidenceType, edt: any){
    this.operationType = Constants.PutOperation;
    this.openModal(edt);
    this.residenceType = residenceType;
    this.registerForm.patchValue(residenceType);
  }
  
  deleteResidenceType(residenceType: ResidenceType, dlt: any) {
    this.openModal(dlt);
    this.residenceType = residenceType;
    this.bodyDeleteResidence = `Você confirma a exclusão do tipo de Residência ${residenceType.residenceTypeName}?`;
  }

  confirmDelete(dlt: any) {
    this.residenceTypeService.deleteResidenceType(this.residenceType.residenceTypeId).subscribe(
      () => {
          dlt.hide();
          this.getResidenceTypes();
        }, error => {
          console.log(error);
        }
    );
  }

  openModal(modal: any){
    this.registerForm.reset();
    modal.show();
  }

  filterResidenceTypes(filtrarPor: string): ResidenceType[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.residenceTypes.filter(
      residenceType => residenceType.residenceTypeName.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      );
    }

  validation(){
    this.registerForm = this.fb.group({
      residenceTypeName: ['', [Validators.required]]
    });
  }

  saveChanges(save: any){
    if(this.registerForm.valid){
      if(this.operationType === Constants.PostOperation){
        this.residenceType = Object.assign({}, this.registerForm.value);
        this.residenceTypeService.postResidenceType(this.residenceType).subscribe(
          (newResidence: ResidenceType) => {
            save.hide();
            this.getResidenceTypes();
          }
        );
      }else{
        this.residenceType = Object.assign({residenceTypeId: this.residenceType.residenceTypeId}, this.registerForm.value);
        this.residenceTypeService.putResidenceType(this.residenceType).subscribe(
          () => {
            save.hide();
            this.getResidenceTypes();
          }, error => {
            console.log(error);
          }
        );
      }
    }
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
