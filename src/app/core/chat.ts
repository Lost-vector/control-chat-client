import { computed, Service, signal } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from '../../environments/environment';
import type { ChatMessage, ClientToServerEvents, ServerToClientEvents, User } from './models';

type ChatSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
type Status = 'idle' | 'connecting' | 'connected' | 'room_full' |
              'too_many_connections' | 'banned' | 'disconnected';

@Service()
export class Chat {
  private socket: ChatSocket | null = null;

  private readonly _status = signal<Status>('idle');
  private readonly _me = signal<User | null>(null);
  private readonly _users = signal<User[]>([]);
  private readonly _messages = signal<ChatMessage[]>([]);
  private readonly _notice = signal<string | null>(null);

  readonly status = this._status.asReadonly();
  readonly me = this._me.asReadonly();
  readonly users = this._users.asReadonly();
  readonly messages = this._messages.asReadonly();
  readonly notice = this._notice.asReadonly();
  readonly userCount = computed(() => this._users().filter(u => u.id !== 'board').length)

  connect(): void {
    if (this.socket) return;
    this._status.set('connecting');
    this.socket = io(environment.socketUrl);

    this.socket.on('joined', ({ you, users, history }) => {
      this._me.set(you);
      this._users.set(users);
      this._messages.set(history);
      this._status.set('connected');
    });

    this.socket.on('user:joined', ({ user }) =>
      this._users.update((list) => [...list, user]));

    this.socket.on('user:left', ({ userId }) =>
      this._users.update((list) => list.filter((u) => u.id !== userId)));

    this.socket.on('message', (message) =>
      this._messages.update((list) => [...list, message]));

    this.socket.on('room:notice', ({ code }) => {
      this._notice.set(code === 'rate_limited' ? 'Transmission rate exceeded.' : 'Invalid transmission.');
      setTimeout(() => this._notice.set(null), 3000);
    })

    this.socket.on('room:error', ({ code }) => this._status.set(code));

    this.socket.on('disconnect', () => {
      if (this._status() !== 'room_full') this._status.set('disconnected');
    });
  }

  send(text: string): void {
    this.socket?.emit('message', { text });
  }

  leave(): void {
    this.socket?.disconnect();
    this.socket = null;
    this._status.set('idle');
    this._me.set(null);
    this._users.set([]);
    this._messages.set([]);
  }
}
