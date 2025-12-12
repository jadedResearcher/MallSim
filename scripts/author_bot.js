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
    let omnomnom = true; //pass this to new games
    const eatbutton = createCheckboxInputWithLabel(sburb_container, 'single-use', "Allow Eating?", omnomnom);
    eatbutton.input.onchange = () => omnomnom = !omnomnom;


    let seed_text = "Zampanio" //translates to 831, should it be an arc number?
    const seed_input = createTextInputWithLabel(sburb_container, 'seed-input', "Seed:", seed_text);
    seed_input.input.onchange = () => seed = seed_input.input.value;


    const tick_bar = createElementWithClassAndParent("div", sburb_container, "button-container");
    const tick_button = createElementWithClassAndParent("button", tick_bar, "tick-once-button");
    tick_button.innerText = "Simulate 1x Session";

    const tick_ten_button = createElementWithClassAndParent("button", tick_bar, "tick-ten-button");
    tick_ten_button.innerText = "Simulate 10x Session";


    const tick_hundred_button = createElementWithClassAndParent("button", tick_bar, "tick-hundred-button");
    tick_hundred_button.innerText = "Simulate 100x Session";

    const global_stats_container = createElementWithClassAndParent("div", sburb_container, "button-container");


    const session_summary_container = createElementWithClassAndParent("div", sburb_container, "button-container");
    let session_count = 0;
    //handles time too
    const syncGlobalStats = (summary) => {
        session_count++;
        console.log("JR NOTE: todo wire up more summary", session_count)
        global_stats_container.innerHTML = "";
        const makePair = (left, right) => {
            const pair = createElementWithClassAndParent("div", global_stats_container, "summary-stat-pair");
            const leftEle = createElementWithClassAndParent("div", pair, "summary-stat-left");
            leftEle.innerHTML = left;
            const rightEle = createElementWithClassAndParent("div", pair, "summary-stat-right");
            rightEle.innerHTML = right;
        }
        makePair("Sessions Simulated: ", session_count)
    }

    tick_button.onclick = async () => {
        const startTime = performance.now();

        let seed = seed_text;
        if (game) {
            //pick a new seed
            seed = game.rand.getRandomNumberBetween(0, 4294967296)
        }
        simulateOneSession(seed, omnomnom, session_summary_container, syncGlobalStats);
        const endTime = performance.now();;

        alert("Complete! " + calculatePerformanceInSeconds(startTime, endTime))
    }

    tick_ten_button.onclick = async () => {
        const startTime = performance.now();

        let seed = seed_text;
        for (let i = 0; i < 10; i++) {
            if (game) {
                //pick a new seed
                seed = game.rand.getRandomNumberBetween(0, 4294967296)
            }
            //lets me render the stats live instead of blocking
            await nextFrame();
            simulateOneSession(seed, omnomnom, session_summary_container, syncGlobalStats);

        }
        const endTime = performance.now();;

        alert("Complete! " + calculatePerformanceInSeconds(startTime, endTime))
    }

    tick_hundred_button.onclick = async () => {
        const startTime = performance.now();

        let seed = seed_text;
        for (let i = 0; i < 100; i++) {
            if (game) {
                //pick a new seed
                seed = game.rand.getRandomNumberBetween(0, 4294967296)
            }
            //lets me render the stats live instead of blocking
            await nextFrame();
            simulateOneSession(seed, omnomnom, session_summary_container, syncGlobalStats);

        }
        const endTime = performance.now();;

        alert("Complete! " + calculatePerformanceInSeconds(startTime, endTime))
    }
}


const simulateOneSession = (seed, omnomnom, session_summary_container, globalSummaryCallback) => {
    const startTime = performance.now();
    console.log("JR NOTE: simulating with seed of ")
    game = new Game(new SeededRandom(seed), omnomnom);
    const throw_away_ele = document.createElement("div");
    //create a div but don't give it an attached dom to render to (will be very fast, react uses a virtual dom like this and apparently past me did too)
    game.start(throw_away_ele);
    for (let i = 0; i < 200; i++) {
        game.tick(throw_away_ele);
    }



    const endTime = performance.now();;
    game.summary.renderSelf(session_summary_container, calculatePerformanceInSeconds(startTime, endTime));
    globalSummaryCallback(game.summary);
}