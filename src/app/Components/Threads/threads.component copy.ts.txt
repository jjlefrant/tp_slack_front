// IL FAUDRA TOUT DECOMMENTER

// Importation des modules nécessaires depuis Angular

import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// Importation des services et composants nécessaires depuis l'application
import { Thread, ThreadsService } from "../../Services/threads.service";
import { MessagesComponent } from "../Messages/messages.component";
import { Message, MessagesService } from "../../Services/messages.service";
import { UserService } from "../../Services/user.service";

@Component({
    // Sélecteur du composant
    selector: "app-threads",
    // Indique que le composant est autonome
    standalone: true,
    // Modules utilisés par le composant
    imports: [CommonModule, MessagesComponent, FormsModule],
    // Chemin vers le fichier de template HTML du composant
    templateUrl: "./threads.component.html",
    // Chemin vers le fichier de style CSS du composant
    styleUrl: "./threads.component.css",
})
export class ThreadsComponent implements OnInit {
    // Propriétés du composant
    threads!: Thread[]; // Liste des threads
    actualThread!: Thread; // Thread actuellement sélectionné
    messages!: Message[]; // Liste des messages associés au thread actuel
    @Input()
    message!: string; // Message à envoyer, lié à un input dans le template
    newThreadName!: string;
    
    // Constructeur du composant, injecte les services nécessaires
    constructor(
        public threadsService: ThreadsService,
        public messagesService: MessagesService,
        public userService: UserService
    ) {}

    // Méthode appelée lorsqu'un thread est sélectionné
    selectThread(thread: Thread) {
        // Met à jour le thread actuel
        this.actualThread = thread;
        // Récupère les messages associés à ce thread depuis le service
        this.messagesService
            .getMessagesByThreadId(thread.id)
            .subscribe((messages: any) => {
                // Met à jour la liste des messages
                this.messages = messages;
                // Affiche les messages dans la console (à des fins de débogage)
                console.log(this.messages);
            });
    }

    // Méthode appelée lors de l'initialisation du composant
    ngOnInit() {
        // Récupère la liste des threads depuis le service
        this.threadsService.getThreads().subscribe((threads: any) => {
            // Met à jour la liste des threads
            this.threads = threads;
            // Affiche les threads dans la console (à des fins de débogage)
            console.log(this.threads);
            // Sélectionne le premier thread par défaut
            this.selectThread(this.threads[0]);
        });
    }

    // Méthode appelée lorsqu'un message doit être envoyé
    sendMessage() {
        // Utilise le service pour créer un nouveau message
        this.messagesService
            .createMessage({
                content: this.message,
//                authorId: this.userService.user?.username,
                authorId: this.userService.user?.id,  //MODIF 2023-12-26
                threadId: this.actualThread.id,
                date: new Date().toISOString()
            })
            .subscribe((message: any) => {
                // Ajoute le nouveau message à la liste des messages
                this.messages.push(message);
                // Réinitialise le champ de saisie du message
                this.message = "";
            });
    }

    deleteMessage(messageId: string) {
        // Utilisation du service messagesService pour supprimer le message
        this.messagesService
            .deleteMessage(messageId)
            // Utilisation d'un observable pour gérer la réponse asynchrone
            .subscribe(() => {
                // Suppression du message du tableau messages
                this.messages = this.messages.filter(message => message.id !== messageId);
            });
    }

    deleteThread(threadId: string) {
        // Utilisation du service threadsService pour supprimer le thread
        this.threadsService.deleteThread(threadId).subscribe(
          () => {
            // Supprimez le thread du tableau des threads
            this.threads = this.threads.filter(thread => thread.id !== threadId);
            // Si le thread supprimé était celui actuellement sélectionné, déselectionnez-le
            if (this.actualThread && this.actualThread.id === threadId) {
              this.actualThread = { id: '', label: '' };
              this.messages = []; // Vous voudrez peut-être vider également les messages associés
            }
          },
          (error: any) => {
            // Gérez les erreurs ici
            console.error(error);
          }
        );
      }
      createNewThread() {
        // Suppose que vous avez une méthode createThread dans threadsService
        this.threadsService.createThread({
            // Propriétés nécessaires pour créer un nouveau thread
            // Par exemple, le nom du thread, l'auteur, etc.
            label: this.newThreadName
        }).subscribe(
            (newThread: any) => {
                // Une fois le thread créé, mettez à jour la liste des threads
                this.threads.push(newThread);
                // Sélectionnez le nouveau thread
                this.selectThread(newThread);
                this.newThreadName = "";
            },
            (error: any) => {
                // Gérez les erreurs ici
                console.error(error);
            }
        );
    }
}

