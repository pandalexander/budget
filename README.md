# College Savings Calculator

A web-based calculator built with Angular that helps parents determine how much they need to save for their children's college education. The calculator takes into account multiple children, different types of colleges, and various financial factors to provide both total savings goals and monthly contribution recommendations.

## Features

- Support for multiple children (up to 10)
- Different college type selections:
  - Public 4-year out-of-state
  - Public 4-year in-state
  - Public 2-year
  - Private 4-year
- Customizable funding percentage
- Current savings consideration
- Monthly savings goal calculation
- Total savings goal calculation with inflation adjustment

## Planned Improvements

### Data Type Refinement
- Convert `numOfChildren` from string to number type
- Implement proper typing for form data and payload objects
- Add comprehensive interfaces for data transfer between components
- Define proper types for all numerical inputs instead of using 'any'

### Financial Model Enhancement
- Make interest rate (`rateOfReturn`) configurable instead of static 5%
- Allow customizable inflation rate (currently fixed at 3%)
- Add more sophisticated financial calculation options:
  - Alternative investment strategies
  - Income-based adjustments
  - Financial aid considerations
  - Tax benefits modeling

### Technical Improvements

#### Component Architecture
- Implement proper interfaces for data transfer between components
- Consider breaking down CalculatorComponent into smaller, more focused components
- Add proper type safety for EventEmitter outputs
- Implement proper form state management (RxJS)

#### Form Validation
- Add more comprehensive form validation
- Implement proper error messaging
- Add input formatting for currency values
- Consider adding step-by-step form progression

#### Code Organization
- Move financial calculations to a dedicated service
- Create shared interfaces for data models
- Implement proper state management for complex calculations
- Create constants file for static values (max children, college costs, etc.)

#### Error Handling
- Add proper error boundaries
- Implement comprehensive error handling for calculations
- Add validation feedback for edge cases
- Implement proper logging system

## Component Overview

### AppComponent
- Root component managing the application state
- Handles navigation between calculator and results views
- Manages data transfer between components

### CalculatorComponent
- Manages the main input form
- Handles dynamic form controls for multiple children
- Performs initial data validation
- Emits form data to parent component

### ResultsComponent
- Displays calculation results
- Performs complex financial calculations
- Formats numerical outputs
- Shows both total and monthly savings goals

### HeaderComponent
- Displays application header and navigation

## Future Development Roadmap

1. Phase 1: Data Type Refinement
   - Implement interfaces
   - Clean up numerical types
   - Add proper type safety

2. Phase 2: Financial Model Enhancement
   - Add variable interest rates
   - Implement inflation adjustment options
   - Add more financial factors

3. Phase 3: User Experience Improvements
   - Add data persistence
   - Implement step-by-step guidance
   - Add visual representations of data

4. Phase 4: Advanced Features
   - Add comparison tools
   - Implement saving/loading of calculations
   - Add reporting features

## Calculations Explained

This project calculates the financial goals needed to save for college expenses. Below are the two primary formulas used: **Total College Savings Goal** and **Monthly Savings Goal**.

### Total College Savings Goal
The **Total College Savings Goal** determines the total amount of money you need to save for your children’s college education, considering inflation and your planned percentage of funding.

**Formula**:
To calculate the **Total College Savings Goal**, use the following steps:

1. For each child, calculate the future annual college cost:
   - Future Annual Cost = `collegeCost * (1 + annualCollegeCostInflation) ^ (18 - ageOfChild)`
2. Multiply the future annual cost by the number of years the child will be in college and the percentage of costs you plan to cover:
   - Savings Goal for Each Child = `Future Annual Cost * yearsInCollege * (percentageOfFunding / 100)`
3. Add up the savings goals for all children:
   - Total College Savings Goal = Sum of all savings goals.

### Monthly Savings Goal
The **Monthly Savings Goal** calculates how much money you need to save each month to reach your college savings goal, accounting for compound interest on your investments.

**Formula**:
To calculate the **Monthly Savings Goal**, follow these steps:

1. Calculate the total amount you still need to save:
   - Savings Goal = `Total College Savings Goal - currentSavings`
2. Determine the weighted average time (in years) until the savings are needed:
   - Weighted Time (Tweighted) = `(Sum of (18 - ageOfChild for each child)) / numberOfChildren`
3. Use the following formula to calculate the monthly savings goal:
   - Monthly Savings Goal = `(Savings Goal * (rateOfReturn / 12)) / (((1 + (rateOfReturn / 12)) ^ (Tweighted * 12)) - 1)`

### Example
For a family with:
- **2 children**, ages 10 and 14,
- **College Cost**: $25,000 annually,
- **Annual College Cost Inflation**: 3%,
- **Planned Funding Percentage**: 100%,
- **Current Savings**: $10,000,
- **Rate of Return**: 5%,

We calculate:
1. **Total College Savings Goal**: $227,584.45
2. **Monthly Savings Goal**: $1,056.37

## Credit

Massive credit to the developer(s) as Mass Mutual. I modeled this project after their college savings calculator. 
It can be found here: https://www.massmutual.com/financial-wellness/calculators/college-savings-calculator
