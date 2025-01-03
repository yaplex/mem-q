import { Component, Input } from '@angular/core';
import { Card } from '../models/card.interface';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() card!: Card;
}
