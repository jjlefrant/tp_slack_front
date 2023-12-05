// Les différents imports
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

export interface Message {
    id : string
    content : string
    authorId : string
    date : string
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
        
        getMessages(id: string){
            return this.http.get(`http://localhost:3000/messages/${id}`)
        }
        
        getMessagesByThreadId(threadId: string){
            return this.http.get(`http://localhost:3000/messages?threadId=${threadId}`)
        }

        createMessage(message: any){
            return this.http.post('http://localhost:3000/messages', message)
        }
            
        updateMessage(message: any){
            return this.http.put(`http://localhost:3000/messages/${message.id}`, message )
        }
                    
        deleteMessage(id: string){
             return this.http.delete(`http://localhost:3000/messages/${id}`)
        }
    }