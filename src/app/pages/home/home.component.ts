import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; // Importáljuk a MatIconModule-t
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatIconModule, CommonModule] // Hozzáadjuk az imports tömbhöz
})
export class HomeComponent {
  isHighlighted = true; // Controls the ngClass directive
  fontSize = 24; // Ensure this is a number for proper usage with .px

  images: string[] = [
    'assets/mukorom1.webp',
    'assets/mukorom2.webp',
    'assets/mukorom3.webp',
    'assets/mukorom4.png',
    'assets/mukorom5.webp',
    'assets/mukorom6.webp',
    'assets/mukorom7.webp',
    'assets/mukorom8.webp',
    'assets/mukorom9.png',
    'assets/mukorom10.png',
    'assets/mukorom11.png',
    'assets/mukorom12.webp',
  ]; // Példa képek
  visibleImages: string[] = [];
  selectedImage: string = this.images[0]; // Kezdetben az első kép van kiválasztva
  currentPage: number = 0;
  imagesPerPage: number = 4;

  constructor() {
    this.updateVisibleImages();
  }

  updateVisibleImages() {
    const start = this.currentPage * this.imagesPerPage;
    const end = start + this.imagesPerPage;
    this.visibleImages = this.images.slice(start, end);
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }

  nextPage() {
    if ((this.currentPage + 1) * this.imagesPerPage >= this.images.length) {
      this.currentPage = 0; // Ha a végére érünk, kezdjük újra az elejéről
    } else {
      this.currentPage++;
    }
    this.updateVisibleImages();
  }

  previousPage() {
    if (this.currentPage === 0) {
      this.currentPage = Math.ceil(this.images.length / this.imagesPerPage) - 1; // Ha az elejére érünk, ugorjunk a végére
    } else {
      this.currentPage--;
    }
    this.updateVisibleImages();
  }
}