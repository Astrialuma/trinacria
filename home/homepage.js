$(document).ready(function () {

    const $gallery = $('.gallery');
    let position = 0;
    const speed = 0.1; // langsamer = smoother

    function animateGallery() {
        position -= speed;

        // Wenn Hälfte erreicht → Reset (weil Bilder dupliziert)
        if (Math.abs(position) >= $gallery[0].scrollWidth / 2) {
            position = 0;
        }

        $gallery.css('transform', 'translateX(' + position + 'px)');
        requestAnimationFrame(animateGallery);
    }

    animateGallery();

});