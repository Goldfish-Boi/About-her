document.addEventListener("DOMContentLoaded",function(){

    const cards=document.querySelectorAll(".journal-card");
    const toggleAll=document.getElementById("toggle-all");

    function openCard(card){

        const info=card.querySelector(".card-info");
        const hint=card.querySelector(".click-hint");

        if(!info){
            return;
        }

        info.style.display="block";
        card.classList.add("open");

        if(hint){
            hint.textContent="Click to close! ✨";
        }

    }


    function closeCard(card){

        const info=card.querySelector(".card-info");
        const hint=card.querySelector(".click-hint");

        if(!info){
            return;
        }

        info.style.display="none";
        card.classList.remove("open");

        if(hint){
            hint.textContent="Click to open! ✨";
        }

    }


    cards.forEach(function(card){

        card.addEventListener("click",function(){

            if(card.classList.contains("open")){

                closeCard(card);

            }else{

                openCard(card);

            }

        });

    });


    if(toggleAll){

        toggleAll.addEventListener("click",function(event){

            event.stopPropagation();

            const allOpen=Array.from(cards).every(function(card){

                return card.classList.contains("open");

            });


            if(allOpen){

                cards.forEach(function(card){
                    closeCard(card);
                });

                toggleAll.textContent="Show All ✨";

            }else{

                cards.forEach(function(card){
                    openCard(card);
                });

                toggleAll.textContent="Hide All ✨";

            }

        });

    }

});
