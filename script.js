document.addEventListener('DOMContentLoaded', () => {

    // ─── Clean URL Navigation ────────────────────────────────

    // 1. Ganti URL & Scroll pas menu diklik
    document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Stop efek lompat bawaan HTML

            const targetId = this.getAttribute('href'); // Dapetnya "#home" atau "#about"
            const cleanPath = targetId.substring(1);    // Dapetnya "home" atau "about"
            const section = document.querySelector(targetId);

            if (section) {
                // Scroll mulus ke section yang dituju
                section.scrollIntoView({ behavior: 'smooth' });

                // Ubah URL di address bar tanpa ngereload
                window.history.pushState(null, null, '/' + cleanPath);
            }
        });
    });

    // 2. Handle pas user ngetik URL langsung (misal: buka link .../about dari WhatsApp)
    window.addEventListener('load', () => {
        const path = window.location.pathname.substring(1); // Ngambil kata "about" dari URL
        if (path) {
            const targetSection = document.getElementById(path);
            if (targetSection) {
                // Kalau ada ID-nya, langsung otomatis scroll ke sana
                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    });





    // ─── Typed.js ────────────────────────────────────
    new Typed('#typed', {
        strings: [
            'Web Developer.',
            'UI/UX Enthusiast.',
            'Game Developer.',
        ],
        typeSpeed: 55,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        cursorChar: '_',
    });

    // ─── Custom Cursor ────────────────────────────────
    const cursor = document.getElementById('cursor');

    if (window.matchMedia('(pointer: fine)').matches) {
        let mouseX = -100, mouseY = -100;
        let curX = -100, curY = -100;
        let rafId;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        document.addEventListener('mouseleave', () => cursor.classList.add('cursor-hidden'));
        document.addEventListener('mouseenter', () => cursor.classList.remove('cursor-hidden'));

        // Smooth cursor with lerp
        function lerp(a, b, n) { return (1 - n) * a + n * b; }

        function animCursor() {
            curX = lerp(curX, mouseX, 0.18);
            curY = lerp(curY, mouseY, 0.18);
            cursor.style.left = curX + 'px';
            cursor.style.top = curY + 'px';
            rafId = requestAnimationFrame(animCursor);
        }

        animCursor();

        // Hover state on interactive elements
        const hoverTargets = document.querySelectorAll(
            'a, button, .project-item, .skill-pill, .gallery-item'
        );

        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });
    }

    // ─── Navbar Scroll ────────────────────────────────
    const navbar = document.getElementById('navbar');

    const navObserver = new IntersectionObserver(([entry]) => {
        navbar.classList.toggle('scrolled', !entry.isIntersecting);
    }, { threshold: 0.1 });

    navObserver.observe(document.getElementById('home'));

    // ─── Hamburger Menu ───────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open');
    });

    // Close mobile nav on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileNav.classList.remove('open');
        });
    });

    // ─── Scroll Reveal ────────────────────────────────
    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-line');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;

                setTimeout(() => {
                    el.style.setProperty('--delay', delay + 'ms');
                    el.classList.add('visible');
                }, 0);

                revealObserver.unobserve(el);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Trigger hero reveals immediately
    setTimeout(() => {
        document.querySelectorAll('.hero .reveal, .hero .reveal-up, .hero .reveal-line')
            .forEach(el => {
                const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
                el.style.setProperty('--delay', delay + 'ms');
                el.classList.add('visible');
                revealObserver.unobserve(el);
            });
    }, 100);

    // ─── Modal Logic ──────────────────────────────────
    const modal = document.getElementById('dewarigama-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBg = modal.querySelector('.modal-backdrop');
    const trigger = document.getElementById('dewarigama-trigger');

    function openModal() {
        modal.style.display = 'flex';
        requestAnimationFrame(() => modal.classList.add('open'));
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => { modal.style.display = 'none'; }, 500);
    }

    trigger.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);
    modalBg.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeLightbox();
        }
    });

    // ─── Lightbox Logic ───────────────────────────────
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.style.display = 'flex';
        requestAnimationFrame(() => lightbox.classList.add('open'));
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightbox.style.display = 'none';
            lightboxImg.src = '';
        }, 400);
    }

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const src = item.getAttribute('data-src');
            if (src) openLightbox(src);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // ─── Smooth Section Numbers ───────────────────────
    // Subtle parallax on hero decorative number
    const heroNum = document.querySelector('.hero-number');
    if (heroNum) {
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            heroNum.style.transform = `translateY(${y * 0.15}px)`;
        }, { passive: true });
    }

    // ─── Active Nav Link Highlighting ─────────────────
    const sections = document.querySelectorAll('[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.style.color = 'var(--text)';
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(s => sectionObserver.observe(s));

});