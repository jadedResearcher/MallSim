
//immediately envoked function does't run into namespacign issues
(() => {
    const link = 'http://knucklessux.com/PuzzleBox/Secrets/misc/Zampanio_AP_Test_Sampler_by_SurvivorOfAvalances.pdf'
    const src = `was it all reflected light? <br><br>
    is it a problem if it is?
    <br><br>
    why do mirages
    <br><br>
    get such a bad rap
    <br><br><a target ="_blank" href = '${link}'>${link}</a>`

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()

