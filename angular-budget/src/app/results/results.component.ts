import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-results',
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
})
export class ResultsComponent {
  @Input() payload: any = {};

  get numberOfChildren(): number {
    return this.payload.numberOfChildren;
  }

  get agesOfChildren() {
    return this.payload.agesOfChildren;
  }

  get percentageOfFunding(): number {
    return this.payload.percentageOfFunding;
  }

  get collegeCost(): number {
    return this.payload.collegeCost;
  }

  get currentSavings(): number {
    return this.payload.currentSavings;
  }

  get rateOfReturn(): number {
    return this.payload.rateOfReturn;
  }

  get annualCollegeCostInflation(): number {
    return this.payload.annualCollegeCostInflation;
  }
}
