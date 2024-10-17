import { IUserData } from './../../shared/interfaces/user';
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
import { JsonPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from '../../components/modal/user-modal/user-modal.component';

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
    MatPaginatorModule,
    JsonPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  pageIco = 'dashboard'; // Materials icons name
  pageTitle = 'Dashboard';
  #userService = inject(UserService);
  listUsers: IUserData[] = [];
  displayedColumns: string[] = ['name', 'email', 'phone', 'authorization', 'level'];
  dataSource = new MatTableDataSource<IUserData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource(this.listUsers);
  }
  openDialog(user: IUserData): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '400px',
      data: { ...user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Atualize a tabela com os dados editados
        const index = this.listUsers.findIndex(u => u._id === result.id);
        if (index >= 0) {
          this.listUsers[index] = result;
          this.dataSource.data = [...this.listUsers];
        }
      }
    });
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
}
