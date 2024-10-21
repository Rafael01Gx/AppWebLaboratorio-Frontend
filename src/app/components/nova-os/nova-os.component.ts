import { AfterViewInit, Component, inject, signal, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../core/services/user/user.service';
import { IUserData } from '../../shared/interfaces/user';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { IAmostrasCollection } from '../../shared/interfaces/amostra';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];


@Component({
  selector: 'app-nova-os',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCard,
    MatTable,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSelectModule,
    NgxMaskDirective,
    NgxMaskPipe,

    MatSortModule,
    MatDatepickerModule
  ],
  templateUrl: './nova-os.component.html',
  styleUrl: './nova-os.component.scss',
})
export class NovaOsComponent implements AfterViewInit {
  #userService = inject(UserService);
  #toastr = inject(ToastrService);
  #user = signal<IUserData>({});

  toppings = new FormControl('');
  toppingList: string[] = [
    'Granulometria',
    'RDI',
    'Redutibilidade',
    'Densidade',
    'Crepitação',
    'A.Imediatas',
    'PPC',
    'A.Química',
  ];

  amostras: IAmostrasCollection = {
    1: {
      nome_amostra: 'Bjorn',
      data_amostra: '24/02/2024',
      ensaios_solicitados: 'RDI, IMEDIATA,PPC',
    },
    2: {
      nome_amostra: 'Bjorn2',
      data_amostra: '24/02/2024',
      ensaios_solicitados: 'RDI, IMEDIATA,PPC',
    },
    3: {
      nome_amostra: 'Bjorn3',
      data_amostra: '24/02/2024',
      ensaios_solicitados: 'RDI, IMEDIATA,PPC',
    },
  };

  public profileForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
  });

  ngOnInit(): void {
    this.#userService.httpCheckUser().subscribe((response) => {
      this.#user.set(response);

      this.profileForm.patchValue({
        id: response._id,
        name: response.name,
        email: response.email,
        phone: response.phone,
      });
    });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  /* public  atualizar() {
    this.#userService.httpUpdateUserById(this.profileForm.value.id!,this.profileForm.value.name!,this.profileForm.value.email!,this.profileForm.value.phone!,this.profileForm.value.password!,this.profileForm.value.confirmpassword!).subscribe({
      next: () => {
        this.#toastr.success("Usuário atualizado!");
      },
      error: (err) => this.#toastr.error(err.error.message),
    });
  }*/
}
