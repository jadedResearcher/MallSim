
//immediately envoked function does't run into namespacign issues
(() => {
    const src = `look i get it
    fun fact: i kinda suck at puzzles
    don't really feel compelled to solve them
    what REALLY gets me to dig and dig and dig
    sometimes to my own detriment
    is reading
    i can get lost in tv trops forever, you get what i mean?
    
    so
    
    don't sweat it if you aren't a fan of puzzles
    
    if you're not put off by LLM output, that is "AI" content
    
    <a href ='http://eyedolgames.com/'>http://eyedolgames.com/</a> is for you.
    
    Its just this random ordering of everything I've made for that domain (at least that I remembered to wire into the fake search engine).
    
    There's a lot of fake sites in there I made myself (with AI providing the 'infinite' images), like Zampanini or Eyedlr or JackElope.
    
    Plus theres occasionally clearly labeled pages Claude (an AI I have access to from work) wrote after reading the source code of various Zampanio not-games I've made over the years. 
    
    You don't gotta be good at secrets or want to (or be able to!) read code in order to find more and more and more to dig into.
    
    Happy foraging :)`

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()

