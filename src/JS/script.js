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

});
