import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string = 'Bem vindo ao DragonApp';
  @Input() goBackButton: boolean = false;

  constructor(
    private location: Location,
  ) { }

  ngOnInit(): void {

  }

  handleGoBack() {
    this.location.back();
  }
}
