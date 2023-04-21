import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Student } from 'src/app/interfaces/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  displayedColumns: string[] = [
    'firstName',
    'lastname',
    'dateOfBtrth',
    'email',
    'mobile',
    'gender',
    'action',
  ];

  dataSource = new MatTableDataSource<Student>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private _studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStudent();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigateWithState(active: string, data: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        data,
      },
    };
    this.router.navigate([`/student/${active}`], navigationExtras);
  }

  getStudent() {
    this._studentService.getStudent().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
