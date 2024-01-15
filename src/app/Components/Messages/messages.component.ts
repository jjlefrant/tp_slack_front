import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message, MessagesService } from '../../Services/messages.service';
import { User } from '../../Services/user.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})

export class MessagesComponent implements OnInit {

  @Input()
  message!:Message;
  @Input()
  users!: User[];
 
  username!: string;

  constructor(private messagesService: MessagesService) {
  }

  ngOnInit(): void {
    // console.log("authorId : "+this.message.authorId);

    this.users.forEach(user => {
      //console.log("user.id : "+user.id);
       if (user.id===this.message.authorId) {
        // console.log("id trouvé : " + user.id + ", " + user.name);
        // console.log(user);
        this.username=user.name;
       }
    });
  }
}