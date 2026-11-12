import { Component, input } from '@angular/core';
import { User } from '../../../core/models';
import { Avatar } from '../avatar/avatar';

@Component({
  imports: [Avatar],
  selector: 'app-user-list',
  styleUrl: './user-list.scss',
  templateUrl: './user-list.html',
})
export class UserList {
  readonly users = input.required<User[]>();
  readonly meId = input<string | undefined>();
}
