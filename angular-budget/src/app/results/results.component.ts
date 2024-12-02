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

  get collegeTime(): number {
    return this.payload.collegeTime;
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

  numberWithCommas(x: string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  get totalSavingsGoal(): number {
    let totalCost = 0;

    for (let i = 0; i < this.numberOfChildren; i++) {
      let age = this.agesOfChildren[i];
      let T = 18 - age;
      const futureAnnualCost =
        this.collegeCost * (1 + this.annualCollegeCostInflation) ** T;

      const savingsGoal =
        futureAnnualCost * this.collegeTime * (this.percentageOfFunding / 100);

      totalCost += savingsGoal;
    }

    return Math.floor(totalCost);
  }

  get totalSavingsGoalFormatted(): string {
    return this.numberWithCommas(this.totalSavingsGoal.toFixed(0));
  }

  get monthlySavingsGoal(): number {
    const savingsGoal = this.totalSavingsGoal - this.currentSavings;

    const differenceFrom18 = this.agesOfChildren.map(
      (item: number) => 18 - item
    );

    const tWeighted =
      differenceFrom18.reduce((a: number, b: number) => a + b) /
      differenceFrom18.length;

    let r = this.rateOfReturn;

    const topOfEquation = (savingsGoal * r) / 12;
    const bottomOfEquation = (1 + r / 12) ** (tWeighted * 12) - 1;

    const monthlySavingsGoal = topOfEquation / bottomOfEquation;

    if (monthlySavingsGoal) {
      return monthlySavingsGoal;
    } else {
      return 0;
    }
  }

  get monthlySavingsGoalFormatted(): string {
    return this.numberWithCommas(this.monthlySavingsGoal.toFixed(0));
  }
}
