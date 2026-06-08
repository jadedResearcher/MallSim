
//immediately envoked function does't run into namespacign issues
(() => {
    const linksRaw = `http://knucklessux.com/PuzzleBox/Secrets/WatcherOfThreads/marked_airport_channel%20(1).pdf
    http://knucklessux.com/PuzzleBox/Secrets/WatcherOfThreads/marked_bread_crumbs%20(1).pdf
    http://knucklessux.com/PuzzleBox/Secrets/WatcherOfThreads/marked_cute_animal_spam.pdf
    http://knucklessux.com/PuzzleBox/Secrets/WatcherOfThreads/marked_introduction_channel.pdf
    http://knucklessux.com/PuzzleBox/Secrets/WatcherOfThreads/marked_leads_on_zampanio_faq.pdf
    http://knucklessux.com/PuzzleBox/Secrets/WatcherOfThreads/marked_meme_spam.pdf
    http://knucklessux.com/PuzzleBox/Secrets/WatcherOfThreads/marked_official_pile.pdf
    http://knucklessux.com/PuzzleBox/Secrets/WatcherOfThreads/marked_other_fandoms.pdf
    http://knucklessux.com/PuzzleBox/Secrets/WatcherOfThreads/marked_possible_connections%20(1).pdf
    http://knucklessux.com/PuzzleBox/Secrets/WatcherOfThreads/marked_probably_bullshit_channel%20(1).pdf
    http://knucklessux.com/PuzzleBox/Secrets/WatcherOfThreads/marked_roleplay_channel.pdf
    http://knucklessux.com/PuzzleBox/Secrets/WatcherOfThreads/marked_rules_channel.pdf
    http://knucklessux.com/PuzzleBox/Secrets/WatcherOfThreads/marked_venting_channel.pdf
    http://knucklessux.com/PuzzleBox/Secrets/WatcherOfThreads/marked_voice_spam.pdf
    http://knucklessux.com/PuzzleBox/Secrets/WatcherOfThreads/marked_waste_basket%20(1).pdf
    http://knucklessux.com/PuzzleBox/Secrets/WatcherOfThreads/marked_wiki_work_channel%20(1).pdf
    http://knucklessux.com/PuzzleBox/Secrets/WatcherOfThreads/marked_zampanio_fandom_channel.pdf
    http://knucklessux.com/PuzzleBox/Secrets/WatcherOfThreads/marked_zampanio_sim_channel.pdf

    `;
    const links = linksRaw.split("\n")
    let src = "It feels weird.... realizing I'm almost the the only one left from those days. I was a rallying point for what remained of the fandom when the discord fell. Who... will be the one carrying the torch when my own discord, or even my own websites...finally fall? Will people believe them? That they hadn't made up the whole thing?<br><Br>I leave as much evidence behind as I can...but will it be enough? Or will even this avalance of secrets...one day fade to mere rumors?<br><Br>";

    for (let link of links) {
        src += `<a target ="_blank" href = '${link}'>${link}</a>`;;
    }

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()

