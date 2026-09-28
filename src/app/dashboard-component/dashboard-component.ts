import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { UserListComponent } from './userList/user_List';

@Component({
  imports: [UserListComponent],
  selector: 'app-dashboard-component',
  standalone: true,
  styleUrl: './dashboard-component.css',
  templateUrl: './dashboard-component.html',
})
export class DashboardComponent {
  userName = 'User';
  users: User[] = [];
  accessToken: string | null = null;
  private router = inject(Router);

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('accesstoken');

    const registeredUser = localStorage.getItem('registeredUser');
    if (registeredUser) {
      const user = JSON.parse(registeredUser) as { name?: string; email?: string };
      this.userName = user.name || this.userName;
      this.users = [
        {
          id: 1,
          name: user.name || this.userName,
          email: user.email || '',
        },
      ];
    }
  }
  
  logout(): void {
    localStorage.removeItem('accesstoken');
    this.router.navigate(['/login']);
  }
}
