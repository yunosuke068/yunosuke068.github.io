async function myFetch() {
  // = await Promiseオブジェクトを返すもの
  // awaitはPromiseが返されるのを待機する。返されるまではasync functionを維持停止すつ
  let response = await fetch('coffee.jpg');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    let myBlob = await response.blob();
  }
}

myFetch().then((blob) => {
      let objectURL = URL.createObjectURL(myBlob);
      let image = document.createElement('img');
      image.src = objectURL;
      document.body.appendChild(image);
}).catch(e => console.log(e));
