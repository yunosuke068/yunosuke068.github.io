const btn = document.querySelector('button');
const input = document.querySelector('#item');
const list = document.querySelector('ul');



btn.onclick = function () {
  item = input.value;
  input.value = '';
  const listItem = document.createElement('li');
  const listText = document.createElement('span');
  const delBtn = document.createElement('button');
  listItem.appendChild(listText);
  listText.textContent = item;
  listItem.appendChild(delBtn);
  delBtn.textContent = 'Delete';
  list.appendChild(listItem);

  delBtn.onclick = function (e) {
    list.removeChild(listItem);
  }
  input.focus();
}
