<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  imports: [
    HighlightDirective // Ensure HighlightDirective is included here
  ]
})
export class NotFoundComponent implements OnInit {
  countdown = 5; // Countdown starts at 5 seconds

  constructor(private router: Router) {}

  ngOnInit() {
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(interval); // Stop the interval
        this.router.navigate(['/']); // Redirect to the homepage
      }
    }, 1000); // Decrease countdown every second
  }
}

=======
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  imports: [
    HighlightDirective // Ensure HighlightDirective is included here
  ]
})
export class NotFoundComponent implements OnInit {
  countdown = 5; // Countdown starts at 5 seconds

  constructor(private router: Router) {}

  ngOnInit() {
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(interval); // Stop the interval
        this.router.navigate(['/']); // Redirect to the homepage
      }
    }, 1000); // Decrease countdown every second
  }
}

>>>>>>> master
