/*Tabbed Component Implementation */
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

/*Activate one tab at a time on mouse hover*/
tabsContainer.addEventListener('mouseover', function(e){
    //e.preventDefault();
    if(e.target.classList.contains('feature_btn')) {
        const nav_link = e.target.closest('.feature_btn');
        //const siblings = nav_link.closest('.feature-items').querySelectorAll('.feature_btn');
        const siblings = e.currentTarget.querySelectorAll('.feature_btn');
        console.log(e.currentTarget);
        console.log(nav_link);
        //console.log(clicked.classList);
        //console.log(e.target.parentElement);

        //Deactivate other tabs on hover
        siblings.forEach(tab => {
            if(tab !== nav_link) tab.style.opacity = 0.5;
        });  
    }
});

tabsContainer.addEventListener('mouseout', function(e){
    //e.preventDefault();
    if(e.target.classList.contains('feature_btn')) {
        //const nav_link = e.target.closest('.feature_btn');
        //const siblings = nav_link.closest('.feature-items').querySelectorAll('.feature_btn');
        const siblings = e.currentTarget.querySelectorAll('.feature_btn');

        //Active tabs on mouse out
        siblings.forEach(tab => {
            tab.style.opacity = 1;
        });
        
    }
});

/*Stick Navigation Bar Using Intersection Observer API*/
//const banner = document.getElementById('banner')
const navHeight = banner.getBoundingClientRect().height;
console.log(navHeight);
const observerCallback = function(entries, scrollObserver) {
    entries.forEach(entry => {
        console.log(entry);
    });
    const [entry] = entries;
    if(!entry.isIntersecting) banner.classList.add('sticky');
    else banner.classList.remove('sticky');
};

const observerOptions = {
    root: null,
    threshold: 0.0,
    rootMargin: `-${navHeight}px`,
};

const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);
scrollObserver.observe(features)

/*Reveal Elements on Scroll*/
const revealSection = function(entries, observer) {
    entries.forEach(entry => {
        console.log(entry);
    });
    const [entry] = entries;
    if(!entry.isIntersecting) return;
    entry.target.classList.remove('hidden');
};

const observerOptionList = {
    root: null,
    threshold: 0.1,
};

const scrollAnimationObserver = new IntersectionObserver(revealSection, observerOptionList);
const allSections = document.querySelectorAll('.section');
allSections.forEach(function(section) {
    scrollAnimationObserver.observe(section);
    section.classList.add('hidden');
});
