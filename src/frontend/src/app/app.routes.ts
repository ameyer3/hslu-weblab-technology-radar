import { Routes } from '@angular/router';
import { TechnologiesComponent } from './technologies/technologies.component';
import { ConfigureTechnologyComponent } from './configure-technology/configure-technology.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'technologies', component: TechnologiesComponent },
    { path: 'configuration', component: ConfigureTechnologyComponent },
    { path: 'login', component: LoginComponent },

];
