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




//// запросы

// запросы категории листов
function getPanelList(){
    fetch('https://category-nurzhas-api.herokuapp.com/category/list')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            innerPanelList(data)
        });
}
getPanelList()
function innerPanelList (data) {
    for (let len of data) {
        let div = document.createElement('div') // wrapper
        console.log(len);
            div.innerHTML = `
                <div class="about-left">
                    <div class="about-img">
                        <img src="/assets/img/roof.jpg" alt="#"> 
                    </div>
                    <h5 class="about-title">${len.name}</h5>
                    <p class="about-text">${len.small_description}</p>
                    <button class="about-btn">Подробнее</button>
                </div>
            `
            /// ### в теге img выше прописать путь к картинке, сейчас там нет фото кажется
        document.querySelector('.about-bottom').append(div)
    }
}









// отправка формы с контактами
const form_firstname = document.querySelector('#send-firstname') // имя
const form_lastname = document.querySelector('#send-lastname') // фамилия
const form_phone = document.querySelector('#send-phone') // номерт телефона
const form_btn = document.querySelector('#send-form-btn') // кнопка топравки

// отпарвка контактов
function sendMessage(){
    // объект юзера
    let user_info = {
        "first_name" : form_firstname.value,
        "last_name" : form_lastname.value,
        "phone_number" : form_phone.value,
    }
    console.log(user_info);
    // пост запрос на отправку
        fetch('http://category-nurzhas-api.herokuapp.com/message', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, /',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user_info)
        }).then(res => res.json())
        .then(res => console.log(res));
}
form_btn.addEventListener('click', function(){
    sendMessage()
})
///// ###### очень важные моменты
///// ###### 1 Нужно сделать валидацию
///// ###### 2 Отоброзить сообщения при не валидности и успешной отправке
///// ###### то что описано в коментах выше пока нет




// события калькулятора
var buildTypeValue,
    panelAddType,
    insulationVal,
    panelVal,
    layoutTypes,
    panelWidthType,
    panelColor

let building_type = document.querySelectorAll('.calc-header__type > button')
building_type.forEach((item)=>{
    item.addEventListener('click', function(){
        clearClass(building_type, 'active-type')
        item.classList.add('active-type')
        buildTypeValue = item.dataset.type
    })
})


// тип кровли
let panelType = document.querySelectorAll('.calc-type__btn-item')
panelType.forEach((item, arr)=>{
    item.addEventListener('click', function(){
        clearClass(panelType, 'calc-type__btn-active')
        item.classList.add('calc-type__btn-active')
        panelAddType = item.dataset.type
    })
})
function clearClass(arr, domClass){ // функция для очстки классов
    for (let item of arr) {
        item.classList.remove(domClass)
    }
}


// тип уплотнителя
document.querySelector('.calc-input__type').addEventListener('change', function(e){
    insulationVal = e.target.value
})
// толщина панели
document.querySelector('.calc-type__height').addEventListener('change', function(e){
    panelVal = e.target.value
})
// вди раскладки
let layoutTypeRadio = document.querySelectorAll('.layoutType')
layoutTypeRadio.forEach((item)=>{
    item.addEventListener('change', function(){
        layoutTypes = item.value
    })
})
// ширина панелей
let panelWidthRadio = document.querySelectorAll('.panelWidth')
layoutTypeRadio.forEach((item)=>{
    item.addEventListener('change', function(){
        panelWidthType = item.value
    })
})
document.querySelector('.calc-color__select').addEventListener('change', function(e){
    panelColor = e.target.value
})

// отправка формы
let send_calc = document.querySelector('.calc-btn')
send_calc.addEventListener('click', function(){
    let calc_obj = {
        "building_type": buildTypeValue,
        "width": document.querySelector('.width').value,
        "height": document.querySelector('.height').value,
        "length": document.querySelector('.length').value,
        "panel_type": panelAddType,
        "insulation_type": insulationVal,
        "panel_depth": panelVal,
        "layout_type": layoutTypes,
        "panel_width": panelWidthType,
        "color": panelColor
    }

    // fetch('https://category-nurzhas-api.herokuapp.com/category/list', {
    //         method: 'post',
    //         headers: {
    //             'Accept': 'application/json, text/plain, /',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(calc_obj)
    //     }).then(res => res.json())
    //     .then(res => console.log(res));
    console.log(calc_obj);
})