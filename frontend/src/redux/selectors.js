import {
  calcProtectionMultiplier,
  calcProtection,
  calcSavingsLowerBound,
  calcSavingsUpperBound,
  calcRetirementMultiplier,
  calcRetirement,
  calcMonthlyValue,
  calcDebtMonthly,
  calcSalaryAfterDebt,
  calcSavings,
  calcFixedExpenses,
  calcSpending,
  calcRetirementYears,
  calcRetirementMonthly,
} from "../utils/plan-utils";
import { lookupUser } from "../utils/login-utils";
import { filterClients } from "../utils/search-utils";

import { createSelector } from "reselect";

// toast-page-nav
export const getProfileTitlesList = (state) =>
  state.toastPageNavReducer.profileTitlesList;
export const getFactorsTitlesList = (state) =>
  state.toastPageNavReducer.factorsTitlesList;
export const getActiveTitle = (state) => state.toastPageNavReducer.activeTitle;

// login
export const getEmail = (state) => state.loginReducer.email;
export const getPassword = (state) => state.loginReducer.password;
export const getUser = createSelector([getEmail, getPassword], lookupUser);
export const isLoggedInAdvisor = (state) =>
  state.loginReducer.isLoggedInAdvisor;
export const isLoggedInClient = (state) => state.loginReducer.isLoggedInClient;

// page content
export const getCurrentStep = (state) => state.pageContentReducer.currentStep;
export const getShowPlanReady = (state) =>
  state.pageContentReducer.showPlanReady;

// PROFILE

// profile
export const getClientId = (state) => state.profileReducer.clientId;
export const getFirstName = (state) => state.profileReducer.firstName;
export const getMiddleName = (state) => state.profileReducer.middleName;
export const getLastName = (state) => state.profileReducer.lastName;
export const getBirthYear = (state) => state.profileReducer.birthYear;
export const getCity = (state) => state.profileReducer.city;
export const getState = (state) => state.profileReducer.state;
export const getCities = (state) => state.profileReducer.cities;

export const getAge = createSelector(
  [getBirthYear],
  (birthYear) => new Date().getFullYear() - birthYear
);

// finances
export const getSalaryAfterTaxValue = (state) =>
  state.financesReducer.salaryAfterTax;
export const getMonthlySalaryAfterTaxValue = createSelector(
  [getSalaryAfterTaxValue],
  calcMonthlyValue
);
export const getAdditionalIncomeValue = (state) =>
  state.financesReducer.additionalIncome;

export const getProtectionMonthly = (state) => {
  return state.financesReducer.protection.length === 0
    ? 0
    : state.financesReducer.protection[0].protectionMonthly.toString();
};
export const getProtectionPolicy = (state) => {
  return state.financesReducer.protection.length === 0
    ? 0
    : state.financesReducer.protection[0].protectionPolicy.toString();
};

export const getRetirementValue = (state) => state.financesReducer.retirement;

export const getHousingValue = (state) => state.financesReducer.housing;
export const getBillValue = (state) => state.financesReducer.bill;
export const getUtilityValue = (state) => state.financesReducer.utility;

export const getLoanDebtValue = (state) => state.financesReducer.loanDebt;
export const getShoppingValue = (state) => state.financesReducer.shopping;
export const getLeisureValue = (state) => state.financesReducer.leisure;
export const getTransportationValue = (state) =>
  state.financesReducer.transportation;
export const getSubscriptionValue = (state) =>
  state.financesReducer.subscription;
export const getOtherValue = (state) => state.financesReducer.other;

// family
export const getPartners = (state) => state.familyReducer.partners;
export const getPartnerSalaries = (state) =>
  state.familyReducer.partners.map((partner) => partner.salary);
export const getPartnerSalariesSum = createSelector(
  [getPartnerSalaries],
  (partnerSalaries) => partnerSalaries.reduce((a, b) => a + b, 0)
);
export const getChildren = (state) => state.familyReducer.children;

// goals
export const getGoals = (state) => state.goalsReducer.goals;

// PLAN

// protection

export const getProtectionValue = (state) => state.financesReducer.protection;

export const getProtectionMultiplier = createSelector(
  [getAge],
  calcProtectionMultiplier
);
export const getProtectionPolicyPlan = createSelector(
  [getSalaryAfterTaxValue, getProtectionMultiplier],
  calcProtection
);
export const getProtectionMonthlyPlan = (state) =>
  state.planReducer.protectionMonthly;

// emergency savings
export const getSavingsLowerBound = createSelector(
  [getMonthlySalaryAfterTaxValue],
  calcSavingsLowerBound
);
export const getSavingsUpperBound = createSelector(
  [getMonthlySalaryAfterTaxValue],
  calcSavingsUpperBound
);

// retirement
export const getHouseholdIncome = createSelector(
  [getSalaryAfterTaxValue, getPartnerSalariesSum],
  (salaryAfterTax, partnerSalariesSum) => salaryAfterTax + partnerSalariesSum
);
export const getRetirementMultiplier = createSelector(
  [getAge],
  calcRetirementMultiplier
);
export const getRetirement = createSelector(
  [getSalaryAfterTaxValue, getRetirementMultiplier],
  calcRetirement
);
export const getRetirementSavings = (state) => {
  return state.financesReducer.retirement.length === 0
    ? 0
    : state.financesReducer.retirement[0].retirementSavings.toString();
};

export const getRetirementYears = createSelector([getAge], calcRetirementYears);

export const getRetirementMonthly = createSelector(
  [getMonthlySalaryAfterTaxValue, getRetirementYears],
  calcRetirementMonthly
);

// debt
export const getDebtMonthly = createSelector(
  [getSalaryAfterTaxValue],
  calcDebtMonthly
);
export const getSalaryAfterDebt = createSelector(
  [getDebtMonthly, getMonthlySalaryAfterTaxValue],
  calcSalaryAfterDebt
);

// budgeting
export const getSavings = createSelector([getSalaryAfterTaxValue], calcSavings);
export const getFixedExpenses = createSelector(
  [getSalaryAfterTaxValue],
  calcFixedExpenses
);
export const getSpending = createSelector(
  [getSalaryAfterTaxValue],
  calcSpending
);

// advisor
export const getAdvisorFirstName = (state) => state.advisorReducer.firstName;
export const getAdvisorLastName = (state) => state.advisorReducer.lastName;
export const getAdvisorEmail = (state) => state.advisorReducer.email;
export const getAdvisorPhoneNumber = (state) =>
  state.advisorReducer.phoneNumber;
export const getAdvisorAddress = (state) => state.advisorReducer.address;
export const getSearchTerm = (state) => state.advisorReducer.searchTerm;
export const getClients = (state) => state.advisorReducer.clients;
export const getFilteredClients = createSelector(
  [getClients, getSearchTerm],
  filterClients
);
