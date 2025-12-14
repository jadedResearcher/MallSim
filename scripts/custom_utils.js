/*i think originally i had the idea that i'd use the remote utils from eydlr and anything new i needed would be here
cuz i like chaos
but while thats fine and good for a mini sim
it was REALLY hard for something bigger wher ei had to keep checking the file
so
whoops
single function file
probably should move it back to the utils file but like
i kinda like the history of it
*/
const classpectFromThemeList = (rand, themes) => {
    const name = pickARandomThemeFromListAndGrabKey(rand, themes, PERSON, true);
    const personal_adj = pickARandomThemeFromListAndGrabKey(rand, themes, ADJ, true);
    const object = pickARandomThemeFromListAndGrabKey(rand, themes, OBJECT, true);
    const location = pickARandomThemeFromListAndGrabKey(rand, themes, LOCATION, true);
    const compliemnt = pickARandomThemeFromListAndGrabKey(rand, themes, COMPLIMENT, true);
    const insult = pickARandomThemeFromListAndGrabKey(rand, themes, INSULT, true);

    const templates = [`${personal_adj} ${name}`,
    `${compliemnt} ${name}`,
    `${insult} ${name}`,
    `${name} of the ${location}`,
    `${name} of ${object}`,
    `${object} ${name}`,
    `${location} ${name}`,
    `${personal_adj} ${object} ${name}`,
    `${personal_adj} ${location} ${name}`]

    return "The " + rand.pickFrom(templates);
}

