import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/shared/shared.service';
import { ChatsService } from '../chats.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {

  SendMessageForm:FormGroup;
  oneMessage: any;
roomId:any;
rooms=[];

  constructor(
    private formBuilder: FormBuilder,
    private chatService:ChatsService,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.chatService.getRooms().subscribe((res) => {
      this.rooms = res['data'];
      console.log("rooms: ",this.rooms)
    });
  }

  initForm() {
    this.SendMessageForm = this.formBuilder.group({
    body: ['',Validators.required],
   
  });
}

  onSubmit(SendMessageForm: FormGroup){

     
    if(this.rooms.length===0){
this.roomId=null
    }else{
      this.roomId=this.rooms.length
    }

    let receiver_id=JSON.parse(localStorage.getItem("user chat")).id
      let formData = {
        body: this.SendMessageForm.value.body,
        chat_room_id:this.roomId,
        receiver_id:receiver_id
      };
  


  this.chatService
  .sendMessage(formData)
  .subscribe(
    (res) => {
      console.log("res",res)
      this.translate.get("VALIDATION").subscribe((translate) => {
        this.sharedService.notification(
          `${translate.INSURANCE_ADDED_SUCCECFULLY}`,
          "bg-green"
        );
      });
    })
    
  }
  
}
