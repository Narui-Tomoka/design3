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

// 要素をフェードインさせるためのjQuery（プラグイン「jquery.inview」使用）
$(document).ready(function () {
  $(".inview").on("inview", function () {
    $(this).addClass("move");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sLinksWraps = document.querySelectorAll(".s_links_wrap");

  sLinksWraps.forEach((sLinksWrap) => {
    const smallLinks = sLinksWrap.querySelector(".small_links");
    const toggleButton = sLinksWrap.querySelector(".oc_btn");

    if (smallLinks && toggleButton) {
      // 初期状態として max-height を 0 に設定
      smallLinks.style.maxHeight = "0px";

      // クリック処理
      toggleButton.addEventListener("click", () => {
        if (smallLinks.classList.contains("active")) {
          // アクティブ状態なら閉じる
          smallLinks.style.maxHeight = "0px";
          smallLinks.classList.remove("active");
          toggleButton.classList.remove("active");
        } else {
          // 非アクティブ状態なら高さを設定して開く
          const scrollHeight = smallLinks.scrollHeight;
          smallLinks.style.maxHeight = scrollHeight + "px";
          smallLinks.classList.add("active");
          toggleButton.classList.add("active");
        }
      });
    }
  });
});
