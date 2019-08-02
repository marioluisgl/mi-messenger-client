import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


import { HomeComponent } from "./components/home/home.component";
import { ChatComponent } from './components/chat/chat.component';
import { GuardService } from './services/guard.service';
import { AuthComponent } from './components/auth/auth.component';


const appRoutes: Routes = [
    {path: '', component: HomeComponent},    
    {path: 'home', component: HomeComponent},
    {path: 'auth', component: AuthComponent},
    {path: 'chat', component: ChatComponent, canActivate: [GuardService]},
    {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);