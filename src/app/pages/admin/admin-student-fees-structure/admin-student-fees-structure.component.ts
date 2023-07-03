import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-admin-student-fees-structure',
  templateUrl: './admin-student-fees-structure.component.html',
  styleUrls: ['./admin-student-fees-structure.component.css']
})
export class AdminStudentFeesStructureComponent implements OnInit {
  cls: any;

  feesForm: FormGroup;
  admission = false;
  tution = false;
  books = false;
  uniform = false;
  showModal: boolean = false;
  selectedFees: any[] = [];
  feesMode: boolean = false;
  constructor(private fb: FormBuilder, public activatedRoute: ActivatedRoute) {
    this.feesForm = this.fb.group({

      type: this.fb.group({
        options: this.fb.array([],[Validators.required]),
      }),
    });
  }

  ngOnInit(): void {
    this.cls = this.activatedRoute.snapshot.paramMap.get('id');
    
  }

  feesType(key: any, value: any) {
    console.log(value)
    if (value === false) {
      this.selectedFees.push(key)
    }
    if (value === true) {
      console.log(key)
      const index = this.selectedFees.indexOf(key);
      if (index > -1) {
        this.selectedFees.splice(index, 1);
      }
    }
    console.log(this.selectedFees)
  }
  addFeesModel() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
  selectFeesStructure() {
    this.feesMode=true;
    this.patch()
  }
  patch() {
    const control = <FormArray>this.feesForm.get('type.options');
    // this.classSubjectService.getSubjectByClass(this.cls).subscribe(res => {
    //   this.fields = res;
    // this.abc = res
    this.selectedFees.forEach((x: any) => {
      console.log(x)
      control.push(this.patchValues(x))
      this.feesForm.reset();
    })
    // })
  }

  patchValues(marks: any) {
    return this.fb.group({
      [marks]: [marks]
    })
  }
  feesStructureAddUpdate() {
    console.log(this.feesForm.value)
  }

}
