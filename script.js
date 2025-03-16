document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const animeImage = document.getElementById('animeImage');
    const loader = document.getElementById('loader');

    const API_ENDPOINTS = [
        "https://api.waifu.pics/sfw/waifu",
        "https://api.waifu.im/search/?included_tags=waifu"
    ];

    async function generateImage() {
        try {
            // Show loader and hide current image
            loader.style.display = 'block';
            animeImage.style.display = 'none';
            generateBtn.disabled = true;

            // Choose random API endpoint
            const endpoint = API_ENDPOINTS[Math.floor(Math.random() * API_ENDPOINTS.length)];
            
            // Get image URL from API
            const response = await fetch(endpoint);
            const data = await response.json();
            
            // Extract image URL based on API endpoint
            const imageUrl = endpoint.includes('waifu.pics') 
                ? data.url 
                : data.images[0].url;

            // Load and display the image
            animeImage.onload = () => {
                loader.style.display = 'none';
                animeImage.style.display = 'block';
                generateBtn.disabled = false;
            };

            animeImage.src = imageUrl;

        } catch (error) {
            console.error('Error generating image:', error);
            loader.style.display = 'none';
            generateBtn.disabled = false;
            alert('Произошла ошибка при загрузке изображения. Пожалуйста, попробуйте снова.');
        }
    }

    generateBtn.addEventListener('click', generateImage);
    
    // Generate first image on page load
    generateImage();
});