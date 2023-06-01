console.log('1. Вёрстка соответствует макету. Ширина экрана 768px +24 \n2. Вёрстка соответствует макету. Ширина экрана 380px +24\n3. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\n4. На ширине экрана 380рх и меньше реализовано адаптивное меню +22\nИтого: 85 / 85')

// Burger menu
const body = document.querySelector("body");
const burgerMenu = document.querySelector('.burger-menu');
const headerNav = document.querySelector('.header-nav');
const links = document.querySelectorAll('.navigation-link');
const opacity = document.querySelector('.opacity');

if (burgerMenu) {
    burgerMenu.addEventListener('click', function(e) {
        body.classList.toggle('active');
        burgerMenu.classList.toggle('active');
        headerNav.classList.toggle('active');
        opacity.classList.toggle('active');

        e.stopPropagation();
        body.addEventListener('click', (k) => {
            if(!k.target.closest('.header-nav')) closeBurger ();
        });
    });

    links.forEach(function(l) {
        l.addEventListener('click', closeBurger);
    });
}
function closeBurger() {
    body.classList.remove('active');
    burgerMenu.classList.remove('active');
    headerNav.classList.remove('active');
    opacity.classList.remove("active");
}

//service blur

const serviceBtn = document.querySelector('.service-btn');
const gardensBtn = document.querySelector('.gardens');
const lawnBtn = document.querySelector('.lawn');
const plantingBtn = document.querySelector('.planting');
const gardens = document.querySelectorAll('.gardens-card');
const lawn = document.querySelectorAll('.lawn-card');
const planting = document.querySelectorAll('.planting-card');
const cards = document.querySelector('.card');

if (gardensBtn) {
    gardensBtn.addEventListener('click', function(e) {
        if ((lawnBtn.classList.contains('_focus') && !plantingBtn.classList.contains('_focus')) || 
        (!lawnBtn.classList.contains('_focus') && plantingBtn.classList.contains('_focus'))) {
            gardensBtn.classList.toggle('_focus');
            for (let i of gardens) {
                i.classList.toggle('_blur');
            }
        } else if (lawnBtn.classList.contains('_focus') && plantingBtn.classList.contains('_focus')) {
            for (let i of lawn) {
                i.classList.remove('_blur');
            }
            for (let k of planting) {
                k.classList.remove('_blur');
            }
            for (let m of gardens) {
                m.classList.remove('_blur');
            }
            lawnBtn.classList.remove('_focus');
            plantingBtn.classList.remove('_focus');
        } else {
            gardensBtn.classList.toggle('_focus');
            for (let i of lawn) {
                i.classList.toggle('_blur');
            }
            for (let k of planting) {
                k.classList.toggle('_blur');
            }
        }
    })
}

if (lawnBtn) {
    lawnBtn.addEventListener('click', function(e) {
        if ((gardensBtn.classList.contains('_focus') && !plantingBtn.classList.contains('_focus')) || 
        (!gardensBtn.classList.contains('_focus') && plantingBtn.classList.contains('_focus'))) {
            lawnBtn.classList.toggle('_focus');
            for (let i of lawn) {
                i.classList.toggle('_blur');
            }
        } else if (gardensBtn.classList.contains('_focus') && plantingBtn.classList.contains('_focus')) {
            for (let i of gardens) {
                i.classList.remove('_blur');
            }
            for (let k of planting) {
                k.classList.remove('_blur');
            }
            for (let m of lawn) {
                m.classList.remove('_blur');
            }
            gardensBtn.classList.remove('_focus');
            plantingBtn.classList.remove('_focus');
        } else {
            lawnBtn.classList.toggle('_focus');
            for (let i of gardens) {
                i.classList.toggle('_blur');
            }
            for (let k of planting) {
                k.classList.toggle('_blur');
            }
        }
    })
}

if (plantingBtn) {
    plantingBtn.addEventListener('click', function(e) {
        if ((gardensBtn.classList.contains('_focus') && !lawnBtn.classList.contains('_focus')) || 
        (!gardensBtn.classList.contains('_focus') && lawnBtn.classList.contains('_focus'))) {
            plantingBtn.classList.toggle('_focus');
            for (let i of planting) {
                i.classList.toggle('_blur');
            }
        } else if (gardensBtn.classList.contains('_focus') && lawnBtn.classList.contains('_focus')) {
            for (let i of gardens) {
                i.classList.remove('_blur');
            }
            for (let k of lawn) {
                k.classList.remove('_blur');
            }
            for (let m of planting) {
                m.classList.remove('_blur');
            }
            gardensBtn.classList.remove('_focus');
            lawnBtn.classList.remove('_focus');
        } else {
            plantingBtn.classList.toggle('_focus');
            for (let i of gardens) {
                i.classList.toggle('_blur');
            }
            for (let k of lawn) {
                k.classList.toggle('_blur');
            }
        }
    })
}


//prices accordion

const dropOut = document.querySelectorAll('.tempr-click');
const changeDrop = document.querySelectorAll('.change');
const accordeon = document.querySelectorAll('.choose-btn_inner');
const chooseBtn = document.querySelectorAll('.choose-btn');
const acc_content = document.querySelectorAll('.acc-content');

accordeon[0].addEventListener('click', function() {
    if(accordeon[0].lastElementChild.classList.contains('_inactive')) {
        accordeon[0].lastElementChild.classList.remove('_inactive');
        accordeon[0].firstElementChild.classList.add('_inactive');
        let content = accordeon[0].nextElementSibling;
        content.style.maxHeight = content.scrollHeight + 'px';
        chooseBtn[0].classList.toggle('_active');
        accordeon[0].classList.toggle('_active');
    } else {
        accordeon[0].lastElementChild.classList.add('_inactive');
        accordeon[0].firstElementChild.classList.remove('_inactive');
        let content = accordeon[0].nextElementSibling;
        content.style.maxHeight = '0px';
        chooseBtn[0].classList.remove('_active');
        accordeon[0].classList.remove('_active');
    }
    accordeon[1].lastElementChild.classList.add('_inactive');
    accordeon[1].firstElementChild.classList.remove('_inactive');
    let content = accordeon[1].nextElementSibling;
    content.style.maxHeight = '0px';
    accordeon[2].lastElementChild.classList.add('_inactive');
    accordeon[2].firstElementChild.classList.remove('_inactive');
    let content1 = accordeon[2].nextElementSibling;
    content1.style.maxHeight = '0px';
    chooseBtn[1].classList.remove('_active');
    accordeon[1].classList.remove('_active');
    chooseBtn[2].classList.remove('_active');
    accordeon[2].classList.remove('_active');
})

accordeon[1].addEventListener('click', function() {
    if(accordeon[1].lastElementChild.classList.contains('_inactive')) {
        accordeon[1].lastElementChild.classList.remove('_inactive');
        accordeon[1].firstElementChild.classList.add('_inactive');
        let content = accordeon[1].nextElementSibling;
        content.style.maxHeight = content.scrollHeight + 'px';
        chooseBtn[1].classList.toggle('_active');
        accordeon[1].classList.toggle('_active');
    } else {
        accordeon[1].lastElementChild.classList.add('_inactive');
        accordeon[1].firstElementChild.classList.remove('_inactive');
        let content = accordeon[1].nextElementSibling;
        content.style.maxHeight = '0px';
        chooseBtn[1].classList.remove('_active');
        accordeon[1].classList.remove('_active');
    }
    accordeon[0].lastElementChild.classList.add('_inactive');
    accordeon[0].firstElementChild.classList.remove('_inactive');
    let content = accordeon[0].nextElementSibling;
    content.style.maxHeight = '0px';
    accordeon[2].lastElementChild.classList.add('_inactive');
    accordeon[2].firstElementChild.classList.remove('_inactive');
    let content1 = accordeon[2].nextElementSibling;
    content1.style.maxHeight = '0px';
    chooseBtn[0].classList.remove('_active');
    accordeon[0].classList.remove('_active');
    chooseBtn[2].classList.remove('_active');
    accordeon[2].classList.remove('_active');
})

accordeon[2].addEventListener('click', function() {
    if(accordeon[2].lastElementChild.classList.contains('_inactive')) {
        accordeon[2].lastElementChild.classList.remove('_inactive');
        accordeon[2].firstElementChild.classList.add('_inactive');
        let content = accordeon[2].nextElementSibling;
        content.style.maxHeight = content.scrollHeight + 'px';
        chooseBtn[2].classList.toggle('_active');
        accordeon[2].classList.toggle('_active');
    } else {
        accordeon[2].lastElementChild.classList.add('_inactive');
        accordeon[2].firstElementChild.classList.remove('_inactive');
        let content = accordeon[2].nextElementSibling;
        content.style.maxHeight = '0px';
        chooseBtn[2].classList.remove('_active');
        accordeon[2].classList.remove('_active');
    }
    accordeon[1].lastElementChild.classList.add('_inactive');
    accordeon[1].firstElementChild.classList.remove('_inactive');
    let content = accordeon[1].nextElementSibling;
    content.style.maxHeight = '0px';
    accordeon[0].lastElementChild.classList.add('_inactive');
    accordeon[0].firstElementChild.classList.remove('_inactive');
    let content1 = accordeon[0].nextElementSibling;
    content1.style.maxHeight = '0px';
    chooseBtn[1].classList.remove('_active');
    accordeon[1].classList.remove('_active');
    chooseBtn[0].classList.remove('_active');
    accordeon[0].classList.remove('_active');
})

//contacts select
const card = document.querySelectorAll('.select-card');

let select = function() {
    let selectBtn = document.querySelector('.contacts-inner__btn');
    let selectItem = document.querySelectorAll('.select-item');

    selectBtn.addEventListener('click', selectToggle);
    selectItem.forEach(item => {
        item.addEventListener('click', selectChoose)
    });

    function selectToggle() {
        this.parentElement.classList.toggle('_active');
    }
    function selectChoose() {
        let text = this.innerText;
        let select = this.closest('.select');
        let currentText = select.querySelector('.current-select');
        currentText.innerText = text;
        select.classList.remove('_active');

        if(currentText.innerText === 'Canandaigua, NY') {
            card[0].classList.remove('_hidden');
            card[1].classList.add('_hidden');
            card[2].classList.add('_hidden');
            card[3].classList.add('_hidden');
        } else if(currentText.innerText === 'New York City') {
            card[1].classList.remove('_hidden');
            card[0].classList.add('_hidden');
            card[2].classList.add('_hidden');
            card[3].classList.add('_hidden');
        } else if(currentText.innerText === 'Yonkers, NY') {
            card[2].classList.remove('_hidden');
            card[0].classList.add('_hidden');
            card[1].classList.add('_hidden');
            card[3].classList.add('_hidden');
        } else {
            card[3].classList.remove('_hidden');
            card[0].classList.add('_hidden');
            card[1].classList.add('_hidden');
            card[2].classList.add('_hidden');
        }
    }
}

select();