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

// 要素をフェードインさせるためのjQuery（プラグイン「jquery.inview」使用）
$(document).ready(function () {
  $(".inview").on("inview", function () {
    $(this).addClass("move");
  });
});
// fvのタイトル用。ロード時にinview→moveのclass付与するとうまく動かないのでタイミング調整
$(document).ready(function () {
  $(".fv-inview").on("inview", function (event, isInView) {
    if (isInView) {
      // 要素が画面に入った（isInViewがtrue）とき
      var $target = $(this); // setTimeout内でも使えるように変数に格納

      setTimeout(function () {
        $target.addClass("move");
      }, 600); // ロードと同時にならないように
    }
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
