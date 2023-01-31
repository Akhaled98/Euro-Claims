import { Component, OnInit } from '@angular/core';
import { ChatsService } from '../chats.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  username:string;
  messages={
  };
  message_date:any;
  constructor(private chatService:ChatsService) { }

  ngOnInit(): void {
    this.username=JSON.parse(localStorage.getItem("user chat")).name

this.getMessages()
  }

  getMessages(){
    this.chatService.getMessages().subscribe((res)=>{
      this.messages=res['data'].messages;
     console.log("object keys: "+Object.keys(this.messages))
    //  this.messages=Object.keys(this.messages)
     let length=Object.keys(this.messages).length
      for(let i=0;i<=length;i++){

        console.log("object keys in array::",Object.keys(this.messages)[i])
      this.message_date=Object.keys(this.messages)[i]

      // console.log("date:" , this.messages.date)
      }
      console.log("messages: ",this.messages)
    })
  }
}
