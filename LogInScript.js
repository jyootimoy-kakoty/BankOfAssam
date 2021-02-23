const btnLogin = document.querySelector('.LogIn__btn');
const userVal = document.querySelector('.LogIn__input-user');
const userPass = document.querySelector('.LogIn__input-pass');
const userGreet = document.querySelector('.currentUserGreet');
const logInForm = document.querySelector('.logIn__form');
const LogInPass = document.querySelector('.LogIn__input-pass');


let currentUser = null;
let bal = (accumulator, currentValue) => accumulator + currentValue;

const users = new Map([
    ['jyootimoy', '2021'],
    ['jayanta', '2021']
]);

const account = new Map([
    ['jyootimoy', {
        accountNo: '0000012345',
        accountHolder: 'Jyootimoy Kakoty',
        transaction: [100, 510, -200, 320, -55, 1000, -350],
    }],
    ['jayanta', {
        accountNo: '0000056789',
        accountHolder: 'Jayanta Kakoty',
        transaction: [500, -50, 200, -600, -25, 1000, 500],
    }]
]);

const LogIn = function() {
    console.log('Login Successful');
    //window.location.replace("dashboard.html");
    //window.location.href = "dashboard.html";
    //The difference between href and replace, is that replace() removes the URL
    //of the current document from the document history, meaning that it is not
    //possible to use the "back" button to navigate back to the original document.
    currentUser = account.get(userVal.value);
    console.log(currentUser);
    console.log(userGreet.innerHTML = `Welcome back, ${currentUser.accountHolder}`);
    logInForm.innerHTML = `
        <div class="session"><h1>Session Expires in: </h1>
            <div class="timer"></div>
        </div>
        '<button class="LogOutBtn">&rarr;</button>
    `;
    sessionTimeout();
    const footer = document.getElementById('footer');
    footer.remove();
    displayDashboard();
}

const sessionTimeout = function() {
    let time = 300;
    const timer = document.querySelector('.timer');
    //call the timer every second
    const sessionTimer = setInterval(function() {
        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);
    
        //In each call print remaining time
        console.log(timer.textContent, min, sec);
        timer.textContent = `${min}:${sec}`;

        time--;

        if (time === -1) {
            clearInterval(sessionTimer);
            const btnLogOut = document.querySelector('.LogOutBtn');
            btnLogOut.click();
        }
    }, 1000);
}

btnLogin.addEventListener('click', function(e){
    e.preventDefault();
    console.log(userVal.value);
    console.log(users.get(userVal.value));
    console.log(userPass.value);
    users.get(userVal.value) !== userPass.value
    ? console.log('Login UnSuccessful') : LogIn();
    
});

const displayDashboard = function(){
    var summary = document.createElement('div');
    summary.classList.add('summary');
    var dashboard = document.createElement('div');
    dashboard.classList.add('dashboard');
    
    var transactions = document.createElement('div');
    transactions.classList.add('transactions');
    var quickFeatures = document.createElement('div');
    quickFeatures.classList.add('quickFeatures');
    var transfer = document.createElement('div');
    transfer.classList.add('transfer');
    var loan = document.createElement('div');
    loan.classList.add('loan');

    var statement = document.createElement('div');
    statement.classList.add('statement');
    var balance = document.createElement('div');
    balance.classList.add('balance');

    document.body.appendChild(summary);
    summary.appendChild(statement);
    summary.appendChild(balance);
    getSummary(summary);

    document.body.appendChild(dashboard);
    getTransactions(transactions);
    dashboard.appendChild(transactions);

    dashboard.appendChild(quickFeatures);
    initTransfer(transfer);
    quickFeatures.appendChild(transfer);

    initLoan(loan);
    quickFeatures.appendChild(loan);

    var views = document.createElement('div');
    views.classList.add('views');
    document.body.appendChild(views);
    initViews(views);
    initFooter();
    checkAction();

}

var datetime = function() {
    var currentdate = new Date();
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        weekday: 'long'
    };
    const lang = navigator.language; // We can replace 'IST' with lang variable
    return (new Intl.DateTimeFormat('IST', options).format(currentdate));  //options is optional
    /*
    return `${currentdate.getDate()}`.padStart(2, 0) + "/"
            + `${(currentdate.getMonth()+1)}`.padStart(2, 0)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + `${currentdate.getHours()}`.padStart(2, 0) + ":"  
            + `${currentdate.getMinutes()}`.padStart(2, 0) + ":" 
            + `${currentdate.getSeconds()}`.padStart(2, 0);
    */
}

const getSummary = function(summary) {
    const statement = document.querySelector('.statement');
    const balance = document.querySelector('.balance');
    //summary.innerHTML = "";
    //statement.innerHTML = "";
    //balance.innerHTML = "";
    
    const balOutput = currentUser.transaction.reduce(bal);
    statement.innerHTML = "<h1>Balance</h1>" + "As of: " + datetime();
    balance.innerHTML = `<h1>₹ ${Number.parseFloat(balOutput).toFixed(2)} </h1> A/C: ${currentUser.accountNo}`;
}

const getTransactions = function(transactions, sort = false) {
    transactions.innerHTML = "";
    const trans = sort ? currentUser.transaction.slice().sort((a, b) => a - b) 
                       : currentUser.transaction.slice();
    trans.forEach((element, i) => {
        const type = element > 0 ? 'Deposit' : 'Withdrawl';
        const row = `
            <div class="row">
                <div class="${type}">${type}</div>
                <div class="transDate"><i>${datetime()}</i></div>
                <div class="value"> ₹ ${element}</div>
            </div>
        `;
        transactions.insertAdjacentHTML('afterbegin', row);
    });
}

const initTransfer = function(transfer) {
    const form = `
        <form class="Transfer__form">
            <div style="text-align: center; width: 100%; font-size: 2.5rem;"><b>Transfer Money</b></div>                    
            <button class="Transfer__btn">&rarr;</button>
            <input class="TransferAmount" type="number" maxlength="16" required/>
            <input class="TransferTo" type="number" maxlength="16" required/>
        </form>
        <div style="margin-left: 7rem; display: inline-block; width: 40%; font-size: 2rem;">Transfer To</div>
        <div style="margin: 0; display: inline-block; width: 40%; font-size: 2rem;">Amount</div>
    `;
    transfer.insertAdjacentHTML('afterbegin', form);
}

const initLoan = function(loan) {
    const form = `
        <form class="Loan__form">
            <div style="text-align: center; width: 100%; font-size: 2.5rem;"><b>Request Loan</b></div>
            <button class="Loan__btn">&rarr;</button>
            <input class="LoanAmount" type="number" maxlength="16" required/>
            <div style="margin: 2rem; float: right; display: inline-block; width: 30%; font-size: 2rem; text-align: justify;">Amount</div>
        </form>
    `;
    loan.insertAdjacentHTML('afterbegin', form);
}

const initViews = function(views) {
    const view = `
        <form class="Sort">
            <div class="totalDeposit" style="text-align: left; padding-left: 2rem; width: 25%; font-size: 2.25rem; display: inline-block;">
                <b>Total Deposit: <div class="TotalDeposit"> ₹ ${currentUser.transaction.filter(k => k > 0).reduce((a, c) => a + c)}</div></b>
            </div>
            <div class="totalWithdrawl" style="text-align: left; padding-left: 2rem; width: 25%; font-size: 2.25rem; display: inline-block;">
                <b>Total Withdrawl: <div class="TotalWithdrawl"> ₹ ${currentUser.transaction.filter(k => k < 0).reduce((a, c) => a + c)}</div></b>
            </div>
            <button class="Sort__btn">Sort ⇅</button>
        </form>
    `;
    views.innerHTML = view;
}

const checkTotalDeposit = function() {
    const TotalDeposit = document.querySelector('.TotalDeposit');
    TotalDeposit.innerHTML = `₹ ${currentUser.transaction.filter(k => k > 0).reduce((a, c) => a + c)}`;
}
            
const checkTotalWithdrawl = function() {
    const TotalWithdrawl = document.querySelector('.TotalWithdrawl');
    TotalWithdrawl.innerHTML = `₹ ${currentUser.transaction.filter(k => k < 0).reduce((a, c) => a + c)}`;
}
const initFooter = function() {
    var footer = document.createElement('section');
    //footer.classList.add('footer');
    footer.setAttribute("id", "footer");
    //footer.id = 'footer';
    const foot = `
        <div class="footer container">
            All rights Reserver © BankOfAssam 2021
        </div>
    `;
    footer.innerHTML = foot;
    document.body.appendChild(footer);
}

const checkAction = function() {
    const TransferBtn = document.querySelector('.Transfer__btn');
    const TransferAmount = document.querySelector('.TransferAmount');
    const TransferTo = document.querySelector('.TransferTo');
    TransferBtn.addEventListener('click', function(e){
        e.preventDefault();
        console.log(currentUser);
        const balOutput = currentUser.transaction.reduce(bal);
        console.log(TransferTo.value);
        let accountValidity = 0;
        let transferNow = 0;
        for(const [key, {accountNo, transaction}] of account) {
            console.log(accountNo, TransferTo.value);
            if(accountNo === TransferTo.value && currentUser.accountNo !== TransferTo.value) {
                accountValidity = 1;
                transferNow = transaction;
                console.log(`To transfer: ${accountNo}`);
            }
        }
        if(accountValidity === 0)  {alert('Invalid Account No'); return;}
        console.log(`Amount ${TransferAmount.value}`);
        if(TransferAmount.value <= 0) {
            alert('Enter Valid Amount'); return;
        }
        else {
            balOutput >= TransferAmount.value
            ? currentUser.transaction.push(-1 * TransferAmount.value)
            && transferNow.push(Number(TransferAmount.value)) && alert('Transfer Successful')
            : alert('Low Balance!');
            const summary = document.querySelector('.summary');
            getSummary(summary);
            const transactions = document.querySelector('.transactions');
            getTransactions(transactions);

            checkTotalDeposit();
            checkTotalWithdrawl();
        }
        TransferAmount.value = "";
        TransferTo.value = "";
    });

    const LoanBtn = document.querySelector('.Loan__btn');
    const LoanAmount = document.querySelector('.LoanAmount');
    LoanBtn.addEventListener('click', function(e){
        e.preventDefault();
        console.log(currentUser);
        const balOutput = currentUser.transaction.reduce(bal);
        console.log(LoanAmount.value);
        if(LoanAmount.value <= 0) {
            alert('Enter Valid Amount'); return;
        }
        else {
            currentUser.transaction.push(1 * LoanAmount.value);
            alert('Loan Approved. Initiating Transfer.');
            const summary = document.querySelector('.summary');
            getSummary(summary);
            const transactions = document.querySelector('.transactions');
            getTransactions(transactions);
            
            checkTotalDeposit();
            checkTotalWithdrawl();
        }
        LoanAmount.value = "";
    });
    let click = 0;
    const SortBtn = document.querySelector('.Sort__btn');
    SortBtn.addEventListener('click', function(e){
        e.preventDefault();
        const transactions = document.querySelector('.transactions');
        click++;
        click % 2 ? getTransactions(transactions, true) : getTransactions(transactions);
    });
}