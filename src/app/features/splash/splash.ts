import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from '../../core/chat';
import { environment } from '../../../environments/environment';

@Component({
  imports: [],
  selector: 'app-splash',
  styleUrl: './splash.scss',
  templateUrl: './splash.html',
})
export class Splash {
  private chat = inject(Chat);
  private router = inject(Router);

  ngOnInit() {
    fetch(`${environment.socketUrl}/health`, { mode: 'no-cors' }).catch(() => {})
  }

  enter() {
    this.chat.connect();
    this.router.navigate(['/room']);
  }
}
