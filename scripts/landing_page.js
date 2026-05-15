
const landingPage = () => {
    const body = document.querySelector('body');
    const debug = createElementWithClassAndParent("div", container, "landing");
    const intro_container = createElementWithClassAndParent("div", debug, "story-beat");
    const ele = createElementWithClassAndParent("p", intro_container, "sub-story-beat");
    ele.innerHTML = `Zampanio is a really fun game, don't you wish you could play it?
    <br><br>
    To me, the most evocative parts of the creepy pasta were always those descriptions of the infinite Westerville Mall.
    <br><br>
    Here's a simulation of what I think the real game was like. 
    <br><br>
    There's not really any game play, but you can add yourself (or a character you like!) and see what would happen if it were. (If you want it more complicated than just adding you, you'll have to work for it, lol.)
    <br><br>
    Happy Hunting :) :) :)!<br><Br><hr>`

    //my favorite way to easily make something seem unique to you but actually not be :) :) ;)
    const rand = new SeededRandom(new Date().getTimezoneOffset());
    const keys = getAllThemeKeysMinusFood();

    const name = createTextInputWithLabel(intro_container, "name", "Name:", "")
    name.container.style.marginBottom = "31px";

    const number = createNumberInputWithLabel(intro_container, "number", "Important #*:", new Date().toLocaleDateString().replaceAll("/", ""))
    const asterisk = createElementWithClassAndParent("div", intro_container);
    asterisk.innerHTML = "* For example, an important date (birthday, death day, anniversary, etc). If its 4/1/1972 you would just do 4011972. Or just your lucky number, really anything that feels right for this will work."
    asterisk.style.marginBottom = "31px";
    asterisk.style.fontSize = "10px"
    const theme1 = createSelectInputWithLabel(intro_container, "theme1", "Theme 1:", keys.map((e) => ({ value: e, label: titleCase(e) })), rand.pickFrom(keys))
    const theme2 = createSelectInputWithLabel(intro_container, "theme1", "Theme 2:", keys.map((e) => ({ value: e, label: titleCase(e) })), rand.pickFrom(keys))
    const theme3 = createSelectInputWithLabel(intro_container, "theme1", "Theme 3:", keys.map((e) => ({ value: e, label: titleCase(e) })), rand.pickFrom(keys))
    const theme4 = createSelectInputWithLabel(intro_container, "theme1", "Theme 4:", keys.map((e) => ({ value: e, label: titleCase(e) })), rand.pickFrom(keys))
    theme4.container.style.marginBottom = "31px";

    const button = createElementWithClassAndParent("button", intro_container)
    button.innerHTML = 'Explore your personalized session of MallSim!';


    button.onclick = () => {
        const themes = [theme1.input.value, theme2.input.value, theme3.input.value, theme4.input.value]
        //so you can share or return
        updateURLParams(`?name=${name.input.value}&seed=${number.input.value}&themes=${themes.join(",")}`)
        debug.remove();
        start();
    };

}