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

    const { input, label, container } = createTextInputWithLabel(sburb_container, undefined, "Expedition #:", game.rand.initial_seed)
    input.style.marginLeft = "13px"

    const button = createElementWithClassAndParent("button", sburb_container);
    button.innerText = "Sync Team Sprites From Themes";


    const players_container = createElementWithClassAndParent("div", sburb_container, 'player-flex');

    const handleChange = () => {
        console.warn("TODO: need to display json box, special brittle string i make and url link")
    }


    const renderPlayers = () => {
        players_container.innerHTML = '';
        for (let player of game.players) {
            const player_edit_box = createElementWithClassAndParent("div", players_container, 'player-edit-box');
            editOnePlayer(player, player_edit_box, handleChange);
        }
    }
    renderPlayers();


    button.onclick = () => {
        setSpritesForParty(new SeededRandom(stringtoseed(input.value)), game.players);
        renderPlayers();
    }




}


const editOnePlayer = (player, parent, change_callback) => {
    console.log("JR NOTE: editOnePlayer", player)
    parent.innerHTML = "";
    const left = createElementWithClassAndParent("div", parent, "left");
    const right = createElementWithClassAndParent("div", parent, 'right');


    const sprite_parent = createElementWithClassAndParent("div", left);

    const sprite = renderSpriteForEntity(sprite_parent, player)
    sprite_parent.style.backgroundColor = 'rgb(237, 231, 213)'


    const makeName = () => {
        const { container, input, label } = createTextInputWithLabel(right, undefined, "Name:", player.name)
        label.className = "edit-left"
        container.className = 'edit-pair'
        input.onchange = () => {
            player.name = input.value;
            change_callback();
            //editOnePlayer(player, parent,change_callback); //only call this for things that would effect graphics
        }
    }

    const makeTitle = () => {
        const { container, input, label } = createTextInputWithLabel(right, undefined, "Title:", player.title)
        label.className = "edit-left"
        container.className = 'edit-pair'
        input.onchange = () => {
            player.title = input.value;
            change_callback();
            //editOnePlayer(player, parent,change_callback);
        }
    }

    const makeThemes = () => {
        const theme_box = createElementWithClassAndParent("div", right);
        theme_box.style.marginTop = "13px"
        theme_box.style.marginBottom = "13px"

        const options = [];
        const theme_keys = [...getAllThemeKeysMinusFood()];
        theme_keys.sort();
        for (let key of theme_keys) {
            options.push({ label: titleCase(key), value: key })
        }

        let index = 0;
        for (let theme of player.theme_keys) {
            index++;
            const { container, input, label } = createSelectInputWithLabel(theme_box, undefined, `Theme ${index}:`, options, theme)
            label.className = "edit-left"
            container.className = 'edit-pair'
            const index_copy = index; //otherwise this gets incremented next loop, need to store a local copy
            input.onchange = () => {
                console.log("JR NOTE: trying to change theme", { index_copy, value: input.value })
                player.theme_keys[index_copy - 1] = input.value;
                change_callback();
                //editOnePlayer(player, parent, change_callback);
            }
        }

    }

    //abandoned this one, multiselect works like ass on desktop
    //so just saying theres only 4 themes, no weird ass omni players
    const makeThemesMultiSelect = () => {
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
        input.onchange = () => {
            console.log("JR NOTE: change value is", input.selectedOptions)

            player.theme_keys = Array.from(input.selectedOptions).map((o) => o.value);
            change_callback();
            editOnePlayer(player, parent, change_callback);
        }
    }



    /*
    i think my favorite part
is that
what you look like
matters a LOT in homestuck
but not at all in mallsim
if you let yourself look like you should "by default" then
it sorta reflects your themes
but you can change your outfit without changing your themes
it is not what it is
assuming familiarity with zampanio
can be dangerous
    */

    const makeSprite = () => {
        const sprite_box = createElementWithClassAndParent("div", right);
        sprite_box.style.marginTop = "13px"
        sprite_box.style.marginBottom = "13px"

        const makeSpriteAspect = () => {
            const options = [];
            for (let sprite_aspect of Object.keys(aspect_mapping)) {
                options.push({ label: titleCase(sprite_aspect), value: sprite_aspect })
            }
            const { container, input, label } = createSelectInputWithLabel(sprite_box, undefined, "Sprite Aspect:", options, player.sprite_aspect)
            label.className = "edit-left"
            container.className = 'edit-pair'
            input.onchange = () => {
                player.sprite_aspect = input.value;
                change_callback();
                editOnePlayer(player, parent, change_callback);
            }
        }

        const makeSpriteClass = () => {
            const options = [];
            for (let sprite_aspect of Object.keys(class_mapping)) {
                options.push({ label: titleCase(sprite_aspect), value: sprite_aspect })
            }
            const { container, input, label } = createSelectInputWithLabel(sprite_box, undefined, "Sprite Class:", options, player.sprite_class)
            label.className = "edit-left"
            container.className = 'edit-pair'
            input.onchange = () => {

                player.sprite_class = input.value;
                change_callback();
                editOnePlayer(player, parent, change_callback);
            }
        }
        makeSpriteAspect();
        makeSpriteClass();
    }



    const makeWasted = () => {
        console.log("JR NOTE: player wasted is", player.wasted)
        const { container, input, label } = createCheckboxInputWithLabel(right, undefined, "Wasted:", player.wasted)
        label.className = "edit-left"
        container.className = 'edit-pair'
        input.onchange = () => {
            console.log("JR NOTE: change value is", input.checked)

            player.wasted = !!input.checked;
            change_callback();
            editOnePlayer(player, parent, change_callback);
        }
    }

    const makeCorrupted = () => {
        const { container, input, label } = createCheckboxInputWithLabel(right, undefined, "Corrupted:", player.corrupted)
        label.className = "edit-left"
        container.className = 'edit-pair'
        input.onchange = () => {
            console.log("JR NOTE: change value is", input.checked)

            player.corrupted = !!input.checked;
            editOnePlayer(player, parent, change_callback);
            change_callback();
        }
    }

    const makeMusical = () => {
        const { container, input, label } = createCheckboxInputWithLabel(right, undefined, "Musical:", player.musical)
        label.className = "edit-left"
        container.className = 'edit-pair'
        input.onchange = () => {
            console.log("JR NOTE: change value is", input.checked)

            player.musical = !!input.checked;
            editOnePlayer(player, parent, change_callback);
            change_callback();
        }
    }

    makeName();
    makeTitle();
    makeThemes();
    makeSprite();
    makeWasted();
    makeCorrupted();
    makeMusical();


}