import { Component, OnInit } from '@angular/core';
import { Card } from '../models/card.interface';
import { Player } from '../models/player.interface';
import { NgFor } from '@angular/common';
import { CardComponent } from "../card/card.component";
import { PlayerComponent } from "../player/player.component";

@Component({
  selector: 'app-board',
  imports: [NgFor, CardComponent, PlayerComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  cards: Card[] = [];
  isProcessing = false;
  selectedCards: Card[] = [];

  player1: Player = { id: 1, name: 'Player 1', score: 0, isCurrentTurn: true };
  player2: Player = { id: 2, name: 'Player 2', score: 0, isCurrentTurn: false };

  ngOnInit() {
    this.initializeGame();
  }

  initializeGame() {
    const values = ['🌟', '🎈', '🎨', '🎭', '🎪', '🎯', '🎲', '🎱','🐈‍⬛'];
    this.cards = [...values, ...values].map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false
    })).sort(() => Math.random() - 0.5);
  }

  flipCard(card: Card) {
    if (this.isProcessing || card.isFlipped || card.isMatched) {
      return;
    }

    card.isFlipped = true;
    this.selectedCards.push(card);

    if (this.selectedCards.length === 2) {
      this.isProcessing = true;
      setTimeout(() => this.checkMatch(), 1000);
    }
  }


  checkMatch() {
    const [card1, card2] = this.selectedCards;
    const isMatch = card1.value === card2.value;

    if (isMatch) {
      card1.isMatched = true;
      card2.isMatched = true;
      this.updateScore();
    } else {
      card1.isFlipped = false;
      card2.isFlipped = false;
      this.switchPlayer();
    }

    this.selectedCards = [];
    this.isProcessing = false;
    this.checkGameEnd();
  }

  switchPlayer() {
    this.player1.isCurrentTurn = !this.player1.isCurrentTurn;
    this.player2.isCurrentTurn = !this.player2.isCurrentTurn;
  }


  updateScore() {
    if (this.player1.isCurrentTurn) {
      this.player1.score++;
    } else {
      this.player2.score++;
    }
  }

  checkGameEnd() {
    if (this.cards.every(card => card.isMatched)) {
      const winner = this.player1.score > this.player2.score ? this.player1.name :
        this.player2.score > this.player1.score ? this.player2.name :
          'It\'s a tie!';
      alert(`Game Over! ${winner} wins!`);
    }
  }
}

