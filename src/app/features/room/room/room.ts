import { Component, inject } from '@angular/core';
import { Chat } from '../../../core/chat';
import { UserList } from '../user-list/user-list';
import { MessageList } from '../message-list/message-list';
import { MessageInput } from '../message-input/message-input';

@Component({
  imports: [UserList, MessageList, MessageInput],
  selector: 'app-room',
  styleUrl: './room.scss',
  templateUrl: './room.html',
})
export class Room {
  protected chat = inject(Chat);
}
