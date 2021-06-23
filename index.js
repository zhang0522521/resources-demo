const headerEl = document.querySelector("header");
const scollToTop = document.querySelector(".scrollToTop");
window.addEventListener('scroll', () => {
    let height = headerEl.getBoundingClientRect().height;
    console.log(height);
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop - height > 800) {
        if (!headerEl.classList.contains("stitky")) {
            headerEl.classList.add("stitky")
        }
    } else {
        headerEl.classList.remove("stitky")
    }
    if (scrollTop - height > 1000) {
        scollToTop.style.display = "block"
    } else {
        scollToTop.style.display = "none"
    }
})
const glide = new Glide(".glide");
const captionsEl = document.querySelectorAll(".slide-caption");
glide.on(["mount.after", "run.after"], () => {
    const caption = captionsEl[glide.index];
    anime({
        targets: caption.children,
        opacity: [0, 1],
        duration: 400,
        easing: "linear",
        delay: anime.stagger(400, { start: 300 }),
        translateY: [anime.stagger([40, 10]), 0]
    })
});
glide.on("run.before", () => {
    document.querySelectorAll(".slide-caption>*").forEach(el => {
        el.style.opacity = "0"
    })
})
glide.mount();


const isotope = new Isotope(".cases", {
    layoutMode: "fitRows",
    itemSelector: ".case-item"
})
const filterBrns = document.querySelector(".filter-btns");
filterBrns.addEventListener("click", e => {
    let { target } = e;
    const filterOption = target.getAttribute("data-filter");
    if (filterOption) {
        document.querySelectorAll(".filter-btn.active").forEach(item => item.classList.remove("active"));
        target.classList.add("active");
        isotope.arrange({ filter: filterOption })
    }
})
const staggeringOption = {
    delay: 300,
    distance: "50px",
    duration: 500,
    easing: "ease-in-out",
    origin: "bottom"
}

ScrollReveal().reveal(".feature", {...staggeringOption, interval: 250 });
ScrollReveal().reveal(".service-item", {...staggeringOption, interval: 250 });
const dataSectionEl = document.querySelector(".data-section");
ScrollReveal().reveal(".data-section", {
    beforeReveal: () => {
        anime({
            targets: ".data-piece .num",
            innerHTML: el => {
                return [0, el.innerHTML]
            },
            duration: 2000,
            round: 1,
            easing: "easeInExpo"
        });
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom/5}px)`
    }
});


window.addEventListener("scroll", () => {
    const bottom = dataSectionEl.getBoundingClientRect().bottom;
    const top = dataSectionEl.getBoundingClientRect().top;

    if (bottom >= 0 && top <= window.innerHeight) {
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom/5}px)`
    }
})

//scroll
const scroll = new SmoothScroll('nav a[href*="#"],.scrollToTop a[href*="#"]', {
    header: "header",
    offset: 80
})

document.addEventListener("scrollStart", () => {
    if (headerEl.classList.contains("open")) {
        headerEl.classList.remove("open")
    }
})

const exploreBtnEl = document.querySelectorAll(".explore-btn");
exploreBtnEl.forEach(item => {
    item.addEventListener('click', () => {
        scroll.animateScroll(document.querySelector("#about-us"))
    })
})

const burgerEl = document.querySelector('.burger');
burgerEl.addEventListener('click', () => {
    headerEl.classList.toggle("open")
})