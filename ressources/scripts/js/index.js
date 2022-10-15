function loadpage() {
    document.getElementsByTagName('header')[0].style.position = "fixed";
    document.addEventListener('scroll', function(e) {
        scroll();
    });
    window.menushown = false;
    document.getElementsByClassName('menuicon')[0].addEventListener('click', function(e) {
        if (!window.menushown) {
            document.getElementsByTagName("menu")[0].style.display = "flex";
            document.getElementsByTagName("menu")[0].style.position = "fixed";
            window.menushown = true;
        } else {
            document.getElementsByTagName("menu")[0].style.display = "none";
            window.menushown = false;
        }
    });
    document.querySelectorAll("menu>li").forEach((menuitem) => {
        menuitem.addEventListener('click', () => {
            document.getElementsByTagName("menu")[0].style.display = "none";
            window.menushown = false;
        })
    });
}

function autoScroll() {
    if (window.currentitem == window.caroussel_length + 1) {
        window.currentitem = 1
    }

    rectangleOffset = document.querySelector("#caroussel-rectangle").offsetLeft;

    $("#caroussel-rectangle").animate({
        scrollLeft: document.querySelector("#item" + window.currentitem).offsetLeft - rectangleOffset - (document.querySelector("#item1").offsetLeft - rectangleOffset) + 15
    }, 300);

    window.currentitem++;

}

function scroll() {
    if (document.body.scrollTop > 2 || document.documentElement.scrollTop > 2) {
        document.getElementsByTagName('header')[0].className = "headerscroll";
    } else {
        document.getElementsByTagName('header')[0].className = "";
    }
}