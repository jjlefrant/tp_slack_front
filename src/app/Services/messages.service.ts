// Les différents imports
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

export interface Message {
    id : number
    content : string
    authorId : number
    date : Date
    threadId : string
}

@Injectable({
    providedIn: 'root',
  })
  export class MessagesService {
    messages = [];
  
    constructor(private http: HttpClient) {}
  
      // Les différentes requêtes HTTP

        getMessage(){
        return this.http.get('http://localhost:3000/messages');
        }
        
        getMessages(id: number){
            return this.http.get(`http://localhost:3000/messages/${id}`)
        }
        
        getMessagesByThreadId(threadId: number){
            return this.http.get(`http://localhost:3000/messages?threadId=${threadId}`)
        }

        createMessage(message: any){
            return this.http.post('http://localhost:3000/messages', message)
        }
            
        updateMessage(message: any){
            return this.http.put(`http://localhost:3000/messages/${message.id}`, message )
        }
                    
        deleteMessage(id: number){
             return this.http.delete(`http://localhost:3000/messages/${id}`)
        }
    }