import { Component, Input } from '@angular/core';
import { Player } from '../models/player.interface';

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
@Input() player!: Player;
}

