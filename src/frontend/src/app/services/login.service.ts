import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

export interface User {
    username: string;
    password: string;
}

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }


    loginUser(user: User): Observable<User> {
        return this.http.post<User>('http://localhost:3000/api/login', user);
    }

}