import "./styles.css";

//todoリストから削除する
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

//完了リストから削除する
const deleteFromCompleteList = (target) => {
  document.getElementById("complete-list").removeChild(target);
};

//todoリストに追加する
const addToIncompleteList = (text) => {
  // li生成
  const li = document.createElement("li");

  // p生成
  const p = document.createElement("p");
  p.innerText = text;

  // div生成
  const div = document.createElement("div");

  // 完了ボタン生成
  const completeButton = document.createElement("button");
  completeButton.classList = "red";
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    const completeTarget = completeButton.parentNode;
    deleteFromIncompleteList(completeTarget.parentNode);

    //完了リストに追加する要素
    const addTarget = completeTarget.parentNode;

    //追加する要素のテキストを取得
    const text = addTarget.firstChild.innerText;

    //追加する要素の中身を初期化
    addTarget.textContent = null;

    //todoリストに追加したときと同じように中身を生成する
    const p = document.createElement("p");
    p.innerText = text;

    //戻るボタン生成
    const returnButton = document.createElement("button");
    returnButton.classList = "blue";
    returnButton.innerText = "戻す";
    addTarget.appendChild(p);
    addTarget.appendChild(returnButton);
    document.getElementById("complete-list").appendChild(addTarget);

    //戻すボタンの実装
    returnButton.addEventListener("click", () => {
      const returnTarget = returnButton.parentNode;
      deleteFromCompleteList(returnTarget);

      const text = returnTarget.firstChild.innerText;
      returnTarget.textContent = null;
      addToIncompleteList(text);
    });
  });

  //削除ボタン作成
  const deleteButton = document.createElement("button");
  deleteButton.classList = "red-outline";
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグ(li)をtodoリストから削除
    const deleteTarget = deleteButton.parentNode;
    deleteFromIncompleteList(deleteTarget.parentNode);
  });

  li.appendChild(p);
  li.appendChild(div);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // todoリストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

const onClickAdd = () => {
  // inputの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  addToIncompleteList(inputText);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
