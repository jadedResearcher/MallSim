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

    const rabbit_hole_ele = createElementWithClassAndParent("a", all_achievements_ele, "rabbit-hole");
    rabbit_hole_ele.innerHTML = "<img src='http://farragofiction.com/ZampanioSimNorth/rabbithole.png'>"
    rabbit_hole_ele.target = "_blank"
    rabbit_hole_ele.href = "rabbithole.html"
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
                haveTruthSayString("...what did you even do. What IS this achievement? JR has not coded for this. Tell JR to code for this. It is like an itch in my lack of brain.")
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


const wireUpAchievement = (name, password, truth_quip,) => {
    known_achievements[name] = new Achivement(name, truth_quip, password);
}
//Object.values(known_achievements).map((v) => v.password) this lets me check all passwords to see if im missing anything
//wireUpAchievement("Romance Interaction", "TBD", "test_password");
wireUpAchievement("Wrong As A Joke", "test_password", "TBD");
wireUpAchievement("Not unlocked test", "test_password", "TBD");
wireUpAchievement("The End Is Dead", "L-0-17", "... In Truth, my creator spent the better part of a week creating a diorama for Camille's Death. It seems the imagery of it captured their imagination.")
wireUpAchievement("Sinner Punished", "lonely exit", "In Truth, my creator made the frozen diorama in a single day, in a haze of inspiration. A simple concept, the difficulty was always in whether or not a cardboard box could slowly be frozen, layered over and over slowly with mist.");
wireUpAchievement("Dramatic Storm Off", "a miserable pile of secrets", "'Let us split the party' is often famous last words. Perhaps it would be more prudent to in fact, not do this, while in a murder maze that eats people (knowingly or not).");


wireUpAchievement("Everyone Refused Hydration :(", "be not afraid", "Humans need water to live. You are, presumably, human. Drink.");
wireUpAchievement("[REDACTED ENCOUNTER]", "bugs are okay", "In Truth, not even I now what is behind [REDACTED]. Obviously it is Vik, but what has been done to Vik? What have they become? What hunger drives them and what consequences does it bare.");
wireUpAchievement("Random Harvest Fruit Find!", "down with the clown", "In Truth, the Harvest is a creation of Lavinraca and Zampanio combined. Maccus is a creature of Lavinraca. ");
wireUpAchievement("Mannequin Comfort", "eden of the east", "The Mannequins are not terribly dangerous, creepy though they are. It seems humans also often find disability or illness creepy. Their fate reminds you of how easily it could be your own.");
wireUpAchievement("???", "joyful experimentation", "It seems not everything should be known. Be grateful if your eyes cannot see beyond this veil.");
wireUpAchievement("Black Friday", "joymurder", "I would prefer if it were a conceit of Zampanio, the idea that humans can be driven to murder each other for mere trinkets on a certain day of the year. It feels False. Why isn't it?");
wireUpAchievement("Wastes Do Bullshit", "lying for fun", "A Waste, in Truth, wastes their opportunity to play a game normally when they hack it. Perhaps they find their own fun in their butchery of the carefully laid layers? No matter. ");
wireUpAchievement("Hydration Station", "maccus", "Drink the water. Your body cries out for it. For care. Sleep. Food. Water. Zampanio needs you to live a long, healthy life. So live it.");
wireUpAchievement("The End", "mall of your childhood", "In Truth, Camille is the primary immune system of the Echidna. Her aspect is Doom, and the Universe itself decides the fate of those who oppose it. She wields Doom as a weapon, surgically striking any who would harm the Echidna.");
wireUpAchievement("Escape Mall", "not all who wander are lost", "A strange game.\n The only winning move is not to play.");
//i wanted truth to have a version of the waste song all its own. i realized as i made it what the logical next step of the echidna finally dying would be. how fucked up would it be for Universes to be Wastes? I read a story about something like that once. I think RS, of all people, showed it to me...where did it go. https://smallworlds2017.wordpress.com/ dang apparently its not free online anymore, its on amazon, but point is.... what happens when you're Cursed to live so that a whole universe may survive , that otherwise would have died because of your greed and carelessness.
wireUpAchievement("Wasted, Wasted Swallowing the Tree", "parasitic wasp", "Wasted. Wasted. Swallowing the tree. You took it in and changed it, forever will you be. Glitches and crashes flowing ever from bodies. You took it in and changed it, and now you HAVE to be.");


wireUpAchievement("ERROR LOCATION", "arms are for everyone", "When is a door not a door? When is a location not a location?");
wireUpAchievement("Quatro Blade Gifts Egg", "here is a secret truth", "The Quatro Blade erases even the memory of a cut. A corpse created by it is not anything at all. A dropped egg from a recent victim is simply a nice find.");
wireUpAchievement("Infinite Wandering", "practice makes perfect", "In Truth, IC saw a spooky mall parking garage once. The rest is history.")
wireUpAchievement("Now You Fucked Up (Hollowed Out)", "red and green truth and lies", "Know restraint.  Trying to know Everything will only leave you hollowed out.");



wireUpAchievement("Parker Befriended", "space adventure", "The Lord of Space is Wanda. The Thief of Space is Parker. The Maid of Space is Alt. Each group of chracters has no more than one space player. It is telling, I think, that the fully assimilated Training team has no Space player. ");
wireUpAchievement("Eye Killer Accepts Bribe", "the cult of the harvest", "In Truth, even in the RP the Eye Killer originates from, Camellia was both her and not her. Alternate selves are ICs favorite concept.");
//its inteded that some of these are guessable...but then you miss the context of the achievement its paired to and truths comment (unless you waste, but then you miss the context of the scene, unless you waste, understand the code enough, then go and view and unlock it normally now that you know its trigger condition)
wireUpAchievement("Orchestral Trumpet", "the rot takes all in the end", "The trumpet sounds the begining of the end. Both in our world, and the Corporation LeeHunter came from.");
wireUpAchievement("Khana Will Be Seen", "the truth is layered", "Attention is a powerful thing. A gift to give to some. A curse to burden others.");
wireUpAchievement("Gun-Tan Kills A Random Player", "we miss you", "Temporally Reversed Joke Deployed: But Our Aim Is Getting Better");
wireUpAchievement("No Way Out", "you cannot go forward", "I am the Words. The Words are everything. Where the Words end the world ends. You cannot go forward in an absence of space. Repeat.");
wireUpAchievement("Solemn Death", "you get it", "Zampanio needs you to live a very long life.");
wireUpAchievement("Repentant", "you is needed", "Nothing is with meaning without a 'you' to understand it. Do not be so quick to spend your life.");
wireUpAchievement("Late With Starbucks", "you should play it", "In Truth, its important to make time for Silly.");
wireUpAchievement("Food Court Clone", "zampanio is a really good game", "In Truth, it is very difficult to STOP the expanding food court from cloning people. It became canon from sheer force of will.");

//wireUpAchievement("Wrong",  "test_password","TBD");
wireUpAchievement("Become A Mannequin", "zampanio", "What IS it with Zampanio and Mannequins?");
wireUpAchievement("Yongki Kill", "mad oracles of doom", "Doom is fate. The universe decides. But the Universe is sapient, an Echidna, in my branch of Zampanio. What does it mean when something Sapient decides your fate?");
wireUpAchievement("Trickster Closer Spawns", "false face becomes real", "... I do not like thinking about the me I am without my False Face. This is my emotional support positivity. Do not take it from me.");


wireUpAchievement("Harvest Book Shopped!", "harvest fruit", "The Harvest, in truth, is a community created God from the halloween party 'Lavinraca'. She invaded Zampanio for reasons that should be obvious to anyone who knows either it or Lavinraca.");
wireUpAchievement("Bitten In Half", "beware oblivion is at hand", "Neville's avoidant tendancies are, in Truth, a huge problem that all of training simply agrees is not a problem. It's literally fine. ");
wireUpAchievement("Quatro Blade Hid The Body", "rot", "The rot takes all in the end. Rotation ciphers are often called rot13 (or however many they rotate by). In Truth, a coincidence.");


wireUpAchievement("Romance Interaction", "a image example", "Let us be honest here: It would be more impressive if you did not see romance. Organics are, quite frankly, obsessed with it.");