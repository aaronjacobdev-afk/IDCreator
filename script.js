document.addEventListener('DOMContentLoaded', () => {
    const idForm = document.getElementById('idForm');
    const photoUpload = document.getElementById('photoUpload');
    const uploadText = document.getElementById('uploadText');
    const printBtn = document.getElementById('printBtn');

    // UI elements inside the ID Card
    const cardName = document.getElementById('cardName');
    const cardPhone = document.getElementById('cardPhone');
    const cardAddress = document.getElementById('cardAddress');
    const cardAadhar = document.getElementById('cardAadhar');
    const cardPan = document.getElementById('cardPan');
    const cardPhoto = document.getElementById('cardPhoto');

    let uploadedImageBase64 = '';
    let globalFirstName = 'User'; // Used for naming the downloaded file

    // Track Image upload and change label text / preview
    photoUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadText.textContent = file.name;
            
            const reader = new FileReader();
            reader.onload = function(event) {
                uploadedImageBase64 = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle Form Submission and populate Identity Card
    idForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop page reload

        // Extract values from form inputs
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const aadharNumber = document.getElementById('aadharNumber').value.trim();
        const panNumber = document.getElementById('panNumber').value.trim().toUpperCase();

        globalFirstName = firstName; // Save for download filename

        // Update ID Card Text nodes
        cardName.textContent = `${firstName} ${lastName}`;
        cardPhone.textContent = phone;
        cardAddress.textContent = address;
        cardAadhar.textContent = aadharNumber;
        cardPan.textContent = panNumber;

        // Apply profile image if successfully loaded
        if (uploadedImageBase64) {
            cardPhoto.src = uploadedImageBase64;
        }

        // Enable the Download Feature button
        printBtn.removeAttribute('disabled');
        printBtn.textContent = "Download ID Card (PNG)";

        // Add a subtle generation effect animation to the card
        const idCard = document.getElementById('idCard');
        idCard.style.transform = 'scale(1.03)';
        setTimeout(() => {
            idCard.style.transform = 'scale(1)';
        }, 300);
    });

    // Download Card as PNG Image Functionality
    printBtn.addEventListener('click', () => {
        const idCardElement = document.getElementById('idCard');
        
        // Options to ensure maximum crispness and quality
        const options = {
            scale: 2, // Doubles resolution for crisp text renders
            useCORS: true, // Permits rendering loaded profile images safely
            backgroundColor: null // Keeps original CSS background design intact
        };

        // Render the HTML element to a canvas graphic element
        html2canvas(idCardElement, options).then(canvas => {
            // Convert canvas rendering to a data URI image resource
            const imageURI = canvas.toDataURL('image/png');
            
            // Create a virtual anchor element to trigger download automatically
            const downloadLink = document.createElement('a');
            downloadLink.href = imageURI;
            downloadLink.download = `${globalFirstName}_ID_Card.png`;
            
            // Append link, trigger click event, then cleanup
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        });
    });
});
