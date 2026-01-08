/* Mobile Menu Toggle */
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/* Remove Menu Mobile on Link Click */
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* Smooth Scroll for Navigation Links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* Active Link on Scroll */
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 100,
            sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* Statistics Counter Animation */
const statNumbers = document.querySelectorAll('.stat__number');
let hasAnimated = false;

function animateStats() {
    const statsSection = document.querySelector('.stats');
    if (!statsSection || hasAnimated) return;

    const rect = statsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
        hasAnimated = true;
        statNumbers.forEach(stat => {
            const target = stat.textContent;
            const isPercentage = target.includes('%');
            const number = parseInt(target.replace(/\D/g, ''));
            const duration = 2000;
            const increment = number / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + (isPercentage ? '%' : '+');
                }
            }, 16);
        });
    }
}

window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);

/* Portfolio Hover Effect Enhancement */
const portfolioItems = document.querySelectorAll('.portfolio__item');
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.style.zIndex = '10';
    });
    item.addEventListener('mouseleave', function () {
        this.style.zIndex = '1';
    });
});

/* Testimonial Carousel */
const slides = document.querySelectorAll('.testimonial__card');
const dots = document.querySelectorAll('.testimonial__dot');
let currentSlide = 0;
const slideInterval = 5000; // 5 seconds

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    let next = currentSlide + 1;
    if (next >= slides.length) {
        next = 0;
    }
    showSlide(next);
}

// Auto play
let slideTimer = setInterval(nextSlide, slideInterval);

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(slideTimer);
        showSlide(index);
        slideTimer = setInterval(nextSlide, slideInterval);
    });
});

/* Reservation Interactive Assistant */

const assistantSteps = [
    {
        key: 'identity',
        type: 'contact-form',
        emoji: '👋',
        question: "Pour commencer, comment vous appelez-vous ?",
        subtitle: "Votre nom et prénom",
        fields: [
            { name: 'nom', label: 'Nom', placeholder: 'Dupont', type: 'text' },
            { name: 'prenom', label: 'Prénom', placeholder: 'Marie', type: 'text' }
        ],
        validate: (value) => {
            return value.nom && value.prenom && value.nom.length >= 2 && value.prenom.length >= 2;
        },
        error: "Merci d'indiquer votre nom et prénom.",
    },
    {
        key: 'phone',
        type: 'contact-form',
        emoji: '📱',
        question: "Quel est votre numéro WhatsApp ?",
        subtitle: "Pour vous recontacter facilement",
        fields: [
            { name: 'telephone', label: 'Téléphone', placeholder: '+237 6 50 68 00 11', type: 'tel' }
        ],
        validate: (value) => {
            const digits = (value.telephone || '').replace(/\D/g, '');
            return digits.length >= 8;
        },
        error: "Merci d'indiquer un numéro de téléphone valide.",
    },
    {
        key: 'eventType',
        type: 'qcm-single',
        emoji: '🎉',
        question: "Quel type d'événement préparez-vous ?",
        subtitle: "Sélectionnez une option",
        options: [
            {
                value: 'mariage',
                label: 'Mariage',
                icon: '💍',
                desc: 'Célébration de mariage',
                subOptions: [
                    { value: 'mairie', label: 'Mairie (État Civil)' },
                    { value: 'eglise', label: 'Église / Lieu de culte' },
                    { value: 'soiree', label: 'Soirée / Réception' }
                ]
            },
            { value: 'gala', label: 'Gala', icon: '✨', desc: 'Soirée de gala' },
            { value: 'seminaire', label: 'Séminaire', icon: '📊', desc: 'Événement professionnel' },
            { value: 'conference', label: 'Conférence', icon: '🎤', desc: 'Conférence ou colloque' },
            { value: 'anniversaire', label: 'Anniversaire', icon: '🎂', desc: 'Fête d\'anniversaire' },
            { value: 'lancement', label: 'Lancement produit', icon: '🚀', desc: 'Lancement de produit' },
            { value: 'autre', label: 'Autre', icon: '🎪', desc: 'Autre type d\'événement', hasInput: true, inputPlaceholder: "Précisez le type d'événement..." }
        ],
        validate: (value) => {
            return value && value.value;
        },
        error: "Veuillez sélectionner un type d'événement.",
    },

    {
        key: 'location',
        type: 'map-location',
        emoji: '📍',
        question: "Où aura lieu l'événement ?",
        subtitle: "Sélectionnez le lieu sur la carte ou saisissez l'adresse",
        validate: (value) => {
            return value && value.address && value.address.length >= 3;
        },
        error: "Veuillez sélectionner un lieu sur la carte ou saisir une adresse.",
    },
    {
        key: 'eventDate',
        type: 'date',
        emoji: '📅',
        question: "Quelle est la date prévue ?",
        subtitle: "Sélectionnez une date dans le calendrier",
        validate: (value) => {
            return value && value.length > 0;
        },
        error: "Veuillez sélectionner une date.",
    },
    {
        key: 'guestsCount',
        type: 'qcm-single',
        emoji: '👥',
        question: "Combien de participants attendez-vous ?",
        subtitle: "Sélectionnez une option",
        options: [
            { value: '0-50', label: 'Moins de 50 personnes' },
            { value: '51-100', label: '51 à 100 personnes' },
            { value: '101-200', label: '101 à 200 personnes' },
            { value: '201-500', label: '201 à 500 personnes' },
            { value: '500+', label: 'Plus de 500 personnes' },
            { value: 'autre', label: 'Autre', icon: '✏️', desc: 'Nombre spécifique', hasInput: true, inputPlaceholder: "Précisez le nombre..." }
        ],
        validate: (value) => {
            return value && value.value;
        },
        error: "Veuillez sélectionner le nombre de participants.",
    },

    {
        key: 'services',
        type: 'qcm-single',
        emoji: '✨',
        question: "Quels services souhaitez-vous que Nkàh Synergie prenne en charge ?",
        subtitle: "Sélectionnez une option",
        options: [
            { value: 'scenographie', label: 'Scénographie', icon: '🎨', desc: 'Décoration et aménagement' },
            { value: 'animation', label: 'Animation', icon: '🎭', desc: 'Animations et spectacles' },
            { value: 'logistique', label: 'Logistique', icon: '📦', desc: 'Coordination et logistique' },
            { value: 'traiteur', label: 'Traiteur', icon: '🍽️', desc: 'Service traiteur' },
            { value: 'communication', label: 'Communication', icon: '📢', desc: 'Communication et marketing' },
            { value: 'securite', label: 'Sécurité', icon: '🛡️', desc: 'Service de sécurité' },
            { value: 'autre', label: 'Autre', icon: '⚙️', desc: 'Autres services', hasInput: true, inputPlaceholder: "Précisez les services..." }
        ],
        validate: (value) => {
            return value && value.value;
        },
        error: "Veuillez sélectionner un service.",
    },
    {
        key: 'timeline',
        type: 'qcm-single',
        emoji: '⏰',
        question: "Dans quel délai souhaitez-vous organiser cet événement ?",
        subtitle: "Sélectionnez une option",
        options: [
            { value: '<1month', label: 'Moins d\'un mois' },
            { value: '1-3months', label: '1 à 3 mois' },
            { value: '3-6months', label: '3 à 6 mois' },
            { value: '6-12months', label: '6 à 12 mois' },
            { value: '12months+', label: 'Plus d\'un an' },
            { value: 'autre', label: 'Autre', icon: '✏️', desc: 'Date spécifique', hasInput: true, inputPlaceholder: "Précisez le délai..." }
        ],
        validate: (value) => {
            return value && value.value;
        },
        error: "Veuillez sélectionner un délai.",
    },
    {
        key: 'constraints',
        type: 'textarea',
        emoji: '📝',
        question: "Y a-t-il des attentes particulières ou contraintes ?",
        placeholder: "Ex : Soirée thématique cinéma, présence d'intervenants internationaux, contraintes techniques...",
        validate: () => true,
        error: "",
    },
    {
        key: 'budget',
        type: 'qcm-single',
        emoji: '💰',
        question: "Quelle est votre fourchette de budget ?",
        subtitle: "Sélectionnez une option",
        options: [
            { value: '<5000', label: 'Moins de 5 000 €' },
            { value: '5000-10000', label: '5 000 - 10 000 €' },
            { value: '10000-20000', label: '10 000 - 20 000 €' },
            { value: '20000-50000', label: '20 000 - 50 000 €' },
            { value: '50000+', label: 'Plus de 50 000 €' },
            { value: 'autre', label: 'Autre', icon: '✏️', desc: 'Budget spécifique', hasInput: true, inputPlaceholder: "Précisez votre budget..." }
        ],
        validate: (value) => {
            return value && value.value;
        },
        error: "Veuillez sélectionner une fourchette de budget.",
    },
];


// Render Functions (XyberClan Style)

function renderContactForm(step) {
    const container = document.createElement('div');
    container.className = 'contact-grid';

    const existingValue = assistantAnswers[step.key] || {};

    step.fields.forEach(field => {
        const input = document.createElement('input');
        input.className = 'xyber-input';
        input.type = field.type;
        input.id = `contact-${field.name}`;
        input.name = field.name;
        input.placeholder = field.placeholder;
        input.value = existingValue[field.name] || '';

        container.appendChild(input);
    });

    return container;
}

function renderQCMOptions(step) {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '1rem';

    const existingValue = assistantAnswers[step.key];
    const isMultiple = step.type === 'qcm-multiple' || step.type === 'checkbox';

    step.options.forEach(option => {
        const optionEl = document.createElement('div');
        optionEl.className = 'xyber-option';
        optionEl.dataset.value = option.value;

        // Check selection
        let isSelected = false;
        if (isMultiple && Array.isArray(existingValue)) {
            isSelected = existingValue.some(v => v.value === option.value);
        } else if (!isMultiple && existingValue) {
            isSelected = existingValue.value === option.value;
        }

        if (isSelected) optionEl.classList.add('selected');

        optionEl.innerHTML = `
            <div class="option-icon">${option.icon || '📝'}</div>
            <div class="option-label">${option.label}</div>
            <div class="option-check"></div>
        `;

        // Add input for "Autre"
        if (option.hasInput) {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'xyber-input';
            input.style.marginTop = '0.5rem';
            input.style.display = isSelected ? 'block' : 'none';
            input.placeholder = option.inputPlaceholder || 'Précisez...';
            input.dataset.optionValue = option.value;

            if (isSelected) {
                if (isMultiple) {
                    const val = existingValue.find(v => v.value === option.value);
                    if (val && val.text) input.value = val.text;
                } else {
                    if (existingValue.text) input.value = existingValue.text;
                }
            }

            input.addEventListener('click', e => e.stopPropagation());
            input.addEventListener('input', () => {
                if (!optionEl.classList.contains('selected')) {
                    optionEl.click();
                }
            });

            optionEl.appendChild(input);
        }

        // Add Sub-Options (Inline Checkboxes)
        if (option.subOptions) {
            const subContainer = document.createElement('div');
            subContainer.className = 'sub-options-container';
            subContainer.style.marginTop = '0.5rem';
            subContainer.style.display = isSelected ? 'flex' : 'none';
            subContainer.style.flexDirection = 'column';
            subContainer.style.gap = '0.5rem';
            subContainer.style.paddingLeft = '1rem';
            subContainer.style.borderLeft = '2px solid var(--first-color)';

            option.subOptions.forEach(subOpt => {
                const subLabel = document.createElement('label');
                subLabel.style.display = 'flex';
                subLabel.style.alignItems = 'center';
                subLabel.style.gap = '0.5rem';
                subLabel.style.cursor = 'pointer';
                subLabel.style.fontSize = '0.9rem';
                subLabel.style.color = 'var(--text-color-light)';

                const subCheck = document.createElement('input');
                subCheck.type = 'checkbox';
                subCheck.value = subOpt.value;
                subCheck.className = 'sub-option-check';

                // Restore state
                if (isSelected && existingValue && existingValue.subValues) {
                    if (existingValue.subValues.includes(subOpt.value)) {
                        subCheck.checked = true;
                    }
                }

                subCheck.addEventListener('click', e => e.stopPropagation()); // Prevent toggling parent

                subLabel.appendChild(subCheck);
                subLabel.appendChild(document.createTextNode(subOpt.label));
                subContainer.appendChild(subLabel);
            });

            optionEl.appendChild(subContainer);
        }

        optionEl.addEventListener('click', () => {
            if (isMultiple) {
                optionEl.classList.toggle('selected');
            } else {
                container.querySelectorAll('.xyber-option').forEach(el => {
                    el.classList.remove('selected');
                    // Hide other sub-options
                    const sub = el.querySelector('.sub-options-container');
                    if (sub) sub.style.display = 'none';
                    const inp = el.querySelector('input[type="text"]');
                    if (inp) inp.style.display = 'none';
                });
                optionEl.classList.add('selected');
            }

            const isSel = optionEl.classList.contains('selected');

            // Toggle Input
            const input = optionEl.querySelector('input[type="text"]');
            if (input) {
                input.style.display = isSel ? 'block' : 'none';
                if (isSel) input.focus();
            }

            // Toggle Sub-Options
            const subOps = optionEl.querySelector('.sub-options-container');
            if (subOps) {
                subOps.style.display = isSel ? 'flex' : 'none';
            }
        });

        container.appendChild(optionEl);
    });

    return container;
}

function renderTextarea(step) {
    const textarea = document.createElement('textarea');
    textarea.className = 'xyber-input xyber-textarea';
    textarea.placeholder = step.placeholder || '';
    textarea.value = assistantAnswers[step.key] || '';
    textarea.id = 'currentQuestionTextarea';
    return textarea;
}

function renderTextInput(step) {
    const input = document.createElement('input');
    input.className = 'xyber-input';
    input.type = 'text';
    input.placeholder = step.placeholder || '';
    input.value = assistantAnswers[step.key] || '';
    input.id = 'currentQuestionInput';
    return input;
}

function renderDateInput(step) {
    const container = document.createElement('div');
    container.className = 'date-input-container';

    const input = document.createElement('input');
    input.className = 'xyber-input xyber-date';
    input.type = 'date';
    input.id = 'currentQuestionDate';
    input.value = assistantAnswers[step.key] || '';

    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    input.min = today;

    container.appendChild(input);
    return container;
}

let mapInstance = null;
let markerInstance = null;

function renderMapInput(step) {
    const container = document.createElement('div');
    container.className = 'map-input-container';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '1rem';
    container.style.width = '100%';

    // Search Container
    const searchContainer = document.createElement('div');
    searchContainer.style.display = 'flex';
    searchContainer.style.gap = '0.5rem';

    // Address Input
    const input = document.createElement('input');
    input.className = 'xyber-input';
    input.type = 'text';
    input.id = 'currentQuestionLocation';
    input.placeholder = "Rechercher une ville, un quartier...";
    input.style.flex = '1';

    const savedValue = assistantAnswers[step.key];
    if (savedValue && savedValue.address) {
        input.value = savedValue.address;
    }

    // Search Button
    const searchBtn = document.createElement('button');
    searchBtn.className = 'xyber-search-btn';
    searchBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';
    searchBtn.title = "Rechercher";

    searchBtn.addEventListener('click', () => {
        const query = input.value.trim();
        if (query) searchLocation(query);
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission if any
            const query = input.value.trim();
            if (query) searchLocation(query);
        }
    });

    searchContainer.appendChild(input);
    searchContainer.appendChild(searchBtn);

    // Map Container
    const mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    mapDiv.style.height = '300px';
    mapDiv.style.width = '100%';
    mapDiv.style.borderRadius = '16px';
    mapDiv.style.zIndex = '1';

    container.appendChild(searchContainer);
    container.appendChild(mapDiv);

    // Initialize Map after a short delay to ensure container is in DOM
    setTimeout(() => {
        if (mapInstance) {
            mapInstance.remove();
            mapInstance = null;
        }

        // Default to Douala, Cameroon
        const defaultLat = 4.0511;
        const defaultLng = 9.7679;

        let lat = defaultLat;
        let lng = defaultLng;

        if (savedValue && savedValue.lat && savedValue.lng) {
            lat = savedValue.lat;
            lng = savedValue.lng;
        }

        mapInstance = L.map('map').setView([lat, lng], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(mapInstance);

        markerInstance = L.marker([lat, lng], { draggable: true }).addTo(mapInstance);

        // Update input on drag end
        markerInstance.on('dragend', async function (e) {
            const position = markerInstance.getLatLng();
            updateLocationFromCoords(position.lat, position.lng);
        });

        // Update marker on map click
        mapInstance.on('click', function (e) {
            markerInstance.setLatLng(e.latlng);
            updateLocationFromCoords(e.latlng.lat, e.latlng.lng);
        });

        // Try to get user location
        if (!savedValue && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                mapInstance.setView([userLat, userLng], 13);
                markerInstance.setLatLng([userLat, userLng]);
                updateLocationFromCoords(userLat, userLng);
            });
        }
    }, 100);

    return container;
}

async function updateLocationFromCoords(lat, lng) {
    const input = document.getElementById('currentQuestionLocation');
    // Simple reverse geocoding using Nominatim (OpenStreetMap)
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await response.json();
        if (data && data.display_name) {
            input.value = data.display_name;
        } else {
            input.value = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        }
    } catch (e) {
        console.error("Geocoding error:", e);
        input.value = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
}

async function searchLocation(query) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data && data.length > 0) {
            const result = data[0];
            const lat = parseFloat(result.lat);
            const lng = parseFloat(result.lon);

            if (mapInstance && markerInstance) {
                mapInstance.setView([lat, lng], 13);
                markerInstance.setLatLng([lat, lng]);
                // Update input with the full formatted address from the search result
                // or keep user query? Better to show what was found.
                // updateLocationFromCoords(lat, lng); // Optional: refine address
            }
        } else {
            alert("Lieu non trouvé. Essayez d'être plus précis (ex: 'Akwa, Douala').");
        }
    } catch (e) {
        console.error("Search error:", e);
        alert("Erreur lors de la recherche.");
    }
}

function collectCurrentAnswer(step) {
    if (step.type === 'contact-form') {
        const result = {};
        step.fields.forEach(field => {
            const input = document.getElementById(`contact-${field.name}`);
            if (input) result[field.name] = input.value.trim();
        });
        return result;
    } else if (step.type === 'qcm-multiple' || step.type === 'checkbox') {
        const selected = [];
        document.querySelectorAll('.xyber-option.selected').forEach(option => {
            const value = option.dataset.value;
            const input = option.querySelector('input[type="text"]');
            if (input) {
                selected.push({ value: value, text: input.value.trim() });
            } else {
                selected.push({ value: value });
            }
        });
        return selected;
    } else if (step.type === 'qcm-single' || step.type === 'dropdown') {
        const selectedOption = document.querySelector('.xyber-option.selected');
        if (!selectedOption) return null;

        const value = selectedOption.dataset.value;
        const input = selectedOption.querySelector('input[type="text"]');
        const subChecks = selectedOption.querySelectorAll('.sub-option-check:checked');

        const result = { value: value };

        if (input) {
            result.text = input.value.trim();
        }

        if (subChecks.length > 0) {
            result.subValues = Array.from(subChecks).map(c => c.value);
        }

        return result;
    } else if (step.type === 'textarea') {
        const textarea = document.getElementById('currentQuestionTextarea');
        return textarea ? textarea.value.trim() : '';
    } else if (step.type === 'text') {
        const input = document.getElementById('currentQuestionInput');
        return input ? input.value.trim() : '';
    } else if (step.type === 'date') {
        const input = document.getElementById('currentQuestionDate');
        return input ? input.value : '';
    } else if (step.type === 'map-location') {
        const input = document.getElementById('currentQuestionLocation');
        const address = input ? input.value.trim() : '';
        let lat = 4.0511;
        let lng = 9.7679;

        if (markerInstance) {
            const pos = markerInstance.getLatLng();
            lat = pos.lat;
            lng = pos.lng;
        }

        return { address, lat, lng };
    }
    return null;
}

function formatAnswerForDisplay(step, value) {
    if (!value) return '';
    if (step.type === 'contact-form') {
        if (value.nom && value.prenom) return `${value.nom} ${value.prenom}`;
        if (value.telephone) return value.telephone;
        return JSON.stringify(value);
    } else if ((step.type === 'qcm-multiple' || step.type === 'checkbox') && Array.isArray(value)) {
        return value.map(v => {
            const opt = step.options.find(o => o.value === v.value);
            return opt ? (v.text ? `${opt.label} (${v.text})` : opt.label) : v.value;
        }).join(', ');
    } else if ((step.type === 'qcm-single' || step.type === 'dropdown') && value) {
        const opt = step.options.find(o => o.value === value.value);
        let display = opt ? opt.label : value.value;

        if (value.text) {
            display += ` (${value.text})`;
        }

        if (value.subValues && value.subValues.length > 0 && opt.subOptions) {
            const subLabels = value.subValues.map(sv => {
                const subOpt = opt.subOptions.find(so => so.value === sv);
                return subOpt ? subOpt.label : sv;
            });
            display += ` : ${subLabels.join(', ')}`;
        }

        return display;
    }
    return value;
}

// Main Logic
let assistantCurrentStep = 0;
const assistantAnswers = {};

// DOM Elements
const stepIndicator = document.getElementById('current-step-num');
const totalStepsIndicator = document.getElementById('total-steps');
const stepEmoji = document.getElementById('step-emoji');
const stepQuestion = document.getElementById('step-question');
const stepSubtitle = document.getElementById('step-subtitle');
const stepContent = document.getElementById('step-content');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

function initReservation() {
    if (!stepContent) return; // Guard clause

    if (totalStepsIndicator) totalStepsIndicator.textContent = assistantSteps.length;
    renderCurrentStep();

    if (btnPrev) btnPrev.addEventListener('click', handlePrev);
    if (btnNext) btnNext.addEventListener('click', handleNext);
}

function handlePrev() {
    if (assistantCurrentStep > 0) {
        let prevStepIndex = assistantCurrentStep - 1;
        // Find the previous valid step (check conditions)
        while (prevStepIndex >= 0) {
            const step = assistantSteps[prevStepIndex];
            if (!step.condition || step.condition(assistantAnswers)) {
                break;
            }
            prevStepIndex--;
        }

        if (prevStepIndex >= 0) {
            assistantCurrentStep = prevStepIndex;
            renderCurrentStep();
        }
    }
}

function handleNext() {
    const step = assistantSteps[assistantCurrentStep];
    const answer = collectCurrentAnswer(step);

    if (step.validate(answer)) {
        // Save answer
        assistantAnswers[step.key] = answer;

        // Trigger Partial Send after Phone step (Identity is complete)
        if (step.key === 'phone') {
            sendDataToEmailJS('partial');
        }

        // Proceed to next step
        let nextStepIndex = assistantCurrentStep + 1;
        // Find the next valid step (check conditions)
        while (nextStepIndex < assistantSteps.length) {
            const nextStep = assistantSteps[nextStepIndex];
            if (!nextStep.condition || nextStep.condition(assistantAnswers)) {
                break;
            }
            nextStepIndex++;
        }

        if (nextStepIndex < assistantSteps.length) {
            assistantCurrentStep = nextStepIndex;
            renderCurrentStep();
        } else {
            showSummary();
            // Trigger Final Send automatically when summary is shown
            sendDataToEmailJS('final');
        }
    } else {
        // Shake animation
        const card = document.querySelector('.booking-card');
        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 500);

        // Optional: Show error message
        if (step.error) {
            alert(step.error); // Simple alert for now, can be improved
        }
    }
}

// --- EmailJS Automation Logic ---

// REMPLACER PAR VOS CLÉS EMAILJS
const EMAILJS_PUBLIC_KEY = 'MRhHHn7C14ROILaL_';
const EMAILJS_SERVICE_ID = 'service_kcoaqil';
const EMAILJS_TEMPLATE_ID = 'template_bzuoayp';

// Initialisation
(function () {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

async function sendDataToEmailJS(status) {
    // On n'envoie que le récapitulatif final avec EmailJS pour éviter les quotas
    if (status !== 'final') return;

    const statusEl = document.getElementById('webhook-status');
    if (!statusEl) {
        const summaryCard = document.querySelector('.assistant__summary-card');
        if (summaryCard) {
            const loader = document.createElement('div');
            loader.id = 'webhook-status';
            loader.innerHTML = '<p style="color: var(--xyber-accent); font-weight: 600;">⏳ Envoi du récapitulatif en cours...</p>';
            summaryCard.appendChild(loader);
        }
    }

    // Préparation des paramètres pour le template EmailJS
    const templateParams = {
        client_name: `${assistantAnswers.identity.nom} ${assistantAnswers.identity.prenom}`,
        client_phone: assistantAnswers.phone.telephone,
        event_type: assistantAnswers.eventType.value,
        event_subtypes: assistantAnswers.eventType.subValues ? assistantAnswers.eventType.subValues.join(', ') : 'N/A',
        event_date: assistantAnswers.eventDate,
        event_location: assistantAnswers.location.address,
        event_guests: assistantAnswers.guestsCount.value,
        event_services: assistantAnswers.services.value,
        event_budget: assistantAnswers.budget.value,
        event_constraints: assistantAnswers.constraints || 'Aucune',
        google_maps_link: `https://www.google.com/maps/search/?api=1&query=${assistantAnswers.location.lat},${assistantAnswers.location.lng}`
    };

    try {
        const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

        const statusIndicator = document.getElementById('webhook-status');
        if (response.status === 200) {
            if (statusIndicator) statusIndicator.innerHTML = '<p style="color: #28a745; font-weight: 700;">✅ Récapitulatif envoyé avec succès !</p>';
            console.log('Email sent successfully via EmailJS');
        } else {
            if (statusIndicator) statusIndicator.innerHTML = '<p style="color: #ff4444; font-weight: 700;">❌ Erreur lors de l\'envoi. Réessayez plus tard.</p>';
            console.error('EmailJS failed:', response);
        }
    } catch (error) {
        console.error('EmailJS Error:', error);
        const statusIndicator = document.getElementById('webhook-status');
        if (statusIndicator) statusIndicator.innerHTML = '<p style="color: #ff4444; font-weight: 700;">❌ Erreur de connexion au service d\'envoi.</p>';
    }
}

// Track abandonment (Désactivé pour EmailJS pour économiser les quotas, ou à adapter)
window.addEventListener('visibilitychange', () => {
    // On peut garder une trace console ou envoyer un événement analytics ici
});

function renderCurrentStep() {
    const step = assistantSteps[assistantCurrentStep];

    // Update Header
    if (stepIndicator) stepIndicator.textContent = assistantCurrentStep + 1;
    if (stepEmoji) stepEmoji.textContent = step.emoji;
    if (stepQuestion) stepQuestion.textContent = step.question;
    if (stepSubtitle) stepSubtitle.textContent = step.subtitle || '';

    // Update Navigation Buttons
    if (btnPrev) btnPrev.disabled = assistantCurrentStep === 0;
    if (btnNext) btnNext.textContent = assistantCurrentStep === assistantSteps.length - 1 ? 'Terminer' : 'Suivant';

    // Clear Content
    if (stepContent) {
        stepContent.innerHTML = '';

        let content;
        if (step.type === 'contact-form') {
            content = renderContactForm(step);
        } else if (step.type === 'qcm-multiple' || step.type === 'checkbox') {
            content = renderQCMOptions(step);
        } else if (step.type === 'qcm-single' || step.type === 'dropdown') {
            content = renderQCMOptions(step);
        } else if (step.type === 'textarea') {
            content = renderTextarea(step);
        } else if (step.type === 'text') {
            content = renderTextInput(step);
        } else if (step.type === 'date') {
            content = renderDateInput(step);
        } else if (step.type === 'map-location') {
            content = renderMapInput(step);
        }

        if (content) stepContent.appendChild(content);
    }
}

function showSummary() {
    // Hide navigation buttons
    if (btnPrev) btnPrev.style.display = 'none';
    if (btnNext) btnNext.style.display = 'none';
    if (stepIndicator) stepIndicator.style.display = 'none';

    // Update Header
    stepEmoji.textContent = '📋';
    stepQuestion.textContent = "Récapitulatif de votre projet";
    stepSubtitle.textContent = "Vérifiez les informations avant validation";

    // Format Contact
    const contactData = assistantAnswers.identity || {};
    const phoneData = assistantAnswers.phone || {};
    const contactString = `${contactData.nom || ''} ${contactData.prenom || ''}`.trim();
    const phoneString = phoneData.telephone || '';

    // Helper to find step by key
    const getStep = (key) => assistantSteps.find(s => s.key === key);

    // Prepare Data
    const summaryData = {
        contact: contactString,
        phone: phoneString,
        eventType: formatAnswerForDisplay(getStep('eventType'), assistantAnswers.eventType),
        location: assistantAnswers.location ? assistantAnswers.location.address : 'Non précisé',
        eventDate: assistantAnswers.eventDate || 'Non précisée',
        guestsCount: formatAnswerForDisplay(getStep('guestsCount'), assistantAnswers.guestsCount),
        services: formatAnswerForDisplay(getStep('services'), assistantAnswers.services),
        timeline: formatAnswerForDisplay(getStep('timeline'), assistantAnswers.timeline),
        constraints: assistantAnswers.constraints || 'Aucune',
        budget: formatAnswerForDisplay(getStep('budget'), assistantAnswers.budget)
    };

    stepContent.innerHTML = `
        <div class="summary-container">
            
            <!-- Section 1: Identification -->
            <div class="summary-section">
                <h3 class="summary-title">👤 Identification</h3>
                <div class="summary-row">
                    <div class="summary-item">
                        <span class="summary-label">Nom complet</span>
                        <span class="summary-value">${summaryData.contact}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Téléphone</span>
                        <span class="summary-value">${summaryData.phone}</span>
                    </div>
                </div>
            </div>

            <!-- Section 2: Type d'événement -->
            <div class="summary-section">
                <h3 class="summary-title">🎉 Type d'événement</h3>
                <div class="summary-row">
                    <div class="summary-item full-width">
                        <span class="summary-value highlight">${summaryData.eventType}</span>
                    </div>
                </div>
            </div>

            <!-- Section 3: Date et Lieu -->
            <div class="summary-section">
                <h3 class="summary-title">📍 Date et Lieu</h3>
                <div class="summary-row">
                    <div class="summary-item">
                        <span class="summary-label">Date</span>
                        <span class="summary-value">${summaryData.eventDate}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Lieu</span>
                        <span class="summary-value">${summaryData.location}</span>
                    </div>
                </div>
            </div>

            <!-- Section 4: Invités et Budget -->
            <div class="summary-section">
                <h3 class="summary-title">👥 Invités et Budget</h3>
                <div class="summary-row">
                    <div class="summary-item">
                        <span class="summary-label">Participants</span>
                        <span class="summary-value">${summaryData.guestsCount}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Budget</span>
                        <span class="summary-value">${summaryData.budget}</span>
                    </div>
                </div>
            </div>

            <!-- Section 5: Services et Délais -->
            <div class="summary-section">
                <h3 class="summary-title">✨ Services et Délais</h3>
                <div class="summary-row">
                    <div class="summary-item">
                        <span class="summary-label">Services</span>
                        <span class="summary-value">${summaryData.services}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Délai</span>
                        <span class="summary-value">${summaryData.timeline}</span>
                    </div>
                </div>
            </div>

            <!-- Section 6: Attentes -->
            <div class="summary-section">
                <h3 class="summary-title">📝 Attentes particulières</h3>
                <div class="summary-row">
                    <div class="summary-item full-width">
                        <span class="summary-value italic">${summaryData.constraints}</span>
                    </div>
                </div>
            </div>

        </div>

        <div style="margin-top: 2.5rem; text-align: center;">
            <div id="sending-indicator" class="sending-status">
                <span class="pulse-dot"></span>
                Envoi du dossier en cours...
            </div>
            <div id="sent-success" class="sending-status success" style="display: none;">
                ✅ Dossier envoyé à keuboufotsaw@gmail.com
            </div>
        </div>
    `;

    // Simulate sending delay for visual feedback (actual send happens in background via sendDataToWebhook)
    setTimeout(() => {
        const indicator = document.getElementById('sending-indicator');
        const success = document.getElementById('sent-success');
        if (indicator && success) {
            indicator.style.display = 'none';
            success.style.display = 'inline-flex';
        }
    }, 2000);
}

// Initialize
document.addEventListener('DOMContentLoaded', initReservation);
