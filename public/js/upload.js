document.addEventListener('DOMContentLoaded', () => {
    const uploadBtn = document.getElementById('upload-btn');
    const fileInput = document.getElementById('photo-upload');
  
    uploadBtn.addEventListener('click', () => {
      fileInput.click();
    });
  
    fileInput.addEventListener('change', async (event) => {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
  
        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
          });
  
          if (response.ok) {
            const data = await response.json();
            alert('Image uploaded successfully! URL: ' + data.url);
            // Here you might want to update the user's profile picture on the page
          } else {
            alert('Failed to upload image');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while uploading the image');
        }
      }
    });
  });