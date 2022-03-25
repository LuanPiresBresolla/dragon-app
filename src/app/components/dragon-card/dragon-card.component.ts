import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDragon } from 'src/app/modules/dragons/dragons-list/dragons-list.component';

@Component({
  selector: 'app-dragon-card',
  templateUrl: './dragon-card.component.html',
  styleUrls: ['./dragon-card.component.scss']
})
export class DragonCardComponent implements OnInit {

  @Input() dragon: IDragon;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  navigateToDragonDetail() {
    this.router.navigateByUrl(`/dragons/${this.dragon.id}`);
  }
}
