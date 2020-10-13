import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/util/Constants';
import { ResidenceType } from '../_models/residenceType';
import { ResidenceTypeService } from '../_services/residenceType.service';

@Component({
  selector: 'app-residenceTypes',
  templateUrl: './residenceTypes.component.html',
  styleUrls: ['./residenceTypes.component.css']
})
export class ResidenceTypesComponent implements OnInit {
  residenceType: ResidenceType;

  registerForm: FormGroup;
  bodyDeleteResidenceType = '';
  operationType = Constants.PutOperation;

  _listFilter: string;

  constructor(
    public residenceTypeService: ResidenceTypeService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  get listFilter(): string{
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.residenceTypeService.filteredResidenceTypes = this.listFilter ? this.filterResidenceTypes(this.listFilter) : this.residenceTypeService.residenceTypes;
  }

  ngOnInit() {
    this.validation();
    this.residenceTypeService.getResidenceTypes();
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
    this.bodyDeleteResidenceType = `Você confirma a exclusão do tipo de Residência ${residenceType.residenceTypeName}?`;
  }

  confirmDelete(dlt: any) {
    this.residenceTypeService.deleteResidenceType(this.residenceType.residenceTypeId).subscribe(
      () => {
          dlt.hide();
          this.residenceTypeService.getResidenceTypes();
          this.toastr.success(Constants.deleteSuccess);
        }, error => {
          dlt.hide();
          this.toastr.error(Constants.operationError);
        }
    );
  }

  openModal(modal: any){
    this.registerForm.reset();
    modal.show();
  }

  filterResidenceTypes(filtrarPor: string): ResidenceType[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.residenceTypeService.residenceTypes.filter(
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
            this.residenceTypeService.getResidenceTypes();
            this.toastr.success(Constants.saveSuccess);
          }, error => {
            save.hide();
            this.toastr.error(Constants.operationError);
          }
        );
      }else{
        this.residenceType = Object.assign({residenceTypeId: this.residenceType.residenceTypeId}, this.registerForm.value);
        this.residenceTypeService.putResidenceType(this.residenceType).subscribe(
          () => {
            save.hide();
            this.residenceTypeService.getResidenceTypes();
            this.toastr.success(Constants.saveSuccess);
          }, error => {
            save.hide();
            this.toastr.error(Constants.operationError);
          }
        );
      }
    }
  }
}
