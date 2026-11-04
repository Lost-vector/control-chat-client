import { Component, input } from '@angular/core';
import { Avatar } from '../avatar/avatar';
import { ChatMessage } from '../../../core/models';

@Component({
  imports: [Avatar],
  selector: 'app-message-list',
  styleUrl: './message-list.scss',
  templateUrl: './message-list.html',
})
export class MessageList {
  readonly messages = input.required<ChatMessage[]>();
  readonly meId = input<string | undefined>();
}
