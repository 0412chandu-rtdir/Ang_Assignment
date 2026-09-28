import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../user/user';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  styleUrl: './dialog.css',
  templateUrl: './dialog.html',
})
export class DialogComponent {
  private dialogRef = inject(MatDialogRef<DialogComponent>);
  public data = inject<{ user: User }>(MAT_DIALOG_DATA);

  closeDialog(): void {
    this.dialogRef.close();
  }
}