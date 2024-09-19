# 💳 CaixaBank Frontend React Challenge - CaixaBankNow App 🏦
Category ➡️ Software

Subcategory ➡️ React Frontend

Difficulty ➡️ Hard

Expected max solution time ➡️ 2 hours. **It is essential to complete your solution within this timeframe**, as it is a critical performance indicator used by the hiring company to evaluate your work. The timer will begin when you click the start button and will stop upon your submission.

---

## 🌐 Background

Welcome to the CaixaBankNow React Challenge!

You are part of CaixaBank Tech, the company within the CaixaBank group dedicated to providing technology to all the group's business areas. In your case, you work 
specifically in the financial services area. Your team, composed of five people, includes an architect, two frontend developers, a backend developer, and yourself. Currently, you are working on the CaixaBankNow website and app. CaixaBankNow is the application of the CaixaBank bank that allows users to manage their accounts, make transactions, and contract various services, among many other functionalities.

In this exciting project, you will transform a simple web application into a dynamic and engaging financial platform. Imagine creating a seamless user experience where users can effortlessly navigate through login pages, manage their finances, and perform transactions with ease.

Your mission is to enhance the core components of this application, focusing on user authentication, account overview, and transaction capabilities. This challenge offers a great opportunity to bring your creativity and problem-solving skills to life as you build an intuitive and user-friendly interface.


## 📂 Repository Structure

A repository tree is provided below and should not be modified. Everything you need to develop the challenge is already included.

```bash
caixabank-frontend-js-react2
├── README.md
├── babel.config.js
├── jest.config.js
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.js
    ├── App.test.js
    ├── assets
    │   ├── caixabank-icon-blue.png
    │   └── caixabank-icon.png
    ├── components
    │   ├── AccountDetails.js
    │   ├── AccountMovements.js
    │   ├── AddAccountDialog.js
    │   ├── BrokerDetails.js
    │   ├── BrokerList.js
    │   ├── DepositList.js
    │   ├── Navbar.js
    │   ├── TransferDetails.js
    │   └── TransferForm.js
    ├── contexts
    │   └── GlobalState.js
    ├── hooks
    │   ├── useAccountData.js
    │   └── useFetch.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── pages
    │   ├── Accounts.js
    │   ├── Brokers.js
    │   ├── Dashboard.js
    │   ├── Deposits.js
    │   ├── Movements.js
    │   └── Transfers.js
    ├── reportWebVitals.js
    ├── routes.js
    ├── setupTests.js
    ├── styles
    │   ├── Buttons.css
    │   └── Transfers.css
    ├── test
    │   └── AccountDetails.test.js
    └── theme.js
```
**It is necessary to modify only the files proposed in the tasks.**

**As it is a long challenge, you can choose the order in which you solve the tasks. It is also part of the challenge to know how to manage the time available.**

## 🎯 Tasks

The tasks are the following:

⚠️ **Attention**: You'll find all the required information in the codebase. Make sure to read them.

- **Task 1**: Complete the [Accounts Page](src/pages/Accounts.js)

- **Task 2**: Complete the [AccountDetails Component](/src/components/AccountDetails.js)

- **Task 3**: Complete the [AccountMovements Component](/src/components/AccountMovements.js)

- **Task 4**: Complete the [BrokerList Component](/src/components/BrokerList.js)

- **Task 5**: Complete the [BrokerDetails Component](/src/components/BrokerDetails.js)

- **Task 6**: Complete the [Deposits Page](src/pages/Deposits.js)

- **Task 7**: Complete the [Movements Page](src/pages/Movements.js)

- **Task 8**: Complete the [Transfers Page](src/pages/Transfers.js)

- **Task 9**: Complete the [TransferForm Component](src/components/TransferForm.js)

- **Task 10**: Create a [test file](src/test/AccountDetails.test.js) for the [AccountDetails Component](/src/components/AccountDetails.js). File requirements:
    - Name: AccountDetails.test.js. Path: src/test/AccountDetails.test.js
    - It must cover at least two minimum functionalities:
        - should render the account details correctly
        - should display "Account not found" when the account ID is invalid


## 💫 Guides

**A node version equal to or higher than 18 is required.**

Install project dependencies using npm:

```bash
# You should be in the root directory
npm install
```

Execute the project:

This will launch the application in your default web browser. If it does not open automatically, you can access the application at http://localhost:3000.

```bash
npm start
```

Execute your test file:

```bash
npm test
```

You can check [package.json](./package.json) to see which command is used in ``npm test``.

## 📤 Submission

1. Solve the proposed tasks.
2. Continuously push the changes you have made.
3. Wait for the results.
4. Click submit challenge when you have reached your maximum score.

## 📊 Evaluation

The final score will be given according to whether or not the objectives have been met. 

In this case, the challenge will be evaluated on 1400 points which are distributed as follows:

- **Task 1**: 100 points
- **Task 2**: 100 points
- **Task 3**: 100 points
- **Task 4**: 100 points
- **Task 5**: 100 points
- **Task 6**: 100 points
- **Task 7**: 100 points
- **Task 8**: 100 points
- **Task 9**: 100 points
- **Task 10**: 100 points
- **Code quality**: 400 points

## ❓ FAQs / Additional Information

In this case, as it is a more complex challenge, no tests are provided. But all the guidance needed to complete it is provided both within the README in tasks and within the code itself.
Only the files proposed in the objectives should be modified. You are not allowed to modify anything other than the proposed files.

**Q1: What happens if I modify files that are not in scope?**

A1: The correction will fail because those changes will not be taken into account.

**Q2: Can I add resources that are not in package.json?**

A2: No, everything needed to complete the challenge is included.
