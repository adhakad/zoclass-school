import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FeesStructureService } from 'src/app/services/fees-structure.service';

@Component({
  selector: 'app-admin-student-fees-structure',
  templateUrl: './admin-student-fees-structure.component.html',
  styleUrls: ['./admin-student-fees-structure.component.css']
})
export class AdminStudentFeesStructureComponent implements OnInit {
  disabled = true;


  stallmentOne: boolean = false;
  stallmentTwo: boolean = false;
  stallmentThree: boolean = false;
  january = false;
  fabruary = false;
  march = false;







  cls: any;
  feesForm: FormGroup;
  showModal: boolean = false;
  updateMode: boolean = false;
  deleteMode: boolean = false;
  deleteById: String = '';
  successMsg: String = '';
  errorMsg: String = '';
  errorCheck: Boolean = false;

  totalFees: number = 0;
  admission = false;
  tution = false;
  books = false;
  uniform = false;
  selectedFees: any[] = [];
  feesMode: boolean = false;

  constructor(private fb: FormBuilder, public activatedRoute: ActivatedRoute, private feesStructureService: FeesStructureService) {
    this.feesForm = this.fb.group({
      type: this.fb.group({
        options: this.fb.array([], [Validators.required]),
      }),
    });
  }

  ngOnInit(): void {
    this.cls = this.activatedRoute.snapshot.paramMap.get('id');

  }
  stallmentPayment() {
    this.stallmentOne = true;
    this.stallmentTwo = true;
    this.stallmentThree = true;
    this.january = false;
    this.fabruary = false;
    this.march = false;
  }
  monthlyPayment() {
    this.stallmentOne = false;
    this.stallmentTwo = false;
    this.stallmentThree = false;
    this.january = true;
    this.fabruary = true;
    this.march = true;
  }
  addFeesModel() {
    this.showModal = true;
    this.feesForm.reset();
  }

  selectFeesStructure() {
    this.feesMode = true;
    this.patch();
  }

  closeModal() {
    this.showModal = false;
    this.feesMode = false;
    this.errorMsg = '';
  }


  successDone() {
    setTimeout(() => {
      this.closeModal();
      this.successMsg = '';
    }, 1000)
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
    this.feesForm.value.class = this.cls;
    this.feesForm.value.totalFees = this.totalFees;
    let object = this.feesForm.value.type.options;
    let containsNull = object.some((item: any) => Object.values(item).includes(null));
    if (containsNull) {
      this.errorCheck = true;
      this.errorMsg = 'Please fill all fields';
    }
    if (!containsNull) {
      this.feesStructureService.addFeesStructure(this.feesForm.value).subscribe((res: any) => {
        if (res) {
          this.successDone();
          this.successMsg = res;
        }
      }, err => {
        this.errorCheck = true;
        this.errorMsg = err.error;
      })
    }

  }

}
