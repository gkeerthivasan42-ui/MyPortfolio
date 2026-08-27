document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       01. MOBILE MENU
    ========================================================= */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("show");

            if (navMenu.classList.contains("show")) {
                menuToggle.textContent = "✕";
                menuToggle.setAttribute("aria-expanded", "true");
            } else {
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
            }

        });

    }


    /* =========================================================
       02. SMOOTH SCROLL
    ========================================================= */

    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }


            /* Close mobile menu after clicking */

            if (navMenu && menuToggle) {

                navMenu.classList.remove("show");

                menuToggle.textContent = "☰";

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    });


    /* =========================================================
       03. ACTIVE NAVBAR
    ========================================================= */

    const sections = document.querySelectorAll("section");

    function updateActiveNav() {

        let current = "";

        const scrollPosition = window.scrollY + 140;

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                current = section.id;

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === "#" + current
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();


    /* =========================================================
       04. TYPING EFFECT
    ========================================================= */

    const typing = document.querySelector(".typed");

    if (typing) {

        const words = [
            "Software Developer",
            "Java Developer",
            "Python Developer",
            "Frontend Developer",
            "Backend Developer",
            "Full Stack Developer"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;


        function typeText() {

            const currentWord = words[wordIndex];


            /* Typing */

            if (!deleting) {

                typing.textContent =
                    currentWord.substring(
                        0,
                        charIndex
                    );

                charIndex++;


                /* Word completed */

                if (charIndex > currentWord.length) {

                    deleting = true;

                    setTimeout(
                        typeText,
                        1200
                    );

                    return;
                }

            }


            /* Deleting */

            else {

                typing.textContent =
                    currentWord.substring(
                        0,
                        charIndex
                    );

                charIndex--;


                /* Word deleted */

                if (charIndex < 0) {

                    deleting = false;

                    wordIndex++;

                    if (
                        wordIndex >= words.length
                    ) {

                        wordIndex = 0;

                    }

                }

            }


            setTimeout(
                typeText,
                deleting ? 50 : 120
            );

        }


        typeText();

    }


    /* =========================================================
       05. CERTIFICATE LIGHTBOX
    ========================================================= */

    const certificateImages =
        document.querySelectorAll(
            ".certificate-gallery img"
        );


    if (certificateImages.length > 0) {

        const lightbox =
            document.createElement("div");

        lightbox.id = "lightbox";

        lightbox.innerHTML = `
            <span id="closeLightbox"
                  aria-label="Close certificate">
                &times;
            </span>

            <img
                id="lightboxImage"
                alt="Certificate preview"
            >
        `;

        document.body.appendChild(lightbox);


        const lightboxImage =
            document.getElementById(
                "lightboxImage"
            );

        const closeLightbox =
            document.getElementById(
                "closeLightbox"
            );


        /* Open certificate */

        certificateImages.forEach(function (image) {

            image.addEventListener(
                "click",
                function () {

                    lightbox.style.display = "flex";

                    lightboxImage.src =
                        this.src;

                    lightboxImage.alt =
                        this.alt ||
                        "Certificate preview";

                    document.body.style.overflow =
                        "hidden";

                }
            );

        });


        /* Close certificate */

        function closeCertificate() {

            lightbox.style.display = "none";

            document.body.style.overflow = "";

        }


        if (closeLightbox) {

            closeLightbox.addEventListener(
                "click",
                closeCertificate
            );

        }


        lightbox.addEventListener(
            "click",
            function (e) {

                if (e.target === lightbox) {

                    closeCertificate();

                }

            }
        );


        /* Close using ESC key */

        document.addEventListener(
            "keydown",
            function (e) {

                if (
                    e.key === "Escape" &&
                    lightbox.style.display === "flex"
                ) {

                    closeCertificate();

                }

            }
        );

    }


    /* =========================================================
       06. BACK TO TOP
    ========================================================= */

    const topButton =
        document.createElement("button");

    topButton.id = "topButton";

    topButton.innerHTML = "↑";

    topButton.setAttribute(
        "aria-label",
        "Back to top"
    );

    document.body.appendChild(topButton);


    function updateTopButton() {

        if (window.scrollY > 300) {

            topButton.style.display = "block";

        } else {

            topButton.style.display = "none";

        }

    }


    window.addEventListener(
        "scroll",
        updateTopButton,
        { passive: true }
    );


    topButton.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    updateTopButton();


    /* =========================================================
       07. PAGE LOADER
    ========================================================= */

    window.addEventListener(
        "load",
        function () {

            const loader =
                document.getElementById("loader");

            if (!loader) {
                return;
            }


            setTimeout(function () {

                loader.style.opacity = "0";


                setTimeout(function () {

                    loader.style.display = "none";

                }, 500);

            }, 400);

        }
    );


    /* =========================================================
       08. JOB BUTTONS
    ========================================================= */

    const jobButtons =
        document.querySelectorAll(".job-btn");

    const subject =
        document.getElementById("subject");

    const message =
        document.getElementById("message");

    const contact =
        document.getElementById("contact");

    const selectedJob =
        document.getElementById("selectedJob");


    jobButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                /* Remove previous selection */

                jobButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "selected"
                        );

                    }
                );


                /* Select clicked job */

                this.classList.add("selected");


                const job =
                    this.dataset.job;


                /* Show selected position */

                if (selectedJob) {

                    selectedJob.style.display =
                        "block";

                    selectedJob.innerHTML =
                        "Selected Position : <b>" +
                        job +
                        "</b>";

                }


                /* Set subject */

                if (subject) {

                    subject.value =
                        "Application for " +
                        job;

                }


                /* Set message */

                if (message) {

                    message.value =
`Hi Keerthivasan G,

This is the Hiring Team from ________. We recently visited your portfolio and were impressed with your profile.

We are currently hiring for the ${job} position and would like to discuss this opportunity with you.

Please share your availability for an interview.

Looking forward to hearing from you.

Best Regards,
Hiring Team
___________
`;

                }


                /* Scroll to contact */

                if (contact) {

                    contact.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });


                    contact.classList.add(
                        "highlight-contact"
                    );


                    setTimeout(
                        function () {

                            contact.classList.remove(
                                "highlight-contact"
                            );

                        },
                        1500
                    );

                }

            }
        );

    });


    /* =========================================================
       09. EMAILJS CONTACT FORM
    ========================================================= */

    const form =
        document.getElementById("contactForm");


    if (form) {

        form.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();


                /* Check EmailJS */

                if (
                    typeof emailjs ===
                    "undefined"
                ) {

                    alert(
                        "Email service is not available."
                    );

                    return;

                }


                const name =
                    document.getElementById(
                        "name"
                    )?.value || "";


                const email =
                    document.getElementById(
                        "email"
                    )?.value || "";


                const phone =
                    document.getElementById(
                        "phone"
                    )?.value || "";


                const subjectValue =
                    subject?.value || "";


                const messageValue =
                    message?.value || "";


                emailjs.send(

                    "service_5w13mka",

                    "template_lc9rq3o",

                    {
                        name: name,
                        email: email,
                        phone: phone,
                        subject: subjectValue,
                        message: messageValue
                    }

                )

                .then(function () {

                    alert(
                        "Email Sent Successfully."
                    );


                    form.reset();


                    if (selectedJob) {

                        selectedJob.style.display =
                            "none";

                    }


                    jobButtons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "selected"
                            );

                        }
                    );

                })

                .catch(function (error) {

                    console.error(
                        "EmailJS Error:",
                        error
                    );

                    alert(
                        "Unable to Send Email."
                    );

                });

            }
        );

    }


    /* =========================================================
       10. WHATSAPP
    ========================================================= */

    const whatsappBtn =
        document.getElementById(
            "whatsappBtn"
        );


    if (whatsappBtn) {

        whatsappBtn.addEventListener(
            "click",
            function () {

                const name =
                    document.getElementById(
                        "name"
                    )?.value || "";


                const email =
                    document.getElementById(
                        "email"
                    )?.value || "";


                const phone =
                    document.getElementById(
                        "phone"
                    )?.value || "";


                const subjectValue =
                    subject?.value || "";


                const messageValue =
                    message?.value || "";


                const text =
`Name : ${name}

Email : ${email}

Phone : ${phone}

Subject : ${subjectValue}

${messageValue}`;


                const whatsappURL =
                    "https://wa.me/916384185142?text=" +
                    encodeURIComponent(text);


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }

});