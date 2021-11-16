// все что с меню
let menuBtn = document.querySelector('.menu-btn'), // кнопка гамбургер
    menu = document.querySelector('.menu') // менюшка
    menuAnh = document.querySelectorAll('.menu a') // сылки в меню
    layer = document.querySelector('.layer') // подложка для меню


    // клик на гамбургер
menuBtn.addEventListener('click', ()=>{ 
    menu.classList.toggle('menu-show') // скрываем меню
    showLayear()
})

// скрываем меню при клике вне меню
layer.addEventListener('click', function(){
    menu.classList.toggle('menu-show') // скрываем меню
    showLayear()
})
// клик на ссылки
menuAnh.forEach((item) => { 
    item.addEventListener('click', (e)=>{
        menu.classList.remove('menu-show') // скрываем меню
    })
    showLayear()
});


// убераем слой менюшки
function showLayear(){
    if (!menu.classList.contains('menu-show')) {
        layer.style.display = 'none'
    } else {
        layer.style.display = 'block'
    }
}

window.addEventListener('scroll', function(){
    menu.classList.remove('menu-show') // скрываем меню по скролу
    showLayear()
})


// slider
$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    dots: true,
    responsive:{
        0:{
            items:5
        },
        600:{
            items:5
        },
        1000:{
            items:5
        }
    }
})


// внедрение карты
let mobileMap = document.querySelector('.footer-map__mobile') // карта в мобилке
let deskMap = document.querySelector('.footer-map') // карта в декстопе
if (window.innerWidth < 1390) {
    mobileMap.innerHTML = '<iframe src="https://api-maps.yandex.ru/frame/v1/-/CVh7YBYg?" width="100%" height="400" frameborder="0"></iframe>'
} else {
    deskMap.innerHTML = '<iframe src="https://api-maps.yandex.ru/frame/v1/-/CVh7YBYg?" width="100%" height="400" frameborder="0"></iframe>'
}

// оптимизация с картой для PageSpeed
window.addEventListener('resize', function(){
    // в зависимости от разрешения добавляем карту
    if (this.innerWidth > 1390) {
        deskMap.innerHTML = '<iframe src="https://api-maps.yandex.ru/frame/v1/-/CVh7YBYg?" width="100%" height="400" frameborder="0"></iframe>'
    } else {
        deskMap.innerHTML = ''
    }

    if (this.innerWidth < 1390) {
        mobileMap.innerHTML = '<iframe src="https://api-maps.yandex.ru/frame/v1/-/CVh7YBYg?" width="100%" height="400" frameborder="0"></iframe>'
    } else {
        mobileMap.innerHTML = ''
    }
})


// раскрытие калькулятора
let calcBtn = document.querySelector('.calculate-btn') // кнопка раскрытия
let calcBlock = document.querySelector('.calc') // секция раскрытия
let calcClose = document.querySelector('.calc-close') // кнопка закрытия

calcBtn.addEventListener('click', function(){
    calcBlock.classList.toggle('calc-show') // показать блок
    calcClose.classList.toggle('calc-close-show') // показать кнопку
})

calcClose.addEventListener('click', function(){
    // скрол к блоку
    document.querySelector('.calculate').scrollIntoView({
        block: "center", behavior: "smooth"
    })

    calcBlock.classList.toggle('calc-show') // показать блок
    this.classList.toggle('calc-close-show') // показать кнопку
})




//// для кальулятора