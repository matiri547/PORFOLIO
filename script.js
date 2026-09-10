/* =========================================================
   MATIRI — PORTFOLIO
   JavaScript V4
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. MENU MOBILE
       ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");

    if (menuBtn && nav) {

        const navLinks = nav.querySelectorAll("a");

        function closeMenu() {
            nav.classList.remove("active");
            menuBtn.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute("aria-label", "Ouvrir le menu");
        }

        function openMenu() {
            nav.classList.add("active");
            menuBtn.classList.add("active");
            menuBtn.setAttribute("aria-expanded", "true");
            menuBtn.setAttribute("aria-label", "Fermer le menu");
        }

        menuBtn.addEventListener("click", () => {
            const isOpen = nav.classList.contains("active");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Fermer le menu lorsqu'on clique sur un lien
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                closeMenu();
            });
        });

        // Fermer avec la touche Échap
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // Fermer si on clique en dehors du menu
        document.addEventListener("click", event => {
            if (
                nav.classList.contains("active") &&
                !nav.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {
                closeMenu();
            }
        });
    }


    /* =====================================================
       2. ANIMATION AU SCROLL
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section-header, " +
        ".about-text, " +
        ".about-stats, " +
        ".skill-card, " +
        ".journey-item, " +
        ".project-card, " +
        ".service-card, " +
        ".vision-content, " +
        ".contact-intro, " +
        ".contact-links, " +
        ".contact-form"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        // Une fois visible, on arrête de l'observer
                        revealObserver.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        // Compatibilité anciens navigateurs
        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       3. CURSEUR LUMINEUX
       ===================================================== */

    const cursorGlow = document.querySelector(".cursor-glow");

    // On active uniquement sur les appareils avec une souris
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (cursorGlow && hasFinePointer) {

        document.addEventListener("mousemove", event => {

            cursorGlow.style.left = `${event.clientX}px`;
            cursorGlow.style.top = `${event.clientY}px`;

        });

    }


    /* =====================================================
       4. EFFET 3D SUR LA CARTE DE CODE
       ===================================================== */

    const codeCard = document.querySelector(".code-card");

    if (codeCard && hasFinePointer) {

        let animationFrame = null;

        document.addEventListener("mousemove", event => {

            if (window.innerWidth < 800) {
                return;
            }

            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }

            animationFrame = requestAnimationFrame(() => {

                const x = (window.innerWidth / 2 - event.clientX) / 45;
                const y = (window.innerHeight / 2 - event.clientY) / 45;

                codeCard.style.transform =
                    `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;

            });

        });

        // Retour à la position normale quand la souris quitte la page
        document.addEventListener("mouseleave", () => {

            codeCard.style.transform =
                "perspective(1000px) rotateY(0deg) rotateX(0deg)";

        });

    }


    /* =====================================================
       5. FORMULAIRE DE CONTACT
       ===================================================== */

    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (form && formMessage) {

        form.addEventListener("submit", event => {

            event.preventDefault();

            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const messageInput = document.getElementById("message");

            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const message = messageInput ? messageInput.value.trim() : "";

            // Vérification des champs
            if (!name || !email || !message) {

                formMessage.textContent =
                    "Veuillez remplir tous les champs.";

                return;
            }

            // Vérification simple de l'adresse email
            if (emailInput && !emailInput.checkValidity()) {

                formMessage.textContent =
                    "Veuillez entrer une adresse email valide.";

                emailInput.focus();

                return;
            }

            const subject = encodeURIComponent(
                "Nouveau projet — MATIRI"
            );

            const body = encodeURIComponent(
                `Bonjour MATIRI,

Nom : ${name}
Email : ${email}

Message :

${message}

Envoyé depuis le portfolio MATIRI.`
            );

            // Ton adresse email
            const mailto =
                `mailto:diallomamadoumatiricharo@gmail.com?subject=${subject}&body=${body}`;

            formMessage.textContent =
                "Ouverture de votre application email...";

            // Petite pause pour laisser voir le message
            setTimeout(() => {
                window.location.href = mailto;
            }, 300);

        });

    }


    /* =====================================================
       6. ANNÉE AUTOMATIQUE DU FOOTER
       ===================================================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       7. ACCESSIBILITÉ — RÉDUCTION DES ANIMATIONS
       ===================================================== */

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {

        document.documentElement.classList.add(
            "reduced-motion"
        );

    }


    /* =====================================================
       8. LIENS EXTERNES
       ===================================================== */

    const externalLinks = document.querySelectorAll(
        'a[target="_blank"]'
    );

    externalLinks.forEach(link => {

        link.setAttribute("rel", "noopener noreferrer");

    });

});