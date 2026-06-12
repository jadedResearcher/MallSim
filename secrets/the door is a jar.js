
//immediately envoked function does't run into namespacign issues
(() => {
    //entrance, four rooms and coffin, each with a sacrifice before and hydration after.
    const mind = true; //will you sacrifice remembering your thoughts
    const eyes = true; //will you sacrifice remembering your senses
    const tongue = true; //will you sacrifice remembering your words
    const arms = true; //will you sacrifice remembering your actions
    const legs = true; //will you sacrifice remembering your agency



    class METALStory {
        text = "This is text";
        mind = "This is mind text";
        eyes = "This is eyes text";
        tongue = "This is tongue text";
        arms = "This is tongue text";
        legs = "This is legs text";
        hydration = "This is hydration text"

        constructor(text, m, e, t, a, l, h) {
            this.text = text;
            this.mind = m;
            this.eyes = e;
            this.tongue = t;
            this.arms = a;
            this.legs = l;
            this.hydration = h;
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

    let room = createElementWithClassAndParent("div", results, "room");
    let style = createElementWithClassAndParent("style", results);
    style.innerHTML = `.room{
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    background: black;
    display: flex;
    justify-content: space-between;
    perspective: 1000px;

    .jar{
        cursor:pointer;
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

        const doorAndStory = () => {
            console.log("JR NOTE: door and story")
            const story = rand.pickFrom(remaingStories);
            const door = createElementWithClassAndParent("img", room, "jar");
            door.src = "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/door_without_rug.png";
            door.onclick = () => {
                //console.log("JR NOTE: need to sacrifice something, then show new room, tell the story, then tell the METAL, then hydrate, then let you pick next door")
                alert("TODO " + story.text);
                removeItemOnce(remaingStories, story)
            }
        }

        //the three doors aren't guaranteed to be different from each other
        //i don't care
        if (remaingStories.length > 0) {
            doorAndStory();
        }

        if (remaingStories.length > 1) {
            doorAndStory();
        }

        if (remaingStories.length > 2) {
            doorAndStory();
        }
    }

    init();

})()

