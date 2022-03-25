import { Component, OnInit } from '@angular/core';
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

  constructor(
    private dragonService: DragonService,
  ) { }

  ngOnInit(): void {
    this.getDragons();
  }

  getDragons() {
    this.dragonService.getDragons<IDragon[]>()
      .pipe(
        map(results => results.map(item => {
          return {
            ...item,
            createdAtFormatted: new Date(item.createdAt).toLocaleDateString('pt-BR')
          }
        })),
        take(1)
      )
      .subscribe(response => {
        this.dragons = response;
      });
  }

}
