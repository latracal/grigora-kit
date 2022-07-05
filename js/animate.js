var elements = document.getElementsByClassName('has-entrance-animation');

document.addEventListener('scroll', animate);

function inView(element) {
    var windowHeight = window.innerHeight;
    var scrollY = window.scrollY || window.pageYOffset;
    var scrollPosition = scrollY + windowHeight;
    var elementPosition = element.getBoundingClientRect().top + scrollY + element.clientHeight;
    if (scrollPosition > elementPosition) {
        return true;
    }
        return false;
}

function animate() {
    for (let i = 0; i < elements.length; i++) {
        if(inView(elements[i])){
            elements[i].classList.remove('has-entrance-animation');
        }
    }
}
