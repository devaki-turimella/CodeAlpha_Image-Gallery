 /* =========================================
   MARVEL STUDIOS GALLERY
========================================= */


/* ---------- GET ELEMENTS ---------- */

const galleryItems =
    document.querySelectorAll(".gallery-item");


const lightbox =
    document.getElementById("lightbox");


const lightboxImage =
    document.getElementById("lightbox-image");


const closeButton =
    document.querySelector(".close");


const previousButton =
    document.querySelector(".prev");


const nextButton =
    document.querySelector(".next");


const filterButtons =
    document.querySelectorAll(".filter-btn");


/* ---------- VARIABLES ---------- */

let visibleItems = [];

let currentIndex = 0;


/* =========================================
   UPDATE VISIBLE IMAGES
========================================= */

function updateVisibleItems() {

    visibleItems =
        Array.from(galleryItems).filter(function(item) {

            return item.style.display !== "none";

        });

}


/* =========================================
   SHOW IMAGE
========================================= */

function showImage(index) {

    if (visibleItems.length === 0) {

        return;

    }


    currentIndex = index;


    const image =
        visibleItems[currentIndex].querySelector("img");


    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;

}


/* =========================================
   OPEN LIGHTBOX
========================================= */

function openLightbox(index) {

    updateVisibleItems();

    showImage(index);

    lightbox.style.display = "flex";

}


/* =========================================
   IMAGE CLICK
========================================= */

galleryItems.forEach(function(item) {

    item.addEventListener("click", function() {

        updateVisibleItems();


        const index =
            visibleItems.indexOf(this);


        openLightbox(index);

    });

});


/* =========================================
   NEXT IMAGE
========================================= */

nextButton.addEventListener("click", function(event) {

    event.stopPropagation();


    updateVisibleItems();


    if (visibleItems.length === 0) {

        return;

    }


    currentIndex++;


    if (currentIndex >= visibleItems.length) {

        currentIndex = 0;

    }


    showImage(currentIndex);

});


/* =========================================
   PREVIOUS IMAGE
========================================= */

previousButton.addEventListener("click", function(event) {

    event.stopPropagation();


    updateVisibleItems();


    if (visibleItems.length === 0) {

        return;

    }


    currentIndex--;


    if (currentIndex < 0) {

        currentIndex =
            visibleItems.length - 1;

    }


    showImage(currentIndex);

});


/* =========================================
   CLOSE LIGHTBOX
========================================= */

closeButton.addEventListener("click", function() {

    lightbox.style.display = "none";

});


/* =========================================
   CLICK OUTSIDE IMAGE
========================================= */

lightbox.addEventListener("click", function(event) {

    if (event.target === lightbox) {

        lightbox.style.display = "none";

    }

});


/* =========================================
   FILTER SYSTEM
========================================= */

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {


        /* Remove active class */

        filterButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        /* Add active class */

        this.classList.add("active");


        /* Get selected category */

        const filter =
            this.getAttribute("data-filter");


        /* Show / hide images */

        galleryItems.forEach(function(item) {

            const category =
                item.getAttribute("data-category");


            if (
                filter === "All" ||
                category === filter
            ) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });


        updateVisibleItems();

    });

});


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener("keydown", function(event) {


    /* ESCAPE */

    if (event.key === "Escape") {

        lightbox.style.display = "none";

    }


    /* RIGHT ARROW */

    if (
        event.key === "ArrowRight" &&
        lightbox.style.display === "flex"
    ) {

        nextButton.click();

    }


    /* LEFT ARROW */

    if (
        event.key === "ArrowLeft" &&
        lightbox.style.display === "flex"
    ) {

        previousButton.click();

    }

});