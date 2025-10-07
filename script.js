// Unsplash API Configuration
const UNSPLASH_ACCESS_KEY = '7UXWHSaRUs8GJsatZ82Xnh1PNbjF7Y6oTmEPc-XwOAk';
const UNSPLASH_API_URL = 'https://api.unsplash.com';

// State
let currentPage = 1;
let currentQuery = 'random';
let isLoading = false;

// DOM Elements
const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalAuthor = document.getElementById('modalAuthor');
const modalDescription = document.getElementById('modalDescription');
const modalLink = document.getElementById('modalLink');
const modalClose = document.querySelector('.modal-close');
const categoryBtns = document.querySelectorAll('.category-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAPIKey();
    loadPhotos();
    setupEventListeners();
});

// Check if API key is configured
function checkAPIKey() {
    if (UNSPLASH_ACCESS_KEY === 'YOUR_ACCESS_KEY') {
        gallery.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <h2 style="color: #f87171; margin-bottom: 20px;">⚠️ API Key Required</h2>
                <p style="color: #94a3b8; margin-bottom: 15px;">
                    Para usar esta galería, necesitas una API key de Unsplash.
                </p>
                <ol style="color: #94a3b8; text-align: left; max-width: 600px; margin: 0 auto; line-height: 1.8;">
                    <li>Ve a <a href="https://unsplash.com/developers" target="_blank" style="color: #6366f1;">unsplash.com/developers</a></li>
                    <li>Crea una cuenta o inicia sesión</li>
                    <li>Crea una nueva aplicación</li>
                    <li>Copia tu Access Key</li>
                    <li>Reemplaza 'YOUR_ACCESS_KEY' en script.js con tu key</li>
                </ol>
                <p style="color: #94a3b8; margin-top: 20px; font-size: 0.9rem;">
                    <strong>Nota:</strong> La API gratuita permite 50 requests por hora.
                </p>
            </div>
        `;
        loadMoreBtn.style.display = 'none';
        return false;
    }
    return true;
}

// Setup Event Listeners
function setupEventListeners() {
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        loadPhotos(false);
    });

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentQuery = btn.dataset.category;
            currentPage = 1;
            gallery.innerHTML = '';
            loadPhotos();
        });
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// Handle Search
function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
        currentQuery = query;
        currentPage = 1;
        gallery.innerHTML = '';
        categoryBtns.forEach(b => b.classList.remove('active'));
        loadPhotos();
    }
}

// Load Photos from Unsplash API
async function loadPhotos(showLoading = true) {
    if (!checkAPIKey() || isLoading) return;

    isLoading = true;
    if (showLoading) {
        loadingSpinner.classList.remove('hidden');
        loadMoreBtn.style.display = 'none';
    }

    try {
        let url;
        const perPage = 12;

        if (currentQuery === 'random') {
            url = `${UNSPLASH_API_URL}/photos/random?count=${perPage}&client_id=${UNSPLASH_ACCESS_KEY}`;
        } else {
            url = `${UNSPLASH_API_URL}/search/photos?query=${currentQuery}&page=${currentPage}&per_page=${perPage}&client_id=${UNSPLASH_ACCESS_KEY}`;
        }

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const photos = currentQuery === 'random' ? data : data.results;

        if (photos.length === 0) {
            if (currentPage === 1) {
                gallery.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                        <h2 style="color: #94a3b8;">No se encontraron fotos</h2>
                        <p style="color: #64748b;">Intenta con otra búsqueda</p>
                    </div>
                `;
            }
            loadMoreBtn.style.display = 'none';
        } else {
            displayPhotos(photos);
            loadMoreBtn.style.display = 'block';
        }
    } catch (error) {
        console.error('Error loading photos:', error);
        gallery.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <h2 style="color: #f87171;">Error al cargar fotos</h2>
                <p style="color: #94a3b8;">${error.message}</p>
                <p style="color: #64748b; margin-top: 10px;">
                    Verifica tu conexión a internet y tu API key.
                </p>
            </div>
        `;
    } finally {
        isLoading = false;
        loadingSpinner.classList.add('hidden');
    }
}

// Display Photos in Gallery
function displayPhotos(photos) {
    photos.forEach(photo => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = photo.urls.regular;
        img.alt = photo.alt_description || 'Photo';
        img.loading = 'lazy';

        const overlay = document.createElement('div');
        overlay.className = 'gallery-item-overlay';
        
        const author = document.createElement('div');
        author.className = 'gallery-item-author';
        author.textContent = `📷 ${photo.user.name}`;

        const description = document.createElement('div');
        description.className = 'gallery-item-description';
        description.textContent = photo.description || photo.alt_description || 'Sin descripción';

        overlay.appendChild(author);
        overlay.appendChild(description);
        galleryItem.appendChild(img);
        galleryItem.appendChild(overlay);

        // Click event to open modal
        galleryItem.addEventListener('click', () => openModal(photo));

        gallery.appendChild(galleryItem);
    });
}

// Open Modal
function openModal(photo) {
    modalImage.src = photo.urls.full;
    modalImage.alt = photo.alt_description || 'Photo';
    modalAuthor.textContent = `Fotografía por ${photo.user.name}`;
    modalDescription.textContent = photo.description || photo.alt_description || 'Sin descripción disponible';
    modalLink.href = photo.links.html;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Lazy loading optimization
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
}
