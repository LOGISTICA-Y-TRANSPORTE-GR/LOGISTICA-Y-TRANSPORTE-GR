// ==========================================================================
// LIGHTBOX MODAL PARA EL CATÁLOGO DE OPERACIONES
// Permite ampliar cualquier imagen al hacer clic, con navegación (prev/next)
// y soporte para teclado (Escape, flechas) y gestos táctiles.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');
    const lightbox = document.getElementById('image-lightbox');
    
    if (!lightbox || galleryItems.length === 0) return;

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const backdrop = lightbox.querySelector('.lightbox__backdrop');

    let currentIndex = 0;
    const imagesData = [];

    // Recopilar datos de las imágenes de la galería
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            imagesData.push({
                src: img.getAttribute('src'),
                alt: img.getAttribute('alt') || `Operación de transporte #${index + 1}`
            });

            // Abrir lightbox al dar clic en la tarjeta de la galería
            item.addEventListener('click', () => {
                openLightbox(index);
            });
        }
    });

    function openLightbox(index) {
        if (index < 0 || index >= imagesData.length) return;
        currentIndex = index;
        updateLightboxContent();
        
        lightbox.classList.add('lightbox--active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Bloquear scroll de fondo
    }

    function closeLightbox() {
        lightbox.classList.remove('lightbox--active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restaurar scroll
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % imagesData.length;
        updateLightboxContent();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + imagesData.length) % imagesData.length;
        updateLightboxContent();
    }

    function updateLightboxContent() {
        const data = imagesData[currentIndex];
        
        // Animación suave de transición
        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.96)';

        setTimeout(() => {
            lightboxImg.src = data.src;
            lightboxImg.alt = data.alt;
            lightboxCaption.textContent = data.alt;
            lightboxCounter.textContent = `${currentIndex + 1} / ${imagesData.length}`;
            
            lightboxImg.style.opacity = '1';
            lightboxImg.style.transform = 'scale(1)';
        }, 120);
    }

    // Eventos de botones
    closeBtn?.addEventListener('click', closeLightbox);
    backdrop?.addEventListener('click', closeLightbox);
    nextBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });
    prevBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });

    // Control con teclado
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('lightbox--active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNext();
        } else if (e.key === 'ArrowLeft') {
            showPrev();
        }
    });

    // Soporte para gestos táctiles (deslizar izquierda/derecha en móviles)
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            showNext(); // Deslizar hacia la izquierda -> Siguiente
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            showPrev(); // Deslizar hacia la derecha -> Anterior
        }
    }
});
