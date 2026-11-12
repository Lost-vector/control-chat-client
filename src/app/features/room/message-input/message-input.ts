import { Component, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-message-input',
  styleUrl: './message-input.scss',
  templateUrl: './message-input.html',
})
export class MessageInput {
  readonly submitted = output<string>()

  submit(field: HTMLInputElement) {
    const  text = field.value.trim();
    if (!text) return;
    this.submitted.emit(text);
    field.value = '';
  }
}
