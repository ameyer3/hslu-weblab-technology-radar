import { of } from "rxjs";
import { LoginService, User } from "./login.service";

describe('LoginService', () => {

    let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
    let loginService: LoginService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
        loginService = new LoginService(httpClientSpy as any);
    });



    it('should login', () => {
        const user: User = { username: 'a@a.com', password: 'password' };

        httpClientSpy.post.and.returnValue(of(user));

        loginService.loginUser(user);
        expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    });
});