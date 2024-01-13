document.addEventListener("DOMContentLoaded", function () {
    const gameContainer = document.getElementById("game-container");

    const cards = [
        {backgroundImage: 'art.png', codeName: "art"},
        {backgroundImage: 'octopus.png', codeName: "octopus"},
        {backgroundImage: 'pear.png', codeName: "pear"},
        {backgroundImage: 'sea.png', codeName: "sea"},
        {backgroundImage: 'space.png', codeName: "space"},
        {backgroundImage: 'tree.png', codeName: "tree"},
        {backgroundImage: 'umbrella.png', codeName: "umbrella"},
        {backgroundImage: 'art.png', codeName: "art"},
        {backgroundImage: 'octopus.png', codeName: "octopus"},
        {backgroundImage: 'pear.png', codeName: "pear"},
        {backgroundImage: 'sea.png', codeName: "sea"},
        {backgroundImage: 'space.png', codeName: "space"},
        {backgroundImage: 'tree.png', codeName: "tree"},
        {backgroundImage: 'umbrella.png', codeName: "umbrella"}
    ].sort(() => Math.random() - .5);

    let selectedCards = [];
    let isFlipped = false;
    let cardFlipped = 0;

    createGameBoard(cards);
    
    function createGameBoard(cards) {
        cards.forEach(card => {
            const cardElement = document.createElement("div");
            const imageElement = document.createElement("div");
            cardElement.classList.add("card");
            cardElement.style.backgroundColor = "cyan";
            imageElement.style.backgroundImage = `url(${card.backgroundImage})`;
            imageElement.setAttribute("data-name", card.codeName);
            cardElement.addEventListener("click", handleCardClick);
            cardElement.appendChild(imageElement);
            gameContainer.appendChild(cardElement);
        });
    };

    function handleCardClick () {
        const clickedCard = this;

        if (isFlipped || clickedCard.classList.contains("flipped") || clickedCard.classList.contains("cleared")) {
            return;
        }

        const imageOfCard = clickedCard.querySelector("div");
        clickedCard.style.backgroundColor = "";
        clickedCard.classList.add("flipped");

        selectedCards.push(clickedCard);

        if (selectedCards.length === 2) {
            isFlipped = true;
            setTimeout(checkMatch, 1000);
        }
    };

    function checkMatch () {
        const [card1, card2] = selectedCards;
        const imageCard1 = card1.querySelector("div");
        const imageCard2 = card2.querySelector("div");

        const image1 = imageCard1.getAttribute("data-name");
        const image2 = imageCard2.getAttribute("data-name");

        if(image1 === image2) {
            card1.classList.add("cleared");
            card2.classList.add("cleared");
            cardFlipped += 2;
            if (cardFlipped === cards.length) {
                alert("Gratuluji! Našli jste všechny páry.")
            }
        } else {
            card1.style.backgroundColor = "cyan";
            card2.style.backgroundColor = "cyan";
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
        }

        selectedCards = [];
        isFlipped = false;
    };
});