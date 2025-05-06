import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-username-update',
  standalone: true,
  template: `
    <div>
      <mat-form-field>
        <mat-label>New Username</mat-label>
        <input matInput [(ngModel)]="newUsername" placeholder="Enter new username" />
      </mat-form-field>
      <button mat-raised-button color="primary" (click)="save()">Save</button>
      <button mat-raised-button color="warn" (click)="cancel()">Cancel</button>
    </div>
  `,
  styleUrls: ['./username-update.component.scss'],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class UsernameUpdateComponent {
  @Input() currentUsername: string | null = null; // Input for the current username
  @Input() email: string | null = null; // Input for the user's email
  @Output() usernameUpdated = new EventEmitter<string>(); // Output to notify parent of username update
  @Output() cancelUpdate = new EventEmitter<void>(); // Output to notify parent of cancellation

  newUsername: string = ''; // For input binding

  save() {
    if (this.newUsername.trim()) {
      this.usernameUpdated.emit(this.newUsername); // Emit the new username
      this.newUsername = '';
    }
  }

  cancel() {
    this.cancelUpdate.emit(); // Emit cancellation event
  }
}
