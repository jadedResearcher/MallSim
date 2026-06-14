
//immediately envoked function does't run into namespacign issues
(() => {



    const clickAudio = new Audio("http://farragofiction.com/ZampanioSim/audio/web_SoundFX_254286__jagadamba__mechanical-switch.mp3");
    const musicAudio = new Audio("http://farragofiction.com/ZampanioSim/audio/slide.mp3");
    musicAudio.volume = 0.25;
    const doorAudio = new Audio("http://farragofiction.com/ZampanioSim/audio/close_door_1.mp3");


    //entrance, four rooms and coffin, each with a sacrifice before and hydration after.
    let mind = true; //will you sacrifice remembering your thoughts
    let eyes = true; //will you sacrifice remembering your senses
    let tongue = true; //will you sacrifice remembering your words
    let arms = true; //will you sacrifice remembering your actions
    let legs = true; //will you sacrifice remembering your agency



    class METALStory {
        text = "This is text";
        mind = "This is mind text";
        eyes = "This is eyes text";
        tongue = "This is tongue text";
        arms = "This is tongue text";
        legs = "This is legs text";
        hydration = "This is hydration text"

        constructor(text, m, e, t, a, l, h) {
            console.log("JR NOTE: METALStory", { text, m, e, t, a, l, h })
            this.text = text ? text : this.text;
            this.mind = m ? m : this.mind;
            this.eyes = e ? e : this.eyes;
            this.tongue = t ? t : this.tongue;
            this.arms = a ? a : this.arms;
            this.legs = l ? l : this.legs;
            this.hydration = h ? h : this.hydration;
        }
    }

    class SeededRandom {
        internal_seed;
        initial_seed;

        constructor(seed) {
            this.initial_seed = seed;
            this.internal_seed = seed;
        }

        //default is zero and one, type is inferred to be a number from this
        nextDouble = (min = 0, max = 1) => {
            this.internal_seed = (this.internal_seed * 1664525 + 1013904223) % 4294967296;
            const rnd = this.internal_seed / 4294967296;
            return min + rnd * (max - min);
        }

        getRandomNumberBetween = (min, max) => {
            return Math.floor(this.nextDouble() * (max - min + 1)) + min;
        }

        pickFrom = (array) => {
            return array[this.getRandomNumberBetween(0, array.length - 1)];
        }

        //if you have say, a string "hello world my name is"
        //and you have a chunk size of 3, you'd get something like
        //"worhel na islo " etc
        shuffleInChunks = (array, chunkSize) => {
            const chunks = chunkUpArray(array, chunkSize);
            this.shuffle(chunks);
            return chunks.flat();
        }

        shuffle = (array) => {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(this.nextDouble() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }
    }



    const createElementWithClass = (eleName, className) => {
        const ele = document.createElement(eleName);

        if (className) {
            ele.className = className;
        }
        return ele;

    }

    const createElementWithClassAndParent = (eleName, parent, className) => {
        const ele = createElementWithClass(eleName, className);
        parent.append(ele);
        return ele;
    }

    function removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

    const coffinTime = () => {
        const coffinEle = createElementWithClassAndParent("img", room, "coffin");
        coffinEle.src = "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/wanda_coffin.gif"
        coffinEle.style.cssText = `    height: 269px;
    image-rendering: pixelated;
    margin-left: auto;
    margin-right: auto;
    margin-top: 31px;
    margin-bottom: 31px;
    z-index: 300;
    position: relative;
}`;

        const ele = createElementWithClassAndParent("div", document.querySelector("body"), "fullscreen");
        ele.style.backgroundImage = "url('http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/dirt.gif')"
        //TODO each time you go DOWN into the coffin, make dirt less opaque, once its maxed out make it darker and darker


    }




    //after you tell a story
    const stories = []

    //every time you tell a story, pop one off
    let remaingStories = []
    //the simplest form of personalization. You share your story order with everyone near you.
    //if you mostly know people irl and tell them that, say, the ant story is to the left...that will be true. 
    //but if you have friends far away, they'll tell you you're wrong
    //the very thing that can make you feel connected to one group can isolate you from another
    //theres something unfair about that
    let rand = new SeededRandom(new Date().getTimezoneOffset());
    results.innerHTML = "..."

    let roomContainer = createElementWithClassAndParent("div", results);
    musicAudio.loop = true;
    roomContainer.onclick = () => {
        clickAudio.play();
        if (musicAudio.pause) {
            musicAudio.play();
        }
    }

    let room = createElementWithClassAndParent("div", roomContainer, "room");
    let storyEle = createElementWithClassAndParent("div", roomContainer, "story");
    storyEle.innerHTML = `You find yourself at the entrance of a poorly constructed maze.
<br><Br>
You have 0 gopher gold! `;

    let style = createElementWithClassAndParent("style", results);
    //https://www.tumblr.com/jadedresearcher/819311606942105600?source=share
    //i briefly let google try to make this css to see if it was just claude that sucked at code
    //it made it ten times as big and it still barely worked
    //and if i tried to tweak anything it folded like a house of cards
    //i just rolled it back to my original version
    style.innerHTML = `

    .fullscreen{
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 100;
        top: 0px;
        opacity: 0.1;
    
    }

    button{
        background: black;
    color: white;
    outline: none;
    border: none;
    padding: 13px;
    border-radius: 13px;
    }

        .story{
            width: 612px;
            margin-left:auto;
            margin-right: auto;
            margin-top: 31px;
            border: 5px ridge black;
            padding: 31px;
            background-color: rgba(100,100,0,0.5);
                z-index: 301;
    position: relative;
        }
    
    
    .room{
    width: 612px;
    margin-left: auto;
    margin-right: auto;
    background: black;
    display: flex;
    justify-content: space-between;
    perspective: 1000px;

    .jar{
        cursor:pointer;
    }

    .jar:hover{
        filter: saturate(1.5)
    }
    .jar:nth-child(1 of .jar){
        transform: rotate3d(0, 10, 0, 72deg) scaleX(-1) translate(50%, 10px);
    }

        .jar:nth-child(2 of .jar){
        transform: translateZ(-500px);
    }

        .jar:nth-child(3 of .jar){
        transform: rotate3d(0, 10, 0, -72deg) translate(50%, 10px);
    }

    
    `;



    const init = () => {
        room.innerHTML = ""

        remaingStories = [...stories];
        const door1 = createElementWithClassAndParent("img", room, "jar");

        const door = createElementWithClassAndParent("img", room, "jar");
        door.src = "http://farragofiction.com/ZampanioHotlink/northdoor.PNG";

        progressDemandsSacrifice();

    }

    const newLineToBR = (text) => {
        return text.split("\n").join("<br>");
    }

    const tellStory = (story, sacrifice) => {
        storyEle.innerHTML = `Very well. Your ${sacrifice} accepted.<br><br>
            <hr>
                ${newLineToBR(story.text)}
                <br><br><hr><br>
                ${mind ? newLineToBR(story.mind) : "It's hard to think..."}
                                <br><br><hr><br>
                ${eyes ? newLineToBR(story.eyes) : "Your vision is getting blurry..."}
                                <br><br><hr><br>

                ${tongue ? newLineToBR(story.tongue) : "The words don't seem to come."}
                                <br><br><hr><br>

                ${arms ? newLineToBR(story.arms) : "What's the point of even trying?"}
                                <br><br><hr><br>

                ${legs ? newLineToBR(story.legs) : "It hardly seems worth the effort to move."}

                            <br> <br><hr><br>

                ${newLineToBR(story.hydration)}



            `;
        renderDoors();

    }


    const progressDemandsSacrifice = (story) => {
        if (!story) {
            story = new METALStory("You enter the maze, sure that the answers you seek lie deep within.", "You are eager to unravel the puzzles that surely lie within.", "Your eyes take in every detail, your ears strain to absorb every sound. The smells, even the flavors, all may be clues.", "You can't wait to tell everyone about what you find within.", "Your hands clench and unclench just imaging what proof you'll be able to take out with you.", "Your legs are just itching to carry you deeper and deeper within. You feel like you could walk forever!", "You are not even a little bit thirsty.")
        }
        storyEle.innerHTML += `<br><Br>Progress demands sacrifice. What are you willing to sacrifice?`;
        const buttonContainer = createElementWithClassAndParent("div", storyEle);
        buttonContainer.style.cssText = `display: flex;
                justify-content: space-between;
                margin-top: 13px;`
        if (mind) {
            const button = createElementWithClassAndParent("button", buttonContainer);
            button.innerText = "My Mind"
            button.onclick = () => {
                mind = false;
                tellStory(story, "mind is");
            }
        }

        if (eyes) {
            const button = createElementWithClassAndParent("button", buttonContainer);
            button.innerText = "My Eyes"
            button.onclick = () => {
                eyes = false;
                tellStory(story, "eyes are");
            }
        }

        if (tongue) {
            const button = createElementWithClassAndParent("button", buttonContainer);
            button.innerText = "My Tongue"
            button.onclick = () => {
                tongue = false;
                tellStory(story, 'tongue is');
            }
        }

        if (arms) {
            const button = createElementWithClassAndParent("button", buttonContainer);
            button.innerText = "My Arms"
            button.onclick = () => {
                arms = false;
                tellStory(story, "arms are");
            }
        }

        if (legs) {
            const button = createElementWithClassAndParent("button", buttonContainer);
            button.innerText = "My Legs"
            button.onclick = () => {
                legs = false;
                tellStory(story, "legs are");
            }
        }


    }




    //remember that elements with id are exposed as global vars
    //so #results is results
    const renderDoors = () => {
        room.innerHTML = '';
        console.log("JR NOTE: rendering things.")
        if (remaingStories.length === 0) {
            coffinTime();
        }




        const doorAndStory = (direction) => {
            console.log("JR NOTE: door and story")
            const story = rand.pickFrom(remaingStories);
            console.log("JR NOTE: story is: ", story)
            const door = createElementWithClassAndParent("img", room, "jar");
            door.src = "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/door_without_rug.png";
            door.onclick = () => {
                console.log("JR NOTE: need to sacrifice something, then show new room, tell the story, then tell the METAL, then hydrate, then let you pick next door")
                const rivals = room.querySelectorAll(".jar");
                for (r of rivals) {
                    if (r !== door) {
                        r.style.opacity = 0.1;
                    }
                }

                storyEle.innerHTML = `You have chosen the door to the ${direction}.`
                progressDemandsSacrifice(story);

                removeItemOnce(remaingStories, story)
            }
        }
        let numDoors = 0;

        //the three doors aren't guaranteed to be different from each other
        //i don't care
        if (remaingStories.length > 0) {
            doorAndStory("West");//yes yes yuck it up, west is real but south isn't here. ironic isn't it?
            numDoors++;
        }

        if (remaingStories.length > 1) {
            doorAndStory("North");
            numDoors++;

        }

        if (remaingStories.length > 2) {
            doorAndStory("East");
            numDoors++;

        }

        storyEle.innerHTML += `<br><br><br><hr><br>There are ${numDoors} doors before you. Which will you choose?`
    }

    //            story = new METALStory("You enter the maze, sure that the answers you seek lie deep within.", "You are eager to unravel the puzzles that surely lie within.", "Your eyes take in every detail, your ears strain to absorb every sound. The smells, even the flavors, all may be clues.", "You can't wait to tell everyone about what you find within.", "Your hands clench and unclench just imaging what proof you'll be able to take out with you.", "Your legs are just itching to carry you deeper and deeper within. You feel like you could walk forever!", "You are not even a little bit thirsty.")

    stories.push(new METALStory(
        `The walls are little mail slots filled with cooing pigeons. There is feather dust and dried guano in the air. The walls are...moving? No...its ants. Every single surface is covered in ants. And something smaller, too. You can't quite make out what it is. The birds are covered in ants. They don't seem to notice. Ants crawl over their eyes and they don't even blink. The dust and stench of guano coats your lungs. You can't breathe. <br><br>You find 13 GOPHER GOLD! `, `You remember... 

It was a puzzle at first. You and your best friend trying your best to keep those two little baby pigeons alive.

Orphans. 

The guy who worked at the gas station said that its parents rejected them, but you could drag out the bulky plastic blender (Aunt Geraldine didn't need it anymore, the old bat) and blend up some frozen peas and give the green mush to the squeaking birds. 

God they were ugly. 

Little spikes poking out from everywhere, eyes covered in thin membranes... 

But they were so desperate for the food you could give. 

You didn't know.

How could you know.

How could you not. 

You were a kid but you still should have known to check an encyclopedia. 

Or called the library?

Something.

Baby birds need to eat so much more than you thought.

And one day, after days and days of trying your best, after school, and before the bus came in the morning...

You found them...

Covered...

Covered in ants. 

You cried and cried and cried because you hadn't KNOWN.

`, `You remember...

Struggling to see. 

To see if the motion was only the ants or if either of the fragile little baby birds were alive, if they could be saved...

Staring so carefully but not willing to get any closer...

Watching the shifting mass silently.

Your best friend was late.

And when you heard the spokes of his bike (you had helped him pin playing cards to the wheels to make cool sounds) you realized you couldn't let him see this.

You couldn't.

Your grabbed the little box the birds had lived in for so many days as you tried to nurse them back to health and you THREW it with all your young body's  might, threw it into the garbage can out behind the gas station.
`, `You remember...

Trying to find the words.

Trying to explain.

Your best friend was sobbing. Why did you hurt the baby birds? 

Why did you throw them like that? 

Why were you always such a JERK.

Your tongue felt numb in your skull. Thick and wrong. 

The words just wouldn't come...

And then, almost like someone else was talking, they came out all wrong.

"They were just some stupid birds, Todd! Who CARES!"
`, `
You remember...

Your best friend was always stronger than you. 

Any time you play fought he always ended up pinning you down and rubbing your face into the dirt while laughing. 

When he hit you, so long ago, on that hot day there was no dirt when you hit the ground. Just blistering asphalt smearing oil and grime into your tear streaked cheeks. 

You remember you fist balling up, wanting to hit back, wanting to FEEL like you could do something, like it was HIS fault the baby birds had died, and not yours.

But you didn't. 

It wasn't his fault.

You messed everything up.
`, `You remember...

Running away.

As fast as your tiny legs could take you. 

Just scrambling to your feet and putting your back to the gas station and RUNNING. 

Your best friend never could catch you, when you really put your mind to running. 

And this time... there was no playful game of tag. No hide and seek. 

No silly game you were playing.

You ran and ran and ran until you didn't even know where you were anymore, your breath coming in great heaving gulps. Until you lay panting and sobbing along the side of a road, unnoticed, too exhausted to think, to open your eyes. Grateful there was no one around to demand explanations, or try to hurt you. 

Running away was always the safest bet. 
`, `Before you leave the room, you take a cool sip of water from the provided jug. 

The glass glistens with condensation, as if the room were much hotter than it was, sweltering like a summer day on black asphalt. 

As the water hits the back of your throat, you gulp, almost compulsively.  The water is gone in a flash and you remember... 

You remember your best friend staring at you accusingly. "If you had just TOLD me, I would have UNDERSTOOD! You jerk! You idiot! You always leave me in the dark!" and the sheer relief you felt as he collapsed next to you on that roadside. 

"Are we still friends?"

"Idiot. Of course we are."  He pauses, you hear him still besides  you. "Sorry for hitting you so hard. "

"Sorry for not telling you"
`))

    stories.push(new METALStory(`There are wet paint signs everywhere.
You aren't sure if you've seen something like this before.
The paint glistens.
You want to touch it...but suddenly are seized up with the fear of leaving a mark. Of an
indelible reminder of your passage here. You could only leave this room worse for you
presence, you're certain of it.
`, `You remember...

Trying to figure out how teachers always seemed to know when you were the one to cause trouble. 

Your best friend somehow always went unremarked. They acted like he was a perfect angel even when he was helping you do whatever it was  but if you so much as sneezed wrong it was detention. 

You hadn't known that that wet paint sign was actually a big deal! You touched up paint all the time, in Mr Smith's class!  Who knew walls were so different?
`, `You remember...

Staring intently at the wet paint on the wall. The perfect imprint of a little beetle, trundling along, leaving its little footprints (leg prints?) in a line against the industrial grey-green of the stone. 

Did the little guy realize he was leaving so obvious a trail?

What would happen when he (or was it a she? You squinted but decided you couldn't tell) finally tracked onto some unpainted surface?

You suddenly wanted to see it. 

You fished out a penny from you pocket and placed it in the path of the little bug and waited patiently for it to step onto it. 

Success!

The tiniest little trail of six legs leaving paint marks against the bright copper. 
`, `You remember:

Mr Smith's mouth tightening into a frown. 

You remember the way you fell into yourself.

"Wodin...I expected better from you. I told Principal Rogers you were going to turn a new leaf. You're a Senior now, you should know better." .

The words wouldn't come.

"Wodin. We've talked about this. I know you mean well. I know you aren't trying to disrespect me. But you can't just start vandalizing the gym's new coat of paint! What were you THINKING? Just tell me."

The words wouldn't come.

You felt the moment you lost Mr Smith. Lost the one adult in your life who had still believed in you.

"Fine. Three days detention and if I see you here after hours again, you can expect I'll be escorting you out."

`, `You remember...

Folding your arms against yourself. Pressing yourself into less and less space.

Keeping your hands to yourself. 

Keeping your grubby little mitts off the walls, off other peoples things. 

All you did was ruin everything you touch.

Well then.

Fine.

You didn't need to touch anything.

Not ever again.
`, `You remember...

The lactic burn in your thighs as you walked in the brisk autumn day. 

You couldn't sit still.

Aunt Geraldine didn't get back from work for at least another hour.

Mr Smith wouldn't let you stay after school anymore. Not since what you did.  What you ruined.

Fine. 

You didn't need them.

You didn't need anyone.

You could just keep yourself busy.

Walk around town. 

All sorts of things you could do if you weren't afraid of staying a little active.

If you loitered in any place too long adults would yell at you, but that's fine. 

You got it. 

You kinda brought the mood down just by existing in a place.

That's fine

You can keep moving.

Can't ruin anything if you don't stay too long!
`, `Before you leave the room, you take a cool sip of water from the provided jug. 

The clear, refreshing taste of it sparks a memory...

Your best friend asking if you wanted to spend the night...  You worried he'd get in trouble, inviting you over so much, but he just shrugged and said his parents liked you. 

He didn't mention he tended to invite you over more when Aunt Geraldine was out of town. 

He didn't mention that the grocery store decided you couldn't 'loiter' there anymore when you needed to get some necessity or another. 

He just quietly, without fanfare, made space for you in his life. 

You had posters in his room. Forgotten socks. At least a half dozen action figures from when you were both younger. Finger prints smudged the paint of his wall and more than half probably belonged to you, over the years.

Some bitter sweet taste of the water brought you back to the present. Ah. looks like there was a lemon slice at the bottom of the glass.

Time to move on.
`));
    stories.push(new METALStory(`You are in between two metal rollers, squeezing your body tight in between. You shiver
at the cold metal over your skin, then look forward: the room is made of the contraption,
metal drums to metal drums, all going in different directions, forming a small industrial
maze. The only way to progress forward is to move through them, stretching your body
further.

It looks agonizing.

But you must know.

The pain is unspeakable. You can't hear yourself howl over your ribs cracking and skull
fracturing, organs flattening against the shards of bone, the motion repeated again and
again.

But you do see the end of it. What's left of your hand reaches forward; you flinch as your
flesh comes in contact with the brick floor, and the rest of you falls forward onto it. 

You take a deep breath. 

It's okay. 

It's fine. 

It was worth it. 

...

Right?

A small dispenser next to you plays a small fanfare, and after some churning, it
dispenses 8 cents into your hand, coins bouncing off the exposed bone through it.
Damn it. This isn't gopher gold.

`, `You remember...

Thinking to yourself that the only way out is through. 

Yeah, it sucked having to work almost full time at the gas station while ALSO going to class, but what were you going to do?

It was enough to pay tuition, to get that fancy computer your best friend was so jealous of, enough to have food to eat.... 

Yeah, other students didn't have to suffer as much but what else was new. 

Hell, if anything, it was kind of novel, being trusted so much as an adult. 

The new experience was unsettling, almost... Like a song stuck in your head you couldn't quite remember. No one asked you to stop loitering. No one asked if you were supposed to be places. If you had money? If you had a name badge while working? You were supposed to be there.

You wondered if that's how Todd felt all the time. Like he was just exactly where he was supposed to be and no one was going to remark on it. 

You thought it probably was.

You rolled the thought over in your head for a while while sweeping the gas station floor while customers entirely failed to materialize and decided you were glad. 

He deserved that. 
`, `You remember...

Feeling like your eyes were going to start bleeding from sheer exhaustion.

Bleerily looking up at a chalkboard covered in notes you could barely make out.

The morning shift hadn't shown up until NINE AM. And had the sheer AUDACITY to wink at you when she did, bright eyed and bushtailed with coffee from the fancy place down the street. 

She cheerfully offered you a bagel and you ate it out of principal but like hell you were going to consider that a debt repaid.

You barely made it to class on time. 

You could barely keep your eyes open.

Fuck your life.
`, `You remember...

Licking your lips nervously. Dry tongue. Dry throat. Dry lips. Could teeth be dry? They felt dry.

You weren't a narc. 

You weren't.

But Mr Ripley... He had to know you couldn't pull a double shift again. Not that he scheduled you for one.

The words wouldn't come. 

Mr Ripley told you that if you were late again he was docking your pay.

The words wouldn't come.

He told you your replacement would get here at 5am and you were lucky he didn't schedule you to 6, with how late you got here today.

The words wouldn't come.

You weren't a narc. Your asshole coworker probably had some reason for being so late last night. 

It would be fine.

`, `You remember...

Your best friend coming to find you at 8am, arms filled with doughnuts and coffee and  a concerned smile (concerned smile #3, you noted, half delirious with exhaustion). 

He waited with you for another hour and a half (luckily it was a Friday and you didn't have classes on Fridays). 

And then, with a quiet confidence, stepped up to your asshole coworker and asked her if they were hiring. What the schedule was like. Did they make you work double shifts? How long was night shift.

You remember your asshole coworker suddenly squeaking, dropping the clipboard she was holding (full of applications you knew your best friend had no intention of filling out) and running over to you.

"Oh my GOSH I'm so sorry, Wodin! I, like, TOTALLY forgot that you were supposed to get off shift at 6!"
`, `You remember...

Wanting to quit that job at the gas station. 

Wanting to leave and never come back. 

Hell, you wanted to quit school.

Even before the double shift you were running on fumes. 

You felt like your life was  squeezed until it was about to tear, like bubblegum stretched out between two fingers. Work, school, keeping up with Aunt Geraldine who of course suddenly was traveling a lot less for work and kept wanting to "spend TIME together Wodin, we never see each other anymore". 

But every time you thought about quitting something straightened in your back. 

Your best friend believed in you.

Believed that if you got a degree you'd have that 'upwards mobility' that one professor always called it. 

That you'd lift yourself up by your bootstraps out of the shitty life you thought you were stuck in.

You just had to... keep letting yourself be stretched. 

Because at the end of the day...you just... wanted to know if he was right. 
`, `Before you leave the room, you take a cool sip of water from the provided jug. 

Clear and cold and with a surprising sweetness. 

It reminds you of the coffee and  donuts your coworker at the gas station started bringing for you every friday. An apology, she always said, no matter how much you told her it was water under the bridge.

Of Mr Ripley saying you were a dependable worker for taking on all those double shifts.

Of the regulars who called your name out at three am when they wanted a friendly face and a pack of smokes. 



Of the place you made for yourself, bit by bit, agonizing pull by agonizing pull, until you were the right shape. 

The suffering WAS worth it.
`));

    stories.push(new METALStory(`You are in an infinite hallway. There is no escape. 
`, `You remember...

Just how incredible a rush it was.

Clue after clue. 

Secret after secret.

Each one more devious, more mind-bending than the last!

Of COURSE the Killer's cipher turned out to be 'THE TRUTH IS LAYERED'. 

Why wouldn't it?

The fact that the media hadn't caught on at all was hilarious to you.

Everyone was following your blog, waiting for you to figure out the next clue (you finally mattered you finally had a pace to belong you were finally smart enough!)

Just one more clue...

Just one more breadcrumb...

Just one more secret!
`, `You remember...

Your eyes widening when you realized that the Killer's clues all lead to one unescapable conclusion: They were a fan of Zampanio.

You laughed until you cried at the absurdity. What next? Were they going to hint they were actually John Titor, that time travel hoax?

The Zampanio hoax wasn't even a GOOD internet rumor. It wasn't even hard to disprove it. At least the time travel hoax could just claim any predictions it made were wrong because the 'timelines shifted" or whatever. 

You couldn't even imagine killing people in order to ... you didn't even know.

Make more people aware Zampanio existed?

Your eyes narrowed as you realized the truth. You didn't care.

You didn't care how absurd this Killer was.

You were going to catch them. 

And you were going to get the fame, the attention, the accolades you deserved. 

No more gas station burritos for you!

`, `You remember...

Your tongue dry. Your throat cracked. Your eyes feeling like sandpaper as you stared at the glow of your computer monitor. 

Digging through forums. 

Reading threads. 

Pouring over grainy scans of photos of victims. 

You remember almost not responding to Todd pounding on your door. 

Demanding you open up.  That you talk to him. 

It took a few tries to work up enough saliva to call back through the door. To say you were busy, to come back later.

At first  you weren't sure he even heard you... You can't remember how many days it had been at that point since you talked out loud...

Finally, you heard, softly whispered, but somehow clear... "I'm worried about you, Wodin... don't... don't let this take you away from me..."

The words wouldn't come.

Eventually, you heard the soft footsteps move away.

You were alone again.
`, `You remember the thrill, the sheer adrenaline of realizing you had tracked the Killer down. That their next victim was due to be right here, in your home town of Westerville, Ohio. 

You deciphered the clues, you calculated the exact location to expect the Killer to show up...

All you needed to do was wait. 

Get one single photo as proof.

And let the good times roll in.
`, `You remember your legs twitching uselessly.

Kicking out and splashing into the spreading pool of your own blood. 

You don't remember the cut that severed some important muscle, just the flop of meat onto wet as the twitching suddenly stopped.

You remember wanting to run. Wishing you had run.

You remember a stillness creeping over you.

Of your body bit by bit coming apart.

Until motion stilled utterly, your lungs ceasing their toil...your heart finally setting down its burden.

You finally gained your rest.
`, `You almost go to take a sip of the pitcher of water but realize its filled with blood. 

Your throat is parched, but you move on to the next room.

Maybe you will find what you are looking for, there.
`));


    //    stories.push(new METALStory(``,``,``,``,``,``,``));


    init();




})()

