import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-avatar',
  styleUrl: './avatar.scss',
  templateUrl: './avatar.html',
})
export class Avatar {
  readonly avatarId = input.required<number>()
}
