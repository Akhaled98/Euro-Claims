import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatsRoutingModule } from './chats-routing.module';
import { ChatsComponent } from './chats.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MessagesComponent } from './messages/messages.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [ChatsComponent, MessagesComponent, SendMessageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChatsRoutingModule,
    MatStepperModule
  ]
})
export class ChatsModule { }
