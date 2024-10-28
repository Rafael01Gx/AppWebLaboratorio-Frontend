import { IUserData } from '../../shared/interfaces/IUser.interface';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { SidenavComponent } from '../../layouts/sidenav/sidenav.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MainComponent } from '../../layouts/main/main.component';
import { UserService } from '../../core/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from '../../components/modal/user-modal/user-modal.component';
import { DeletModalComponent } from '../../components/modal/delete-user-modal/delete-modal.component';
import { ToastrService } from 'ngx-toastr';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    SidenavComponent,
    MainComponent,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,NgxMaskPipe
  ],
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  pageIco = 'manage_accounts'; // Materials icons name
  pageTitle = 'Gerenciar contas';
  #userService = inject(UserService);
  #toastr = inject(ToastrService)
  listUsers: IUserData[] = [];
  displayedColumns: string[] = ['name', 'email', 'phone', 'authorization', 'level','Excluir'];
  dataSource = new MatTableDataSource<IUserData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource(this.listUsers);
  }
  
  ngOnInit(): void {
    this.#userService.httpUserList().subscribe(response => {
      this.listUsers = response.users;
      this.dataSource.data = this.listUsers; // Atualize a dataSource
    });
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  loadUsers(): void {
    this.#userService.httpUserList().subscribe(response => {
      this.listUsers = response.users;
      this.dataSource.data = this.listUsers;
    });
  }
  
  openDialog(user: IUserData): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '400px',
      data: { ...user }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  openDialogDelet(enterAnimationDuration: string, exitAnimationDuration: string, user: IUserData): void {
    const dialogDelete = this.dialog.open(DeletModalComponent, {
      width: '250px',
      data: { ...user },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  
    dialogDelete.afterClosed().subscribe(result => {
      if (result) {
        this.#userService.httpDeletUserAdm(result).subscribe({
          next: () => {
            this.#toastr.success("Usuário deletado!");
            this.loadUsers();
          },
          error: (err) => {
            this.#toastr.error(err.error.message);                         
          }
        });
      } else {
        console.log('Modal fechada sem exclusão');
      }
    });
  }
  
}
