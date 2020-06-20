/*
このやり方はよろしくない
let a = fetch(url1);
let b = fetch(url2);
let c = fetch(url3);

Promise.all([a, b, c]).then(values => {

});
*/


// 使用可能な画像とテキストのファイルかを確認して、データを読み込む。
function fetchAndDecode(url, type) { // fetchする対象のurlと型を渡す
  return fetch(url).then(response => {
    if(!response.ok) { // fetchメソッドのresponseが成功したかを判定
    throw new Error('HTTP error! status: ${response.status}');
    } else {
      if(type === 'text') {
        return response.blob();
      } else if(type === 'text') {
        return response.text();
      }
    }
  })
  .catch(e => {
    console.log('There has been a problem with your fetch operation for resources "${url}": ' + e.message);
  });
}

let coffee = fetchAndDecode('coffee.jpg', 'blob');
let tea = fetchAndDecode('tea.jpg', 'blob');
let description = fetchAndDecode('description.txt', 'text');

// 上記３つのfetchメソッドのpromiseが正常に実行された場合のみ実行される
// then引数のエグゼキュータは配列内の3つのPromiseが満たされた場合のみ実行される
// 同期コードを使用して結果を変数に格納する
Promise.all([coffee, tea, description]).then(values => {
  consol.log(values);

  let objectURL1 = URL.createObjectURL(values[0]);
  let objectURL2 = URL.createObjectURL(values[1]);
  let descText = values[2];

  let image1 = document.createElement('img');
  let image2 = document.createElement('img');
  image1.src = objectURL1;
  image2.src = objectURL2;
  document.body.appendChild(image1);
  document.body.appendChild(image2);

  let para = document.createElement('p');
  para.textContent = descText;
  document.body.appendChild(para);
})
