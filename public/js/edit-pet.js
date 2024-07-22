
        const editForm = document.getElementById('edit-form');
        editForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const petId = event.target.getAttribute('data-pet-id');;
             // Replace with the actual pet ID you are editing
        const user_id = event.target.getAttribute('data-user-id');
        const updatePetData = new FormData(editForm);
        const updatedPet = {
            name: updatePetData.get('name'),
            type: updatePetData.get('type'),
            breed: updatePetData.get('breed'),
            age: parseInt(updatePetData.get('age')),
            gender: updatePetData.get('gender'),
            bio: updatePetData.get('bio')
        };
    
            try {
                const response = await fetch(`/edit-pet/${petId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedPet),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to update pet');
                }
    
                alert('Pet updated successfully');
                window.location.href = `/home/${user_id}/${petId}`
                // Optionally redirect to another page or update UI
            } catch (error) {
                console.error('Error updating pet:', error);
                alert('Failed to update pet. Please try again.');
            }
        });
  