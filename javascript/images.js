
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
        if (window.innerHeight + document.documentElement.scrollTop + 10 >= document.documentElement.offsetHeight){
            throttling(()=>{
                pageToFetch += 1;
                fetchImages(pageToFetch);
                if (pageToFetch%10===0){
                    infiniteScroll_flag=0;
                }
            },1900);

        }
    }
});




