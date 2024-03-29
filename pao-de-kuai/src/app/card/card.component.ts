import { Component, Input } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgStyle, NgIf],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() suit!: string;
  @Input() value!: string;
  @Input() index!: number;
  @Input() show!: boolean;

  public selected: boolean;

  constructor() {
    this.selected = false;
  }

  onSelect() {
    this.selected = !this.selected;
  }
}
