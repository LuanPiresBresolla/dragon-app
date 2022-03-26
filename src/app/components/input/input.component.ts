import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true,
};

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [INPUT_FIELD_VALUE_ACESSOR]
})
export class InputComponent implements ControlValueAccessor {

  @Input() label: string = '';
  @Input() name: string = '';
  @Input() disabled: boolean = false;

  private innerValue: string;

  constructor() { }

  get value() {
    return this.innerValue;
  }

  set value(value: string) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.onChangeCb(value)
    }
  }

  onChangeCb: (_:any) => void = () => {};
  onTouchedCb: (_:any) => void = () => {};

  writeValue(value: any): void {
    if (value !== this.innerValue) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }
}
