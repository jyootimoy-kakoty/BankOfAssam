const feature_tabs = document.querySelectorAll('.feature_btn');
const tabsContainer = document.querySelector('.feature-items');
const feature_description = document.querySelectorAll('.feature-description');

feature_tabs.forEach(tab => tab.addEventListener('click', () => console.log('tab')));
tabsContainer.addEventListener('click', function(e){
    //e.preventDefault();
    clicked = e.target.closest('.feature_btn');
    //console.log(e.currentTarget);
    console.log(clicked);
    //console.log(clicked.classList);
    //console.log(e.target.parentElement);
    if(!clicked) return;
    //Active tab
    feature_tabs.forEach(tab => tab.classList.remove('feature_tab-active'));
    clicked.classList.add('feature_tab-active');
    //Active tab content
    console.log(clicked.dataset.tab);
    feature_description.forEach(tab => tab.classList.remove('content_tab-active'));
    document.querySelector(`.tab-${clicked.dataset.tab}-content`)
    .classList.add('content_tab-active');
});

const getT = function(transactions, sort = false) {
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