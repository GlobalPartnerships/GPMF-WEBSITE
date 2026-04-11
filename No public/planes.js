// Pricing Plans JavaScript
function togglePeriod(period) {
    const buttons = document.querySelectorAll('.toggle-btn');
    const prices = document.querySelectorAll('.plan-price');
    
    // Remove active class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to selected button
    if (period === 'monthly') {
        buttons[0].classList.add('active');
        // Update prices to monthly (default prices are already monthly)
        updatePrices('monthly');
    } else {
        buttons[1].classList.add('active');
        // Update prices to annual (20% discount)
        updatePrices('annual');
    }
}

function updatePrices(period) {
    const monthlyPrices = ['$500 USD', '$1,200 USD', '$2,500 USD', 'A medida'];
    const annualPrices = ['$400 USD', '$960 USD', '$2,000 USD', 'A medida'];
    
    const prices = document.querySelectorAll('.plan-price');
    const priceArray = period === 'monthly' ? monthlyPrices : annualPrices;
    
    prices.forEach((priceElement, index) => {
        if (index < priceArray.length) {
            const priceText = priceArray[index];
            const priceSpan = priceElement.querySelector('span');
            if (priceSpan && index < 3) { // Don't add "/mes" to "A medida"
                priceElement.innerHTML = priceText + '<span>/ mes</span>';
            } else {
                priceElement.textContent = priceText;
            }
        }
    });
}

function selectPlan(planName) {
    // Create a simple modal or redirect to contact
    const planInfo = {
        'explore': {
            name: 'Plan Explore',
            price: '$500 USD/mes',
            description: 'Ideal para diagnósticos iniciales'
        },
        'grow': {
            name: 'Plan Grow',
            price: '$1,200 USD/mes',
            description: 'Estrategia continua para crecimiento'
        },
        'expand': {
            name: 'Plan Expand',
            price: '$2,500 USD/mes',
            description: 'Programa integral de internacionalización'
        }
    };
    
    const selectedPlan = planInfo[planName];
    if (selectedPlan) {
        // You can customize this action - for now, redirect to diagnostic
        window.location.href = '../diagnostico.html?plan=' + planName;
    }
}

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Mobile services toggle
    const mobileServicesToggle = document.querySelector('.mobile-services-toggle');
    const mobileServicesPanel = document.querySelector('.mobile-services-panel');
    
    if (mobileServicesToggle && mobileServicesPanel) {
        mobileServicesToggle.addEventListener('click', function() {
            mobileServicesPanel.classList.toggle('hidden');
            // Toggle arrow rotation
            const arrow = mobileServicesToggle.querySelector('svg');
            if (arrow) {
                arrow.classList.toggle('rotate-180');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && !mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// Smooth scroll for anchor links
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
