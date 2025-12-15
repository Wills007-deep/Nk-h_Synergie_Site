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
const assistantMessages = document.getElementById('assistantMessages');
const assistantForm = document.getElementById('assistantForm');
const assistantInput = document.getElementById('assistantInput');
const assistantProgress = document.getElementById('assistantProgress');
const assistantWhatsappBtn = document.getElementById('assistantWhatsappBtn');
const assistantPrevBtn = document.getElementById('assistantPrev');

const assistantSteps = [
    {
        key: 'contact',
        question: "Pour commencer, pouvez-vous indiquer votre nom complet et votre numéro WhatsApp ?",
        placeholder: "Ex : Marie Dupont, +237 6 50 68 00 11",
        validate: (value) => {
            const hasName = value.trim().split(/\s+/).length >= 2;
            const digits = value.replace(/\D/g, '');
            const hasPhoneLike = digits.length >= 8;
            return hasName && hasPhoneLike;
        },
        error: "Merci d'indiquer à la fois votre nom complet et un numéro WhatsApp (avec suffisamment de chiffres).",
    },
    {
        key: 'eventType',
        question: "Merci ! Quel type d'événement préparez-vous ? (mariage, gala, séminaire, anniversaire, ...)",
        placeholder: "Ex : Gala d'entreprise",
        validate: (value) => {
            const v = value.trim();
            return v.length >= 5;
        },
        error: "Ajoutez quelques mots pour décrire votre événement (ex : mariage, gala d'entreprise, séminaire...).",
    },
    {
        key: 'dateLocation',
        question: "Avez-vous déjà une date et un lieu en tête ? Précisez la ville et la période souhaitée.",
        placeholder: "Ex : Juin 2025, Douala ou Yaoundé",
        validate: (value) => {
            const v = value.trim();
            return v.length >= 5;
        },
        error: "Indiquez au moins une ville ou une période approximative (ex : Juin 2025 à Douala).",
    },
    {
        key: 'guestsBudget',
        question: "Combien de participants attendez-vous et quelle fourchette de budget visez-vous ?",
        placeholder: "Ex : 150 personnes, budget 8 000 - 10 000 €",
        validate: (value) => {
            // On demande au moins un nombre dans la réponse
            return /\d/.test(value);
        },
        error: "Ajoutez au moins un nombre de participants ou une idée de budget.",
    },
    {
        key: 'services',
        question: "Quels services souhaitez-vous que Nkàh Synergie prenne en charge ? (scénographie, animation, logistique, communication, ...)",
        placeholder: "Ex : Scénographie, animation, coordination jour J",
        validate: (value) => {
            const v = value.trim();
            return v.length >= 5;
        },
        error: "Citez au moins un service souhaité (ex : décoration, animation, logistique...).",
    },
    {
        key: 'constraints',
        question: "Y a-t-il des attentes particulières ou contraintes (thème, timing, invités VIP, contraintes techniques, ... ) ?",
        placeholder: "Ex : Soirée thématique cinéma, présence d'intervenants internationaux",
        validate: () => true,
        error: "",
    },
];

let assistantCurrentStep = 0;
const assistantAnswers = {};

function createMessage(content, from = 'bot') {
    if (!assistantMessages) return;
    const wrapper = document.createElement('div');
    wrapper.className = `assistant__message assistant__message--${from}`;

    const bubble = document.createElement('div');
    bubble.className = `assistant__bubble assistant__bubble--${from}`;
    bubble.textContent = content;

    const meta = document.createElement('div');
    meta.className = 'assistant__meta';
    meta.textContent = from === 'bot' ? 'Nkàh Bot' : 'Vous';

    wrapper.appendChild(bubble);
    wrapper.appendChild(meta);
    assistantMessages.appendChild(wrapper);
    assistantMessages.scrollTop = assistantMessages.scrollHeight;
}

function updateAssistantProgress() {
    if (!assistantProgress) return;
    const percent = ((assistantCurrentStep) / (assistantSteps.length + 1)) * 100;
    assistantProgress.style.width = `${Math.min(percent, 100)}%`;
}

function highlightAssistantStep(index) {
    const stepItems = document.querySelectorAll('.assistant__steps-list li');
    stepItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function renderCurrentStep() {
    if (!assistantMessages) return;

    if (!assistantSteps[assistantCurrentStep]) {
        const summaryLines = [
            "Récapitulatif de votre projet :",
            "——————————————",
            `Type d'événement : ${assistantAnswers.eventType || '—'}`,
            `Date / Lieu : ${assistantAnswers.dateLocation || '—'}`,
            `Invités & budget : ${assistantAnswers.guestsBudget || '—'}`,
            '',
            "Services & attentes :",
            `Services souhaités : ${assistantAnswers.services || '—'}`,
            `Attentes / contraintes : ${assistantAnswers.constraints || '—'}`,
            '',
            "Coordonnées :",
            `Nom & WhatsApp : ${assistantAnswers.contact || '—'}`,
            '',
            "Notre équipe vous recontactera pour transformer ce brief en devis personnalisé.",
        ];
        const summaryText = summaryLines.join('\n');
        assistantMessages.innerHTML = '';
        createMessage(summaryText, 'bot');
        updateAssistantProgress();
        // index 6 = rubrique "Récapitulatif" dans la sidebar
        highlightAssistantStep(6);
        if (assistantInput) {
            assistantInput.disabled = true;
        }
        const submitButton = document.querySelector('.assistant__button');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Merci !';
        }

        // Préparer le lien WhatsApp avec le récapitulatif
        if (assistantWhatsappBtn) {
            const whatsappNumber = '237650680011'; // numéro de l'agence sans espaces ni +
            const encodedText = encodeURIComponent(summaryText);
            assistantWhatsappBtn.href = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
            assistantWhatsappBtn.style.display = 'inline-flex';
        }
        if (assistantPrevBtn) {
            assistantPrevBtn.disabled = true;
        }
        return;
    }

    const step = assistantSteps[assistantCurrentStep];
    assistantMessages.innerHTML = '';
    createMessage(step.question, 'bot');

    const existingValue = assistantAnswers[step.key];
    if (assistantInput) {
        assistantInput.value = existingValue || '';
        assistantInput.placeholder = step.placeholder || '';
        assistantInput.focus();
    }
    if (existingValue) {
        createMessage(existingValue, 'user');
    }

    highlightAssistantStep(assistantCurrentStep);
    updateAssistantProgress();

    if (assistantPrevBtn) {
        assistantPrevBtn.disabled = assistantCurrentStep === 0;
    }
}

if (assistantForm && assistantMessages && assistantInput) {
    createMessage("Bonjour, je suis Nkàh Bot. Je vais vous poser quelques questions pour préparer un devis sur-mesure.", 'bot');
    createMessage("Répondez librement, cela ne prend que 2 à 3 minutes.", 'bot');
    renderCurrentStep();

    assistantForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const value = assistantInput.value.trim();
        if (!value) return;

        const step = assistantSteps[assistantCurrentStep];
        if (step && typeof step.validate === 'function' && !step.validate(value)) {
            // Réponse invalide : le robot interpelle le client
            createMessage(value, 'user');
            if (step.error) {
                createMessage(step.error, 'bot');
            } else {
                createMessage("La réponse me semble incomplète. Pourriez-vous préciser un peu plus ?", 'bot');
            }
            assistantInput.focus();
            return;
        }

        const currentKey = step.key;
        assistantAnswers[currentKey] = value;
        createMessage(value, 'user');

        assistantCurrentStep += 1;
        setTimeout(() => {
            renderCurrentStep();
        }, 300);
    });

    if (assistantPrevBtn) {
        assistantPrevBtn.addEventListener('click', () => {
            if (assistantCurrentStep > 0) {
                assistantCurrentStep -= 1;
                renderCurrentStep();
            }
        });
    }
}
