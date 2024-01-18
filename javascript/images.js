
const imageList = document.querySelector(".image-list");
const imageLoadBtn = document.querySelector(".image-load-button");

let pageToFetch=1;

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
});
fetchImages(pageToFetch);