
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

    const textObject = createTextInputWithLabel(sburb_container, undefined, "Expedition #:", game.rand.initial_seed)
    textObject.input.style.marginLeft = "13px"
    textObject.label.className = "edit-left"
    textObject.container.className = 'edit-pair'

    const textAreaObject = createTextAreaInputWithLabel(sburb_container, undefined, "JSON*:", game.exportPlayersForCustomization())
    textAreaObject.input.style.marginLeft = "13px"
    textAreaObject.input.style.marginTop = "13px"
    textAreaObject.label.className = "edit-left"
    textAreaObject.container.className = 'edit-pair'
    const warning = createElementWithClassAndParent("div", sburb_container);
    warning.innerHTML = `*<i>WARNING: edit the JSON directly at your own risk. This is VERY likely to glitch out if you typo.</i>`

    textAreaObject.input.onchange = () => {
        game.importPlayersFromJSON(textAreaObject.input.value);
        renderPlayers();
    }


    const button_bar = createElementWithClassAndParent("div", sburb_container, "horizontal-bar");
    button_bar.style.backgroundColor = "transparent"

    //has to happen here becuase the game tries to make everyone look distinct
    const sync_sprite_button = createElementWithClassAndParent("button", button_bar);
    sync_sprite_button.innerText = "Sync Team Sprites From Themes";

    //has to happen because relationships are a group thing
    const relationship_button = createElementWithClassAndParent("button", button_bar);
    relationship_button.innerText = "Redo Team Relationships (needed if you add or randomize ppl)";

    const randomize = createElementWithClassAndParent("button", button_bar);
    randomize.innerText = "Randomize All Players";

    const add_button = createElementWithClassAndParent("button", button_bar);
    add_button.innerText = "Add Player";



    const shareable_url = createElementWithClassAndParent("a", sburb_container, 'shareable-url');
    shareable_url.target = "_blank";
    shareable_url.innerText = "Shareable URL (click to view session)";
    const players_container = createElementWithClassAndParent("div", sburb_container, 'player-flex');

    const handleChange = () => {
        renderPlayers();
    }


    const renderPlayers = () => {
        players_container.innerHTML = ``;
        const custom = encodeURIComponent(JSONCrush.crush(game.exportPlayersForCustomization()));
        console.log("JR NOTE: custom is", custom)
        shareable_url.href = `${window.location.pathname}?seed=${textObject.input.value}&custom=${custom}`;
        for (let player of game.players) {
            const container = createElementWithClassAndParent("div", players_container, 'player-edit-box');

            const top = createElementWithClassAndParent("div", container, 'top');
            const bottom = createElementWithClassAndParent("div", container);

            editOnePlayer(player, top, bottom, handleChange);
        }
    }
    renderPlayers();

    add_button.onclick = () => {
        game.players.push(randomEntity(new SeededRandom(stringtoseed(textObject.input.value))))
        renderPlayers();

    }

    sync_sprite_button.onclick = () => {
        setSpritesForParty(new SeededRandom(stringtoseed(textObject.input.value)), game.players);
        renderPlayers();
    }


    randomize.onclick = () => {
        game.players.forEach((p) => p.randomize(game.rand));
        setSpritesForParty(new SeededRandom(stringtoseed(textObject.input.value)), game.players);
        initializeRelationshipsForParty(game.rand, game.players)
        renderPlayers();
    }

    relationship_button.onclick = () => {
        initializeRelationshipsForParty(game.rand, game.players);
        renderPlayers();

    }




}


const editOnePlayer = (player, parent, bottom, change_callback) => {
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
        }
    }

    const makeTitle = () => {
        const { container, input, label } = createTextInputWithLabel(right, undefined, "Title:", player.title)
        label.className = "edit-left"
        container.className = 'edit-pair'
        input.onchange = () => {
            player.title = input.value;
            change_callback();
        }
    }

    const makeStats = () => {

        const box = createElementWithClassAndParent("div", right);
        box.style.marginTop = "13px"
        box.style.marginBottom = "13px"

        for (let [key, value] of Object.entries(player.stats)) {
            //const createNumberInputWithLabel = (parent, id, labelText, initialValue, max = 113, min = -113) => {

            const { container, input, label } = createNumberInputWithLabel(box, undefined, `${key}`, value, VERY_HIGH_STAT_VALUE, 0)
            label.className = "edit-left"
            container.className = 'edit-pair'
            input.onchange = () => {
                player.stats[key] = input.value;
                change_callback();
            }
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
        }
    }

    const makeCorrupted = () => {
        const { container, input, label } = createCheckboxInputWithLabel(right, undefined, "Corrupted:", player.corrupted)
        label.className = "edit-left"
        container.className = 'edit-pair'
        input.onchange = () => {
            console.log("JR NOTE: change value is", input.checked)

            player.corrupted = !!input.checked;
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
            change_callback();
        }
    }


    const makeRelationships = () => {
        const box = createElementWithClassAndParent("div", bottom);
        box.style.marginTop = "13px"
        box.style.marginBottom = "13px"

        const header = createElementWithClassAndParent("div", box);
        header.innerText = "Feelings For:"
        header.style.marginBottom = "13px";
        header.style.textDecoration = "underline"

        const makeFamilial = (relationship, ele) => {
            const { container, input, label } = createCheckboxInputWithLabel(ele, undefined, "Family:", relationship.familial)
            input.style.width = "50px"
            label.style.fontSize = "10px"

            input.onchange = () => {
                console.log("JR NOTE: change value is", input.checked)

                relationship.familial = !!input.checked;
                change_callback();
            }
        }

        const makeRomantic = (relationship, ele) => {
            const { container, input, label } = createCheckboxInputWithLabel(ele, undefined, "Romantic:", relationship.romantic)
            input.style.width = "50px"
            label.style.fontSize = "10px"

            input.onchange = () => {
                console.log("JR NOTE: change value is", input.checked)
                relationship.romantic = !!input.checked;

                change_callback();
            }
        }


        for ([key, relationship] of Object.entries(player.relationships)) {

            const { container, input, label } = createNumberInputWithLabel(box, undefined, `${key}: `, relationship.value, STRONG_RELATIONSHIP_VALUE, -1 * STRONG_RELATIONSHIP_VALUE)
            label.className = "edit-left"
            label.style.whiteSpace = "nowrap";
            label.style.width = "fit-content";

            label.style.fontSize = "10px"
            container.className = 'edit-pair'
            container.style.justifyContent = "space-between"
            const boxes = createElementWithClassAndParent("div", box);
            boxes.style.display = "flex"
            boxes.style.marginBottom = "20px"

            boxes.style.width = "200px";
            boxes.style.marginLeft = "auto";
            makeFamilial(relationship, boxes)
            makeRomantic(relationship, boxes)

            const clone_key = key;
            input.onchange = () => {
                console.log("JR NOTE: clone key", clone_key)
                player.relationships[clone_key].value = input.value;
                change_callback();
            }
        }
    }

    makeName();
    makeTitle();
    makeThemes();
    makeSprite();
    makeStats();
    makeWasted();
    makeCorrupted();
    makeMusical();

    makeRelationships();

    const randomize = createElementWithClassAndParent("button", right);
    randomize.innerText = "Randomize Player";

    randomize.onclick = () => {
        player.randomize(game.rand);
        change_callback();

    }

    const remove_button = createElementWithClassAndParent("button", right);
    remove_button.innerText = "Eat Player";
    const crunch = new Audio("http://farragofiction.com/NagaGirlfriend/audio/333818__inspectorj__cracking-crunching-a.mp3");

    remove_button.onclick = () => {
        /*
        even in sburbsim, i always thought it was fucked up to just...delete players from sessions

        now you have to sit and LISTEN to your sins, observer
        */
        crunch.play();
        removeItemOnce(game.players, player);
        change_callback();

    }


}