document.addEventListener('DOMContentLoaded', () => {
    const stats = {
        annualCases: "1 Billion",
        deathsWorldwide: "290,000 - 650,000",
    };

    document.getElementById('annual-cases').textContent = stats.annualCases;
    document.getElementById('deaths-worldwide').textContent = stats.deathsWorldwide;


    const sections = document.querySelectorAll('main > section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });

        sections.forEach(section => {
            if (section.id === currentSection) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    });


    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    const symptomForm = document.getElementById('symptom-form');
    const checkButton = document.getElementById('check-button');
    const resultDiv = document.getElementById('result');

    checkButton.addEventListener('click', () => {
        const selectedSymptoms = [];
        symptomForm.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
            selectedSymptoms.push(checkbox.id);
        });

        let message = "Please select at least one symptom.";
        if (selectedSymptoms.length > 0) {
            const numSymptoms = selectedSymptoms.length;
            if (numSymptoms <= 2) {
                message = "You may have a mild cold or other minor illness. However, monitor your symptoms closely. If symptoms worsen, please consult a healthcare professional.";
            } else if (numSymptoms <= 5) {
                message = "You may have the flu or another viral infection. Consider contacting your doctor for advice.  It's important to stay hydrated and rest.";
            } else {
                message = "You may have the flu. Please consult a healthcare professional immediately.  Early diagnosis and treatment can help prevent complications.";
            }

            // Add disclaimer about not being medical advice
            message += "<br><br><b>Disclaimer: This symptom checker is for informational purposes only and does not provide medical advice.  Please consult a healthcare professional for diagnosis and treatment.</b>";
        }

        resultDiv.innerHTML = message; // Use innerHTML to render the HTML disclaimer
    });
    
});