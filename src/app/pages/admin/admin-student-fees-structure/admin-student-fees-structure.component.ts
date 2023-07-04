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
  stallment: boolean = false;
  monthly: boolean = false;

  one: boolean = false;
  two: boolean = false;
  three: boolean = false;
  july: boolean = false;
  august: boolean = false;
  september: boolean = false;
  october: boolean = false;
  november: boolean = false;
  december: boolean = false;
  january: boolean = false;
  fabruary: boolean = false;
  march: boolean = false;
  april: boolean = false;





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
  selectedFeesType: any[] = [];
  selectedFeesPayType: any[] = [];
  checkFeesPayType: boolean = false;
  feesTypeMode: boolean = false;
  feesMode: boolean = false;

  constructor(private fb: FormBuilder, public activatedRoute: ActivatedRoute, private feesStructureService: FeesStructureService) {
    this.feesForm = this.fb.group({
      type: this.fb.group({
        feesType: this.fb.array([], [Validators.required]),
        feesPayType: this.fb.array([], [Validators.required]),
      }),
    });
  }

  ngOnInit(): void {
    this.cls = this.activatedRoute.snapshot.paramMap.get('id');

  }
  stallmentPayment() {
    this.checkFeesPayType = true;
    this.monthly = false;
    this.stallment = true;
    this.one = true;
    this.two = true;
    this.three = true;
    this.july = false;
    this.august = false;
    this.september = false;
    this.october = false;
    this.november = false;
    this.december = false;
    this.january = false;
    this.fabruary = false;
    this.march = false;
    this.april = false;
    this.selectedFeesPayType = [];
    console.log(this.selectedFeesPayType)
    this.selectedFeesPayType = ['one', 'two', 'three'];
    console.log(this.selectedFeesPayType)
  }
  monthlyPayment() {
    this.checkFeesPayType = true;
    this.stallment = false;
    this.monthly = true;
    this.one = false;
    this.two = false;
    this.three = false;
    this.july = true;
    this.august = true;
    this.september = true;
    this.october = true;
    this.november = true;
    this.december = true;
    this.january = true;
    this.fabruary = true;
    this.march = true;
    this.april = true;
    this.selectedFeesPayType = [];
    console.log(this.selectedFeesPayType)
    this.selectedFeesPayType = ['july', 'august', 'september', 'october', 'november', 'december', 'january', 'fabruary', 'march', 'april'];
    console.log(this.selectedFeesPayType)
  }
  addFeesModel() {
    this.showModal = true;
    this.feesTypeMode = true;
    this.feesForm.reset();
  }

  selectFeesStructure() {
    this.feesTypeMode = false;
    this.feesMode = true;
    this.patch();
  }

  falseAllValue() {
    this.stallment= false;
    this.monthly = false;

    this.one= false;
    this.two = false;
    this.three = false;
    this.july = false;
    this.august = false;
    this.september = false;
    this.october = false;
    this.november = false;
    this.december = false;
    this.january = false;
    this.fabruary= false;
    this.march = false;
    this.april = false;

    this.totalFees = 0;
    this.admission = false;
    this.tution = false;
    this.books = false;
    this.uniform = false;
    this.selectedFeesType = [];
    this.selectedFeesPayType= [];
    this.checkFeesPayType= false;
    this.feesTypeMode = false;
    this.feesMode = false;

  }

  closeModal() {
    this.falseAllValue()
    this.showModal = false;
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
      this.selectedFeesType.push(key)
    }
    if (value === true) {
      const index = this.selectedFeesType.indexOf(key);
      if (index > -1) {
        this.selectedFeesType.splice(index, 1);
      }
    }
  }

  patch() {
    const controlOne = <FormArray>this.feesForm.get('type.feesType');
    this.selectedFeesType.forEach((x: any) => {
      controlOne.push(this.patchFeesTypeValues(x))
      this.feesForm.reset();
    })

    const controlSecond = <FormArray>this.feesForm.get('type.feesPayType');
    this.selectedFeesPayType.forEach((x: any) => {
      controlSecond.push(this.patchFeesPayTypeValues(x))
      this.feesForm.reset();
    })

  }

  patchFeesTypeValues(selectedFeesType: any) {
    return this.fb.group({
      [selectedFeesType]: [selectedFeesType]
    })
  }
  patchFeesPayTypeValues(selectedFeesPayType: any) {
    return this.fb.group({
      [selectedFeesPayType]: [selectedFeesPayType]
    })
  }

  feesStructureAddUpdate() {
    this.feesForm.value.class = this.cls;
    this.feesForm.value.totalFees = this.totalFees;
    let feesTypeObj = this.feesForm.value.type.feesType;
    let feesPayTypeObj = this.feesForm.value.type.feesPayType;
    let containsFeesTypeNull = feesTypeObj.some((item: any) => Object.values(item).includes(null));
    let containsFeesPayTypeNull = feesPayTypeObj.some((item: any) => Object.values(item).includes(null));
    if (containsFeesTypeNull || containsFeesPayTypeNull) {
      this.errorCheck = true;
      this.errorMsg = 'Please fill all fields';
    }
    if (!containsFeesTypeNull && !containsFeesPayTypeNull) {
      console.log(this.feesForm.value)
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
