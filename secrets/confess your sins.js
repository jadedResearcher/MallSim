
//immediately envoked function does't run into namespacign issues
(() => {
    const src = `West can be hard to navigate. 
    
    Mostly it was for those who were part of the live play.
    
    But there's nuggets in it I think are worth exposing.
    
    You're Welcome: <a target='_blank' href ='http://farragofiction.com/AdventureSimWest/?nostalgia=april_fools_2026.txt'>http://farragofiction.com/AdventureSimWest/?nostalgia=april_fools_2026.txt</a>`

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()

