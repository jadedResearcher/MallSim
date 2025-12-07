const ab_view = () => {
    const body = document.querySelector('body');
    body.innerHTML = "";
    body.className = "author-bot";
    const sburb_container = createElementWithClassAndParent("div", body, 'sburb-container');
    const guide_bot = createElementWithClassAndParent("img", sburb_container, 'guide-bot');
    guide_bot.src = "http://farragofiction.com/SBURBSim/images/guide_bot.png";
    const h1 = createElementWithClassAndParent("h1", sburb_container);
    //this shits nostalgic
    h1.innerText = "Rare Session Finder AuthorBot"
    const p = createElementWithClassAndParent("p", sburb_container);
    p.innerHTML = `It seems you have asked about JR's automatic rare session finder. This is an application designed to find sessions that are strange, interesting and otherwise noteworthy without having to read hundreds of thousands of words. The algorithms are guaranteed to be 91.62748924816707% indistinguishable from the actual, readable sessions, based on some statistical analysis I basically just pulled out of my ass right now.

Please be patient as the sessions finish. Stats will be printed out up top at the end. Links to individual sessions will be below.
<br><br>As JR's superior robotic doppelganger, I must express that I am feeling: nostalgic, at returning to my original role of Guiding Observers through interesting simulations.
<br><Br><b>NOTE</b>: Wasted players, as always, throw a wrench in my superior robotic ability to make predictions. <br><br>If a player foreign to a given universe invades its Loop, all bets are off.<br><Br>It seems if you wish to prevent this you might wish to have the Devil of Spirals automatically eat any Players attempting to flee to the next Universe.`
    let omnomnom = false; //pass this to new games
    const eatbutton = createCheckboxInputWithLabel(sburb_container, 'single-use', "Allow Eating?", omnomnom);
    eatbutton.input.onchange = () => omnomnom = !omnomnom;


    let seed_text = "Zampanio"
    const seed_input = createTextInputWithLabel(sburb_container, 'seed-input', "Seed:", seed_text);
    seed_input.input.onchange = () => seed = seed_input.input.value;


    const tick_bar = createElementWithClassAndParent("div", sburb_container, "button-container");
    const tick_button = createElementWithClassAndParent("button", tick_bar, "tick-once-button");
    tick_button.innerText = "Simulate 1x Session";
    tick_button.onclick = () => {
        simulateOneSession(stringtoseed(seed_text), omnomnom);
    }
}


const simulateOneSession = (seed, omnomnom) => {
    console.log("JR NOTE: simulating with seed of ")
    game = new Game(new SeededRandom(seed), omnomnom);
    //create a div but don't give it an attached dom to render to (will be very fast, react uses a virtual dom like this and apparently past me did too)
    game.start(document.createElement("div"));
    alert("done???")
}