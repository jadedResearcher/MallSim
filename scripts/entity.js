//keyed by title (names can be lost)
const all_entities = {};


const getFamilyOfEntity = (person) => {
    const ret = [];
    for (let [key, value] of Object.entries(person.relationships)) {
        if (value.familial) {
            const person = all_entities[key];
            ret.push(person);
        }
    }
    return ret;
}

const getRomanticPartnersOfEntity = (person) => {
    const ret = [];
    for (let [key, value] of Object.entries(person.relationships)) {
        if (value.romantic) {
            const person = all_entities[key];
            ret.push(person);
        }
    }
    return ret;
}



const randomParty = (rand) => {
    //good enough party size for sburbsim but maybe a bit crowded for a mall expedition
    //"The others gawk at the insubordination. He's trying out six total this time. He thinks he almost has the dynamic perfected. "
    const party_size = rand.getRandomNumberBetween(2, 6);
    const ret = [];
    for (let i = 0; i < party_size; i++) {
        ret.push(randomEntity(rand));
    }
    initializeRelationshipsForParty(rand, ret);
    ret[0].leader = true;
    return ret;
}

const initializeRelationshipsForParty = (rand, party) => {
    for (let x of party) {
        for (let y of party) {
            const value = rand.getRandomNumberBetween(-113, 113);
            let romantic = false;
            let familial = false;
            const roll = rand.nextDouble();
            //if you feel strongly, equal odds of being familiy or partners
            //but still chance of not yet being partners
            if (Math.abs(value) > 50 && roll > 0.60) {
                familial = true;
            } else if (Math.abs(value) > 50 && roll > 0.4) {
                console.log("JR NOTE: it should be romantic", romantic)
                romantic = true;
            }
            x.relationships[y.title] = new Relationship(value, romantic, familial);
        }
        //don't have a relationship with yourself
        delete x.relationships[x.title];
    }
    //now that all are done, clean up romance and family to make them symmetrical
    //do family first so theres no glitches

    for (let person of party) {
        for (let relationship_key of Object.keys(person.relationships)) {
            const other_person = all_entities[relationship_key];
            other_person.relationships[person.title].syncFlagsToOtherRelationship(person.relationships[relationship_key])
        }
    }
}

const randomEntity = (rand) => {
    //sburbsim had class, aspect and two interests, this is basically that
    const no_food_themes = getAllThemeKeysMinusFood();
    const themes = [rand.pickFrom(no_food_themes),
    rand.pickFrom(no_food_themes),
    rand.pickFrom(no_food_themes),
    rand.pickFrom(no_food_themes)]
    return new Entity(themes, rand);

}

class Relationship {
    value = 0; //can  be negative
    romantic = false;
    familial = false; //if familial can not flip to romantic

    constructor(value, romantic, familial) {
        this.value = value;
        this.familial = familial;
        //so i can prevent both romance and family happening accidentally
        this.setRomance(romantic);
    }

    //not value, just romance/family status
    syncFlagsToOtherRelationship = (other_relationship) => {
        if (other_relationship.familial) {
            this.familial = true;
        }
        this.setRomance(other_relationship.romantic);
    }

    setRomance = (value) => {
        if (this.familial) {
            this.romantic = false;//no matter what
        } else {
            console.log("JR NOTE: its okay to be romantic")
            this.romantic = value;
        }
    }
}

class Entity {
    name = "Jane Doe"; //JR will probably steal this though, especially if you Join The Loop
    themes = [];
    stolen_name = false;
    title = "Null of Null";
    leader = false; //in sburbsim this decided ectobiology, who knows what this does, if anything, here
    //keyed by other persons title
    relationships = {};
    wasted = false; //same thing as Joining The Loop (because if you have wasted, why just passively let the end of the world end you? no, instead hook yourself up to Wanda's bullshit spiral and let yourself be dragged to the next universe, all fresh and pristine)
    //eventually things like inventory, relationships and stats
    //themes decide all that, themes decide everything
    //basically homestuck classpects

    constructor(themes, rand) {
        this.name = `${rand.pickFrom(first_names)} ${rand.pickFrom(last_names)}`;
        this.themes = themes;
        this.title = classpectFromThemeList(rand, themes);
        all_entities[this.title] = this;
    }

    nameHTML = () => {
        if (this.stolen_name) { //lol names suck, why bother with them? so much easier to know people by what they're doing, right?
            return this.titleHTML();
        }
        return `<span class='player-name'>${this.name}</span>`;
    }

    titleHTML = () => {
        if (this.wasted) {
            return `<span class='player-wasted-title'>${this.title}</span>`;
        }
        return `<span class='player-title'>${this.title}</span>`;
    }
}