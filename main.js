/* =========================================
   MEDIORA PHARMA
   Main JavaScript
========================================= */


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("open");

    });


    // Close menu when clicking a navigation link

    const navLinks =
        document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("open");

        });

    });

}


/* =========================================
   STICKY HEADER
========================================= */

const header =
    document.getElementById("header");

function handleScroll() {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    handleScroll
);


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-link");


function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
                sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* =========================================
   SIMPLE SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".about-content, .about-image, .service-card"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
    "Mediora Pharma website initialized successfully."
);
/* =========================================
   CONTACT INQUIRY FORM
========================================= */

const inquiryForm =
    document.getElementById("inquiryForm");


if (inquiryForm) {

    const fullName =
        document.getElementById("fullName");

    const email =
        document.getElementById("email");

    const inquiryType =
        document.getElementById("inquiryType");

    const message =
        document.getElementById("message");

    const formSuccess =
        document.getElementById("formSuccess");


    function showError(
        input,
        errorElement,
        message
    ) {

        const group =
            input.closest(".form-group");

        group.classList.add("error");

        errorElement.textContent =
            message;
    }


    function clearError(
        input,
        errorElement
    ) {

        const group =
            input.closest(".form-group");

        group.classList.remove("error");

        errorElement.textContent = "";
    }


    function validateEmail(emailValue) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(emailValue);

    }


    inquiryForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            let valid = true;


            /* Name */

            if (
                fullName.value.trim()
                === ""
            ) {

                showError(
                    fullName,
                    document.getElementById(
                        "fullNameError"
                    ),
                    "Please enter your name."
                );

                valid = false;

            } else {

                clearError(
                    fullName,
                    document.getElementById(
                        "fullNameError"
                    )
                );

            }


            /* Email */

            if (
                email.value.trim()
                === ""
            ) {

                showError(
                    email,
                    document.getElementById(
                        "emailError"
                    ),
                    "Please enter your email."
                );

                valid = false;

            }

            else if (
                !validateEmail(
                    email.value.trim()
                )
            ) {

                showError(
                    email,
                    document.getElementById(
                        "emailError"
                    ),
                    "Please enter a valid email."
                );

                valid = false;

            }

            else {

                clearError(
                    email,
                    document.getElementById(
                        "emailError"
                    )
                );

            }


            /* Inquiry Type */

            if (
                inquiryType.value === ""
            ) {

                showError(
                    inquiryType,
                    document.getElementById(
                        "inquiryTypeError"
                    ),
                    "Please select an inquiry type."
                );

                valid = false;

            } else {

                clearError(
                    inquiryType,
                    document.getElementById(
                        "inquiryTypeError"
                    )
                );

            }


            /* Message */

            if (
                message.value.trim()
                === ""
            ) {

                showError(
                    message,
                    document.getElementById(
                        "messageError"
                    ),
                    "Please enter your message."
                );

                valid = false;

            } else {

                clearError(
                    message,
                    document.getElementById(
                        "messageError"
                    )
                );

            }


            /* If invalid */

            if (!valid) {

                return;

            }


            /* =========================
               DEMO SUBMISSION
            ========================== */

            const submitButton =
                inquiryForm.querySelector(
                    ".form-submit"
                );


            submitButton.disabled = true;

            submitButton.innerHTML =
                "Sending...";


            setTimeout(() => {

                inquiryForm.reset();


                submitButton.disabled =
                    false;

                submitButton.innerHTML =
                    `Send Inquiry <span>→</span>`;


                formSuccess.classList.add(
                    "show"
                );


                formSuccess.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });


            }, 1000);

        }
    );


    /* Remove error while typing */

    fullName.addEventListener(
        "input",
        () => {

            clearError(
                fullName,
                document.getElementById(
                    "fullNameError"
                )
            );

        }
    );


    email.addEventListener(
        "input",
        () => {

            clearError(
                email,
                document.getElementById(
                    "emailError"
                )
            );

        }
    );


    message.addEventListener(
        "input",
        () => {

            clearError(
                message,
                document.getElementById(
                    "messageError"
                )
            );

        }
    );


    inquiryType.addEventListener(
        "change",
        () => {

            clearError(
                inquiryType,
                document.getElementById(
                    "inquiryTypeError"
                )
            );

        }
    );

}