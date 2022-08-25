{
    clicked = false;

    //elementen aanmaken
    const $ratingMsg = document.createElement(`p`);
    document.querySelector(`.rating`).appendChild($ratingMsg);
    $ratingMsg.className = `rating__text`;

    const ratingPicked = () => {  //toon tekst bij click
        const $ratingMsg = document.querySelector(`.rating__text`);
        $ratingMsg.textContent = `Bedankt voor uw beoordeling.`;
        clicked = true;
        console.log(`clicked = ${clicked}`)
    }

    const sterClicked = (event) => {
        let sterClassAsArray = event.target.classList[1].split(``);
        // split om de class in letters op te splitsen : ["s", "t", "a", "r", "_", "_", "1"]
        // console.log(sterClassAsArray);
        let index = sterClassAsArray[sterClassAsArray.length - 1];
        let teller = 0;
        //opvullen
        if (clicked === true) {  //als clicked true is zet hem dan op false zodat je een nieuwe kan aanklikken
            clicked = false;
        }
        resetStars();
        for (let ster of $sterren.children) {
            if (teller < index) {
                ster.src = 'assets/img/svg/star_filled.svg';
                teller++;
                clicked = true; //meegeven dat er op een ster geklikt is
                ratingPicked();
            }
        }
    }
    const sterHovered = (event) => { //ster invullen wnr hover
        if (clicked === false) {
            let sterClassAsArray = event.target.classList[1].split(``);
            // console.log(sterClassAsArray);
            let index = sterClassAsArray[sterClassAsArray.length - 1];
            let teller = 0;
            //opvullen
            resetStars();
            for (let ster of $sterren.children) {
                if (teller < index) {
                    ster.src = 'assets/img/svg/star_filled.svg';
                    teller++;
                }
            }
        }
    }

    const resetStars = () => {
        if (clicked === false) {  //als er nog nergens op geklikt is reset dan
            for (let ster of $sterren.children) {
                ster.src = 'assets/img/svg/star.svg';
            }
        }
    }
    const init = () => {
        $sterren = document.querySelector(`.stars`);
        console.log($sterren.children);

        for (let ster of $sterren.children) {
            ster.addEventListener(`click`, sterClicked);
            ster.addEventListener(`mouseover`, sterHovered);
            ster.addEventListener(`mouseleave`, resetStars);
        }
    }
    init();

}