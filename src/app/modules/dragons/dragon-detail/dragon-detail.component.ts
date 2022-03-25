import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { DragonService } from '../dragon.service';
import { IDragon } from '../dragons-list/dragons-list.component';

type IParams = {
  id: string;
}

@Component({
  selector: 'app-dragon-detail',
  templateUrl: './dragon-detail.component.html',
  styleUrls: ['./dragon-detail.component.scss']
})
export class DragonDetailComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private dragonService: DragonService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      map((params: any) => params.id),
      switchMap(id => this.dragonService.getDragonById<IDragon>(id)),
    )
    .subscribe(dragon => {
      console.log(dragon);
    });
  }
}
