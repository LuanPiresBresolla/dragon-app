import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string = 'Bem vindo ao DragonApp';
  @Input() goBackButton: boolean = false;
  @Input() loading: boolean = false;
  @Input() newDragon: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  handleGoBack() {
    this.location.back();
  }

  handleAddDragon() {
    this.router.navigateByUrl('dragons/new');
  }
}
