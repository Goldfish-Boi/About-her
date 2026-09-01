document.addEventListener("DOMContentLoaded",function(){

    const cards=document.querySelectorAll(".info-card");
    const toggleAll=document.getElementById("toggle-all");


    cards.forEach(function(card){

        card.addEventListener("click",function(){

            const info=card.querySelector(".card-info");
            const hint=card.querySelector(".click-hint");

            if(!info){
                return;
            }


            if(card.classList.contains("open")){

                info.style.display="none";
                card.classList.remove("open");

                if(hint){
                    hint.textContent="Click to learn more! ✨";
                }

            }else{

                info.style.display="block";
                card.classList.add("open");

                if(hint){
                    hint.textContent="Click to close! ✨";
                }

            }

        });

    });


    toggleAll.addEventListener("click",function(event){

        event.stopPropagation();

        let allOpen=true;


        cards.forEach(function(card){

            if(!card.classList.contains("open")){
                allOpen=false;
            }

        });


        cards.forEach(function(card){

            const info=card.querySelector(".card-info");
            const hint=card.querySelector(".click-hint");

            if(!info){
                return;
            }


            if(allOpen){

                info.style.display="none";
                card.classList.remove("open");

                if(hint){
                    hint.textContent="Click to learn more! ✨";
                }

            }else{

                info.style.display="block";
                card.classList.add("open");

                if(hint){
                    hint.textContent="Click to close! ✨";
                }

            }

        });


        if(allOpen){

            toggleAll.textContent="Show All ✨";

        }else{

            toggleAll.textContent="Hide All ✨";

        }

    });


    let waterCount=0;
    let watering=false;
    let warningShown=false;
    let successfulWaters=0;

    let weatherEffectUsed=false;
    let lastWeatherType=null;


    const waterButton=document.getElementById("water-button");
    const waterMessage=document.getElementById("water-message");
    const waterStatus=document.getElementById("water-status");
    const waterProgress=document.getElementById("water-progress");
    const waterCountMessage=document.getElementById("water-count");
    const resetButton=document.getElementById("reset-button");
    const plantStages=document.querySelectorAll(".plant-stage");

    const weatherIcon=document.getElementById("weather-icon");
    const weatherText=document.getElementById("weather-text");
    const plantMood=document.getElementById("plant-mood");

    const plantArea=document.querySelector(".plant-area");


    const stageMessages=[
        "Your little seed really needs some water! 🌰💧",
        "Your little sprout is starting to grow! 🌱✨",
        "Look! Your plant is growing new leaves! 🌿💚",
        "Your little plant is getting ready to bloom! 🌷✨",
        "Your garden is fully grown! You did it! 🌺🎉"
    ];


    const plantMoods=[
        "😊 Plant Mood: Hopeful!",
        "🌱 Plant Mood: Happy!",
        "🌿 Plant Mood: Growing!",
        "🌷 Plant Mood: Excited to Bloom!",
        "🌺 Plant Mood: Absolutely Blooming!"
    ];


    const weatherTypes=[

        {
            icon:"☀️",
            text:"Sunny day in the garden!",
            type:"normal"
        },

        {
            icon:"☁️",
            text:"A calm cloudy day in the garden...",
            type:"normal"
        },

        {
            icon:"🌫️",
            text:"A mysterious fog rolled into the garden...",
            type:"normal"
        },

        {
            icon:"🌧️",
            text:"A little rain is helping the garden!",
            type:"good"
        },

        {
            icon:"⛈️",
            text:"Oh no! A storm is passing through!",
            type:"bad"
        },

        {
            icon:"🔥",
            text:"A hot day is making your plant struggle!",
            type:"bad"
        }

    ];


    let currentWeather=null;


    function changeWeather(){

        let newWeather=null;


        while(!newWeather || newWeather.type===lastWeatherType){

            const chance=Math.random();


            if(chance<0.02){

                newWeather={
                    icon:"🌈",
                    text:"A rare rainbow appeared over your garden!",
                    type:"good"
                };

            }else{

                const typeChance=Math.random();


                if(typeChance<1/3){

                    const normalWeather=weatherTypes.filter(function(weather){

                        return weather.type==="normal";

                    });


                    newWeather=
                        normalWeather[
                            Math.floor(Math.random()*normalWeather.length)
                        ];

                }else if(typeChance<2/3){

                    const goodWeather=weatherTypes.filter(function(weather){

                        return weather.type==="good";

                    });


                    newWeather=
                        goodWeather[
                            Math.floor(Math.random()*goodWeather.length)
                        ];

                }else{

                    const badWeather=weatherTypes.filter(function(weather){

                        return weather.type==="bad";

                    });


                    newWeather=
                        badWeather[
                            Math.floor(Math.random()*badWeather.length)
                        ];

                }

            }

        }


        currentWeather=newWeather;

        lastWeatherType=currentWeather.type;

        weatherEffectUsed=false;


        weatherIcon.textContent=currentWeather.icon;
        weatherText.textContent=currentWeather.text;

    }


    function showPlantEffect(text,type){

        const effect=document.createElement("div");

        effect.className="plant-effect";

        effect.textContent=text;


        if(type==="good"){

            effect.style.color="#17a900";
            effect.style.textShadow="0 2px 5px rgba(0,100,0,0.25)";

        }else if(type==="bad"){

            effect.style.color="#e00000";
            effect.style.textShadow="0 2px 5px rgba(150,0,0,0.25)";

        }else{

            effect.style.color="#17a900";
            effect.style.textShadow="0 2px 5px rgba(0,100,0,0.25)";

        }


        effect.style.position="absolute";
        effect.style.left="50%";
        effect.style.top="15%";
        effect.style.transform="translateX(-50%)";
        effect.style.fontSize="2rem";
        effect.style.fontWeight="800";
        effect.style.fontFamily="Quicksand,sans-serif";
        effect.style.zIndex="20";
        effect.style.pointerEvents="none";
        effect.style.opacity="0";
        effect.style.transition="all 1.2s ease";


        plantArea.style.position="relative";

        plantArea.appendChild(effect);


        requestAnimationFrame(function(){

            effect.style.opacity="1";
            effect.style.transform="translate(-50%,-45px) scale(1.15)";

        });


        setTimeout(function(){

            effect.style.opacity="0";
            effect.style.transform="translate(-50%,-80px) scale(1)";

        },700);


        setTimeout(function(){

            if(effect.parentNode){

                effect.remove();

            }

        },1300);

    }


    function showBee(){

        const bee=document.createElement("div");

        bee.textContent="🐝";

        bee.className="garden-bee";

        bee.style.position="absolute";
        bee.style.fontSize="2rem";
        bee.style.left="70%";
        bee.style.top="25%";
        bee.style.zIndex="10";
        bee.style.pointerEvents="none";
        bee.style.transition="all 2s ease";


        plantArea.style.position="relative";

        plantArea.appendChild(bee);


        requestAnimationFrame(function(){

            bee.style.left="30%";
            bee.style.top="10%";

        });


        setTimeout(function(){

            if(bee.parentNode){

                bee.remove();

            }

        },2500);

    }


    function checkForBee(){

        const beeChance=Math.random();


        if(beeChance<0.01){

            waterCount+=1;


            if(waterCount>8){

                waterCount=8;

            }


            showBee();

            showPlantEffect("+1","good");


            waterCountMessage.textContent=
                "🐝 A rare little bee visited your garden! 🌱✨";


            return true;

        }


        return false;

    }


    function updatePlant(){

        let stage=Math.floor(waterCount/2);


        if(stage>4){

            stage=4;

        }


        if(stage<0){

            stage=0;

        }


        plantStages.forEach(function(plant){

            plant.style.display="none";

        });


        plantStages[stage].style.display="block";


        waterProgress.textContent=
            "💧 Watering Progress: "+waterCount+" / 8";


        plantMood.textContent=
            plantMoods[stage];


        if(waterCount>=8){

            waterCount=8;


            waterProgress.textContent=
                "💧 Watering Progress: 8 / 8";


            waterCountMessage.textContent=
                "Your garden is fully grown! You did it! 🌺💚✨";


            plantMood.textContent=
                "🌺 Plant Mood: Absolutely Blooming!";


            waterStatus.textContent="🌺";

            resetButton.style.display="block";

        }else{ 
            
            resetButton.style.display="none";

        }

    }


    weatherIcon.textContent="🌱";

    weatherText.textContent=
        "Water your plant to discover the weather! 💧";


    resetButton.style.display="none";


    waterButton.addEventListener("click",function(){

        if(waterCount>=8){

            return;

        }


        if(watering){

            if(warningShown){

                return;

            }


            warningShown=true;


            const warning=document.createElement("div");

            warning.className=
                "water-note water-warning";


            warning.textContent=
                "Don't drown your plant! Give it a second. 💧🌱";


            waterMessage.appendChild(warning);


            setTimeout(function(){

                warning.classList.add("fading");


                setTimeout(function(){

                    if(warning.parentNode){

                        warning.remove();

                    }

                },2000);

            },1000);


            return;

        }


        watering=true;
        warningShown=false;

        waterStatus.textContent="🔒";


        successfulWaters++;


        if(successfulWaters===1){

            changeWeather();

        }else if(successfulWaters%2===0){

            changeWeather();

        }


        let waterAdded=1;

        let weatherApplied=false;
        let weatherAmount=1;


        if(currentWeather && !weatherEffectUsed){

            weatherApplied=true;

            weatherEffectUsed=true;


            if(currentWeather.type==="good"){

                weatherAmount=2;

                waterAdded=2;

                showPlantEffect("+2","good");

            }else if(currentWeather.type==="bad"){

                weatherAmount=0;

                waterAdded=0;

                showPlantEffect("-1","bad");

            }else{

                weatherAmount=1;

                waterAdded=1;

                showPlantEffect("+1","good");

            }

        }else{

            waterAdded=1;

            showPlantEffect("+1","good");

        }


        waterCount+=waterAdded;


        const beeFound=checkForBee();


        if(waterCount<0){

            waterCount=0;

        }


        if(waterCount>8){

            waterCount=8;

        }


        updatePlant();


        if(beeFound){

            if(weatherApplied && weatherAmount===2){

                waterCountMessage.textContent=
                    "🌈 A lucky combination! Weather + bee! 🐝✨";

            }

        }else if(weatherApplied){

            if(weatherAmount===2){

                waterCountMessage.textContent=
                    currentWeather.text+" 💚";

            }else if(weatherAmount===0){

                waterCountMessage.textContent=
                    currentWeather.text+" ❤️‍🩹";

            }else{

                waterCountMessage.textContent=
                    currentWeather.text+" ✨";

            }

        }else{

            waterCountMessage.textContent=
                stageMessages[Math.floor(waterCount/2)];

        }


        if(waterMessage.children.length>=4){

            waterMessage.firstElementChild.remove();

        }


        const oldMessages=waterMessage.children;


        for(let i=0;i<oldMessages.length;i++){

            oldMessages[i].classList.add("fading");

        }


        const message=document.createElement("div");

        message.className="water-note";

        message.textContent=
            "Your plant got some water! 💧🌱";


        waterMessage.appendChild(message);


        setTimeout(function(){

            message.classList.add("fading");


            setTimeout(function(){

                if(message.parentNode){

                    message.remove();

                }

            },2000);

        },1500);


        setTimeout(function(){

            watering=false;
            warningShown=false;


            if(waterCount<8){

                waterStatus.textContent="🔓";

            }

        },2000);


        if(waterCount>=8){

            waterCount=8;

            updatePlant();

            waterStatus.textContent="🌺";

            resetButton.style.display="block";

        }

    });


    resetButton.addEventListener("click",function(){

        waterCount=0;
        successfulWaters=0;
        watering=false;
        warningShown=false;

        currentWeather=null;
        weatherEffectUsed=false;
        lastWeatherType=null;


        waterProgress.textContent=
            "💧 Watering Progress: 0 / 8";


        waterCountMessage.textContent=
            "Your little seed really needs some water! 🌱";


        plantMood.textContent=
            "😊 Plant Mood: Hopeful!";

        waterStatus.textContent="🔓";


        weatherIcon.textContent="🌱";

        weatherText.textContent=
            "Water your plant to discover the weather! 💧";


        plantStages.forEach(function(plant){

            plant.style.display="none";

        });


        plantStages[0].style.display="block";


        resetButton.style.display="none";

    });

});
