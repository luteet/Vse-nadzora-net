
const body = document.querySelector('body'),
      menu = document.querySelectorAll('.burger, .header__nav, body'),
      burger = document.querySelector('.burger'),
      header = document.querySelector('.header');

      header.classList.add('_hide');
      


body.addEventListener('click', function(e) {

    // Меню в шапке
    if(e.target.classList.contains('burger') || e.target.parentNode.classList.contains('burger')) {
        menu.forEach(elem => {
            elem.classList.toggle('_active')
        })
    }


    // Запуск скрола к секциям
    if(e.target.classList.contains('_btn-to-scroll')) {
        
        let section = document.querySelector(e.target.getAttribute('href'));

        if(section) {
            e.preventDefault();
            menu.forEach(elem => {
                elem.classList.remove('_active')
            })
            /* window.requestAnimationFrame(smoothscroll);
            window.scrollTo (0, section.offsetTop - header.offsetHeight); */
            /* window.scrollBy({
                top: section.offsetTop - header.offsetHeight,
                behavior: 'smooth'
            }); */
            //window.scrollTo(0, section.offsetTop - header.offsetHeight);
            /* section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              }) */
            window.scroll({
                left: 0, 
                top: section.offsetTop - header.offsetHeight, 
                behavior: 'smooth'
            })
            /* window.scrollTo({
                top: 2000,
                left: 100,
                behavior: 'smooth'
              }); */
            
        }
        
    }

})



// Скрипт скролла к секциям {

function scrollTo(element) {
    window.scroll({
      left: 0, 
      top: element,
      behavior: 'smooth'
    })
}

// }


// Скрипты для header {

function getCoords(elem) {
    var box = elem.getBoundingClientRect();
  
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  
}

function scrollPage() {

    const offsetCheckJs = document.querySelector('.offset-check-js');
    let top = [getCoords(offsetCheckJs).top, false];

    header.classList.add('_loaded');

    function scrollPageFunc() {
        top[0] = getCoords(offsetCheckJs).top;
        
        if(top[0] >= 200 && top[1] == false) {

            top[1] = true;
            header.style.setProperty('--pos', '-100%');

            setTimeout(function() {
                header.classList.add('_active');
                header.style.setProperty('--pos', '0%');
            },200);

        } else if(top[0] <= 200 && top[1] == true) {

            top[1] = false;
            header.style.setProperty('--pos', '-100%');

            setTimeout(function() {
                header.style.setProperty('--pos', '0%');
                header.classList.remove('_active');
                
            },200);

        }
    }

    scrollPageFunc();

    window.onscroll = scrollPageFunc;

}

scrollPage();

// }



// КАСТОМНЫЙ input range {

const costRange = document.querySelector('.cost__form--range'),
      costRangeValue = document.querySelector('.cost__form--range-value');

noUiSlider.create(costRange, {
    tooltips: true,
    
    start: [Number(costRangeValue.getAttribute('data-start'))],
    connect: 'lower',
    /* format: wNumb({
        decimals: 0
    }), */
    step: Number(costRangeValue.getAttribute('step')),
    range: {
        'min': Number(costRangeValue.getAttribute('min')),
        'max': Number(costRangeValue.getAttribute('max')),
    },
    format: {
        to: function (value) {
            let valueString = Math.round(value).toString(),
                valueResult = '';

            costRangeValue.setAttribute('value', valueString);
            
            if(valueString.length == 4) {
                valueResult = valueString.slice(0, 1) + " " + valueString.slice(1);
            } else if(valueString.length == 5) {
                valueResult = valueString.slice(0, 2) + " " + valueString.slice(2);
            } else if(valueString.length == 6) {
                valueResult = valueString.slice(0, 3) + " " + valueString.slice(3);
            }
            return (valueResult) ? valueResult : valueString;
            
        },
        from: function (value) {
            return Math.round(value);
        }
    }
});

// }



// Анимация {

wow = new WOW({
    mobile:       false,
  })
wow.init();

// }
