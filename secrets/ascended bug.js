
//immediately envoked function does't run into namespacign issues
(() => {
    const src = `i can not even describe the day i had yesterday
    
    its currently 6/25/26 btw
    
    and i plan on releasing mallsim today
    
    sometimes i forget its not already out
    
    since its easy to find if you know what you're looking for
    
    but
    
    ANYWAYS
    
    tomorrow
    almost done
    
    all i had to do was add the last finishing touches: the ability to mark an achievement is 'new' based on whether or not you'd already read the password or not
    
    and
    
    *boy*
    
    did i have some hubris

    that alone wasn't hte problem, no

    but it did reveal a but that had been quietly humming along

    one i fought in wigglersim, almost ten years ago but somehow forgot

    browser games generally save data via something called 'localStorage'

    basically, things on the same domain have a little bit of memory they can put in their browser

    regular sites will use it for like, settings or whatever

    games use it for save data

    so

    the problem is

    if you have two tabs

    they load data when you load the page

    and then any changes to it they save whenever the code says to

    so

    imagine

    that in tab one you unlock "The End is Dead", and add it to ten other achievements you have and save.

    Then, in tab two, it has the same ten achievements and it adds "Now you Fucked Up (Hunted)". 

    Each tab overwrites the other and doesn't know about the other tabs new achievement. 

    That is... fine enough, for mallsim. 

    But the SECOND I started recording if you'd seen a given rabbithole password or not...

    explosions. 

    Cuz you might put in a dozen passwords for the same rabbit hole. Then go to mallsim to look for new achievements.

    And lose all record you'd ever seen those dozen passwords. 

    Or worse. 

    Put a new password in and lose your new achievements.

    Whoops.

    I evenutally figured out a fix. 

    But while iterating on the fix I discovered the... most hilarious bug. 

    Everyone say hello to the "biscuit and eggs" (homestuck reference) of Mall Sim:

    homeBranch
: 
4089915565
musical
: 
false
relationships
: 
{The Romantic of the Restaurant: {value: -15, romantic: false, clone: false, familial: true},…}
sprite_aspect
: 
"spiral"
sprite_class
: 
"rogue"
stats
: 
{Mind: 10, Eyes: 10, Tongue: 10, Arms: 23.75, Legs: -3.25}
theme_keys
: 
["space", "endings", "royalty", "defense"]
times_looped
: 
14
title
: 
"The Commanding Skydiver"


homeBranch
: 
4089915565
musical
: 
false
relationships
: 
{The Romantic of the Restaurant: {value: 34, romantic: true, clone: false, familial: false},…}
sprite_aspect
: 
"light"
sprite_class
: 
"rogue"
stats
: 
{Mind: 10, Eyes: 10, Tongue: 10, Arms: 44.75, Legs: -23.25}
theme_keys
: 
["obfuscation", "royalty", "stealing", "light"]
times_looped
: 
15
title
: 
"The Censored Sharpie Lamplighter"


I wasn't able to get their full json export before deleting them, sadly. 

There were over TWO THOUSAND of each of them in my save file.

I only found out when the console started complaining that my save file was too big. 

Turns out my "try to grab things from all tabs" logic didn't understand that looping players weren't necessarily unique.

WHOOPS!

In sburbsim I would enconse funny bugs like this into the game itself but...

I think being allowed to rest is the kindest reward I can give to these poor wastes. 

Rest in peace the Censored Sharpie Lamplighter.

Sleep well, the Commanding Skydiver. 

We'll never know if you liked each other but after 15 loops of exponentially increasing copies of you, I sure hope you did. 

Since they're wasted we'll never know what their original names were. 

And because the copy I got of them has the relationships truncated we won't know if they were friends. Rivals. Lovers... Family.

But we know that they lived more than anyone should ever have to in a shitty glitchy broken mall.

On the plus side, though, we definitively found out that instead of crashing your browser, too many cultists joining the loop just stops TIME itself from moving forward. 

Hooray!


    
    
    
    `

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()

