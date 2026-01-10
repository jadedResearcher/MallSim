const session_customizer = () => {
    const body = document.querySelector('body');
    body.innerHTML = "";
    body.className = "survival";
    const sburb_container = createElementWithClassAndParent("div", body, 'survival-container');
    const h1 = createElementWithClassAndParent("h1", sburb_container);
    //this shits nostalgic
    h1.innerText = "Will Your Characters Survive The Westerville Mall?"

    const a1 = createElementWithClassAndParent("a", sburb_container);
    a1.href = 'https://www.tumblr.com/mirrorshadowrealmlabyrinth';
    a1.target = "_blank;"
    a1.innerText = '.'
    a1.style.color = "black"

    const a2 = createElementWithClassAndParent("a", sburb_container);
    a2.href = 'https://www.tumblr.com/would-your-fave-survive-zampanio';
    a2.target = "_blank;"
    a2.innerText = '.'
    a2.style.color = "black"

    for (let player of game.players) {
        editOnePlayer(player, sburb_container);
    }


}


const editOnePlayer = (player, parent) => {
    const player_edit_box = createElementWithClassAndParent("div", parent, 'player-edit-box');
    const left = createElementWithClassAndParent("div", player_edit_box, "left");
    const right = createElementWithClassAndParent("div", player_edit_box, 'right');


    const sprite = renderSpriteForEntity(left, player)
    sprite.style.backgroundColor = 'rgb(237, 231, 213)'


    const makeName = () => {
        const { container, input, label } = createTextInputWithLabel(right, undefined, "Name:", player.name)
        label.className = "edit-left"
        container.className = 'edit-pair'
    }

    const makeTitle = () => {
        const { container, input, label } = createTextInputWithLabel(right, undefined, "Title:", player.title)
        label.className = "edit-left"
        container.className = 'edit-pair'
    }

    const makeThemes = () => {
        const { container, input, label } = createCheckboxInputWithLabel(right, undefined, "Themes:", player.wasted)
        label.className = "edit-left"
        container.className = 'edit-pair'
    }

    const makeSpriteAspect = () => {
        const { container, input, label } = createCheckboxInputWithLabel(right, undefined, "Wasted:", player.wasted)
        label.className = "edit-left"
        container.className = 'edit-pair'
    }

    const makeSpriteClass = () => {
        const { container, input, label } = createCheckboxInputWithLabel(right, undefined, "Wasted:", player.wasted)
        label.className = "edit-left"
        container.className = 'edit-pair'
    }


    const makeWasted = () => {
        const { container, input, label } = createCheckboxInputWithLabel(right, undefined, "Wasted:", player.wasted)
        label.className = "edit-left"
        container.className = 'edit-pair'
    }

    const makeCorrupted = () => {
        const { container, input, label } = createCheckboxInputWithLabel(right, undefined, "Corrupted:", player.corrupted)
        label.className = "edit-left"
        container.className = 'edit-pair'
    }

    const makeMusical = () => {
        const { container, input, label } = createCheckboxInputWithLabel(right, undefined, "Musical:", player.musical)
        label.className = "edit-left"
        container.className = 'edit-pair'
    }

    makeName();
    makeTitle();
    makeThemes();
    makeSpriteAspect();
    makeSpriteClass();
    makeWasted();
    makeCorrupted();
    makeMusical();


}