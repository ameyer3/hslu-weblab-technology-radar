import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

export interface User {
    username: string;
    password: string;
}

export interface LoginResponse {
    success: boolean,
    data: {
        userId: number,
        username: string,
        role: string,
        token: string
    }

}

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }


    loginUser(user: User): Observable<LoginResponse> {
        return this.http.post<LoginResponse>('http://localhost:3000/api/login', user).pipe
            (tap(response => {
                localStorage.setItem("jwtToken", response.data.token);
            }));
    }

}