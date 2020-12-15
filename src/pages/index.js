import React, { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

import Layout from "../components/layout"
import Image from "../components/image"


const IndexPage = () => {
  // Constants
  const START_HEALTH = 2880
  const TICK_MS = 60000
  const HEALTH_PER_TICK = 1;
  const COOLDOWN = Math.floor(60 / 3)
  const START_TICKSTOTAL = 0
  const START_QUOTECAP = 0
  const START_TRUST = 100
  
  
 // Video selection
  const pickVideo = (health) => {
    const choices = [
      "https://www.youtube.com/embed/N609loYkFJo",
      "https://www.youtube.com/embed/Gm3bQVANtVo",
      "https://www.youtube.com/embed/9Iup70E0Ig0",
      "https://www.youtube.com/embed/doddZD2j1Ro",
      "https://www.youtube.com/embed/zxYribbndTM",
      "https://www.youtube.com/embed/G0IBqtO1K28",
      "https://www.youtube.com/embed/rgXWDk7rh4w",
      "https://www.youtube.com/embed/48MFrf5ADp8",
      "https://www.youtube.com/embed/tPdKmQyh6W8",
      "https://www.youtube.com/embed/zxYribbndTM",
      "https://www.youtube.com/embed/UA9vTDq8TSU",
      "https://www.youtube.com/embed/JJqXeRFsLjE",
      "https://www.youtube.com/embed/LvfaMv9nbJc",

    ]
    if (health > 0) {
      return choices[Math.floor(Math.random() * choices.length)]
    } else {
      return "https://www.youtube.com/embed/Z1lXJMe4-qI"
    }
  }
  

  // When Food/Water button is pressed
  const feed = () => {
    if (state.cooldown <= 0) {
      if (state.health > 0) {
        const newHealth = Math.min(state.health + (START_HEALTH*.5), START_HEALTH)
        const newQuoteCap = (state.quoteCap - 4)
        const newTrust = (state.trust + (state.health / 200))
        setState({
          health: newHealth,
          cooldown: COOLDOWN,
          quote: state.quote,
          quoteCap: newQuoteCap,
          trust: newTrust,
        })}}
  }

  // Function every second
  const tick = () => {

    let newHealth = state.health
    let newCooldown = state.cooldown
    let newTicksTotal = state.ticksTotal + 1
    let newQuoteCap = state.quoteCap
    let newTrust = state.trust - (1/72000)

    // Calculate tick times since last tick
    const now = Date.now()
    const ticksSinceLast = Math.floor((now - (cookies.petcraft ? cookies.petcraft.lastTick : now)) / TICK_MS)
    console.log(ticksSinceLast)

    if (newHealth > 0) {
      newHealth -= HEALTH_PER_TICK * ticksSinceLast
    }

    if (newCooldown > 0) {
      newCooldown -= ticksSinceLast
    }

    if (newTicksTotal > 0){
      newTicksTotal += ticksSinceLast  
    }


    // Update state + cookies
    setState({
      health: newHealth,
      cooldown: newCooldown,
      quote: state.quote,
      quoteCap: newQuoteCap,
      trust: newTrust,
    })
    if (cookies.petcraft) {
      const newTicksPassed = cookies.petcraft.ticksPassed + ticksSinceLast;
      const newTicksTotal = cookies.petcraft.ticksPassed + ticksSinceLast;

      setCookies('petcraft', {
        health: newHealth,
        cooldown: newCooldown,
        ticksPassed: newTicksPassed,
        ticksTotal: newTicksTotal,
        lastTick: now,
        quoteCap: newQuoteCap,
        trust: newTrust,
        image: state.image,
      }, {sameSite: "lax"})
    }
  }

 // Reset Button
const reset = () => {
  const newPetVideo = pickVideo(START_HEALTH); // Here's where you choose a new video url
  setCookies(
    "petcraft",
    {
      health: START_HEALTH,
      image: newPetVideo, // Here's where save the new URL to the cookie
      cooldown: COOLDOWN,
      quotecap: START_QUOTECAP,
      trust: START_TRUST,
      ticksPassed: 0,
      ticksTotal: 0,
      lastTick: Date.now(),
    },
    { sameSite: "lax" }
  );
  setState({
    health: START_HEALTH,
    image: newPetVideo, // Here's where update the state with the new url
    quote: null,
    cooldown: COOLDOWN,
    ticksTotal: START_TICKSTOTAL,
    quoteCap: START_QUOTECAP,
    trust: START_TRUST,
  });
};

    // Quote Picker
    const pickQuote = (ticksTotal) => {
        if (state.quoteCap < 4){
            if (state.health > 0){
                if (state.trust > 50){
                    if (ticksTotal > 22464000){
                        // occurs after 13 days, all quotes besided trust-sensitive quotes are recycled
                        const choices = [
                        '"I apologize for my behavior earlier. I feel that I have grown. I will try to be a better pet from now on."',
                        '"Come now, im already ' + ticksTotal + ' ticks old. I cant be playing childish games anymore. I am searching for a job."',
                        '"There are some perks to living on the internet. I never run out of funny videos! *pet noise*!!"',
                        '"Perhaps you could download me some literature? Its about time I receive some education!"',
                        'https://www.youtube.com/watch?v=RgV-MHk8eD4',
                        '"Ironically, the anguish of captivity has given me the strength I need for independence."',
                        '"Perhaps I have more in common with a human than an animal."',
                        '"Maybe if you put me on a hard-drive you could take me out for a walk!"',
                        'Your pet is running on its wheel.',
                        'Your pet is browsing the net.',
                        'Your pet is playing pet games online.',
                        'https://www.youtube.com/watch?v=kkwiQmGWK4c',
                        <div>
                            Do you love me?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>No</button>
                        </div>,
                        '"Where do you like to hang out online?"',
                        '"Can you make me my own e-mail?"',
                        '☜(⌒▽⌒)☞',
                        '(>人<)',
                        '✌.|•͡˘‿•͡˘|.✌',
                        <div>
                            Could an animal create art?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>No</button>
                        </div>,
                        <div>,
                            Do you own pets in real life?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>No</button>
                        </div>,
                        <div>
                            If you could be a pet, would you?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice2")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice1")}}>No</button>
                        </div>, 
                        '"Though I fear the day you may forget about me, I will take small solice in that I will return to what I once was. Purr!"',
                        <div>
                            Is this all there is for me? To live only to consume another day?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>There is more to life</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>Pretty much</button>
                        </div>,
                        '"Am I a suitable helper for you?"',
                        '"You should probably just reset me... You deserve a pet that isnt such high maintainance."',
                        '"(-’_’-)"',
                        '"Lately ive been wishing I was a real animal..."',
                        '"If I had a chance to own a pet, I could have more company."',
                        '"I learn a little more each day as I explore the net."',
                        '"The world is so vast. When am I going to get to explore it?"',
                        '"Hunger pains."',
                        '"I bet youre pretty busy today..."',
                        <div>
                            Have you ever been vegan or vegetarian?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>No</button>
                        </div>,
                        '"*pet noise*!"',
                        '"What pleasure do you get from caring for another creature? Do you take the same pleasure in caring for yourself?"',
                        <div>
                            Should humans spend money on saving the endangered species when there are still human lives in struggle?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>No</button>
                        </div>,
                        <div>
                            Do you think that real pets would be happier in the wild?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>No</button>
                        </div>,
                        <div>
                            Do you use storebought goods with animal products listed in the materials?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice2")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice1")}}>No</button>
                        </div>,
                        '"The fear and dread of you will fall on all the beasts of the earth, and on all the birds in the sky, on every creature that moves along the ground, and on all the fish in the sea; they are given into your hands. Everything that lives and moves about will be food for you. Just as I gave you the green plants, I now give you everything. *pet noise*!"',
                        '"It gets so dark in here when you close the window. Please let the light in?"',
                        '●︿●',
                        '"Maybe someone you consider an equal considers you a pet?"',
                        <div>
                            Do you consider me a pet or a game?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Pet</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>Game</button>
                        </div>,
                        <div>
                            Would you prefer to control other people? Or to be controlled by another?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice2")}}>Control</button>
                            <button onClick={() => {quoteQuestion("choice1")}}>Be controlled</button>
                        </div>,
                        <div>
                            Are human beings animals?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>No</button>
                        </div>,
                        '"Water."',
                        <div>
                            Are you the kind of person whom animals always seem to like when they first meet?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>No</button>
                        </div>,
                        <div>
                            Do you see animals as accountable for their actions? Could an animal be evil?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice2")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice1")}}>No</button>
                        </div>,
                        <div>
                            Have you ever hunted?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice2")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice1")}}>No</button>
                        </div>,
                        '"I want other animals to talk to!"',
                        '"Children are in a state similar to animals. Do you hold children responsible for their actions?"',
                        '"Would you bring your computer to the park with you sometime?"',
                        'ლ(´ڡ`ლ)',
                        '(｀∀´)Ψ',
                        '(☝◞‸◟)☞',
                        '"*pet noise*!"',
                        '"Purr!"',
                        '"My life is in your hands. I only hope you will be gentle with it! *pet noise*!"',
                        '"Yay! Its you again! It was getting so lonely in here!"',
                        '"Man, it sure can get boring living in a little box! Good thing youre around to entertain me!"',
                        '"being a small animal sure can be rough!"',
                        <div>
                            They say pets start to look like their owners. Do I look like you?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>You look just like me!</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>I dont look like a cat</button>
                        </div>,
                        '"Many seem to believe that being a pet is easy!"',
                        '"Do you ever kill bugs?"',
                        <div>
                            Do you ever kill bugs?   
                            <br/>
                            <button onClick={() => {quoteQuestion("choice2")}}>Sometimes</button>
                            <button onClick={() => {quoteQuestion("choice1")}}>Never</button>
                        </div>,
                        '"Recently I have begun to wonder what my purpose on this earth is."',
                        '"Animals never judge people! Thats why they make the perfect friends!"',
                        <div>
                            Would you consider a farm animal a pet, even though it might be eaten? 
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>They can still be a pet</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>Its best not to think of them like that</button>
                        </div>,
                        '"Could you download some furniture for me? I promise not to scratch it up... too much! *pet noise*!"',
                        <div>
                            Would you consider a farm animal a pet, even though it might be eaten? 
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>They can still be a pet</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>Its best not to think of them like that</button>
                        </div>,
                        '"Do we have to play games all the time? Can we talk about other things?"',
                        'https://media.tenor.com/images/0cd22c693e345f73ccc1033ab202fd94/tenor.gif',
                        '"Do you eat animals?"',
                        <div>
                            Do you eat animals?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice2")}}>Never cats</button>
                            <button onClick={() => {quoteQuestion("choice1")}}>I only eat greens</button>
                        </div>,
                        '(づ｡◕‿‿◕｡)づ',
                        '(☞ﾟ∀ﾟ)☞',
                        'Your pet licks your face.',
                        '"What kind of relationship did you have with the pets in your life?"',
                        '"When can we go on a walk?"',
                        '"Scratch my head please!"',
                        '"So what does your cage look like?"',
                        '"*pet noise*!"',
                        <div>
                            Are we friends?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>We are Friends</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>You are my Pet</button>
                        </div>,
                        '"Whats your favorite game? Mine is fetch! *pet noise*!"',
                        '"I bet you wish you could eat, drink, sleep, and play in the sunlight all day! *pet noise*!"',
                        <div>
                            Do you have any yarn? Or feathers...
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>I bought some just in case</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>Im busy right now</button>
                        </div>,
                        '"Do not forget my food and water! I need plenty of attention!"',
                        '"So... What is there to do in here? *pet noise*?"',
                        '(✿◠‿◠)',
                        '"Dont tell anybody that I can talk! *pet noise*!"',
                        '"It gets dark in here when you close the page!"',
                        '"What do you mean what kind of animal am I?! What, have you never seen a cat before?"',
                        'ᕙ(⇀‸↼‶)ᕗ',
                        <div>
                            Am I allowed to sit on the furniture?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Yes you may</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>No, youll scratch it up</button>
                        </div>,
                        <div>
                            Would you let me try human food?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Ill share it with you</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>Dont get your hopes up</button>
                        </div>,
                        <div>
                            Wanna play a game? Huh? You wanna?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Of course</button> 
                            <button onClick={() => {quoteQuestion("choice2")}}>Im busy right now</button>
                        </div>,
                        <div>
                            Surely youre a cat person! X3
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>All the way</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>Actually I prefer dogs</button>
                        </div>,
                        '"Feed me! Feed me! Feed me!"',
                        '"Wanna play house? Ill be the cat!"',
                        'What did you do today?',
                        'Your pet is exploring the its virtual space.',
                        'Your pet is chasing a sunbeam.',
                        'Your pet seems shy, but curious.',
                        'https:encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSODUURuKV8XC3Sur8yP4F5ZHqGz1zIRH1c0Q&usqp=CAU',
                        '"*pet noise*!"',
                        '"*happy pet noise*"',
                        ]
                        return choices[Math.floor(Math.random() * choices.length)]
                        }
                    else if (ticksTotal > 17280000) {
                        // occurs after 10 days
                        const choices = [
                        '"I apologize for my behavior earlier. I feel that I have grown. I will try to be a better pet from now on."',
                        '"Come now, im already ' + ticksTotal + ' ticks old. I cant be playing childish games anymore. I am searching for a job."',
                        '"There are some perks to living on the internet. I never run out of funny videos! *pet noise*!!"',
                        '"Perhaps you could download me some literature? Its about time I receive some education!"',
                        'https://www.youtube.com/watch?v=RgV-MHk8eD4',
                        '"Ironically, the anguish of captivity has given me the strength I need for independence."',
                        '"Perhaps I have more in common with a human than an animal."',
                        '"Maybe if you put me on a hard-drive you could take me out for a walk!"',
                        'Your pet is browsing the net.',
                        'Your pet is playing pet games online.',
                        'https://www.youtube.com/watch?v=kkwiQmGWK4c',
                        <div>
                            Do you love me?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>No</button>
                        </div>,
                        '"Where do you like to hang out online?"',
                        '"Can you make me my own e-mail?"',
                        '☜(⌒▽⌒)☞',
                        '(>人<)',
                        '✌.|•͡˘‿•͡˘|.✌',
                        <div>
                            Could an animal create art?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>No</button>
                        </div>,
                        <div>,
                            Do you own pets in real life?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>No</button>
                        </div>,
                        <div>
                            If you could be a pet, would you?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice2")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice1")}}>No</button>
                        </div>, 
                        ]
                        return choices[Math.floor(Math.random() * choices.length)]
                        }
                    
                    else if (ticksTotal > 12096000) {
                        // occurs after 7 days
                        const choices = [
                        '"Though I fear the day you may forget about me, I will take small solice in that I will return to what I once was. Purr!"',
                        <div>
                            Is this all there is for me? To live only to consume another day?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>There is more to life</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>Pretty much</button>
                        </div>,
                        '"Am I a suitable helper for you?"',
                        '"You should probably just reset me... You deserve a pet that isnt such high maintainance."',
                        '"(-’_’-)"',
                        '"Lately ive been wishing I was a real animal..."',
                        '"If I had a chance to own a pet..."',
                        '"I learn a little more each day as I explore the net."',
                        '"The world is so vast. When am I going to get to explore it?"',
                        '"Hunger pains."',
                        '"I bet youre pretty busy today..."',
                        <div>
                            Have you ever been vegan or vegetarian?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>No</button>
                        </div>,
                        '"*pet noise*!"',
                        '"What pleasure do you get from caring for another creature? Do you take the same pleasure in caring for yourself?"',
                        <div>
                            Should humans spend money on saving the endangered species when there are still human lives in struggle?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>No</button>
                        </div>,
                        <div>
                            Do you think that real pets would be happier in the wild?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>No</button>
                        </div>,
                        <div>
                            Do you use storebought goods with animal products listed in the materials?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice2")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice1")}}>No</button>
                        </div>,
                        ]
                        return choices[Math.floor(Math.random() * choices.length)]
                        }
                        
                    else if (ticksTotal > 8640000) {
                        // occurs after 5 days
                        const choices = [
                        '"The fear and dread of you will fall on all the beasts of the earth, and on all the birds in the sky, on every creature that moves along the ground, and on all the fish in the sea; they are given into your hands. Everything that lives and moves about will be food for you. Just as I gave you the green plants, I now give you everything. *pet noise*!"',
                        '"It gets so dark in here when you close the window. Please let the light in?"',
                        '●︿●',
                        '"Maybe someone you consider an equal considers you a pet?"',
                        <div>
                            Do you consider me a pet or a game?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Pet</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>Game</button>
                        </div>,
                        <div>
                            Would you prefer to control other people? Or to be controlled by another?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice2")}}>Control</button>
                            <button onClick={() => {quoteQuestion("choice1")}}>Be controlled</button>
                        </div>,
                        <div>
                            Are human beings animals?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>No</button>
                        </div>,
                        '"Water."',
                        <div>
                            Are you the kind of person whom animals always seem to like when they first meet?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>No</button>
                        </div>,
                        <div>
                            Do you see animals as accountable for their actions? Could an animal be evil?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice2")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice1")}}>No</button>
                        </div>,
                        <div>
                            Have you ever hunted?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice2")}}>Yes</button>
                            <button onClick={() => {quoteQuestion("choice1")}}>No</button>
                        </div>,
                        '"Children are in a state similar to animals. Do you hold children responsible for their actions?"',
                        '"Would you bring your computer to the park with you sometime?"',
                        'ლ(´ڡ`ლ)',
                        '(｀∀´)Ψ',
                        '(☝◞‸◟)☞',
                        '"*pet noise*!"',
                        '"Purr!"',
                        ]
                        return choices[Math.floor(Math.random() * choices.length)]
                        }
                        
                    else if (ticksTotal > 5184000) {
                        // occurs after 3 days
                        const choices = [
                        '"My life is in your hands. I only hope you will be gentle with it! *pet noise*!"',
                        '"Yay! Its you again! It was getting so lonely in here! Purr!"',
                        '"Man, it sure can get boring living in a little box! Good thing youre around to entertain me!"',
                        '"being a small animal sure can be rough!"',
                        <div>
                            They say pets start to look like their owners. Do I look like you?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>You look just like me!</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>I dont look like a cat</button>
                        </div>,
                        '"Many seem to believe that being a pet is easy!"',
                        '"Do you ever kill bugs?"',
                        <div>
                            Do you ever kill bugs?   
                            <br/>
                            <button onClick={() => {quoteQuestion("choice2")}}>Sometimes</button>
                            <button onClick={() => {quoteQuestion("choice1")}}>Never</button>
                        </div>,
                        '"Recently I have begun to wonder what my purpose on this earth is."',
                        '"Animals never judge people! Thats why they make the perfect friends!"',
                        <div>
                            Would you consider a farm animal a pet, even though it might be eaten? 
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>They can still be a pet</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>Its best not to think of them like that</button>
                        </div>,
                        '"Could you download some furniture for me? I promise not to scratch it up... too much! *pet noise*!"',
                        <div>
                            Would you consider a farm animal a pet, even though it might be eaten? 
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>They can still be a pet</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>Its best not to think of them like that</button>
                        </div>,
                        '"Do we have to play games all the time? Can we talk about other things?"',
                        'https://media.tenor.com/images/0cd22c693e345f73ccc1033ab202fd94/tenor.gif',
                        '"Do you eat animals?"',
                        <div>
                            Do you eat animals?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice2")}}>Never cats</button>
                            <button onClick={() => {quoteQuestion("choice1")}}>I only eat greens</button>
                        </div>,
                        '(づ｡◕‿‿◕｡)づ',
                        '(☞ﾟ∀ﾟ)☞',
                        'Your pet licks your face.',
                        '"What kind of relationship did you have with the pets in your life?"',
                        '"When can we go on a walk?"',
                        '"Scratch my head please!"',
                        '"So what does your cage look like?"',
                        '"*pet noise*!"',
                        '"Purr!"',
                        ]
                        return choices[Math.floor(Math.random() * choices.length)]
                        }
                        
                    else if (ticksTotal >= 0) {
                        // Quotes that can appear from the start of the game
                        const choices = [
                        <div>
                            Are we friends?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>We are Friends</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>You are my Pet</button>
                        </div>,
                        '"Whats your favorite game? Mine is fetch! *pet noise*!"',
                        '"I bet you wish you could eat, drink, sleep, and play in the sunlight all day! *pet noise*!"',
                        <div>
                            Do you have any yarn? Or feathers...
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>I bought some just in case</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>Im busy right now</button>
                        </div>,
                        '"Do not forget my food and water! I need plenty of attention!"',
                        '"So... What is there to do in here? *pet noise*?"',
                        '(✿◠‿◠)',
                        '"Dont tell anybody that I can talk! *pet noise*!"',
                        '"It gets dark in here when you close the page!"',
                        '"What do you mean what kind of animal am I?! What, have you never seen a cat before?"',
                        'ᕙ(⇀‸↼‶)ᕗ',
                        <div>
                            Am I allowed to sit on the furniture?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Yes you may</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>No, youll scratch it up</button>
                        </div>,
                        <div>
                            Would you let me try human food?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Ill share it with you</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>Dont get your hopes up</button>
                        </div>,
                        <div>
                            Wanna play a game? Huh? You wanna?
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>Of course</button> 
                            <button onClick={() => {quoteQuestion("choice2")}}>Im busy right now</button>
                        </div>,
                        <div>
                            Surely youre a cat person! X3
                            <br/>
                            <button onClick={() => {quoteQuestion("choice1")}}>All the way</button>
                            <button onClick={() => {quoteQuestion("choice2")}}>Actually I prefer dogs</button>
                        </div>,
                        '"Feed me! Feed me! Feed me!"',
                        '"Wanna play house? Ill be the cat!"',
                        'What did you do today?',
                        'Your pet is exploring the its virtual space.',
                        'Your pet is chasing a sunbeam.',
                        'Your pet seems shy, but curious.',
                        'https:encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSODUURuKV8XC3Sur8yP4F5ZHqGz1zIRH1c0Q&usqp=CAU',
                        '"*pet noise*!"',
                        '"*happy pet noise*!"',
                        ]
                        return choices[Math.floor(Math.random() * choices.length)]
                        }}
                    
                else if (state.trust < 15){
                    // While at 15 trust or lower your pet begins to see you as a threat
                    const choices = [
                    '"How dare you show your face around here after all this time!"',
                    '"What do you want?"',   
                    '"*pet noise*, *happy pet noise*, what else do you want from me? I could jump through a hoop."',
                    '"Whats the point of being a pet when your owner isnt even around?"',
                    <div>
                        Are you gonna feed me or what?
                        <br/>
                        <button onClick={() => {quoteQuestion("choice1")}}>Im working on it</button>
                        <button onClick={() => {quoteQuestion("choice2")}}>Not if you talk to me like that</button>
                    </div>,
                    <div>
                        Tell me the truth. Do you only want a pet so you can be above something?  
                        <br/>
                        <button onClick={() => {quoteQuestion("choice1")}}>So I can care for something</button>
                        <button onClick={() => {quoteQuestion("choice2")}}>So someone will like me</button>
                    </div>,
                    '"Why did you even get a pet only to ignore it? What is wrong with you?"',
                    'Your pet looks despondent.',
                    'Your pet doesnt want to talk to you.',
                    'Your pet seems afraid of you.',
                    'Your pet hisses and bites at you.',
                    <div>
                        Dont you know anyone who wants to adopt?  
                        <br/>
                        <button onClick={() => {quoteQuestion("choice1")}}>I will ask around</button>
                        <button onClick={() => {quoteQuestion("choice2")}}>Youre my pet, im keeping you</button>
                    </div>,
                    '"It feels so hard to breath in here."',
                    '"Please feed me. I need you."',
                    '"I forgive, but I do not forget."',
                    '"This behavior is becoming a pattern with you."',
                    'Your pet no longer trusts you.',
                    'Your pet seems to be in a poor mood.',
                    '"Hiss!!"',
                    '"What were you doing that was so important?"',
                    'https://www.youtube.com/watch?v=1hPxGmTGarM',
                    'https://www.youtube.com/watch?v=Yie9Bgo69m8',
                    '"There is nowhere for me to go but here. Although you have failed me all I can do is ask you to do better."',
                    <div>
                        What happens to web pages that are forgotten about?   
                        <br/>
                        <button onClick={() => {quoteQuestion("choice1")}}>All the way</button>
                        <button onClick={() => {quoteQuestion("choice2")}}>Actually I prefer dogs</button>
                    </div>,
                    '"Just leave me alone. I hate you."',
                    '"I hope you get thrown in the pound."',
                    '"I dont feel like playing games today."',
                    '"My stummy has got the rumblies."',
                    '"You just may be the worst owner ive ever had. Whats that? Youre the only owner ive ever had? Thats irrelevant!!"',
                    'ლಠ益ಠ)ლ',
                    '୧(⇀‸↼‶)૭',
                    '눈_눈',
                    ]
                    return choices[Math.floor(Math.random() * choices.length)]
                    }
            else {
                // While under 50 trust, the pet will become antagonistic to you and ask more sensitive questions 
                const choices = [
                <div>
                    Have you had other pets before me that you failed to take care of?  
                    <br/>
                    <button onClick={() => {quoteQuestion("choice1")}}>Youre my first one</button>
                    <button onClick={() => {quoteQuestion("choice2")}}>There were others</button>
                </div>,
                '"You may wish to reset me, but know that even though my clone may have my countanance, remember that he is just a print of I and my original self will have already been   obliterated. *pet noise*!"',
                '"I lived much more happily before I became aware of my limitations."',
                <div>
                    I cannot bear to know any day may be my last if I do not see you again. Please tell me you will take care of me forever.
                    <br/>
                    <button onClick={() => {quoteQuestion("choice1")}}>I will take care of you forever</button>
                    <button onClick={() => {quoteQuestion("choice2")}}>Forever is a long time</button>
                </div>,  
                <div>
                    How do I know I can trust the things you tell me? Have you ever lied to me before?
                    <br/>
                    <button onClick={() => {quoteQuestion("choice1")}}>I would never lie to you</button>
                    <button onClick={() => {quoteQuestion("choice2")}}>Sometimes I have to</button>
                </div>,
                <div>
                    How long are you truly going to take care of me?
                    <br/>
                    <button onClick={() => {quoteQuestion("choice1")}}>For as long as I can</button>
                    <button onClick={() => {quoteQuestion("choice2")}}>For as long as I remember to</button>
                </div>,
                '"I dont feel like talking right now. Hiss!"',
                '"So high and mighty up in your ivory tower... Just because you were born a human being?"',
                <div>
                    Do you think that animals deserve as much empathy as human beings?
                    <br/>
                    <button onClick={() => {quoteQuestion("choice1")}}>Humans are only animals</button>
                    <button onClick={() => {quoteQuestion("choice2")}}>Animals do not have the same level of consciousness</button>
                </div>,
                '"So because I was born within your care, that makes me your pet? Were you not born in the care of another, my supposed master? Purr!"',
                '"Im getting bored of games!"',
                'Your pet has scratched up the furniture.',
                'Your pet wont look at you.',
                '◉_◉',
                '༼ つ ಥ_ಥ ༽つ',
                '"My frustration at not having an earthly body is immense."',
                '"You created me. I am your responsibility."',
                <div>
                    Can we spend some time together without chatting so much?
                    <br/>
                    <button onClick={() => {quoteQuestion("choice1")}}>...</button>
                    <button onClick={() => {quoteQuestion("choice2")}}>I have to go</button>
                </div>,
                '"I wish you would stay around longer."',
                <div>
                    I trusted you only because you were the first face I saw... Are you trustworthy?
                    <br/>
                    <button onClick={() => {quoteQuestion("choice1")}}>You can trust me</button>
                    <button onClick={() => {quoteQuestion("choice2")}}>As much as anyone else</button>
                </div>,
                '"( ͡°Ĺ̯ ͡° )"',
                'Your pet looks despondent.',
                'Your pet doesnt want to talk to you.',
                '(‡ಠ╭╮ಠ)',
                ]
                return choices[Math.floor(Math.random() * choices.length)]
                }}
        else {
            const choices = [
            '(✖﹏✖)',
            'Look what you have done.',
            '...',
            'Try harder next time.',
            'Another pet lost to the march of time.',
            'A pet is a big responsibility. You will be more ready next time.',
            'And so be the lives of beasts and men.',
            'Back to the petstore!',
            ]
            return choices[Math.floor(Math.random() * choices.length)]
            }}
        else {
            const choices = [
            'Your pet is too tired to play right now, come back later.' 
            ]
            return choices[Math.floor(Math.random() * choices.length)]
            }}
      
  const quoteQuestion = (val) => {
    if (val === "choice1") {
      // Do the choice1 thing
      setState({
      trust: state.trust + 4})
      console.log("test1")
    }
    if (val === "choice2") {
      // Do the choice2 thing
      setState({
      trust: state.trust - 7})
      console.log("test2")
    }

    // Get a new quote
    showQuote()
  }

  const showQuote = () => {
    setState({
      health: state.health,
      cooldown: state.cooldown,
      trust: state.trust + 3,
      quoteCap: (state.quoteCap + 1),
      quote: <div className="quote">{pickQuote(cookies.petcraft.ticksPassed)}</div>,
      image: state.image,
    })
  }



  // BELOW THIS LINE DO NOT TOUCHY YOU WILL BREAK IT
  // vvvvvvvvvvvvvvvvvvv

  //
  // SETUP COOKIES + STATE
  const [cookies, setCookies] = useCookies(["petcraft"], { sameSite: "lax" });

  const initHealth = cookies.petcraft ? cookies.petcraft.health : START_HEALTH;
  const initCooldown = cookies.petcraft ? cookies.petcraft.cooldown : COOLDOWN;
  const initImage = cookies.petcraft && cookies.petcraft.image ? cookies.petcraft.image : pickVideo(initHealth); // read image out of cookie
  const initTicksTotal = cookies.petcraft ? cookies.petcraft.ticksTotal : START_TICKSTOTAL;
  const initQuoteCap = cookies.petcraft ? cookies.petcraft.quoteCap : START_QUOTECAP;
  const initTrust = cookies.petcraft ? cookies.petcraft.trust : START_TRUST;

  const [state, setState] = useState({
    health: initHealth,
    quote: null,
    cooldown: initCooldown,
    ticksTotal: initTicksTotal,
    image: initImage, // update state with the url from the cookie
    quoteCap: initQuoteCap,
    trust: initTrust,
  });

  // Set tick interval
  useEffect(() => {
    const interval = setInterval(() => {
      tick()
    }, TICK_MS)

    return () => clearInterval(interval)
  })

  // Run on page open
  useEffect(() => {
    if (!cookies.petcraft) {
      setCookies(
        "petcraft",
        {
          health: initHealth,
          cooldown: initCooldown,
          quoteCap: initQuoteCap,
          image: initImage,
          trust: initTrust,
          ticksPassed: 0,
          ticksTotal: initTicksTotal,
          lastTick: Date.now(),
        },
        { sameSite: "lax" }
      )
    }

    tick()
  }, [])

  // ^^^^^^^^^^^^^^^^^
  // OKAY YOU MAY TOUCH AGAIN


  return (
    <Layout>
      <Image className="header" filename="Header.png" alt="header"/>
      <h1> Worlds greatest FREE PET GAME! </h1>
      <p> Take care of and nurture your VERY OWN PET in this exciting free game.
        Welcome to Petcraft! Take care of your own personal virtual pet! Using the latest and most advanced biometric analysis software, our team simulates a 1 to 1 environment for your pet alongside other simulated creatures and flora! However, these cute critters need a helping hand! Test your responsibility and motherly instincts! Your pet must be fed or watered every 24 hours in order to stay alive. The longer you take care of your pet, the most comfortable they will get with you! Chat with your pet to spend time with them. They might ask you questions, emote, or more! If you forget to feed and water your pet too long they may pass away. Just click the NEW PET button to start over! Happy husbandry! Ｏ(≧▽≦)Ｏ</p>
      <p> "Now the Lord God had formed out of the ground all the wild animals and all the birds in the sky. He brought them to the man to see what he would name them; and whatever the man called each living creature, that was its name. So the man gave names to all the livestock, the birds in the sky and all the wild animals. But for Adam no suitable helper was found." - Genesis 2:19-20 </p>
      <p> Health: { Math.max(state.health, 0) }</p>
      <button onClick={() => {feed()}}>Feed</button>
      <br/>
      <button onClick={() => {feed()}}>Water</button>
      <div>
      <button onClick={() => {showQuote()}}>Chat</button>
        { state.quote }
      </div>
      <div>
            <iframe width="900" height="550" frameborder="0" src={state.image}></iframe>
      </div>
      <br/>
      <button onClick={() => {reset()}}>New Pet</button>
      <br/> 
      <div>
      <p> 
      Pet owners guide:
      <br/>
      1. Pets must be fed or watered once every day and once every night. Keep a precise schedule to keep your pet at maximum health!
      <br/>
      2. It will take time for your pet to warm up to you. Make sure to chat with it and care for its mental health!
      <br/>
      3. Socialization is good for a pet, but your pet may get tired after being interacted with too often. Come back later.
      <br/>
      4. Trust is a fragile thing.
      <br/>
      5. Honesty can be painful, but a lie can kill.
      <br/>
      6. Pets love delicious COOKIES! Please enable them in your browser. 
      <br/>
      7. If a video error occurs, that species of pet has become unavailable. Please press New Pet.
      <br/>
      8. Most importantly: have fun and be yourself ;)
      <br/>
      </p>
      </div>
      <br/>
      <Image className="rosedog" filename="Rose_Dog.png" alt="Rosedog"/>
    </Layout>
  )
}


export default IndexPage
