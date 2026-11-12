import { Routes } from '@angular/router';
import { roomGuard } from './core/room-guard'; 
import { Splash } from './features/splash/splash';
import { Room } from './features/room/room/room';
import { Component } from '@angular/core';

export const routes: Routes = [
  { path: '', component: Splash },
  { path: 'room', component: Room, canActivate: [roomGuard] },
  { path: '**', redirectTo: ''},
];
