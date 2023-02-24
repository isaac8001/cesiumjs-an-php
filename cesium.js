// API KEY(Token) 입력
// 세슘 토큰(Token)
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNTdkNTc5YS1lODU4LTQxODMtYmIyNi0yYjhiMDM0M2NlNzAiLCJpZCI6MTIxMjYxLCJpYXQiOjE2NzM1OTExMjN9.nqcLnv-QlPS6gBGfpvyQuOh3Ftj8O1FHwjZTT-jB30M";

// STEP 2 CODE
// Cesium World Terrain 뷰어 초기화
const viewer = new Cesium.Viewer("cesiumContainer", {
  terrainProvider: Cesium.createWorldTerrain(),
  shadows: true,
  infoBox: true,
});

// 세슘에서 제공하는 기본적인 3D 건물 추가
const buildingsTileset = viewer.scene.primitives.add(
  Cesium.createOsmBuildings()
);

// 박스 만들기 함수
function addBox(x, y, h, latitude, longitude, z, color) {
  const scene = viewer.scene;
  let cc, ap;
  scene.globe.depthTestAgainstTerrain = true;
  // 컬러 설정
  switch (color) {
    case "SKYBLUE":
      cc = Cesium.Color.SKYBLUE;
      ap = 0.9;
      break;
    case "BLUE":
      cc = Cesium.Color.BLUE;
      ap = 0.9;
      break;
    case "RED":
      cc = Cesium.Color.RED;
      ap = 0.9;
      break;
    case "YELLOW":
      cc = Cesium.Color.YELLOW;
      ap = 0.9;
      break;
    case "GRAY":
      cc = Cesium.Color.GRAY;
      ap = 0.9;
      break;
    case "GREEN":
      cc = Cesium.Color.GREEN;
      ap = 0.9;
      break;
    case "PINK":
      cc = Cesium.Color.PINK;
      ap = 0.9;
      break;
    case "ORANGE":
      cc = Cesium.Color.ORANGE;
      ap = 0.9;
      break;
    case "BLACK":
      cc = Cesium.Color.BLACK;
      ap = 0.9;
      break;
  }

  // 도형의 가로(x), 세로(y), 높이(h), ~ 높이부터 시작할지(z), cc(컬러), ap(투명도)
  scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry: Cesium.BoxGeometry.fromDimensions({
          vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
          dimensions: new Cesium.Cartesian3(x, y, h),
        }),
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(
          Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(latitude, longitude)
          ),
          new Cesium.Cartesian3(0.0, 0.0, z),
          new Cesium.Matrix4()
        ),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            cc.withAlpha(ap)
          ),
        },
      }),
      appearance: new Cesium.PerInstanceColorAppearance({
        closed: true,
      }),
    })
  );
}

function makeBox(
  boxNum,
  x,
  y,
  h,
  latitude,
  longitude,
  z,
  color1,
  color2,
  color3
) {
  let zin = Number(z);
  let boxheight = Number(h);
  let color = [color1, color2, color3];
  let startHeight = [zin, zin + boxheight, zin + boxheight + boxheight];
  box_data = [];
  for (let i = 0; i < color.length; i++) {
    for (let s = 0; s < Number(boxNum); s++) {
      for (let c = 0; c < Number(boxNum); c++) {
        box = {};
        box["x"] = Number(x);
        box["y"] = Number(y);
        box["h"] = Number(h);
        box["latitude"] = parseFloat(
          parseFloat(127.39491) - (0.01291 * s).toFixed(5)
        );
        box["longitude"] = parseFloat(
          parseFloat(36.41944) - (0.01191 * c).toFixed(5)
        );
        box["z"] = startHeight[i];
        box["color"] = color[i].toUpperCase();
        box_data.push(box);
      }
    }
  }
  box_data.map((item) =>
    addBox(
      item.x,
      item.y,
      item.h,
      item.latitude,
      item.longitude,
      item.z,
      item.color
    )
  );
}
// 브라우저 시작시 시작할 위치와 높이
// 위도, 경도, 높이
viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(
    127.3949102176,
    36.4194472355,
    5000
  ),
});

// 3D 모델 추가 ex) 빌딩 자동차 등등...
// const newBuildingTileset = viewer.scene.primitives.add(
//   new Cesium.Cesium3DTileset({
//     url: Cesium.IonResource.fromAssetId(1500834),
//   })
// );
// const newApartment = viewer.scene.primitives.add(
//   new Cesium.Cesium3DTileset({
//     url: Cesium.IonResource.fromAssetId(1504057),
//   })
// );

// 원하는 위치에 text 넣기
// 위도(latitude), 경도(longitude), 높이(height), 글자(text)
function addText(latitude, longitude, height, text) {
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(latitude, longitude, height),
    label: {
      font: "18px Helvetica",
      text: text,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      fillColor: Cesium.Color.RED,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    },
  });
}

// text 표출 map으로 함수에 접근.
const arr = [
  {
    latitude: 127.3949102176,
    longitude: 36.4194472355,
    height: 61.9415222354 + 60,
    text: "높이 60m | 현재온도 16˚ | 풍속 20.7 m/s",
  },
  {
    latitude: 127.3949102176,
    longitude: 36.4194472355,
    height: 61.9415222354 + 100,
    text: "높이 100m | 현재온도 18˚ | 풍속 18.1 m/s",
  },
  {
    latitude: 127.3949102176,
    longitude: 36.4194472355,
    height: 61.9415222354 + 140,
    text: "높이 140m | 현재온도 20˚ | 풍속 16.8 m/s",
  },
  {
    latitude: 127.3949102176,
    longitude: 36.4194472355,
    height: 61.9415222354 + 180,
    text: "높이 160m | 현재온도 16˚ | 풍속 12.5 m/s",
  },
  {
    latitude: 127.3949102176,
    longitude: 36.4194472355,
    height: 61.9415222354 + 220,
    text: "높이 220m | 현재온도 15.5˚ | 풍속 12.7 m/s",
  },
  {
    latitude: 127.402665,
    longitude: 36.424814,
    height: 61.9415222354 + 10,
    text: "컨트롤에프 주식회사",
  },
];
arr.map((item) =>
  addText(item.latitude, item.longitude, item.height, item.text)
);

// 버튼 클릭으로 새로운 건축물 show or none
document.querySelector("#toggle-building").onclick = function () {
  newBuildingTileset.show = !newBuildingTileset.show;
};

// 그리드 생성하기
const grid = new Cesium.GridImageryProvider({
  cellAlpha: 0.1, // set the opacity of the cells
  glowWidth: 0.05, // set the width of the cell glows
});
viewer.imageryLayers.addImageryProvider(grid, false);

// 3D 파일 업로드 해서 화면에 표출
// longitude = 경도
// latitude = 위도
function loadModel(fn) {
  const longitude = parseFloat(prompt("경도를 입력하세요"));
  const latitude = parseFloat(prompt("위도를 입력하세요"));
  const height = parseFloat(prompt("높이를 입력하세요"));
  const entity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
    model: {
      uri: "./attach/" + fn,
    },
  });
  console.log("건물 생성 완료");
}
