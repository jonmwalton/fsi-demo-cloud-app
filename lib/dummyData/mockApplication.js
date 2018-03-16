exports.application = {
  "applicationType" : "PERSONAL",
  "taskOwner" : "Bank",
  "userAlias" : "user1",
  "pushAlias" : "123",
  "Application" : {
    "personalDetails" : {
      "name" : {
        "salutation" : "Mr",
        "givenName" : "Matthew",
        "middleName" : "Du",
        "surname" : "Hayden"
      },
      "demographics" : {
        "gender" : "MALE",
        "dateOfBirth" : "1972-09-15",
        "birthPlace" : "Sydney",
        "countryOfBirth" : "AU",
        "nationality" : "AU"
      },
      "address" : [ {
        "addressType" : "HOME_ADDRESS",
        "addressLine1" : "40A Orchard Road",
        "addressLine2" : "#99-99 Macdonald House",
        "addressLine3" : "Orchard Avenue 2",
        "addressLine4" : "Street 65"
      } ],
      "email" : {
        "emailAddress" : "matt.hayden@gmail.com",
        "okToEmail" : true
      },
      "phone" : {
        "phoneNumber" : "64042321",
        "okToSms" : true,
        "okToCall" : true
      }
    },
    "financialInformation" : {
      "hasForeseeableFinancialChanges" : true,
      "nonBankDebtObligationFlag" : true,
      "expenseDetails" : [ {
        "expenseType" : "COSTS_OF_LIVING",
        "expenseAmount" : 590.25,
        "frequency" : "MONTHLY"
      } ],
      "incomeDetails" : [ {
        "incomeType" : "DECLARED_FIXED",
        "fixedAmount" : 7590.25,
        "variableAmount" : 1590.25,
        "frequency" : "MONTHLY",
        "otherIncomeDescription" : "Rent"
      } ],
      "existingLoanDetails" : [ {
        "loanType" : "STUDENT_LOAN",
        "otherDebtObligationType" : "Free text",
        "monthlyInstallmentAmount" : 250.25,
        "outstandingBalanceAmount" : 5000.25,
        "loanAmount" : 15000.89,
        "debtOwnership" : "JOINT",
        "lenderName" : "KINROS CORPORATION"
      } ]
    },
    "employmentDetails" : [ {
      "employerName" : "Citi Bank",
      "jobTitle" : "ACCOUNTANT",
      "employmentDurationInYears" : 5,
      "employmentStatus" : "EMPLOYED"
    } ],
    "creditDetails" : {
      "creditAmount" : 23000.25,
      "loanTakenIndicator" : true,
      "monthlyRepaymentForAllExtLoans" : 5000.25
    },
    "companyDetails" : {
      "companyName" : "RedHat",
      "tradingYears" : "5",
      "dunsNumber" : "123123123"
    },
    "mortgageDetails":
    {
        "type":"firstTime",
        "location": "Sydney",
        "propertyValue": 2222222.22,
        "amount": 999999.99,
        "deposit": 99999.95,
        "term": 25
    },
    "productId": 1
  },
  "additionalDocsRequired" : true,
  "assignedTo" : "Unassigned"
}