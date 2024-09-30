// const Book = require("../models/booksDb");

document.addEventListener('DOMContentLoaded', () => {
    const issueButtons = document.querySelectorAll('.issue-btn');
    
    issueButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const bookId = Number(event.target.getAttribute('data-id')); // Ensure bookId is a number
            console.log("CLICKED " + bookId);
            try {
                const response = await fetch(`/issueBook/${bookId}`, {
                    method: 'POST',
                });
                if (response.ok) {
                    event.target.disabled = true;
                    event.target.textContent = 'Issued';
                    alert("Your book issued successfully");
                    event.target.style.display='none';
                }
            } catch (e) {
                console.error(e);
            }
        });
    });
});
