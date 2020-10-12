import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/util/Constants';
import { Residence } from '../_models/Residence';
import { ResidenceType } from '../_models/ResidenceType';
import { SearchZipCode } from '../_models/SearchZipCode';
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
  residence: Residence;

  filteredResidenceTypes: ResidenceType[];//vai usar
  residenceTypes: ResidenceType[];//vai usar

  searchZipCode: SearchZipCode;

  registerForm: FormGroup;
  bodyDeleteResidence = '';
  operationType = Constants.PutOperation;

  _listFilter: string;

  constructor(
    private residenceService: ResidenceService,
    private residenceTypeService: ResidenceTypeService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private toastr: ToastrService) {
  }

  get listFilter(): string{
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filteredResidences = this.listFilter ? this.filterResidences(this.listFilter) : this.residences;
  }

  ngOnInit() {
    this.validation();
    this.getResidences();
    this.getResidenceTypes();
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
          this.getResidences();
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
    this.getResidenceTypes();
    modal.show();
  }

  filterResidences(filtrarPor: string): Residence[] {
    return this.residences.filter(
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
      rented: [''],
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
            this.getResidences();
            this.toastr.success(Constants.saveSuccess);
          }, error => {
            this.toastr.error(Constants.operationError);
            }
          );
        }else{
          this.residence = Object.assign({residenceId: this.residence.residenceId}, this.registerForm.value);
          this.residence.zipCode = this.replaceZip(this.residence.zipCode);
          this.residenceService.putResidence(this.residence).subscribe(
            () => {
              save.hide();
              this.getResidences();
              this.toastr.success(Constants.saveSuccess);
            }, error => {
              this.toastr.error(Constants.operationError);
              }
            );
        }
    }
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

  getResidenceTypes() {//vai usar
    this.residenceTypeService.getAllResidenceTypes().subscribe(
    (_residenceTypes: ResidenceType[]) => {
      this.residenceTypes = _residenceTypes;
      this.filteredResidenceTypes = this.residenceTypes;
    }, error => {
      console.log(error)
    });
  }
}

