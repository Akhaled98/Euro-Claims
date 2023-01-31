import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { ChatsService } from './chats.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  rooms=[];
  users=[]
  constructor(private chatsService:ChatsService,private usersService:UserService) { }

  ngOnInit(): void {
    this.getRooms();
    this.getUsers()
  }

  getRooms(){
    this.chatsService.getRooms().subscribe((res) => {
      this.rooms = res['data'];
      console.log("rooms: ",this.rooms)
      localStorage.setItem("room id",JSON.stringify(this.rooms.length))
    });
  }

  getUsers(){
    this.usersService.getAllUser().subscribe((res)=>{
      this.users=res['data'];
      console.log("users: ",this.users)
    })

  }

  saveData(user:string){
    localStorage.setItem("user chat",JSON.stringify(user))
  }
}
