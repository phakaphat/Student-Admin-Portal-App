import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Genders } from 'src/app/interfaces/genders';
import { GendersService } from 'src/app/services/genders.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add-student-form',
  templateUrl: './add-student-form.component.html',
  styleUrls: ['./add-student-form.component.css'],
})
export class AddStudentFormComponent implements OnInit {
  studentForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
    ]),
    genders: new FormControl('', [Validators.required]),
    physicalAddress: new FormControl('', [Validators.required]),
    postalAddress: new FormControl('', [Validators.required]),
  });

  genders: Genders[] = [];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private gendersService: GendersService,
    private dialogRef: MatDialogRef<AddStudentFormComponent>
  ) {
    this.studentForm = this.fb.group({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      mobile: '',
      genders: '',
      physicalAddress: '',
      postalAddress: '',
    });
  }
  ngOnInit(): void {
    this.getGenders();
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const value = this.studentForm.value;
      this.studentService
        .postStudent({
          firstName: value.firstName,
          lastName: value.lastName,
          dateOfBirth: value.dateOfBirth,
          email: value.email,
          mobile: value.mobile,
          genderId: value.genders,
          physicalAddress: value.physicalAddress,
          postalAddress: value.postalAddress,
        })
        .subscribe({
          next: (val: any) => {
            alert('Student added successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
    }
  }

  getGenders() {
    this.gendersService.getGenders().subscribe({
      next: (res: Genders[]) => {
        this.genders = res;
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
