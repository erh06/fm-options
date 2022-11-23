import {Component} from '@angular/core';
import {FmOption} from "../fm-options/fm-option";

@Component({
  selector: 'app-tekli',
  templateUrl: './tekli.component.html',
})
export class TekliComponent {
  arabaSecili = 'audi';
  arabaListem: FmOption[] = [
    {label: 'Mercedes-Benz', value: 'mercedes'},
    {label: 'Audi', value: 'audi'},
    {label: 'BMW', value: 'bmw'},
  ];

  sadeceMercedesYazsin() {
    this.arabaListem[0].label = 'Mercedes';
  }

  secimiTemizle() {
    this.arabaSecili = '';
  }

  valueOnChange($event: any) {
    this.arabaSecili = $event;
    // BMW seçeneği seçilirse Disabled konuma getir!
    if ($event === 'bmw') {
      this.arabaListem[2]['disabled'] = true;
    }
  }

}
