const subscribeButton = document.querySelector(".subscribe_btn");
const modalPage=document.querySelector(".modal");
subscribeButton.addEventListener('click',(event)=>{
    const emailValue= document.querySelector("#email-input");
    if (emailValue.value.includes("@")){
        modalPage.classList.add("on");
        const modalPage_txt=document.querySelector(".modal div p:nth-of-type(2)");
        modalPage_txt.innerHTML=`안녕하세요 ${emailValue.value}님 앞으로 고객님의 이메일 주소로 이메일이 발송됩니다.`;
    }
    event.preventDefault();
});

const closeModal = document.querySelector(".close_btn");
closeModal.addEventListener('click',()=>{
    modalPage.classList.remove("on");
});
window.onclick=function (event){

};