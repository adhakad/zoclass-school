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
  errorCheck: Boolean = false;
  errorNullMsg: String = 'Please fill all fields';
  errorMsg:String = '';
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
    if (value === false) {
      this.selectedFees.push(key)
    }
    if (value === true) {
      const index = this.selectedFees.indexOf(key);
      if (index > -1) {
        this.selectedFees.splice(index, 1);
      }
    }
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
    this.selectedFees.forEach((x: any) => {
      control.push(this.patchValues(x))
      this.feesForm.reset();
    })

  }

  patchValues(selectedFees: any) {
    return this.fb.group({
      [selectedFees]: [selectedFees]
    })
  }
  feesStructureAddUpdate() {
    let object = this.feesForm.value.type.options;
    let containsNull = object.some((item:any) => Object.values(item).includes(null));
    if(containsNull){
      this.errorCheck = true;
      console.log(object)
    }
    if(!containsNull){
      this.errorCheck = false;
      this.showModal = false;
      console.log(object)
    }
    
  }

}
