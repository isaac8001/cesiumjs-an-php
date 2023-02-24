// fetch 사용하기
function getFetch(url) {
  fetch(url, {
    method: "post",
    body: formData,
  })
    .then(function (response) {
      // json이면 json 형태로 바꿔주고,
      // text이면 text 형태로 가져오고
      return response.json();
    })
    .then(function (text) {
      if (text != "fail") loadModel(text);
    })
    .catch(function (error) {
      console.log(error);
    });
}

const data = getFetch("접속주소");

// map 사용하기
data.map((item) => {});
