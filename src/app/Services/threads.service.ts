// Les differents imports

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

// Votre interface
export interface Thread {
    id:string;
    label:string;
}

@Injectable({
    providedIn: 'root',
})
export class ThreadsService {
    constructor(private http: HttpClient) {
      this.getThreads().subscribe((threads: any) => {
        this.threads = threads;
        console.log(this.threads);
      });
    }
    threads = this.getThreads();
  
    getThreads() {
      return this.http.get('http://localhost:3000/threads');
    }

    // Les différentes requêtes HTTP
    getThread(id: string) {
        return this.http.get(`http://localhost:3000/threads/${id}`);
    } 

    createThread(thread: any) {
        return this.http.post(`http://localhost:3000/threads/`, thread);
    } 

    updateThread(thread: any) {
        return this.http.put(`http://localhost:3000/threads/${thread.id}`, thread);
    }

    deleteThread(id: string) {
        return this.http.delete(`http://localhost:3000/threads/${id}`);
    }
}