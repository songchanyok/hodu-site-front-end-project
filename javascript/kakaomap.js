const API_KEY=config.apikey;


var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(33.4423021, 126.5714853), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

var marker = new kakao.maps.Marker({
    position:map.getCenter()
});

//마커적용
marker.setMap(map);

kakao.maps.event.addListener(map,'click',(mouseEvent)=>{
    var latling = mouseEvent.latLng;
    marker.setPosition(latling);
});