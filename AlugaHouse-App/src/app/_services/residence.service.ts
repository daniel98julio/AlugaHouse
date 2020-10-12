import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/util/Constants';
import { Residence } from '../_models/Residence';
import { SearchZipCode } from '../_models/SearchZipCode';

@Injectable()
export class ResidenceService {
    
    baseURL = Constants.url_Residences;
    viaCepSearchURL = Constants.url_SearchZipCode
    
    constructor(private http: HttpClient) { }

    //Get ViaCep API
    getAddressByViaCepApi(zipCode: string): Observable<SearchZipCode>{
        return this.http.get<SearchZipCode>(`${this.viaCepSearchURL}/${zipCode}`)
    }
    
    getAllResidences(): Observable<Residence[]>{
        return this.http.get<Residence[]>(this.baseURL)
    }
    
    postResidence(residence: Residence) {
        return this.http.post(this.baseURL, residence);   
    }
    
    putResidence(residence: Residence){
        return this.http.put(`${this.baseURL}/${residence.residenceId}`, residence);
    }

    deleteResidence(residenceId: number){
        return this.http.delete(`${this.baseURL}/${residenceId}`)
    }
}
