import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/util/Constants';
import { ResidenceType } from '../_models/residenceType';

@Injectable({
  providedIn: 'root'
})
export class ResidenceTypeService {

    baseURL = Constants.url_ResidenceTypes;

    residenceTypes: ResidenceType[];
    filteredResidenceTypes: ResidenceType[];
    
    constructor(private http: HttpClient) { }
    
    getAllResidenceTypes(): Observable<ResidenceType[]>{
        return this.http.get<ResidenceType[]>(this.baseURL)
    }

    //This is a method used by Residence and ResidenceType Component
    getResidenceTypes() {
      this.getAllResidenceTypes().subscribe(
      (_residenceTypes: ResidenceType[]) => {
        this.residenceTypes = _residenceTypes;
        this.filteredResidenceTypes = this.residenceTypes;
      }, error => {
        console.log(error)
      });
    }
    
    postResidenceType(residenceType: ResidenceType) {
        return this.http.post(this.baseURL, residenceType);   
    }
    
    putResidenceType(residenceType: ResidenceType){
        return this.http.put(`${this.baseURL}/${residenceType.residenceTypeId}`, residenceType);
    }
    
    deleteResidenceType(residenceTypeId: number){
        return this.http.delete(`${this.baseURL}/${residenceTypeId}`)
    }
}
