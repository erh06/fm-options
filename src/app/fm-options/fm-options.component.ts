import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FmOption} from "./fm-option";

@Component({
  selector: 'fm-options[name]',
  templateUrl: './fm-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FmOptionsComponent implements OnChanges {

  // zorunlu alanlar!
  @Input() name = '';
  @Input() class = 'btn-outline-danger';

  // Component içerisinde ITEMS üzerinde çalışacağız!
  items = new BehaviorSubject<FmOption[]>([]);
  @Input()
  set options(newItems: FmOption[]) {
    const mappedItems = newItems.map((item) => {
      item = {...this._tpl, ...item};
      item.selected = item.selected ||  this.value == item.value;
      item.disabled = this.disabled ? true : item.disabled;
      return item;
    });
    this.items.next(mappedItems);
  }
  get options(): FmOption[] {
    return this.items.getValue();
  }
  @Output() optionsChange = new EventEmitter<any>();

  @Input() value: any = '';
  @Output() valueChange = new EventEmitter<any>();

  @Input() keyLabel = 'label';
  @Input() keyValue = 'value';

  // opsiyonel alanlar
  @Input() debug = false;
  @Input() disabled = false;
  @Input() forceSelection = true;

  private readonly _defaultValue: any;
  private readonly _tpl: FmOption = {label: '', value: '', selected: false, disabled: false};

  constructor(private cdr: ChangeDetectorRef) {
    this._defaultValue = this.value;
    let r = (Math.random() + 1).toString(36).substring(7);
    this.name = this.name + r;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this._setSelectedValueOfItems();
      console.log('[%s -> ngOnChanges] value değişti', this.name, changes['value'])
    }
  }

  onClicked($event: any) {
    $event.stopPropagation(); // kaldırma sakın!
    // önceden seçmiş olduğu bir Seçeneği, yeniden seçerse eğer seçimi kaldırması için.
    if (!this.forceSelection && $event.target.value == this.value) {
      this._emitValue('');
    } else {
      this._emitValue($event.target.value);
    }
  }

  private _emitValue(newValue: any) {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }

  private _setSelectedValueOfItems() {
    const mappedItems = this.items.getValue().map((item) => {
      item.selected = this.value == item.value;
      return item;
    });
    this.items.next(mappedItems);
  }

}
