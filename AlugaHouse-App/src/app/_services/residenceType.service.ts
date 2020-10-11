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
}
