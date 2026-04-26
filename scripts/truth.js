const truthView = () => {
    alert("Oh. Hello there. It's you. This is the east so it seems I must put on my False Face. One moment. Hello!!! Welcome to the wild world of Zampanio!");
    /*
* achievement screen looking at all scenes in local storage, if it knows about 
a scene, will print it out as a little pill and you can click on it to get a little truth popup quip (truth is friendly) and it includes a password to unlock

* achievement screen has a rabbit hole icon you can enter passwords into (most unlock little easter eggs like red string video, a few unlock new scenes like maccus or jr or blorbos in the food court)
    */
    const body = document.querySelector('body');
    body.innerHTML = "";
    body.className = "survival";
}

const makeColorsForString = (string) => {
    const seed = (stringtoseed(string) % 360);
    const hue = seed % 360;
    const rand = new SeededRandom(seed);
    let saturation = 0.5 + rand.nextDouble() / 2;
    let value = 0.65 + rand.nextDouble() / 4;

    const colors = Please.make_scheme(
        {
            h: hue,
            s: saturation,
            v: value
        },
        {
            scheme_type: 'analogous',
            format: 'hex'
        }
    );
    return colors;
}

const generateAchievementPill = (name, unlocked, parent) => {
    console.log("JR NOTE: generateAchievementPill", { name, unlocked, parent })
    const pill = createElementWithClassAndParent("button", parent, "achievement-pill");
    pill.innerText = name;
    const colors = makeColorsForString(name);
    console.log("JR NOTE: colors is", colors)
    pill.style.backgroundColor = colors[0];
    if (!unlocked) {
        pill.style.opacity = "0.75";
        pill.style.filter = "saturate: 0.5";

    }

}

/*
I think its important to note... 

The Cult of the Harvest used to be the Cult of the Nameless one.

And, originally I thought it was kinda a cop out of zampanio, you know?

"Nameless One". 

But increasingly I'm realizing that so much of Zampanio is generic, is vague, is unspecific...

Because it wants YOU to fill in the blanks?

My version of the mall from Zampanio is the Westerville Mall, with the Cult of the Harvest.

Your version might be a mall in canada and the cult might be around 1990s pop toys like Troll Dolls or Beanie babies or something.

I think thats beautiful.
*/