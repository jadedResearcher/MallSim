class Game {
    players = [];
    rand;//only thing storing it, pass it to anything that needs to use it

    constructor(rand) {
        this.rand = rand;
        this.players = randomParty(rand);

    }

    handleIntro = (parent) => {
        const intro_container = createElementWithClassAndParent("div", parent, "story-beat");
        const general_intro = createElementWithClassAndParent("p", intro_container, "sub-story-beat");
        general_intro.innerHTML = `${this.players.length} members of the Church of the Faithful gather outside the Westerville Mall. Though it was many years ago each had given themself over to the faith, it is only today they partake in the most sacred ritual of the cult: Delving into the Blasphemous Mall and Relclaiming the Fruit of Wisdom hoarded by the monsters within.<br><br>Should they suceed, they will be granted eldritch knowledge of loops and spirals and endless ends. <br><br>Should they fail...one way or another, they will never leave this mall again.<br><br>They are prepared for their fate, ready to join the Inner Circle of the Cult at last.`;

        for (let player of this.players) {
            const ele = createElementWithClassAndParent("p", intro_container, "sub-story-beat");
            let text = "";
            if (player.leader) {
                text = `Leading the Faithful is ${player.nameHTML()}, or as they would soon come to be known, ${player.titleHTML()}.`
            } else {
                text = `There was also ${player.nameHTML()}, or as they would soon come to be known, ${player.titleHTML()}.`
            }

            //interests
            const backstory = pickARandomThemeFromListAndGrabKey(this.rand, player.themes, GENERALBACKSTORY, false);
            const compliemnt = pickARandomThemeFromListAndGrabKey(this.rand, player.themes, COMPLIMENT, false);
            const insult = pickARandomThemeFromListAndGrabKey(this.rand, player.themes, INSULT, false);
            text += ` ${titleCase(insult)} but ${compliemnt}, they ${backstory}. `

            //relationships
            const family = getFamilyOfEntity(player);
            if (family && family.length > 1) {
                text += `${family.map((i) => i.nameHTML()).join(", ")} are all members of their family.`;
            } else if (family && family.length === 1) {
                text += `${family[0].nameHTML()} is a member of their family. `;

            }

            const romanticPartners = getRomanticPartnersOfEntity(player);
            if (romanticPartners && romanticPartners.length > 1) {
                text += `${romanticPartners.map((i) => i.nameHTML()).join(", ")} are all members of their polycule.`;
            } else if (romanticPartners && romanticPartners.length === 1) {
                text += `${romanticPartners[0].nameHTML()} is their romantic partner. `;

            }

            ele.innerHTML = text;

        }
    }
}