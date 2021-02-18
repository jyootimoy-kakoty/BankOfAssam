const btnLogin = document.querySelector('.LogIn__btn');
const userVal = document.querySelector('.LogIn__input-user');
const userPass = document.querySelector('.LogIn__input-pass');
const userGreet = document.querySelector('.currentUserGreet');
const logInForm = document.querySelector('.logIn__form');
const LogInPass = document.querySelector('.LogIn__input-pass');

const users = new Map([
    ['jyootimoy', 'Abcdef@2021'],
    ['jayanta', 'Efghij@2021']
]);

const account = new Map([
    ['jyootimoy', {
        accountNo: 0000012345,
        accountHolder: 'Jyootimoy Kakoty',
        transaction: [100, 510, -200, 320, -55, 1000, -350],
    }],
    ['jayanta', {
        accountNo: 0000012345,
        accountHolder: 'Jayanta Kakoty',
        transaction: [500, -50, 200, -600, -25, 1000, 500],
    }]
]);


btnLogin.addEventListener('click', function(e){
    e.preventDefault();
    users.get(userVal.value) === userPass.value
    ? console.log('Login Successful') : console.log('Login UnSuccessful');
    //window.location.replace("dashboard.html");
    //window.location.href = "dashboard.html";
    //The difference between href and replace, is that replace() removes the URL
    //of the current document from the document history, meaning that it is not
    //possible to use the "back" button to navigate back to the original document.
    const currentUser = account.get(userVal.value);
    console.log(currentUser);
    console.log(userGreet.innerHTML = `Welcome ${currentUser.accountHolder}`);
    logInForm.innerHTML = '<button class="LogOutBtn">&rarr;</button>';
});