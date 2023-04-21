import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Genders } from 'src/app/interfaces/genders';
import { GendersService } from 'src/app/services/genders.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css'],
})
export class EditPageComponent {
  data: any;
  displayProfileImageUrl = '';
  genders: Genders[] = [];
  studentForm!: FormGroup;

  ngOnInit(): void {
    this.getGenders();
    this.setImage();
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      genderId: ['', Validators.required],
      physicalAddress: ['', Validators.required],
      postalAddress: ['', Validators.required],
    });
    this.studentForm.patchValue({
      firstName: this.data.data.firstName,
      lastName: this.data.data.lastName,
      dateOfBirth: this.data.data.dateOfBirth,
      email: this.data.data.email,
      mobile: this.data.data.mobile,
      genderId: this.data.data.genderId,
      physicalAddress: this.data.data.address.physicalAddress,
      postalAddress: this.data.data.address.postalAddress,
    });
  }

  constructor(
    private router: Router,
    private gendersService: GendersService,
    private studentService: StudentService,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.data = this.router.getCurrentNavigation()?.extras.state;
  }

  goBack() {
    this.location.back();
  }
  
  onSubmit() {
    if (this.studentForm.valid) {
      const value = this.studentForm.value;
      this.studentService.putStudent(this.data.data.id, value).subscribe({
        next: (val: any) => {
          alert('Student updated successfully');
          this.location.back();
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }

  onDelete() {
    this.studentService.deleteStudent(this.data.data.id).subscribe({
      next: (val: any) => {
        alert('Student deleted successfully');
        this.location.back();
      },
      error(err: any) {
        console.log(err);
      },
    });
  }

  uploadImage(e: any): void {
    if (this.data.data.id) {
      const file: File = e.target.files[0];
      this.studentService.uploadImage(this.data.data.id, file).subscribe({
        next: (res: any) => {
          this.data.data.profileImageUrl = res;
          this.setImage();
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }

  setImage() {
    if (this.data.data.profileImageUrl) {
      this.displayProfileImageUrl = this.studentService.getImage(
        this.data.data.profileImageUrl
      );
    } else {
      this.displayProfileImageUrl =
        '../../../assets/images/36fa7b46c58c94ab0e5251ccd768d669.jpg';
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
