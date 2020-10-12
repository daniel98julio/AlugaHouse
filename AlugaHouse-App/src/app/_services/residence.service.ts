import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/util/Constants';
import { Residence } from '../_models/Residence';

@Injectable()
export class ResidenceService {
    
    baseURL = Constants.url_Residences;
    
    constructor(private http: HttpClient) { }
    
    getAllResidences(): Observable<Residence[]>{
        return this.http.get<Residence[]>(this.baseURL)
    }
}
