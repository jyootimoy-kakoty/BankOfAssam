const btnLogin = document.querySelector('.LogIn__btn');
const userVal = document.querySelector('.LogIn__input-user');
const userPass = document.querySelector('.LogIn__input-pass');
const userGreet = document.querySelector('.currentUserGreet');
const logInForm = document.querySelector('.logIn__form');
const LogInPass = document.querySelector('.LogIn__input-pass');

let currentUser = null;

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
    console.log(userGreet.innerHTML = `Welcome ${currentUser.accountHolder}`);
    logInForm.innerHTML = '<button class="LogOutBtn">&rarr;</button>';
    displayDashboard();
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
    var transactions = document.createElement('div');
    transactions.classList.add('transactios');
    var transfer = document.createElement('div');
    transfer.classList.add('transfer');
    var loan = document.createElement('div');
    loan.classList.add('loan');

    var statement = document.createElement('div');
    statement.classList.add('statement');
    var balance = document.createElement('div');
    balance.classList.add('balance');
    var currentdate = new Date(); 
    var datetime = "As of: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    const bal = (accumulator, currentValue) => accumulator + currentValue;
    const balOutput = currentUser.transaction.reduce(bal);
    statement.innerHTML = "<h1>Balance</h1>" + datetime;
    balance.innerHTML = `<h1>₹ ${balOutput}</h1> A/C: ${currentUser.accountNo}`;
    document.body.appendChild(summary);
    summary.appendChild(statement);
    summary.appendChild(balance);

    getTransactions(transactions);
    document.body.appendChild(transactions);
    document.body.appendChild(transfer);
    document.body.appendChild(loan);
    //

}

const getTransactions = function(transactions) {
    currentUser.transaction.forEach((element, i) => {
        const type = element > 0 ? 'Deposit' : 'Withdrawl';
        const row = `
            <div class="row">
                <div class="${type}">${type}</div>
                <div class="value">₹ ${element}</div>
            </div>
        `;
        transactions.insertAdjacentHTML('afterbegin', row);
        
    });
}