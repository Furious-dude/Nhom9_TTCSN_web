window.onscroll = function () {
    const btn = document.getElementById("scrollToTopButton");
    console.log("Scroll top:", document.documentElement.scrollTop);
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
