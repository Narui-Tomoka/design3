// fvの文字アニメーション

// 「佐賀の～」を一文字ずつspanタグで分割してclass = "char"を付与する処理
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".d-txt").forEach((el) => {
    const text = el.textContent.trim(); // 余計な空白や改行を除去して純粋に文字だけを処理
    const newContent = text
      .split("")
      .map((char) => {
        if (char === " ") {
          return char;
        }
        return `<span class ="char">${char}</span>`;
      })
      .join("");
    el.innerHTML = newContent;
    console.log(newContent);
  });
});

// SAGA MARIAGEの文字を下からスライドして表示する
// （"text"のclassを持っているspanタグに"move"クラスを追加することでcssアニメーションを起こす）
const subTitElement = document.querySelector(".fv__subtitle");
const titElement = document.querySelector(".fv__title");

if (subTitElement) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        if (subTitElement.classList.contains("move")) {
          setTimeout(() => {
            if (titElement) {
              titElement.classList.add("move");
            }
          }, 1000);
        }
      }
    });
  });
  // オブザーバーの設定
  observer.observe(subTitElement, {
    attributes: true, // class変更を監視する
  });
  // ロード時に、observerが動く条件である"move"のクラスをsubTitElementにつける
  // （オブザーバーの設定後に書かないと動かないので注意！）
  // loadは画像やフォント含めて読み込み終わってから実行するので今回の用途に適していると考えました
  // （DOMContentLoadedはHTML読み込みができたらすぐ）
  window.addEventListener("load", () => {
    subTitElement.classList.add("move");
  });
}
