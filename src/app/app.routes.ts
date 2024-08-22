import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { NewUserComponent } from './pages/new-user/new-user.component';

export const routes: Routes = [{path:'', pathMatch:'full', redirectTo:'home'},
    {path:'home', component:HomeComponent},
    {path:'user/:id', component:UserComponent},
    {path:'update-user/:id', component:UpdateUserComponent},
    {path:'new-user', component:NewUserComponent},
    {path:'update-user/:id', component:UpdateUserComponent},
    {path:'**', redirectTo: 'home'}
];
