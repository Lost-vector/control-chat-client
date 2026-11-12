import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from '../../core/chat';

@Component({
  imports: [],
  selector: 'app-splash',
  styleUrl: './splash.scss',
  templateUrl: './splash.html',
})
export class Splash {
  private chat = inject(Chat);
  private router = inject(Router);

  enter() {
    this.chat.connect();
    this.router.navigate(['/room']);
  }
}
