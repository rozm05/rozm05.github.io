document.addEventListener("DOMContentLoaded", function () {
    const gameContainer = document.getElementById("game-container");

    const cards = [
        "icons/art.png", "icons/octopus.png", "icons/pear.png", "icons/sea.png",
        "icons/space.png", "icons/tree.png", "icons/umbrella.png"
    ];

    const codeForCard = [
        "art", "octopus", "pear", "sea", "space", "tree", "umbrella"
    ];

    let selectedCards = [];
    let cardFlipped = 0;
    let isFlipped = false;

    shuffleArray(cards);
    createGameBoard(cards);

    function createGameBoard(cards) {
        let shuffledCards = [...cards, ...cards];
    
        shuffledCards.forEach((_card, index) => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");
            cardElement.style.backgroundImage = `url(icons/puzzle.png)`;
            cardElement.setAttribute("data-index", index);
            cardElement.setAttribute("data-code", index % cards.length);
            cardElement.addEventListener("click", handleCardClick);
            gameContainer.appendChild(cardElement);
        });
    }

    function handleCardClick() {
        const clickedCard = this;

        if (isFlipped || clickedCard.classList.contains("flipped") || clickedCard.classList.contains("matched")) {
            return;
        }

        clickedCard.style.backgroundImage = `url(${cards[clickedCard.getAttribute("data-code")]})`;
        clickedCard.classList.add("flipped");

        selectedCards.push(clickedCard);

        if (selectedCards.length === 2) {
            isFlipped = true;
            setTimeout(checkMatch, 1000);
        }
    }

    function checkMatch() {
        const [card1, card2] = selectedCards;
        const index1 = card1.getAttribute("data-code");
        const index2 = card2.getAttribute("data-code");

        if (cards[index1] === cards[index2]) {
            card1.classList.add("matched");
            card2.classList.add("matched");
            cardFlipped += 2;
            if (cardFlipped === cards.length) {
                alert("Congratulations! You've matched all cards.");
            }
        } else {
            setTimeout(() => {
                card1.style.backgroundImage = `url(icons/puzzle.png)`;
                card2.style.backgroundImage = `url(icons/puzzle.png)`;
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
            }, 500);
        }

        selectedCards = [];
        isFlipped = false;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
