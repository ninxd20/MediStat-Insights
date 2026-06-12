document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-upload");
    const fileNameDisplay = document.getElementById("file-name");
    const resultText = document.getElementById("result");
    const historyList = document.getElementById("history-list");

    // --- 1. COUNTER ANIMATION LOGIC ---
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        
        const updateCount = () => {
            const count = +counter.innerText;
            if(count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + (counter.innerText.includes('%') ? '%' : '');
            }
        };
        updateCount();
    });

    // --- 2. RANDOM DATA GENERATOR FOR HISTORY ---
    const generateFakeHistory = () => {
        const statuses = ['Parasitized', 'Uninfected'];
        let html = '';
        
        // Create 6 fake patients
        for(let i=1; i<=6; i++) {
            const id = `PID-${Math.floor(Math.random() * 9000) + 1000}`;
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const conf = (Math.random() * (99 - 85) + 85).toFixed(2); // Random confidence 85-99%
            const cssClass = status === 'Parasitized' ? 'status-infected' : 'status-clean';
            
            // This adds the click event to load this data into the main result box
            html += `
            <li class="history-item" onclick="loadFakeResult('${id}', '${status}', '${conf}')">
                <span class="history-id">${id}</span>
                <span class="history-status ${cssClass}">${status}</span>
            </li>`;
        }
        historyList.innerHTML = html;
    };

    // Expose function to global scope so HTML onClick can see it
    window.loadFakeResult = function(id, status, conf) {
        const color = status === "Parasitized" ? "#ff4081" : "#28a745";
        const icon = status === "Parasitized" ? '<i class="fa-solid fa-triangle-exclamation"></i>' : '<i class="fa-solid fa-check-circle"></i>';
        
        resultText.innerHTML = `
            <div style="animation: fadeInUp 0.5s ease;">
                <p style="color: #ccc; font-size: 0.9rem;">Retrieving Record: <strong>${id}</strong>...</p>
                <hr style="border-color: #333; margin: 10px 0;">
                ${icon} Diagnosis: <strong style="color: ${color}; font-size: 1.4rem;">${status}</strong>
                <br>
                <span style="font-size: 0.9rem; color: #ccc;">Archived Confidence: ${conf}%</span>
            </div>
        `;
    };

    // Initialize History
    generateFakeHistory();


    // --- 3. ACTUAL UPLOAD LOGIC (Kept from before) ---
    if(fileInput) {
        fileInput.addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (!file) return;
        
            fileNameDisplay.textContent = `Analying: ${file.name}`;
            resultText.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin" style="font-size: 2rem; color: var(--accent-color);"></i><br><br>AI Processing...';
        
            const formData = new FormData();
            formData.append("image", file);
        
            fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                body: formData
            })
            .then(response => {
                if (!response.ok) throw new Error("Server Error");
                return response.json();
            })
            .then(data => {
                if(data.error) throw new Error(data.error);

                const confidence = (data.confidence * 100).toFixed(2);
                const color = data.result === "Parasitized" ? "#ff4081" : "#28a745";
                const icon = data.result === "Parasitized" ? '<i class="fa-solid fa-triangle-exclamation"></i>' : '<i class="fa-solid fa-check-circle"></i>';
        
                resultText.innerHTML = `
                    <div style="margin-top: 15px; animation: fadeInUp 0.5s ease;">
                        ${icon} New Scan: <strong style="color: ${color}; font-size: 1.4rem;">${data.result}</strong>
                        <br>
                        <span style="font-size: 0.9rem; color: #ccc;">Live AI Confidence: ${confidence}%</span>
                    </div>
                `;
            })
            .catch(error => {
                console.error("Fetch Error:", error);
                resultText.innerHTML = `<span style="color: red;">Analysis Failed. Ensure Backend is running.</span>`;
            });
        });
    }
});