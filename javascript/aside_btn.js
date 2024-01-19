const side_btn = document.querySelector("aside button");
side_btn.addEventListener('click',function (){
    window.scrollTo({left:0, top:0, behavior:'smooth'});
})

var top_button = document.querySelector("aside[data-6]");
window.addEventListener('scroll',function (){
    var h =window.innerHeight+document.documentElement.scrollTop +10
    if(h>3000){
        // top_button.style.opacity=1;
        // top_button.style.zIndex=1;
        top_button.classList.add("on");
        console.log('over 1000');
    }else{
        top_button.classList.remove("on");
    }
})