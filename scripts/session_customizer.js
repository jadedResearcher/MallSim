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

    const players_container = createElementWithClassAndParent("div", sburb_container, 'player-flex');


    for (let player of game.players) {
        const player_edit_box = createElementWithClassAndParent("div", players_container, 'player-edit-box');

        editOnePlayer(player, player_edit_box);
    }


}


const editOnePlayer = (player, parent) => {
    const left = createElementWithClassAndParent("div", parent, "left");
    const right = createElementWithClassAndParent("div", parent, 'right');


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
        const options = [];
        for (let key of getAllThemeKeysMinusFood()) {
            options.push({ label: titleCase(key), value: key })
        }

        //make sure the themes we have are clustered at the top
        options.sort(function (a, b) {
            if (player.theme_keys.includes(a.value)) {
                return -1;
            }

            if (player.theme_keys.includes(b.value)) {
                return 1;
            }
            return 0;
        });


        const { container, input, label } = createMultiSelectInputWithLabel(right, undefined, "Themes:", options, player.theme_keys);
        input.size = 6;
        label.className = "edit-left"
        container.className = 'edit-pair'
    }

    const makeSpriteAspect = () => {
        const options = [];
        for (let sprite_aspect of Object.keys(aspect_mapping)) {
            options.push({ label: titleCase(sprite_aspect), value: sprite_aspect })
        }
        const { container, input, label } = createSelectInputWithLabel(right, undefined, "Sprite Aspect:", options, player.sprite_aspect)
        label.className = "edit-left"
        container.className = 'edit-pair'
    }

    const makeSpriteClass = () => {
        const options = [];
        for (let sprite_aspect of Object.keys(class_mapping)) {
            options.push({ label: titleCase(sprite_aspect), value: sprite_aspect })
        }
        const { container, input, label } = createSelectInputWithLabel(right, undefined, "Sprite Class:", options, player.sprite_class)
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