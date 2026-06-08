
//immediately envoked function does't run into namespacign issues
(() => {
    const link = 'http://knucklessux.com/PuzzleBox/Secrets/misc/waste_guide_byMediumSquaredOfSpiders.pdf'
    const src = `a 'waste'
    by my definition
    is sommeone
    who skips enjoying an experience the traditional way
    in favor of
    spoilers
    hacks
    cheats

    its based on a homestuck fandom joke
    but i twisted it till it meant something new

    if i make a game
    and you cheat
    the game is wasted on you

    but jokes on you

    i don't make games

    i make simulations

    things that look like other things
    and you're supposed to take it apart and look at its guts
    so
    go nuts
    learn to cheat
    think like a waste
    maybe you'll learn something
    maybe you'll have more fun than you woulda with a normal game
    i have more fun making these weird little things

    
    
    <a target ="_blank" href = '${link}'>${link}</a>`

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()

