// IL Y AURA DES CHOSES A DECOMMENTER ICI

// Import des modules nécessaires depuis Angular Core et Common
import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

// Import des composants ThreadsComponent et MessagesComponent
import { ThreadsComponent } from "../Threads/threads.component";
import { MessagesComponent } from "../Messages/messages.component";

// Import du service User et UserService depuis le fichier user.service
import { User, UserService } from "../../Services/user.service";

// Import du module FormsModule pour la liaison bidirectionnelle avec ngModel
import { FormsModule } from "@angular/forms";

// Définition du composant principal avec le décorateur @Component
@Component({
    // Sélecteur CSS pour l'utilisation du composant dans le HTML
    selector: "app-root",
    
    // Propriété standalone indiquant que ce composant est indépendant
    standalone: true,
    
    // Liste des modules importés pour ce composant
    imports: [CommonModule, ThreadsComponent, MessagesComponent, FormsModule], // DECOMMENTER MESSAGESCOMPONENT et THREADSCOMPONENT
    
    // Chemin vers le fichier HTML associé à ce composant
    templateUrl: "./app.component.html",
    
    // Chemin vers le fichier CSS associé à ce composant
    styleUrl: "./app.component.css",
})
// Définition de la classe du composant
export class AppComponent {
    // Définition d'une propriété d'entrée (input) pour le nom d'utilisateur
    @Input()
    username: string = "";

    // Constructeur du composant avec injection du service UserService
    constructor(public UserService: UserService) {}
}
