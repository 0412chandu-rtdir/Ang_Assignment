import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { DialogComponent } from '../../dialog/dialog';
import { User } from '../../user/user';

@Component({
	selector: 'app-user-list',
	standalone: true,
	imports: [MatButtonModule, MatListModule],
	styleUrl: './user_List.css',
	templateUrl: './user_List.html',
})
export class UserListComponent {
	@Input() users: User[] = [];

	private dialog = inject(MatDialog);

	viewUser(user: User): void {
		this.dialog.open(DialogComponent, {
			width: '400px',
			data: { user },
		});
	}
}
