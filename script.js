document.addEventListener("DOMContentLoaded", function () {

    /* ===========================
       SMOOTH SCROLL
    =========================== */

    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    /* ===========================
       ACTIVE NAVBAR
    =========================== */

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const top = section.offsetTop - 120;
            const height = section.offsetHeight;

            if (pageYOffset >= top && pageYOffset < top + height) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });

    /* ===========================
       TYPING EFFECT
    =========================== */

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

        let word = 0;
        let char = 0;
        let deleting = false;

        function type() {
            let current = words[word];

            if (!deleting) {
                typing.textContent = current.substring(0, char++);

                if (char > current.length) {
                    deleting = true;
                    setTimeout(type, 1200);
                    return;
                }
            } else {
                typing.textContent = current.substring(0, char--);

                if (char < 0) {
                    deleting = false;
                    word++;
                    if (word >= words.length) word = 0;
                }
            }

            setTimeout(type, deleting ? 50 : 120);
        }

        type();
    }

    /* ===========================
       CERTIFICATE LIGHTBOX
    =========================== */

    const images = document.querySelectorAll(".certificate-gallery img");

    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.innerHTML = `
        <span id="closeLightbox">&times;</span>
        <img id="lightboxImage">
    `;
    document.body.appendChild(lightbox);

    const lightboxImage = document.getElementById("lightboxImage");

    images.forEach(img => {
        img.onclick = function () {
            lightbox.style.display = "flex";
            lightboxImage.src = this.src;
        };
    });

    lightbox.onclick = function (e) {
        if (e.target.id === "lightbox" || e.target.id === "closeLightbox") {
            lightbox.style.display = "none";
        }
    };

    /* ===========================
       BACK TO TOP
    =========================== */

    const topBtn = document.createElement("button");
    topBtn.id = "topButton";
    topBtn.innerHTML = "↑";
    topBtn.setAttribute("aria-label", "Back to top");
    document.body.appendChild(topBtn);

    window.addEventListener("scroll", () => {
        topBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    topBtn.onclick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    /* ===========================
       PAGE LOADER
    =========================== */

    window.addEventListener("load", () => {
        const loader = document.getElementById("loader");
        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
        }, 400);
    });

    /* ===========================
       JOB BUTTONS
    =========================== */

    const jobButtons = document.querySelectorAll(".job-btn");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");
    const contact = document.getElementById("contact");
    const selectedJob = document.getElementById("selectedJob");

    jobButtons.forEach(button => {
        button.addEventListener("click", function () {
            jobButtons.forEach(btn => btn.classList.remove("selected"));
            this.classList.add("selected");

            const job = this.dataset.job;

            selectedJob.style.display = "block";
            selectedJob.innerHTML = "Selected Position : <b>" + job + "</b>";

            subject.value = "Application for " + job;

            message.value =
`Hi Keerthivasan,

This is the Hiring Team from ________. We recently visited your portfolio and were impressed with your profile.

We are currently hiring for the ${job} position and would like to discuss this opportunity with you.

Please share your availability for an interview.

Looking forward to hearing from you.

Best Regards,
Hiring Team
___________
`;

            contact.scrollIntoView({ behavior: "smooth" });
            contact.classList.add("highlight-contact");

            setTimeout(() => {
                contact.classList.remove("highlight-contact");
            }, 1500);
        });
    });

    /* ===========================
       EMAILJS
    =========================== */

    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        emailjs.send(
            "service_5w13mka",
            "template_lc9rq3o",
            {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                subject: subject.value,
                message: message.value
            }
        )
        .then(() => {
            alert("Email Sent Successfully.");
            form.reset();
            selectedJob.style.display = "none";
        })
        .catch(() => {
            alert("Unable to Send Email.");
        });
    });

    /* ===========================
       WHATSAPP
    =========================== */

    document.getElementById("whatsappBtn").addEventListener("click", function () {
        const text =
`Name : ${document.getElementById("name").value}

Email : ${document.getElementById("email").value}

Phone : ${document.getElementById("phone").value}

Subject : ${subject.value}

${message.value}`;

        window.open(
            "https://wa.me/916384185142?text=" + encodeURIComponent(text),
            "_blank"
        );
    });

});
