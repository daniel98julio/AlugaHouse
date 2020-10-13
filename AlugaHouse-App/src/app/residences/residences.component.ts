import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/util/Constants';
import { Residence } from '../_models/Residence';
import { SearchZipCode } from '../_models/SearchZipCode';
import { ResidenceService } from '../_services/Residence.service';
import { ResidenceTypeService } from '../_services/residenceType.service';

@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.css']
})
export class ResidencesComponent implements OnInit {
  residence: Residence;

  searchZipCode: SearchZipCode;

  registerForm: FormGroup;
  bodyDeleteResidence = '';
  operationType = Constants.PutOperation;

  _listFilter: string;

  constructor(
    public residenceService: ResidenceService,
    public residenceTypeService: ResidenceTypeService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private toastr: ToastrService) {
  }

  get listFilter(): string{
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.residenceService.filteredResidences = this.listFilter ? this.filterResidences(this.listFilter) : this.residenceService.residences;
  }

  ngOnInit() {
    this.validation();
    this.residenceService.getResidences();
    this.residenceTypeService.getResidenceTypes();
  }
  
  newResidence(add: any){
    this.operationType = Constants.PostOperation;
    this.openModal(add);
  }
  
  editResidence(residence: Residence, edt: any){
    this.operationType = Constants.PutOperation;
    this.openModal(edt);
    this.residence = residence;
    this.registerForm.patchValue(residence);
  }
  
  deleteResidence(residence: Residence, dlt: any) {
    this.openModal(dlt);
    this.residence = residence;
    this.bodyDeleteResidence = `Você confirma a exclusão deste ${residence.residenceTypeId} em ${residence.city}?`;
  }

  confirmDelete(dlt: any) {
    this.residenceService.deleteResidence(this.residence.residenceId).subscribe(
      () => {
          dlt.hide();
          this.residenceService.getResidences();
          this.toastr.success(Constants.deleteSuccess);
        }, error => {
          this.toastr.error(Constants.operationError);
        }
    );
  }

  replaceZip(zipCode: string){
    return zipCode.replace(/\D/g, '');
  }

  validateZipCode(zipCode: string){
    zipCode = this.replaceZip(zipCode);
    if (Constants.zipCodeCorrect.test(zipCode)){
    this.residenceService.getAddressByViaCepApi(zipCode)
    .subscribe((_searchCode: SearchZipCode) => this.registerForm.patchValue(_searchCode));
    }
  }

  openModal(modal: any){
    this.registerForm.reset();
    this.residenceTypeService.getAllResidenceTypes();
    modal.show();
  }

  filterResidences(filtrarPor: string): Residence[] {
    return this.residenceService.residences.filter(
      residence => residence.zipCode.indexOf(filtrarPor) !== -1
      );
    }

  validation(){
    this.registerForm = this.fb.group({
      zipCode: ['', [
        Validators.required, 
        Validators.minLength(9), 
        Validators.maxLength(9)
      ]],
      streetAddress: [''],
      numberAddress: ['', [
        Validators.required,
        Validators.min(0)
      ]],
      complement:  [''],
      neighborhood: [''],
      city:  [''],
      state: [''],
      rented: ['', Validators.required],
      residenceTypeId: ['', Validators.required]
    });
  }

  saveChanges(save: any){
    if(this.registerForm.valid){
      if(this.operationType === Constants.PostOperation){
        this.residence = Object.assign({}, this.registerForm.value);
        this.residence.zipCode = this.replaceZip(this.residence.zipCode);
        this.residenceService.postResidence(this.residence).subscribe(
          (newResidence: Residence) => {
            save.hide();
            this.residenceService.getResidences();
            this.toastr.success(Constants.saveSuccess);
          }, error => {
            this.toastr.error(Constants.operationError);
            console.error;
            }
          );
        }else{
          this.residence = Object.assign({residenceId: this.residence.residenceId}, this.registerForm.value);
          this.residence.zipCode = this.replaceZip(this.residence.zipCode);
          this.residenceService.putResidence(this.residence).subscribe(
            () => {
              save.hide();
              this.residenceService.getResidences();
              this.toastr.success(Constants.saveSuccess);
            }, error => {
              this.toastr.error(Constants.operationError);
              }
            );
        }
    }
  }
}

