import { NgClass } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user/user.service';
import { INotifications, IUserData } from '../../shared/interfaces/IUser.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatBadgeModule, MatButtonModule, MatIconModule, RouterLink, MatListModule, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  #userService = inject(UserService);
  #router = inject(Router);

  @Input() pageIco: string = '';
  @Input() pageTitle: string = '';

  #user!: IUserData;
  notificationsArray: IUserData['notifications'] = [];
  hasNotification = true;
  hiddenNotification = true;
  name = sessionStorage.getItem('user-name');

  ngOnInit(): void {
    this.loadNotifications();
  }

  logout() {
    sessionStorage.clear();
    this.#router.navigate(['/login']);
  }

  atualizarRead(event: MouseEvent, item: INotifications) {
    if (item.read) {
      event.preventDefault();
      return;
    }

    this.markNotificationAsRead(item);
    this.syncNotificationsWithServer();
  }

  private loadNotifications() {
    const storedNotifications = localStorage.getItem('user_notifications');
    const storedTime = localStorage.getItem('notifications_time');
    
    if (this.isNotificationsExpired(storedTime) || !storedNotifications) {
      this.fetchNotifications();
    } else {
      this.notificationsArray = JSON.parse(storedNotifications);
      this.hasNotification = !this.notificationsArray!.some(notification => !notification.read);
    }
  }

  private fetchNotifications() {
    this.#userService.httpCheckUser().subscribe((response) => {
      if (response) {
        this.notificationsArray = response.notifications?.slice(-8).reverse() || [];
        this.hasNotification = !this.notificationsArray.some(notification => !notification.read);
        this.#user = response;
        this.saveNotificationsToLocalStorage();
      }
    });
  }

  private markNotificationAsRead(item: INotifications) {
    const index = this.notificationsArray!.findIndex(notification => notification._id === item._id);
    if (index !== -1) {
      this.notificationsArray![index].read = true;
      this.saveNotificationsToLocalStorage();
      this.hasNotification = !this.notificationsArray!.some(notification => !notification.read);
    }
  }

  private saveNotificationsToLocalStorage() {
    localStorage.setItem('user_notifications', JSON.stringify(this.notificationsArray));
    localStorage.setItem('notifications_time', new Date().toISOString());
  }

  private syncNotificationsWithServer() {
    if (this.#user && this.#user._id) {
      this.#user.notifications = this.notificationsArray;
      this.#userService.httpUpdateUserById(this.#user._id, this.#user).subscribe();
    }
  
  }

  private isNotificationsExpired(storedTime: string | null): boolean {
    if (!storedTime) return true;
    const storedDate = new Date(storedTime);
    return (new Date().getTime() - storedDate.getTime()) / 1000 / 60 > 10;
  }

  exibirNotificacoes(){
    this.hiddenNotification = !this.hiddenNotification
    setTimeout(() => {
      this.hiddenNotification = true
    }, 8000)
  }
}
