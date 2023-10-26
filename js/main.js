// Reviews Slider
if (document.querySelector('.swiper__reviews')) {
    const swiper = new Swiper('.swiper__reviews', {
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1.3,
                spaceBetween: 20,
            },
            // when window width is >= 640px
            640: {
                slidesPerView: 2,
                spaceBetween: 40,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
    })
}

// Buttons
if (document.querySelector('.club__buttons')) {
    const btns = document.querySelectorAll('.club__button')
    const button = document.querySelector('.club__buttons')
    const contents = document.querySelectorAll('.main__content')
    btns[0].classList.add('active')
    contents[0].classList.add('active')
    button.addEventListener('click', () => {
        button.classList.toggle('active')

        if (!button.classList.contains('active')) {
            btns[0].classList.add('active')
            btns[1].classList.remove('active')

            contents[0].classList.add('active')
            contents[1].classList.remove('active')
        } else {
            btns[0].classList.remove('active')
            btns[1].classList.add('active')

            contents[0].classList.remove('active')
            contents[1].classList.add('active')
        }
    })
}

const slider = document.getElementById('card-slider')
const cs = getComputedStyle(document.documentElement, null)
const cards = Array.from(slider.querySelectorAll('.slider-item'))
const lastSlide = cards[cards.length - 1]
cards.unshift(slider.insertBefore(lastSlide.cloneNode(true), slider.firstChild))
let defaultX = cs.getPropertyValue('--slider-width'),
    defaultY = cs.getPropertyValue('--slider-height')
const getAnimations = () => [
    [0.5, { x: -defaultX, y: -defaultY, opacity: 0, fontSize: 0 }],
    [0.5, { x: 0, y: 0, opacity: 0.18, fontSize: '28px' }],
    [0.5, { x: defaultX, y: defaultY, opacity: 0.3, fontSize: '32px' }],
    [
        0.5,
        {
            x: defaultX * 2,
            y: defaultY * 2,
            opacity: 1,
            fontSize: '36px',
        },
    ],
    [0.5, { x: defaultX, y: defaultY * 3, opacity: 0.3, fontSize: '32px' }],
    [
        0.5,
        {
            x: 0,
            y: defaultY * 4,
            opacity: 0.18,
            fontSize: '28px',
            onComplete: updateArray,
        },
    ],
]

let animations = getAnimations()

const images = Array.from(
    document.querySelectorAll('#image-slider .slider-item'),
)
let currentIndex = 0

function startAnim() {
    cards.forEach((slide, index) => {
        TweenMax.to(slide, ...animations[index])
    })
    images.forEach((image, index) => {
        TweenMax.to(image, 0.5, {
            autoAlpha: index === currentIndex ? 1 : 0,
        })
    })
    currentIndex = currentIndex < images.length - 1 ? currentIndex++ : 0

    images.push(images.shift())
}

startAnim()

function updateArray() {
    defaultX = cs.getPropertyValue('--slider-width')
    defaultY = cs.getPropertyValue('--slider-height')
    animations = getAnimations()
    const firstElem = cards.shift()
    TweenMax.to(firstElem, 0, { x: -defaultX, y: defaultY * 5, opacity: 0 })
    firstElem.innerHTML = cards[0].innerHTML
    cards.push(firstElem)
    setTimeout(function () {
        startAnim()
    }, 3000)
}

if (document.querySelector('.swiper-pluses')) {
    const swiperPluses = new Swiper('.swiper-pluses', {
        // Optional parameters
        loop: true,
        centeredSlides: true,
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1.5,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 3.6,
                spaceBetween: 50,
            },
        },
    })
}
