exports.cases = {

  "123456789012": {
    "caseId" : 62,
    "assignedTo" : "Barry Banker",
    "dateCreated" : 1504047409000.0,
    "status" : "Open",
    "userAlias": "Betty",
    "pushAlias": "123",
    "application" : {
        "personalDetails" : {
            "name" : {
                "salutation" : "Ms",
                "givenName" : "Betty",
                "middleName" : "",
                "surname" : "Beetroot"
            },
            "demographics" : {
                "gender" : "Female",
                "dateOfBirth" : "1972-09-15",
                "birthPlace" : "Sydney",
                "countryOfBirth" : "AU",
                "nationality" : "AU"
            },
            "address" : [ 
                {
                    "addressType" : "HOME_ADDRESS",
                    "addressLine1" : "40A Orchard Road",
                    "addressLine2" : "#99-99 Macdonald House",
                    "addressLine3" : "Orchard Avenue 2",
                    "addressLine4" : "Street 65"
                }
            ],
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
            "expenseDetails" : [ 
                {
                    "expenseType" : "COSTS_OF_LIVING",
                    "expenseAmount" : 590.25,
                    "frequency" : "MONTHLY"
                }
            ],
            "incomeDetails" : [ 
                {
                    "incomeType" : "DECLARED_FIXED",
                    "fixedAmount" : 7590.25,
                    "variableAmount" : 1590.25,
                    "frequency" : "MONTHLY",
                    "otherIncomeDescription" : "Rent"
                }
            ],
            "existingLoanDetails" : [ 
                {
                    "loanType" : "STUDENT_LOAN",
                    "otherDebtObligationType" : "Free text",
                    "monthlyInstallmentAmount" : 250.25,
                    "outstandingBalanceAmount" : 5000.25,
                    "loanAmount" : 15000.89,
                    "debtOwnership" : "JOINT",
                    "lenderName" : "KINROS CORPORATION"
                }
            ]
        },
        "employmentDetails" : [ 
            {
                "employerName" : "Citi Bank",
                "jobTitle" : "ACCOUNTANT",
                "employmentDurationInYears" : 5,
                "employmentStatus" : "EMPLOYED"
            }
        ],
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
        "mortgageDetails" : {
            "type" : "firstTime",
            "location" : "Sydney",
            "propertyValue" : 2222222.22,
            "amount" : 999999.99,
            "deposit" : 99999.95,
            "term" : 25
        }
    },
    "applicationType" : "PERSONAL",
    "currentTaskOwner" : "Bank",
    "progress" : [ 
        {
            "name" : "Case Created",
            "status" : "COMPLETE",
            "dateCompleted" : 1504044949141.0
        }, 
        {
            "name" : "Validated",
            "status" : "COMPLETE",
            "dateCompleted" : 1504044949141.0
        }, 
        {
            "name" : "Acknowledged",
            "status" : "COMPLETE",
            "dateCompleted" : 1504044949141.0
        }, 
        {
            "name" : "Fraud Checked",
            "status" : "COMPLETE",
            "dateCompleted" : 1504044949141.0
        }, 
        {
            "name" : "Owner Assigned",
            "status" : null,
            "dateCompleted" : null
        }, 
        {
            "name" : "Application OK",
            "status" : null,
            "dateCompleted" : null
        }, 
        {
            "name" : "Documents Requested",
            "status" : null,
            "dateCompleted" : null
        }, 
        {
            "name" : "Interview Requested",
            "status" : null,
            "dateCompleted" : null
        }, 
        {
            "name" : "Interview Confirmed",
            "status" : null,
            "dateCompleted" : null
        }, 
        {
            "name" : "Application Approved",
            "status" : null,
            "dateCompleted" : null
        }
    ],
    "applicantName" : "Ms Betty Beetroot",
    "currentTaskName" : "Final Approval",
    "currentTaskId" : 110,
    "currentTaskStatus" : "Ready",
    "currentTaskForm" : {
        "form" : {
            "dataHolder" : {
                "id" : "finalApproval",
                "inputId" : "finalApproval",
                "name" : "#E9E371",
                "outId" : "finalApproval",
                "type" : "basicType",
                "value" : "java.lang.Boolean"
            },
            "displayMode" : "default",
            "field" : {
                "errorMessage" : "",
                "fieldClass" : "java.lang.Boolean",
                "fieldRequired" : true,
                "id" : 1718581979,
                "inputBinding" : "finalApproval",
                "label" : "Final Approval? ",
                "name" : "finalApproval",
                "outputBinding" : "finalApproval",
                "position" : 0,
                "readonly" : false,
                "title" : "",
                "type" : "CheckBox"
            },
            "id" : 1934887976,
            "name" : "FinalApproval-taskform.form",
            "status" : 0
        }
    },
    "productId": 1
},

  "123456789013": {
    "caseId" : 66,
    "assignedTo" : "Barry Banker",
    "dateCreated" : 1504048804000.0,
    "status" : "Open",
    "userAlias": "Matthew",
    "pushAlias": "123",
    "application" : {
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
            "address" : [ 
                {
                    "addressType" : "HOME_ADDRESS",
                    "addressLine1" : "40A Orchard Road",
                    "addressLine2" : "#99-99 Macdonald House",
                    "addressLine3" : "Orchard Avenue 2",
                    "addressLine4" : "Street 65"
                }
            ],
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
            "expenseDetails" : [ 
                {
                    "expenseType" : "COSTS_OF_LIVING",
                    "expenseAmount" : 590.25,
                    "frequency" : "MONTHLY"
                }
            ],
            "incomeDetails" : [ 
                {
                    "incomeType" : "DECLARED_FIXED",
                    "fixedAmount" : 7590.25,
                    "variableAmount" : 1590.25,
                    "frequency" : "MONTHLY",
                    "otherIncomeDescription" : "Rent"
                }
            ],
            "existingLoanDetails" : [ 
                {
                    "loanType" : "STUDENT_LOAN",
                    "otherDebtObligationType" : "Free text",
                    "monthlyInstallmentAmount" : 250.25,
                    "outstandingBalanceAmount" : 5000.25,
                    "loanAmount" : 15000.89,
                    "debtOwnership" : "JOINT",
                    "lenderName" : "KINROS CORPORATION"
                }
            ]
        },
        "employmentDetails" : [ 
            {
                "employerName" : "Citi Bank",
                "jobTitle" : "ACCOUNTANT",
                "employmentDurationInYears" : 5,
                "employmentStatus" : "EMPLOYED"
            }
        ],
        "creditDetails" : {
            "creditAmount" : 23000.25,
            "loanTakenIndicator" : true,
            "monthlyRepaymentForAllExtLoans" : 5000.25
        },
        "companyDetails" : {
            "companyName" : "RedHat",
            "tradingYears" : "5",
            "dunsNumber" : "123123123"
        }
    },
    "applicationType" : "PERSONAL",
    "currentTaskOwner" : "Applicant",
    "progress" : [ 
        {
            "name" : "Case Created",
            "status" : "COMPLETE",
            "dateCompleted" : 1504044949141.0
        }, 
        {
            "name" : "Validated",
            "status" : "COMPLETE",
            "dateCompleted" : 1504044949141.0
        }, 
        {
            "name" : "Acknowledged",
            "status" : "COMPLETE",
            "dateCompleted" : 1504044949141.0
        }, 
        {
            "name" : "Fraud Checked",
            "status" : "COMPLETE",
            "dateCompleted" : 1504044949141.0
        }, 
        {
            "name" : "Owner Assigned",
            "status" : null,
            "dateCompleted" : null
        }, 
        {
            "name" : "Application OK",
            "status" : null,
            "dateCompleted" : null
        }, 
        {
            "name" : "Documents Requested",
            "status" : null,
            "dateCompleted" : null
        }, 
        {
            "name" : "Interview Requested",
            "status" : null,
            "dateCompleted" : null
        }, 
        {
            "name" : "Interview Confirmed",
            "status" : null,
            "dateCompleted" : null
        }, 
        {
            "name" : "Application Approved",
            "status" : null,
            "dateCompleted" : null
        }
    ],
    "applicantName" : "Mr Matthew Du Hayden",
    "currentTaskName" : "Confirm Interview",
    "currentTaskId" : 112,
    "currentTaskStatus" : "Ready",
    "currentTaskForm" : {
        "form" : {
            "dataHolder" : {
                "id" : "interviewDate",
                "inputId" : "interviewDate",
                "name" : "#E9E371",
                "outId" : "",
                "type" : "basicType",
                "value" : "java.lang.String"
            },
            "displayMode" : "aligned",
            "field" : {
                "errorMessage" : "",
                "fieldClass" : "java.lang.String",
                "fieldRequired" : false,
                "hideContent" : false,
                "id" : 2032380667,
                "inputBinding" : "interviewDate",
                "isHTML" : false,
                "label" : "Confirm Interview Date",
                "name" : "interviewDate",
                "position" : 0,
                "readonly" : true,
                "title" : "",
                "type" : "InputText"
            },
            "id" : 1205890976,
            "labelMode" : "undefined",
            "name" : "ConfirmInterview-taskform.form",
            "status" : 0
        }
    },
    "productId":1
},

  "123456789014": {
    "caseId" : 65,
    "assignedTo" : "Barry Banker",
    "dateCreated" : 1504047667000.0,
    "status" : "Open",
    "userAlias": "Sam",
    "pushAlias": "123",
    "application" : {
        "personalDetails" : {
            "name" : {
                "salutation" : "Mr",
                "givenName" : "Sam",
                "middleName" : "",
                "surname" : "Sputnik"
            },
            "demographics" : {
                "gender" : "Female",
                "dateOfBirth" : "1972-09-15",
                "birthPlace" : "Sydney",
                "countryOfBirth" : "AU",
                "nationality" : "AU"
            },
            "address" : [ 
                {
                    "addressType" : "HOME_ADDRESS",
                    "addressLine1" : "40A Orchard Road",
                    "addressLine2" : "#99-99 Macdonald House",
                    "addressLine3" : "Orchard Avenue 2",
                    "addressLine4" : "Street 65"
                }
            ],
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
            "expenseDetails" : [ 
                {
                    "expenseType" : "COSTS_OF_LIVING",
                    "expenseAmount" : 590.25,
                    "frequency" : "MONTHLY"
                }
            ],
            "incomeDetails" : [ 
                {
                    "incomeType" : "DECLARED_FIXED",
                    "fixedAmount" : 7590.25,
                    "variableAmount" : 1590.25,
                    "frequency" : "MONTHLY",
                    "otherIncomeDescription" : "Rent"
                }
            ],
            "existingLoanDetails" : [ 
                {
                    "loanType" : "STUDENT_LOAN",
                    "otherDebtObligationType" : "Free text",
                    "monthlyInstallmentAmount" : 250.25,
                    "outstandingBalanceAmount" : 5000.25,
                    "loanAmount" : 15000.89,
                    "debtOwnership" : "JOINT",
                    "lenderName" : "KINROS CORPORATION"
                }
            ]
        },
        "employmentDetails" : [ 
            {
                "employerName" : "Citi Bank",
                "jobTitle" : "ACCOUNTANT",
                "employmentDurationInYears" : 5,
                "employmentStatus" : "EMPLOYED"
            }
        ],
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
        "mortgageDetails" : {
            "type" : "firstTime",
            "location" : "Sydney",
            "propertyValue" : 2222222.22,
            "amount" : 999999.99,
            "deposit" : 99999.95,
            "term" : 25
        }
    },
    "applicationType" : "PERSONAL",
    "currentTaskOwner" : "Bank",
    "progress" : [ 
        {
            "name" : "Case Created",
            "status" : "COMPLETE",
            "dateCompleted" : 1504044949141.0
        }, 
        {
            "name" : "Validated",
            "status" : "COMPLETE",
            "dateCompleted" : 1504044949141.0
        }, 
        {
            "name" : "Acknowledged",
            "status" : "COMPLETE",
            "dateCompleted" : 1504044949141.0
        }, 
        {
            "name" : "Fraud Checked",
            "status" : "COMPLETE",
            "dateCompleted" : 1504044949141.0
        }, 
        {
            "name" : "Owner Assigned",
            "status" : null,
            "dateCompleted" : null
        }, 
        {
            "name" : "Application OK",
            "status" : null,
            "dateCompleted" : null
        }, 
        {
            "name" : "Documents Requested",
            "status" : null,
            "dateCompleted" : null
        }, 
        {
            "name" : "Interview Requested",
            "status" : null,
            "dateCompleted" : null
        }, 
        {
            "name" : "Interview Confirmed",
            "status" : null,
            "dateCompleted" : null
        }, 
        {
            "name" : "Application Approved",
            "status" : null,
            "dateCompleted" : null
        }
    ],
    "applicantName" : "Mr Sam Sputnik",
    "currentTaskName" : "Offer New Product",
    "currentTaskId" : 106,
    "currentTaskStatus" : "Ready",
    "currentTaskForm" : {
        "form" : {
            "dataHolder" : {
                "id" : "NewProductName",
                "inputId" : "NewProductName",
                "name" : "#E9E371",
                "outId" : "",
                "type" : "basicType",
                "value" : "java.lang.String"
            },
            "displayMode" : "default",
            "field" : {
                "errorMessage" : "",
                "fieldClass" : "java.lang.String",
                "fieldRequired" : false,
                "hideContent" : false,
                "id" : 300644469,
                "inputBinding" : "CreditCard",
                "isHTML" : false,
                "label" : "New Product Name",
                "name" : "NewProductName",
                "position" : 0,
                "readonly" : true,
                "title" : "",
                "type" : "InputText"
            },
            "id" : 1528990787,
            "name" : "OfferNewProduct-taskform.form",
            "status" : 0
        }
    },
    "productId":1
  },

 "123456789015": {
    "caseId" : 64,
    "assignedTo" : "Barry Banker",
    "dateCreated" : 1504047519000.0,
    "status" : "Open",
    "userAlias": "Shiela",
    "pushAlias": "123",
    "application" : {
        "personalDetails" : {
            "name" : {
                "salutation" : "Ms",
                "givenName" : "Sheila",
                "middleName" : "",
                "surname" : "Serendipity"
            },
            "demographics" : {
                "gender" : "Female",
                "dateOfBirth" : "1972-09-15",
                "birthPlace" : "Sydney",
                "countryOfBirth" : "AU",
                "nationality" : "AU"
            },
            "address" : [ 
                {
                    "addressType" : "HOME_ADDRESS",
                    "addressLine1" : "40A Orchard Road",
                    "addressLine2" : "#99-99 Macdonald House",
                    "addressLine3" : "Orchard Avenue 2",
                    "addressLine4" : "Street 65"
                }
            ],
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
            "expenseDetails" : [ 
                {
                    "expenseType" : "COSTS_OF_LIVING",
                    "expenseAmount" : 590.25,
                    "frequency" : "MONTHLY"
                }
            ],
            "incomeDetails" : [ 
                {
                    "incomeType" : "DECLARED_FIXED",
                    "fixedAmount" : 7590.25,
                    "variableAmount" : 1590.25,
                    "frequency" : "MONTHLY",
                    "otherIncomeDescription" : "Rent"
                }
            ],
            "existingLoanDetails" : [ 
                {
                    "loanType" : "STUDENT_LOAN",
                    "otherDebtObligationType" : "Free text",
                    "monthlyInstallmentAmount" : 250.25,
                    "outstandingBalanceAmount" : 5000.25,
                    "loanAmount" : 15000.89,
                    "debtOwnership" : "JOINT",
                    "lenderName" : "KINROS CORPORATION"
                }
            ]
        },
        "employmentDetails" : [ 
            {
                "employerName" : "Citi Bank",
                "jobTitle" : "ACCOUNTANT",
                "employmentDurationInYears" : 5,
                "employmentStatus" : "EMPLOYED"
            }
        ],
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
        "mortgageDetails" : {
            "type" : "firstTime",
            "location" : "Sydney",
            "propertyValue" : 2222222.22,
            "amount" : 999999.99,
            "deposit" : 99999.95,
            "term" : 25
        }
    },
    "applicationType" : "PERSONAL",
    "currentTaskOwner" : "Bank",
    "progress" : [ 
        {
            "name" : "Case Created",
            "status" : "COMPLETE",
            "dateCompleted" : 1504044949141.0
        }, 
        {
            "name" : "Validated",
            "status" : "COMPLETE",
            "dateCompleted" : 1504044949141.0
        }, 
        {
            "name" : "Acknowledged",
            "status" : "COMPLETE",
            "dateCompleted" : 1504044949141.0
        }, 
        {
            "name" : "Fraud Checked",
            "status" : "COMPLETE",
            "dateCompleted" : 1504044949141.0
        }, 
        {
            "name" : "Owner Assigned",
            "status" : null,
            "dateCompleted" : null
        }, 
        {
            "name" : "Application Check OK",
            "status" : null,
            "dateCompleted" : null
        }, 
        {
            "name" : "Documents Requested",
            "status" : null,
            "dateCompleted" : null
        }, 
        {
            "name" : "Interview Requested",
            "status" : null,
            "dateCompleted" : null
        }, 
        {
            "name" : "Interview Confirmed",
            "status" : null,
            "dateCompleted" : null
        }, 
        {
            "name" : "Final Approval",
            "status" : null,
            "dateCompleted" : null
        }, 
        {
            "name" : "New Product Offered",
            "status" : null,
            "dateCompleted" : null
        }
    ],
    "applicantName" : "Ms Sheila Serendipity",
    "currentTaskName" : "Offer New Product",
    "currentTaskId" : 103,
    "currentTaskStatus" : "Ready",
    "currentTaskForm" : {
        "form" : {
            "dataHolder" : {
                "id" : "NewProductName",
                "inputId" : "NewProductName",
                "name" : "#E9E371",
                "outId" : "",
                "type" : "basicType",
                "value" : "java.lang.String"
            },
            "displayMode" : "default",
            "field" : {
                "errorMessage" : "",
                "fieldClass" : "java.lang.String",
                "fieldRequired" : false,
                "hideContent" : false,
                "id" : 300644469,
                "inputBinding" : "CreditCard",
                "isHTML" : false,
                "label" : "New Product Name",
                "name" : "NewProductName",
                "position" : 0,
                "readonly" : true,
                "title" : "",
                "type" : "InputText"
            },
            "id" : 1528990787,
            "name" : "OfferNewProduct-taskform.form",
            "status" : 0
        }
    },
    "productId":1
  }

}
