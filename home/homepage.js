$(document).ready(function () {

    const $gallery = $('.gallery');
    const $images = $gallery.children();

    let position = 0;

    const baseSpeed = 0.1;
    let velocity = baseSpeed;

    let skipping = false;
    let skipTarget = 0;       // verbleibende Strecke
    const acceleration = 0.2; // Beschleunigung
    const maxVelocity = 8;    // Max-Speed

    function animateGallery() {

        if (skipping) {

            // Bremsweg berechnen: v² / (2a)
            let brakingDistance = (velocity * velocity) / (2 * acceleration);

            if (brakingDistance >= skipTarget) {
                // Abbremsen
                velocity -= acceleration;
                if (velocity < baseSpeed) velocity = baseSpeed;
            } else {
                // Beschleunigen
                velocity += acceleration;
                if (velocity > maxVelocity) velocity = maxVelocity;
            }

            let step = Math.min(velocity, skipTarget);
            position -= step;
            skipTarget -= step;

            if (skipTarget <= 0) {
                skipping = false;
                velocity = baseSpeed;
            }

        } else {
            position -= baseSpeed;
        }

        // Loop Reset (wegen duplizierter Bilder)
        if (Math.abs(position) >= $gallery[0].scrollWidth / 2) {
            position = 0;
        }

        $gallery.css('transform', 'translateX(' + position + 'px)');
        requestAnimationFrame(animateGallery);
    }

    function skipImage() {
        const imageWidth = $images.first().outerWidth(true);
        skipTarget = imageWidth;
        skipping = true;
    }

    window.skipImage = skipImage;

    animateGallery();
});