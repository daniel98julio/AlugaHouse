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
    
    constructor(private http: HttpClient) { }
    
    getAllResidenceTypes(): Observable<ResidenceType[]>{
        return this.http.get<ResidenceType[]>(this.baseURL)
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
