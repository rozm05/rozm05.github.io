document.addEventListener("DOMContentLoaded", function () {
    const gameContainer = document.getElementById("game-container");
    const resetButton = document.getElementById("reset-btn");

    const cards = [
        {backgroundImage: 'art.png', codeName: "art"},
        {backgroundImage: 'octopus.png', codeName: "octopus"},
        {backgroundImage: 'pear.png', codeName: "pear"},
        {backgroundImage: 'sea.png', codeName: "sea"},
        {backgroundImage: 'space.png', codeName: "space"},
        {backgroundImage: 'tree.png', codeName: "tree"},
        {backgroundImage: 'umbrella.png', codeName: "umbrella"},
        {backgroundImage: 'car.png', codeName: "car"},
        {backgroundImage: 'flower.png', codeName: "flower"},
        {backgroundImage: 'rainbow.png', codeName: "rainbow"},


        {backgroundImage: 'art.png', codeName: "art"},
        {backgroundImage: 'octopus.png', codeName: "octopus"},
        {backgroundImage: 'pear.png', codeName: "pear"},
        {backgroundImage: 'sea.png', codeName: "sea"},
        {backgroundImage: 'space.png', codeName: "space"},
        {backgroundImage: 'tree.png', codeName: "tree"},
        {backgroundImage: 'umbrella.png', codeName: "umbrella"},
        {backgroundImage: 'car.png', codeName: "car"},
        {backgroundImage: 'flower.png', codeName: "flower"},
        {backgroundImage: 'rainbow.png', codeName: "rainbow"}
    ].sort(() => Math.random() - .5);

    let selectedCards = [];
    let isFlipped = false;
    let cardFlipped = 0;

    resetButton.addEventListener("click", resetGame);

    createGameBoard(cards);
    
    function createGameBoard(cards) {
        cards.forEach(card => {
            const cardElement = document.createElement("div");
            const imageElement = document.createElement("div");
            cardElement.classList.add("card");
            imageElement.classList.add("card");
            cardElement.style.backgroundColor = "lightblue";
            imageElement.style.backgroundImage = `url(${card.backgroundImage})`;
            imageElement.style.opacity = 0;
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
        imageOfCard.style.opacity = 1;
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
            card1.style.backgroundColor = "lightblue";
            card2.style.backgroundColor = "lightblue";
            imageCard1.style.opacity = 0;
            imageCard2.style.opacity = 0;
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
        }

        selectedCards = [];
        isFlipped = false;
    };

    function resetGame () {
        selectedCards = [];
        isFlipped = false;
        cardFlipped = 0;
        gameContainer.innerHTML = "";

        cards.sort(() => Math.random() - .5);
        createGameBoard(cards);
    };


});