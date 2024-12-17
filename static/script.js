document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const loading = document.getElementById("loading");
    const message = document.getElementById("message");
    const urlInput = document.getElementById("url");

    form.addEventListener("submit", function(event) {
        // Prevent form submission if the input is empty
        if (!urlInput.value.trim()) {
            alert("Veuillez entrer une URL YouTube.");
            event.preventDefault();
            return;
        }

        loading.style.display = "block";
        message.style.display = "none";

        event.preventDefault();
        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData,
        })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'video.mp4'; 
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            loading.style.display = "none";
            message.style.display = "block";
        })
        .catch(error => {
            console.error('Error:', error);
            loading.style.display = "none";
        });
    });
});