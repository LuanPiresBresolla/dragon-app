import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, take } from 'rxjs';
import { Toast } from 'src/app/utils/Toast';
import Swal from 'sweetalert2';
import { DragonService } from '../dragon.service';
import { IDragon } from '../dragons-list/dragons-list.component';

@Component({
  selector: 'app-dragon-detail',
  templateUrl: './dragon-detail.component.html',
  styleUrls: ['./dragon-detail.component.scss']
})
export class DragonDetailComponent implements OnInit {

  loadingDragonDetail = true;
  loadingUpdateDragon = false;
  loadingDeleteDragon = false;
  newDragon = false;

  title = 'Detalhes do dragão';

  dragon: IDragon = {
    id: '',
    name: '',
    type: '',
    histories: [],
    createdAt: new Date().toString(),
    createdAtFormatted: new Date().toLocaleDateString('pt-BR'),
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private dragonService: DragonService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.router.url !== '/dragons/new') {
      this.getDragonDetail();
    } else {
      this.title = 'Cadastrar um novo dragão';
      this.newDragon = true;
      this.loadingDragonDetail = false;
    }
  }

  getDragonDetail() {
    this.activatedRoute.params
    .pipe(
      map((params: any) => params.id),
      switchMap(id => this.dragonService.getDragonById<IDragon>(id)),
    )
    .subscribe({
      next: (response) => this.getDragonDetailNext(response),
      error: (error) => this.getDragonDetailError(error),
    });
  }

  getDragonDetailNext(response: IDragon) {
    this.dragon = {
      ...response,
      createdAtFormatted: new Date(response.createdAt).toLocaleDateString('pt-BR'),
    };
    this.loadingDragonDetail = false;
  }

  getDragonDetailError(error: any) {
    Toast.fire('Falha ao buscar detalhes do dragão', '', 'error');
  }

  handleButtonSave() {
    if (this.dragon.id) {
      if(this.validateDragon()) {
        this.handleUpdateDragon();
      }
    } else {
      if (this.validateDragon()) {
        this.handleSaveNewDragon();
      }
    }
  }

  handleUpdateDragon() {
    this.loadingUpdateDragon = true;
    this.dragonService.putDragonById<IDragon>(this.dragon)
    .pipe(take(1))
    .subscribe({
      next: (response) => this.handleUpdateDragonNext(response),
      error: (error) => this.handleUpdateDragonError(error),
    });
  }

  handleUpdateDragonNext(response: IDragon) {
    this.loadingUpdateDragon = false;
    Toast.fire('Dragão atualizado com sucesso!', '', 'success');
    this.location.back();
  }

  handleUpdateDragonError(error: any) {
    this.loadingUpdateDragon = false;
    Toast.fire('Falha ao atualizar dragão', '', 'error');
  }

  handleSaveNewDragon() {
    this.loadingUpdateDragon = true;
    this.dragonService.postDragon<IDragon>(this.dragon)
    .pipe(take(1))
    .subscribe({
      next: (response) => this.handleSaveDragonNext(response),
      error: (error) => this.handleSaveDragonError(error),
    });
  }

  handleSaveDragonNext(response: IDragon) {
    this.loadingUpdateDragon = false;
    Toast.fire('Dragão cadastrado com sucesso!', '', 'success');
    this.location.back();
  }

  handleSaveDragonError(error: any) {
    this.loadingUpdateDragon = false;
    Toast.fire('Falha ao cadastrar dragão', '', 'error');
  }

  handleDeleteDragon() {
    Swal.fire({
      title: 'Deseja excluir este dragão?',
      text: "Esta ação não poderá ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingDeleteDragon = true;
        this.dragonService.deleteDragonById<IDragon>(this.dragon.id)
        .pipe(take(1))
        .subscribe({
          next: (response) => this.handleDeleteDragonNext(),
          error: (error) => this.handleDeleteDragonError(),
        });
      }
    });
  }

  handleDeleteDragonNext() {
    Toast.fire('Dragão excluído com sucesso!', '', 'success');
    this.location.back();
  }

  handleDeleteDragonError() {
    this.loadingDeleteDragon = false;
    Toast.fire('Falha ao excluir dragão', '', 'error');
  }

  handleNavigateGoBack() {
    this.location.back();
  }

  validateDragon() {
    if (!this.dragon.name) {
      Toast.fire('É necessário informar o nome do dragão', '', 'info');
      return false;
    };

    if (!this.dragon.type) {
      Toast.fire('É necessário informar o tipo do dragão', '', 'info');
      return false;
    };
    return true;
  }
}
