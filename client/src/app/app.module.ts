import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';

import { routing, appRoutingProviders } from "./app.routing";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { FormSupportModule } from './modules/form-support/form-support.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    ChatComponent,
    ChatListComponent,
    ChatMessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    FormSupportModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
