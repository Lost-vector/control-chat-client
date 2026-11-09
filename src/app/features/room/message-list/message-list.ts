import { AfterViewChecked, Component, ElementRef, input, ViewChild } from '@angular/core';
import { Avatar } from '../avatar/avatar';
import { ChatMessage } from '../../../core/models';
import { DatePipe } from '@angular/common';

@Component({
  imports: [Avatar, DatePipe],
  selector: 'app-message-list',
  styleUrl: './message-list.scss',
  templateUrl: './message-list.html',
})
export class MessageList implements AfterViewChecked {
  readonly messages = input.required<ChatMessage[]>();
  readonly meId = input<string | undefined>();

  @ViewChild('scrollContainer')
  private scrollContainer!: ElementRef<HTMLDivElement>;

  private lastMessageId?: string;

  ngAfterViewChecked(): void {
    const messages = this.messages();
    const lastMessage = messages.at(-1);

    if (!lastMessage || lastMessage.id === this.lastMessageId) {
      return;
    }

    const element = this.scrollContainer.nativeElement;
    element.scrollTop = element.scrollHeight;
    console.log('message ====', messages);
  }
  
}
