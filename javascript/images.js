
const imageList = document.querySelector(".image-list");
const imageLoadBtn = document.querySelector(".image-load-button");

let pageToFetch=1;
let infiniteScroll_flag=0;

async function fetchImages(pageNum) {
    try {
        const response = await fetch('https://picsum.photos/v2/list?page='+pageNum+'&limit=6');

        if (!response.ok) throw new Error('네트워크 에러');

        const datas = await response.json();
        console.log(datas);

        makeImageList(datas);
    } catch (e) {
        console.error('error', e);
    }
}

function makeImageList(datas){
    datas.forEach((item)=>{
        imageList.innerHTML +="<li><img src="+ item.download_url + " alt='사진'></li>";
    })

}

imageLoadBtn.addEventListener('click',()=>{
    pageToFetch+=1;
    fetchImages(pageToFetch);
    infiniteScroll_flag=1;
});
fetchImages(pageToFetch);

// const imgScrollBox=document.querySelector(".image-list");

//아래부터 무한스크롤 throttling은 약간의 지연을 위한 함수
let timer =null;
function throttling(callback,delay){

    // return ()=>{
        console.log(`timer값은 ${timer} 입니다.`);
        if(timer===null){
            timer=setTimeout(()=>{
                callback();
                timer=null;
            },delay);
        }
    // }
}
window.addEventListener('scroll',(event)=>{
    if(infiniteScroll_flag) {
        if (window.innerHeight + document.documentElement.scrollTop + 10 >= document.documentElement.offsetHeight) {
            throttling(()=>{
                pageToFetch += 1;
                fetchImages(pageToFetch);
                if (pageToFetch % 10 === 0) {
                    infiniteScroll_flag = 0;
                }
            },2000);
        }
    }
});

const section=document.querySelector("#main-detail");
//image click event
window.onclick=function (event){
    if(event.target===modalPage){
        modalPage.classList.remove("on");

    }
    if(event.target===section){
        mobileNavigation.style.display='none';
    }

    let imgClick = document.querySelectorAll(".image-list-wraper-element .image-list img");
    imgClick.forEach(item=>{
        item.addEventListener('click',()=> {
            console.log('이미지 클릭');
            let img = document.createElement('img');
            img.src = item.src;
            img.style.width = '100%'
            img.style.position = 'fixed';
            img.style.top = '50%';
            img.style.transform = 'translateY(-50%)';
            img.style.zIndex = 200;
            img.style.opacity = 1;
            document.querySelector("header").style.opacity = '0.3';
            document.querySelector("main").style.opacity = '0.3';
            document.querySelector("footer").style.opacity = '0.3';
            img.classList.add("img-click-event");
            document.body.appendChild(img);
        });
    });

    let forDelete=document.querySelectorAll(".img-click-event");
    let forDelete_item=forDelete.item(forDelete.length-1);
    if(event.target===forDelete_item){

        if(forDelete!==null){
            forDelete.forEach((item)=>{
                document.body.removeChild(item);
            });
            document.querySelector("header").style.opacity= '1';
            document.querySelector("main").style.opacity= '1';
            document.querySelector("footer").style.opacity= '1';
        }
    }
}





