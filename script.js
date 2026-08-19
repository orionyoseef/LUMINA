/**
 * LUMINA Nature's Glow - Interactive Script
 * Safe execution with optional chaining & non-blocking execution.
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initProgressBarAnimation();
    initFAQAccordion();
    initMobileFloatingCTA();
    initWhatsAppOrderBuilder();
});

/**
 * 1. Scroll Reveal Animation menggunakan IntersectionObserver
 */
function initScrollReveal() {
    const targets = document.querySelectorAll('section, .grid > div, footer');

    if (!('IntersectionObserver' in window)) {
        targets.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Animasi hanya berjalan 1x
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    targets.forEach((target, index) => {
        target.classList.add('reveal-element');
        // Memberikan delay otomatis untuk grid items
        if (target.parentElement?.classList.contains('grid')) {
            target.classList.add(`delay-${(index % 4) + 1}`);
        }
        observer.observe(target);
    });
}

/**
 * 2. Animasi Progress Bar saat terjangkau Layar
 */
function initProgressBarAnimation() {
    const progressBars = document.querySelectorAll('.bg-sage[style*="width"]');

    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        bar.classList.add('progress-bar-fill');
        bar.dataset.targetWidth = targetWidth;
    });

    if (!('IntersectionObserver' in window)) {
        progressBars.forEach(bar => bar.style.width = bar.dataset.targetWidth);
        return;
    }

    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.dataset.targetWidth;
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => barObserver.observe(bar));
}

/**
 * 3. FAQ Accordion Handler (Jika ada section FAQ)
 */
function initFAQAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const content = currentItem.querySelector('.accordion-content');
            const isActive = currentItem.classList.contains('active');

            // Tutup item accordion lainnya
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                const c = item.querySelector('.accordion-content');
                if (c) c.style.maxHeight = null;
            });

            // Buka item yang diklik
            if (!isActive && content) {
                currentItem.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

/**
 * 4. Floating Mobile CTA Visibility
 */
function initMobileFloatingCTA() {
    const floatingBtn = document.querySelector('.floating-mobile-cta');
    if (!floatingBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            floatingBtn.classList.add('show');
        } else {
            floatingBtn.classList.remove('show');
        }
    }, { passive: true });
}

/**
 * 5. Helper Generator Pesan WhatsApp Otomatis
 */
function initWhatsAppOrderBuilder() {
    const waButtons = document.querySelectorAll('a[href*="wa.me"]');
    const phoneNumber = "6282310979388"; // Ganti dengan nomor WA asli
    const message = encodeURIComponent(
        "Halo Admin LUMINA Nature's Glow! ✨\n\nSaya berminat untuk memesan *Organic Powder Face Mask (50g)*.\nMohon info mengenai ketersediaan stok dan total ongkirnya ya. Terima kasih!"
    );

    waButtons.forEach(btn => {
        btn.setAttribute('href', `https://wa.me/${phoneNumber}?text=${message}`);
    });
}
