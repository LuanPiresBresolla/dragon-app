import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';
import { DragonService } from '../dragon.service';

export type IDragon = {
	id: string;
	name: string;
	type: string;
	histories: any[];
  createdAt: string;
  createdAtFormatted?: string;
}

@Component({
  selector: 'app-dragons-list',
  templateUrl: './dragons-list.component.html',
  styleUrls: ['./dragons-list.component.scss']
})
export class DragonsListComponent implements OnInit {

  dragons: IDragon[] = [];

  loadingListDragons = true;

  scrollListX = 0;

  constructor(
    private dragonService: DragonService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getDragons();
  }

  getDragons() {
    this.dragonService.getDragons<IDragon[]>()
      .pipe(
        map(results => results.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        }).map(item => {
          return {
            ...item,
            createdAtFormatted: new Date(item.createdAt).toLocaleDateString('pt-BR')
          }
        })),
        take(1)
      )
      .subscribe(response => {
        this.dragons = response;
        this.loadingListDragons = false;
      });
  }

  handleLeftArrowList() {
    let scrollX = this.scrollListX + Math.round(window.innerWidth / 2);

    if (scrollX > 0) scrollX = 0;

    this.scrollListX = scrollX;
  }

  handleRightArrowList() {
    let scrollX = this.scrollListX - Math.round(window.innerWidth / 2);
    let widthList = this.dragons.length * 260;

    if ((window.innerWidth - widthList) > scrollX) {
      scrollX = (window.innerWidth - widthList) - 30;
    }

    this.scrollListX = scrollX;
  }

  handleAddDragon() {
    this.router.navigateByUrl('dragons/new');
  }
}
