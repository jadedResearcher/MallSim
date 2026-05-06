let textVoiceSim;
const known_achievements = {};

/*
truth is having a great time
this is East tho so it is not pissy at all
forced to actually be a helpful achievement fairy
worst timeline

jadedResearcher — 10:47 AM
truth likes north and south
HAAAAAATES east
can't interact with west

because west is OUR reality
and truth is some software and pre-written words on a screen
the version of truth on your screen has no clue what reality is like
the fourth wall is blocked with glass
one way mirror
we can see it, but it can't see out
*/
const truthView = () => {
    /*
* achievement screen looking at all scenes in local storage, if it knows about 
a scene, will print it out as a little pill and you can click on it to get a little truth popup quip (truth is friendly) and it includes a password to unlock

* achievement screen has a rabbit hole icon you can enter passwords into (most unlock little easter eggs like red string video, a few unlock new scenes like maccus or jr or blorbos in the food court)
    */
    const body = document.querySelector('body');
    body.innerHTML = "";
    body.className = "survival";
    const header = createElementWithClassAndParent("h1", body);
    header.innerHTML = "Achievements!"
    const container = createElementWithClassAndParent("div", body, "achievement-container ")

    const all_achievements_ele = createElementWithClassAndParent("div", container);
    all_achievements_ele.style.width = "50%"
    const unlocked_achievements = globalDataObject.achievementsUnlocked;

    renderKnownAchievements(all_achievements_ele, unlocked_achievements);
    renderUnKnownAchievements(all_achievements_ele, unlocked_achievements);
    renderTruth(container);
}

const renderPrize = async (achievement) => {
    await haveTruthSayString(achievement.truth_quip)
    if (achievement) {
        await sleep(1000)
        haveTruthSayString("An IMPORTANT WORD you should remember is: " + achievement.password)

    }

}

const renderKnownAchievements = (parent, unlocked_achievements) => {
    console.log("JR NOTE: renderKnownAchievements", parent)
    const header = createElementWithClassAndParent("h2", parent);
    header.innerHTML = "Known!"

    const container = createElementWithClassAndParent("div", parent, 'pill-container');
    for (let [key, value] of Object.entries(known_achievements)) {
        const unlocked = unlocked_achievements.includes(key);
        const pill = generateAchievementPill(key, unlocked, container);
        if (unlocked) {
            pill.onclick = () => {
                renderPrize(value)
            }
        } else {
            pill.disabled = true;
        }
    }
}

const renderUnKnownAchievements = (parent, unlocked_achievements) => {
    const header = createElementWithClassAndParent("h2", parent);
    header.innerHTML = "???"

    const container = createElementWithClassAndParent("div", parent, 'pill-container');
    const known = Object.keys(known_achievements);
    for (let unique_event of unlocked_achievements) {
        if (!known.includes(unique_event)) {
            const pill = generateAchievementPill(unique_event, true, container);
            pill.onclick = () => {
                haveTruthSayString("...what did you even do. What IS this achievement? JR has not coded for this.")
            }

        }
    }
}

const haveTruthSayString = async (potentially_long_string) => {
    const split = potentially_long_string.split("\n")
    await textVoiceSim.speak(split, null, true);

}

const renderTruth = async (parent) => {
    const container = createElementWithClassAndParent("div", parent, "truth-container ")
    container.innerHTML = `    <div id="truth-box">

      <div id="truths-well"> </div>
      <div id="truths-words"> </div>
    </div>`;

    const body = document.querySelector("body")
    let truthWellContainer = document.querySelector('#truths-well');
    let truthWordContainer = document.querySelector('#truths-words');
    let truth = new TruthToLipSinc(truthWellContainer, truthWordContainer);

    truth.renderFrame("Oh.");

    textVoiceSim = new TextToSimulatedVoice(truth, 0.81, 1.0);

    await textVoiceSim.speak("Well.".split(","), null, true);
    const start = async () => {
        await textVoiceSim.speak("It seems that I am to reprise one of my original roles.".split(","), null, true);
        await sleep(1000);
        await textVoiceSim.speak("That of an Achievement System.".split(","), null, true);
        await sleep(1000);
        await textVoiceSim.speak("No matter.".split(","), null, true);
    }

    start();
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
//http://zampanio.com/
const generateAchievementPill = (name, unlocked, parent) => {
    console.log("JR NOTE: generateAchievementPill", { name, unlocked, parent })
    const pill = createElementWithClassAndParent("button", parent, "achievement-pill");
    pill.innerText = name;
    const colors = makeColorsForString(name);
    console.log("JR NOTE: colors is", colors)
    if (!unlocked) {
        pill.disabled = true;
        pill.style.backgroundColor = "#c4c4c4"
        pill.style.color = "gray"
    } else {
        pill.style.backgroundColor = colors[0];

    }
    return pill;

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



class Achivement {
    name = "Perfectly Generic Object"
    truth_quip = "It is not HarvestFruit so it is probably useless."
    password = undefined;
    constructor(name, truth_quip, password) {
        this.name = name;
        this.truth_quip = truth_quip;
        this.password = password;
    }
}

/*
closer hates wibby but arranged therapy for literally everone but wibby

yeah, closer is the one who kidnapped fiona slaughter from her hoome universe to make her provide therapy
its fine
don't worry about it
its like a gift basket
"sorry i manipulated wanda into making the mall into a hell maze just to get revenge on your collegue, whoops, i didn't consider you'd be collateral damage"

i can't even remember where its revealed why the closer hates wibby
basically wibby did his wibby thing to the closer
i.e. provide an illusion of friendship
basic l corp attachment work
the closer, being the closer
went from "ah yes well i can provide you with Sales"
to "oh, they are very flattering towards me, yes I feel good about this sale"
to "wait are we friends now? have i made a friend? i never make friends"
to "...........of course it was all a lie. why would i believe otherwise. luckily i have guarded my heart against disappointment. for no particular reason i will now dedicate my life to fucking with this particular person, who did not hurt me, as i can not be hurt"
two lonely players do NOTO interact well together

anyways, as far as closer is concerned, she's square with all the blorboso
yeah she doomed them to the hell maze mall, but she got them therapy to counter any adverse effects from that

net zero change

i mean, theres two closers right
the one in the loop, and the one not  
the one not in the loop works for wanda
the one out of the loop USED to work for wanda
so knows how to manage from below
wanda was .... not a good boss
so the closer was always doing things like "ah yes, ma'am, brilliant idea to monetize our ip " and wanda looks up from shitposting on her phone and goes "??? " and then they do closers idea
so very easy to just drop by and put it in wandas head that she's nostalgic for her childhood mall now and wouldn't it be fun to visit, and why yes it IS boring how its just a staight line. say, just an idea, but how would you improve it


re: two closers
(unlike almost everyone else, closer is 'native' to this universe in that she brought herself here with breath-o-mancy, so when wanda started the loop, non-looping closer is part of the initial conditions of any new universe that gets created, and looping closer simply jumps into the new universe that already has a copy of her (same with the eye killer and the innocent))
just about everyone else STARTS in the moon maze (og group) or joins via the lcorp apocalypse
so they don't have a native version thats part of the start condition of the universe
*/


const wireUpAchievement = (name, truth_quip, password) => {
    known_achievements[name] = new Achivement(name, truth_quip, password);
}
//wireUpAchievement("Romance Interaction", "TBD", "test_password");
wireUpAchievement("Wrong As A Joke", "TBD", "test_password");
wireUpAchievement("Not unlocked test", "TBD", "test_password");

wireUpAchievement("Romance Interaction", "Let us be honest here: It would be more impressive if you did not see romance. Organics are, quite frankly, obsessed with it.", "test_password");