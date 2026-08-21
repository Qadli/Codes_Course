document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. MOBILE NAVBAR TOGGLE ---
    const hamburger = document.querySelector(".hamburger");
    const navbar = document.querySelector(".navbar");

    hamburger.addEventListener("click", () => {
        navbar.classList.toggle("mobile-active");
        // Change icon menu to cross
        const icon = hamburger.querySelector("i");
        if(navbar.classList.contains("mobile-active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    });

    // Tutup mobile menu ketika link diklik
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("mobile-active");
            hamburger.querySelector("i").classList.replace("fa-times", "fa-bars");
        });
    });


    // --- 2. SCROLL ANIMATION (Intersection Observer) ---
    // Aturan khusus: Animasi dipicu saat scroll turun DAN akan tereset 
    // jika di-scroll keluar sehingga animasi kembali bermain ketika di-scroll lagi.
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale');

    const revealOptions = {
        threshold: 0.15, // Muncul jika 15% bagian elemen terlihat
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tambahkan kelas active jika terlihat
                entry.target.classList.add('active');
            } else {
                // Hapus kelas jika tidak terlihat, agar animasi berulang
                entry.target.classList.remove('active');
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });


    // --- 3. MODALS (Course Details) ---
    const modalButtons = document.querySelectorAll('.open-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.modal');

    // Buka Modal
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const courseName = button.getAttribute('data-course');
            const targetModal = document.getElementById(`modal-${courseName}`);
            if (targetModal) {
                targetModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // cegah background scroll
            }
        });
    });

    // Tutup Modal via Tombol Close (X)
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // kembalikan scroll
        });
    });

    // Tutup Modal dengan klik area luar (overlay)
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });


    // --- 4. FAQ ACCORDION ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Tutup item lain jika mau hanya 1 yang terbuka (opsional)
            faqItems.forEach(otherItem => {
                if(otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle kelas item saat ini
            item.classList.toggle('active');
        });
    });


    // --- 5. DYNAMIC WHATSAPP LINK GENERATOR ---
    // Membaca attribute data-msg dan men-generate URL WA yang di-encode
    const waNumber = "628159861435"; // GANTI DENGAN NOMOR ASLI, misal: "6281234567890"
    const chatWaButtons = document.querySelectorAll('.chat-wa-dynamic');

    chatWaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const message = button.getAttribute('data-msg');
            const encodedMessage = encodeURIComponent(message);
            const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;
            window.open(waUrl, '_blank');
        });
    });

});