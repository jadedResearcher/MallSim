
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
            this.text ||= text;
            this.mind ||= m;
            this.eyes ||= e;
            this.tongue ||= t;
            this.arms ||= a;
            this.legs ||= l;
            this.hydration ||= h;
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




    //after you tell a story
    const stories = [new METALStory(),
    new METALStory(),
    new METALStory(),
    new METALStory()]

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
    style.innerHTML = `

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
            background-color: rgba(100,100,0,0.5)
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
        renderDoors();

    }


    //remember that elements with id are exposed as global vars
    //so #results is results
    const renderDoors = () => {
        console.log("JR NOTE: rendering things.")
        if (remaingStories.length === 0) {
            alert("JR NOTE: todo coffin time")
        }

        const tellStory = (story, sacrifice) => {
            storyEle.innerHTML = `Very well. Your ${sacrifice} accepted.<br><br>
            <hr>
                ${story.text}
                <br><hr><br>
                ${mind ? story.mind : "It's hard to think..."}
                                <br><hr><br>
                ${eyes ? story.eyes : "Your vision is getting blurry..."}
                                <br><hr><br>

                ${tongue ? story.tongue : "The words don't seem to come."}
                                <br><hr><br>

                ${mind ? story.arms : "What's the point of even trying?"}
                                <br><hr><br>

                ${legs ? story.legs : "It hardly seems worth the effort to move."}




            `;
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

                storyEle.innerHTML = `You have chosen the door to the ${direction}.
                <br><Br>Progress demands sacrifice. What are you willing to sacrifice?`;
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

        storyEle.innerHTML += `<br><br>There are ${numDoors} doors before you. Which will you choose?`
    }

    init();

})()

