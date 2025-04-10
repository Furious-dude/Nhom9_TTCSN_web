window.onscroll = function () {
    const btn = document.getElementById("scrollToTopButton");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function subMenu1Display() {
    var dl = document.getElementById("categoryForBelowLarge__item1-subMenu");
    if (dl.style.display == "none") dl.style.display = "block";
    else dl.style.display = "none";
}

function subMenu2Display() {
    var dl = document.getElementById("categoryForBelowLarge__item2-subMenu");
    if (dl.style.display == "none") dl.style.display = "block";
    else dl.style.display = "none";
}

function subMenu3Display() {
    var dl = document.getElementById("categoryForBelowLarge__item3-subMenu");
    if (dl.style.display == "none") dl.style.display = "block";
    else dl.style.display = "none";
}

function subMenu4Display() {
    var dl = document.getElementById("categoryForBelowLarge__item4-subMenu");
    if (dl.style.display == "none") dl.style.display = "block";
    else dl.style.display = "none";
}

function subMenu5Display() {
    var dl = document.getElementById("categoryForBelowLarge__item5-subMenu");
    if (dl.style.display == "none") dl.style.display = "block";
    else dl.style.display = "none";
}

function subMenu6Display() {
    var dl = document.getElementById("categoryForBelowLarge__item6-subMenu");
    if (dl.style.display == "none") dl.style.display = "block";
    else dl.style.display = "none";
}

function subMenu8Display() {
    var dl = document.getElementById("categoryForBelowLarge__item8-subMenu");
    if (dl.style.display == "none") dl.style.display = "block";
    else dl.style.display = "none";
}