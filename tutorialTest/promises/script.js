/*

*/

let promise = fetch('coffee.jpg');


// fetchメソッドはPromiseを返し、thenの引数としてResponseオブジェクトを渡す。
// Blobオブジェクトはファイルに似たオブジェクト
let promise2 = promise.then(respose => {
  if (!response.ok) { // fetch()のResponseが成功したかを判定し、失敗の場合はerror
    throw new Error('HTTP error! status: ${response.status}');
  } else { // respose.okがtrueで成功した場合はblobを返す
    return response.blob();
  }
});

// blobメソッドもまたpromiseを返す。
let promise3 = promise2.then(myBlob => {
  // promise2が満たされた時に返されるBlobオブジェクトを引数として渡す。
  // オブジェクトを指すURLが返される。
  let objectURL = URL.createObjectURL(myBlob);

  // HTMLのimg要素を作成してimage変数に格納する。
  let image = document.createElement('img');

  // img要素のsrc属性をobjectURLと等しくなるようにする
  image.src = objectURL;

  // body要素にimg要素を追加する
  document.body.appendChild(image);
})
