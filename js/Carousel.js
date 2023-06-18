const carousel=document.querySelector(".carousel");
const carouselContainer=carousel.querySelector(".carousel-container");
const carouselCard=carouselContainer.querySelectorAll(".carousel-card");
const carouselNext=document.querySelector(".carousel-next");
const carouselPrev=document.querySelector(".carousel-prev");

let setWidth=0;
let gap=0;
let carouselWidth=0;
let cardWidth=0
let n=0;
let carouselIndex=0;
let cardStep=1;

let numberOfcard=()=>{
    setWidth=(parseInt) (getComputedStyle(carousel).getPropertyValue("--set-width"));
    gap=(parseInt) ( getComputedStyle(carousel).getPropertyValue("--card-gap"));
    carouselWidth=carouselContainer.clientWidth;
    cardWidth=carouselCard[0].offsetWidth;
    n=Math.trunc(carouselWidth / (setWidth + 2*gap));
    n=n<=0?1:n;
}

window.onresize=()=>{
    numberOfcard();
     carousel.style.setProperty("--card-number",n);
}


let cardActive=()=>{
    for(let i=0;i<carouselCard.length;i++){
        if(i>=carouselIndex && i<carouselIndex+n){
        carouselCard[i].classList.add("active");
        continue;
    }
    carouselCard[i].classList.remove("active");
    }


}

let carouselTranslate=()=>{
   
    carouselIndex=carouselIndex>carouselCard.length-n?carouselCard.length-n:carouselIndex;
    carouselIndex=carouselIndex/cardStep<0?0:carouselIndex;
    carouselContainer.style.transform=`translateX(${-carouselIndex *  (100/n)}%)`
    cardActive();
   
}

let next=()=>{
    carouselIndex+=cardStep;
    carouselTranslate();

}

let prev=()=>{
    carouselIndex-=cardStep;
    carouselTranslate();
    
}


let mouseDown = false;
let mouseMove = false;
let move;
let prevPosition = 0;
let currentPosition = 0;
let speed = 2;
let roundPosition = 0;
let endPoint=0;

let mouse_down=(e) => {
    prevPosition = (e.pageX || e.touches[0].pageX )
    mouseDown = true;
console.log("fdgdf");
}


let mouse_move= (e) => {
    if (!mouseDown) return;
    move = (e.pageX || e.touches[0].pageX ) 
    currentPosition = (speed * (move - prevPosition));
 

    mouseMove = true;
    carousel.classList.add("catch");
    endPoint=(-carouselIndex *  (100/n))+currentPosition/carouselWidth*100;
    // if(endPoint<(-100/n)*(carouselCard.length)+100){
    //     endPoint=((-100/n)*(carouselCard.length)+100)-100/n;
    // }else if(endPoint>0){
    //     endPoint=100/n;
    // }

    carouselContainer.style.transform=`translateX(calc(${endPoint}%))`
    // carouselContainer.style.transform=`translateX(calc(${-carouselIndex *  (100/n)}% + ${currentPosition}px))`




}

let mouse_up=(e) => {
    mouseDown = false;

    if (!mouseMove) return;

    roundPosition=Math.round(currentPosition/(cardWidth+gap*2));
    carouselIndex-=roundPosition;
        carouselTranslate();     
    carousel.classList.remove("catch");
    mouseMove = false;
}

numberOfcard();
carousel.style.setProperty("--card-number",n);
carouselTranslate();


carouselNext.addEventListener("click",next);
carouselPrev.addEventListener("click",prev);



carousel.addEventListener("mousedown",mouse_down);
document.addEventListener("mousemove",mouse_move);
document.addEventListener("mouseup", mouse_up);

carousel.addEventListener("touchstart",mouse_down);
carousel.addEventListener("touchmove",mouse_move);
carousel.addEventListener("touchend",mouse_up);