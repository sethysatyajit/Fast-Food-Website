document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Recipe card expansion
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    recipeCards.forEach(card => {
        const btn = card.querySelector('.btn-recipe');
        const details = card.querySelector('.recipe-details');
        
        btn.addEventListener('click', function() {
            details.classList.toggle('active');
            this.textContent = details.classList.contains('active') ? 'Hide Recipe' : 'View Recipe';
        });
    });
    
    // Calorie counter functionality
    const foodSearch = document.getElementById('food-search');
    const calorieResult = document.getElementById('calorie-result');
    
    // Create a map of food items and their calories
    const calorieMap = {
        'burger': 420,
        'veggie burger': 420,
        'pizza': 380,
        'veggie pizza': 380,
        'nuggets': 320,
        'veggie nuggets': 320,
        'hot dog': 290,
        'veggie hot dog': 290,
        'grilled cheese': 450,
        'veggie grilled cheese': 450,
        'ice cream': 240,
        'vegan ice cream': 240
    };
    
    foodSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        let resultHTML = '';
        
        if (searchTerm.length > 2) {
            for (const [food, calories] of Object.entries(calorieMap)) {
                if (food.includes(searchTerm)) {
                    resultHTML = `<p><strong>${food.charAt(0).toUpperCase() + food.slice(1)}:</strong> ${calories} calories per serving</p>`;
                    break;
                }
            }
            
            if (!resultHTML) {
                resultHTML = '<p>No matching food found. Try "burger", "pizza", etc.</p>';
            }
        } else {
            resultHTML = '<p>Search for a food to see its calorie content</p>';
        }
        
        calorieResult.innerHTML = resultHTML;
    });
    
    // Chatbot functionality
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const closeChatbot = document.querySelector('.close-chatbot');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSend = document.querySelector('.chatbot-input button');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    
    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.toggle('active');
    });
    
    closeChatbot.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
    });
    
    // Chatbot responses
    const botResponses = {
        'hello': 'Hello there! How can I help you with vegetarian fast food recipes today?',
        'hi': 'Hi! Ready to make some delicious veggie fast food?',
        'recipe': 'We have recipes for veggie burgers, pizzas, nuggets and more! Which one interests you?',
        'calories': 'You can check calories using our nutrition section or search for specific foods.',
        'healthy': 'All our recipes are plant-based and include nutrition information to help you make healthy choices.',
        'burger': 'For our veggie burger: 1) Cook patty 2) Toast bun 3) Add veggies and sauce. Full recipe is in the recipes section!',
        'pizza': 'Veggie pizza: 1) Preheat oven 2) Add sauce to dough 3) Add toppings 4) Bake at 425°F for 12-15 mins.',
        'video': 'Check our video section for tutorial videos on making veggie fast food!',
        'default': "I'm not sure I understand. You can ask me about recipes, calories, or healthy options."
    };
    
    // Function to add a message to the chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Function to get bot response
    function getBotResponse(userInput) {
        userInput = userInput.toLowerCase();
        
        for (const [keyword, response] of Object.entries(botResponses)) {
            if (userInput.includes(keyword)) {
                return response;
            }
        }
        
        return botResponses['default'];
    }
    
    // Send message when button is clicked
    chatbotSend.addEventListener('click', function() {
        const userInput = chatbotInput.value.trim();
        if (userInput) {
            addMessage(userInput, true);
            chatbotInput.value = '';
            
            // Simulate typing delay
            setTimeout(() => {
                const botResponse = getBotResponse(userInput);
                addMessage(botResponse);
            }, 500);
        }
    });
    
    // Send message when Enter is pressed
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            chatbotSend.click();
        }
    });
    
    // Add welcome message
    setTimeout(() => {
        addMessage("Hi there! I'm your VeggieFast assistant. Ask me about recipes, nutrition, or anything else!");
    }, 1000);
    
    // Scroll reveal animation
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });
    
    scrollReveal.reveal('.recipe-card, .video-card, .nutrition-card, .about-text, .icon-stat', {
        interval: 200
    });
    
    // Add animation to header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            header.style.padding = '20px 0';
        }
    });
});