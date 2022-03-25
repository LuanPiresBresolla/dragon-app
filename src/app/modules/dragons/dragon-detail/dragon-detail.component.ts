import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { DragonService } from '../dragon.service';
import { IDragon } from '../dragons-list/dragons-list.component';

@Component({
  selector: 'app-dragon-detail',
  templateUrl: './dragon-detail.component.html',
  styleUrls: ['./dragon-detail.component.scss']
})
export class DragonDetailComponent implements OnInit {

  dragon: IDragon;
  loading = true;

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
      this.dragon = {
        ...dragon,
        createdAtFormatted: new Date(dragon.createdAt).toLocaleDateString('pt-BR')
      };
      this.loading = false;
    });
  }

  handleSaveDragon() {
    console.log(this.dragon);
  }
}
