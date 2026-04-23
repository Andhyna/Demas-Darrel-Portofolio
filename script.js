// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out-quad'
});

// Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    setTimeout(() => {
        follower.style.left = e.clientX - 10 + 'px';
        follower.style.top = e.clientY - 10 + 'px';
    }, 50);
});

// Typed.js for Dynamic Intro
new Typed('#typing', {
    strings: [
        'Student at Singaperbangsa Karawang University.',
        'Web Developer.',
        'UI/UX Designer.'
    ],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1500, // Menambahkan jeda sebelum teks dihapus agar lebih nyaman dibaca
    loop: true
});

// Hamburger Menu Logic
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('open');
});

// Sticky Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.background = 'rgba(5, 5, 5, 0.95)';
    } else {
        navbar.style.padding = '20px 0';
        navbar.style.background = 'rgba(5, 5, 5, 0.8)';
    }
});

// --- Modal (Pop-up) Logic untuk Dewarigama ---
const modal = document.getElementById("dewarigama-modal");
const triggerBtn = document.getElementById("dewarigama-trigger");
const closeBtn = document.querySelector(".close-btn");

// Fungsi untuk membuka modal
triggerBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    // Sedikit delay agar transisi CSS berjalan mulus
    setTimeout(() => {
        modal.classList.add("show");
    }, 10);
});

// Fungsi untuk menutup modal via tombol silang (X)
closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    setTimeout(() => {
        modal.style.display = "none";
    }, 300); // Sesuaikan dengan durasi transisi di CSS
});

// Fungsi untuk menutup modal jika user klik area gelap di luar kotak konten
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }
});