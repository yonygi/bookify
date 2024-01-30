// fullpage
new fullpage('#fullpage', {
    navigation: true,
    responsiveWidth: 700,
    anchors: ['home-page', 'library-page', 'stats-page', 'inventory-page', 'newsletter-page'],
    parallax: true,
    onLeave: function (origin, destination, direction) {
        console.log("Leaving section" + origin.index);
    },

    // animations
    afterLoad: function (origin, destination, direction) {

        if (destination.index == 0) {
            anime({
                targets: '.image, .content',
                translateX: 0,
                opacity: [0, 1],
                delay: anime.stagger(200, { start: 500 })
            });


        } else if (destination.index == 1) {
            anime({
                targets: 'h1, .search-box-container, .card',
                translateX: 0,
                opacity: [0, 1],
                delay: anime.stagger(200, { start: 500 })
            });


        } else if (destination.index == 2) {
            anime({
                targets: 'h1,#myBarChart',
                translateX: 0,
                opacity: [0, 1],
                delay: anime.stagger(200, { start: 500 })
            });


        } else if (destination.index == 3) {
            anime({
                targets: 'h1,#libraryTable',
                translateX: 0,
                opacity: [0, 1],
                delay: anime.stagger(200, { start: 500 })
            });


        } else if (destination.index == 4) {
            anime({
                targets: '.newsletter, .footer',
                translateX: 0,
                opacity: [0, 1],
                delay: anime.stagger(200, { start: 500 })
            });
        }
    }
});

// chart js
const data = {
    labels: ['Fantasy', 'Science Fiction', 'Mystery', 'Thriller', 'Romance', 'Non-Fiction', 'Bio and Memoirs'],
    datasets: [{
        label: 'Number of Books',
        data: [12, 19, 3, 5, 2, 3, 15],
        backgroundColor: 'rgba(241,175,186, 0.2)',
        borderColor: 'rgba(241,175,186, 1)',
        borderWidth: 1
    }]
};

const options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

const ctx = document.getElementById('myBarChart').getContext('2d');

const myBarChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
});

// datatable js
$(document).ready(function () {
    const libraryData = [
        ["The Hobbit", "J.R.R. Tolkien", "Fantasy", 1937, "Hardcover"],
        ["Harry Potter and the Sorcerer's Stone", "J.K. Rowling", "Fantasy", 1997, "Paperback"],
        ["To Kill a Mockingbird", "Harper Lee", "Drama", 1960, "e-book"],
        ["1984", "George Orwell", "Dystopian", 1949, "Audio"],
        ["The Da Vinci Code", "Dan Brown", "Mystery", 2003, "Paperback"],
        ["Life of Pi", "Yann Martel", "Adventure Fiction", 2001, "Paperback"],
        ["Fahrenheit 451", "Ray Bradbury", "Dystopian Fiction", 1953, "Audio"],
        ["Animal Farm", "George Orwell", "Political Satire", 1945, "Hardcover"],
        ["Becoming", "Michelle Obama", "Autobiography", 2018, "e-book"],
        ["Brave New World", "Aldous Huxley", "Dystopian", 1932, "Hardcover"],
        ["6 Silly Dinosaurs", "Adam Guillain", "Early Literacy 4-6", 2024, "Paperback"],
        ["Welcome to the Hyunam-Dong Bookshop", "Hwang Boreum", "Literary Fiction", 2023, "Paperback"],
        ["The Purple Book", "Rice Broocks", "Non Fiction", 2017, "Paperback"],
        ["Book of Night", "Holly Black", "Thriller", 2022, "Hardcover"],
        ["The Sun is Missing", "Deepa Ramanathan", "Adventure for Children", 2023, "Paperback"],
        ["The Covenant of Water", "Abraham Verghese", "Fiction", 2023, "e-book"],
        ["Ikigai", "Hector Garcia", "Self-help", 2023, "Hardcover"],
        ["The 12 Week Year", "Brian P. Morgan", "Dissertation", 2013, "Paperback"],
        ["If Cats Disappeared From The World", "Genki Kawamura", "Literature", 2018, "Audio"],
        ["The Selection", "Kiera Cass", "Romance", 2012, "Paperback"],
    ];

    const tableBody = $("#libraryTable tbody");

    for (const book of libraryData) {
        const row = $("<tr>");
        for (const value of book) {
            const cell = $("<td>").text(value);
            row.append(cell);
        }
        tableBody.append(row);
    }

    $('#libraryTable').DataTable();

});

// search function
function filterBooks() {
    var searchInput = document.getElementById('search-box').value.toLowerCase();
    var cards = document.querySelectorAll('.carousel-item .card');

    cards.forEach(function (card) {
        var title = card.querySelector('.card-title').innerText.toLowerCase();
        var author = card.querySelector('.author').innerText.toLowerCase();
        var description = card.getAttribute('data-description').toLowerCase();

        if (title.includes(searchInput) || author.includes(searchInput) || description.includes(searchInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// modal
function showBookDescription(bookTitle) {
    var modal = new bootstrap.Modal(document.getElementById('bookModal'));
    var modalDescription = document.getElementById('bookDescription');
    var description = getBookDescription(bookTitle);
    modalDescription.innerHTML = description;
    modal.show();
}

function getBookDescription(bookTitle) {
    switch (bookTitle) {
        case 'Book of Night':
            return "When a terrible figure from her past returns, Charlie descends into a maelstrom of murder and lies. Determined to survive, she's up against a cast of doppelgangers, mercurial billionaires, gloamists, and the people she loves best in the world—all trying to steal a secret that will give them vast and terrible power.";
        case 'The Comfort Book':
            return "The Comfort Book by Matt Haig is a collection of essays that offer a sense of solace during difficult times. It includes personal anecdotes, quotes, and wisdom that remind us of the beauty and hope in life.";
        case 'The Hobbit':
            return "The Hobbit is set in Middle-earth and follows home-loving Bilbo Baggins, the hobbit of the title, who joins the wizard Gandalf and the thirteen dwarves of Thorin's Company, on a quest to reclaim the dwarves' home and treasure from the dragon Smaug.";
        case 'Becoming':
            return "'Becoming' by Michelle Obama is an inspiring memoir of her life journey from the South Side of Chicago to the White House as the first African American First Lady of the United States. It is a story of resilience, determination and grace.";
        case 'Almond: A Novel':
            return "ALMOND is a book about a young Korean boy with underdeveloped amygdalae, leading to a condition called 'alexithymia,' which is a brain disorder in which a person can't really identify with or even experience emotions in a normal way (their own or others).";
        case 'The 12 Week Year':
            return "The 12 Week Year by Brian P. Moran and Michael Lennington is a guide to achieving great results in a short amount of time by focusing on 12-week cycles instead of yearly goals. It provides actionable advice on prioritization, goal setting, and execution.";
        case 'Ikigai':
            return "'Ikigai' by Hector Garcia and Francesc Miralles explores the Japanese concept of finding one's purpose in life by analyzing the habits and beliefs of the world's longest-living people. Through case studies, the book offers practical insights on how to live a more fulfilling life.";
        case 'Holly':
            return "In King's new novel, Holly is on her own, and up against a pair of unimaginably depraved and brilliantly disguised adversaries. When Penny Dahl calls the Finders Keepers detective agency hoping for help locating her missing daughter, Holly is reluctant to accept the case. Her partner, Pete, has Covid.";
        case 'Icebreakers':
            return "Icebreaker by Hannah Grace follows Anastasia Allen, an aspiring Olympic ice skater, after an incident at college forces her to share an ice rink with the hockey team. When Anastasia's partner is injured, she must team up with Nathan Hawkins, the annoying hockey team captain in order to train for a competition.";
        case 'Life of Pi':
            return "After deciding to sell their zoo in India and move to Canada, Santosh and Gita Patel board a freighter with their sons and a few remaining animals. Tragedy strikes when a terrible storm sinks the ship, leaving the Patels' teenage son, Pi (Suraj Sharma), as the only human survivor. However, Pi is not alone; a fearsome Bengal tiger has also found refuge aboard the lifeboat. As days turn into weeks and weeks drag into months, Pi and the tiger must learn to trust each other if both are to survive.";
        case 'Animal Farm':
            return "Animal Farm depicts a group of animals who rebel against humans and become their own masters. Things work smoothly at first, and the animals revel in their freedom and have equality. However, the pigs become power-hungry and become the new oppressors of the animals and become indistinguishable from humans.";
        case 'Brave New World':
            return "The novel examines a futuristic society, called the World State, that revolves around science and efficiency. In this society, emotions and individuality are conditioned out of children at a young age, and there are no lasting relationships because 'every one belongs to every one else' (a common World State dictum).";
        default:
            return "No description available";
    }
}

// reservation of books
function reserveBook(bookId, event) {
    event.preventDefault();

    event.stopPropagation();

    var reserveButton = document.getElementById(bookId + '-reserve-btn');
    if (reserveButton.innerText === 'Reserve') {
        reserveButton.innerText = 'Reserved';
        reserveButton.disabled = true;
        alert('Book reserved successfully!');
    }
}