// Subscription plans data
const subscriptionPlans = {
    basic: {
        name: "Basic",
        price: 0,
        period: "forever",
        features: [
            "1 Resume Template",
            "PDF Downloads",
            "Basic Content Suggestions",
            "Email Support"
        ]
    },
    pro: {
        name: "Pro",
        price: 12,
        period: "monthly",
        trial: true,
        features: [
            "All Premium Templates",
            "Multiple Export Formats",
            "Advanced AI Content Suggestions",
            "Cover Letter Builder",
            "Multiple Resume Versions",
            "Priority Support"
        ]
    },
    enterprise: {
        name: "Enterprise",
        price: 29,
        period: "monthly",
        custom: true,
        features: [
            "Everything in Pro",
            "Career Coaching Session",
            "LinkedIn Profile Optimization",
            "Interview Preparation Tools",
            "Dedicated Account Manager"
        ]
    }
};

// Handle subscription button clicks
function handleSubscription(plan) {
    const selectedPlan = subscriptionPlans[plan];
    
    if (plan === 'basic') {
        // Free plan - just create account
        createFreeAccount();
    } 
    else if (plan === 'pro') {
        // Show pro subscription form with trial option
        showSubscriptionForm(selectedPlan);
    } 
    else if (plan === 'enterprise') {
        // Show enterprise contact form
        showEnterpriseForm(selectedPlan);
    }
}

// Show subscription form in modal
function showSubscriptionForm(plan) {
    const modal = document.getElementById('subscriptionModal');
    const modalContent = document.getElementById('modalContent');
    
    let formHTML = `
        <h3>Subscribe to ${plan.name} Plan</h3>
        <p>$${plan.price}/month ${plan.trial ? 'with 7-day free trial' : ''}</p>
        
        <form class="subscription-form" onsubmit="processSubscription(event, '${plan.name.toLowerCase()}')">
            <input type="email" placeholder="Email Address" required>
            <input type="text" placeholder="Full Name" required>
            <input type="tel" placeholder="Phone Number">
            
            <div class="payment-section">
                <h4>Payment Information</h4>
                <input type="text" placeholder="Card Number" required>
                <div style="display: flex; gap: 1rem;">
                    <input type="text" placeholder="MM/YY" required>
                    <input type="text" placeholder="CVC" required>
                </div>
            </div>
            
            <button type="submit">Start ${plan.trial ? 'Free Trial' : 'Subscription'}</button>
        </form>
    `;
    
    modalContent.innerHTML = formHTML;
    modal.style.display = 'block';
}

// Show enterprise contact form
function showEnterpriseForm(plan) {
    const modal = document.getElementById('subscriptionModal');
    const modalContent = document.getElementById('modalContent');
    
    let formHTML = `
        <h3>${plan.name} Plan Inquiry</h3>
        <p>Our team will contact you to discuss enterprise options.</p>
        
        <form class="subscription-form" onsubmit="processEnterpriseContact(event)">
            <input type="text" placeholder="Company Name" required>
            <input type="email" placeholder="Work Email" required>
            <input type="text" placeholder="Full Name" required>
            <input type="tel" placeholder="Phone Number" required>
            <textarea placeholder="Tell us about your needs..." rows="4"></textarea>
            
            <button type="submit">Contact Sales</button>
        </form>
    `;
    
    modalContent.innerHTML = formHTML;
    modal.style.display = 'block';
}

// Process subscription form
function processSubscription(event, plan) {
    event.preventDefault();
    
    // In a real app, you would integrate with Stripe or other payment processor here
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());
    
    // Simulate API call
    setTimeout(() => {
        // Store subscription in localStorage
        localStorage.setItem('subscription', JSON.stringify({
            plan: plan,
            status: 'active',
            trial: plan === 'pro',
            expiry: plan === 'pro' ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() : null
        }));
        
        closeModal();
        alert(`Success! Your ${plan} subscription is now active.`);
        updateUIForSubscription();
    }, 1000);
}

// Process enterprise contact form
function processEnterpriseContact(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const contactData = Object.fromEntries(formData.entries());
    
    // Simulate API call
    setTimeout(() => {
        closeModal();
        alert('Thank you! Our sales team will contact you within 24 hours.');
    }, 1000);
}

// Create free account
function createFreeAccount() {
    localStorage.setItem('subscription', JSON.stringify({
        plan: 'basic',
        status: 'active'
    }));
    
    alert('Your free account is ready! Start building your resume.');
    updateUIForSubscription();
}

// Close modal
function closeModal() {
    document.getElementById('subscriptionModal').style.display = 'none';
}

// Update UI based on subscription status
function updateUIForSubscription() {
    const subscription = JSON.parse(localStorage.getItem('subscription'));
    
    if (subscription) {
        // Hide pricing section if user is subscribed
        document.getElementById('pricing').style.display = 'none';
        
        // Show user's current plan in header
        const planIndicator = document.createElement('div');
        planIndicator.className = 'current-plan';
        planIndicator.textContent = `${subscription.plan} Plan`;
        document.querySelector('header').appendChild(planIndicator);
    }
}

// Check subscription status on page load
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('subscription')) {
        updateUIForSubscription();
    }
});