import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

export interface Technology {
    id: number;
    name: string;
    category: string;
    ring: string;
    ringdescription: string;
    description: string;
    // author: string;
    // creationDate: Date;
    published: boolean;
}

@Injectable()
export class TechnologyService {
    constructor(private http: HttpClient) { }

    getAllTechnologies(): Observable<Technology[]> {
        return this.http.get<Technology[]>('http://localhost:3000/api/technologies')
    }

    getAllPublishedTechnologies(): Observable<Technology[]> {
        return this.http.get<Technology[]>('http://localhost:3000/api/technologies?published=true')
    }

    createNewTechnology(newTechnology: Technology): Observable<Technology> {
        return this.http.post<Technology>('http://localhost:3000/api/technologies', newTechnology);
    }
    updateTechnology(technology: Technology): Observable<Technology> {
        return this.http.put<Technology>('http://localhost:3000/api/technologies', technology);
    }
    updatePublishTechnology(technology: Technology): Observable<Technology> {
        return this.http.put<Technology>('http://localhost:3000/api/technologies/publish', technology);
    }

}