import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { User, LoginService } from '../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatInputModule, FormsModule],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;
  model: User = { username: "", password: "" }

  constructor(private loginService: LoginService, private router: Router) {

  }

  onSubmit(user: User): void {
    this.loginService.loginUser(user).subscribe(() => {
      this.router.navigate(["/technologies"]);
    });
  }
}
