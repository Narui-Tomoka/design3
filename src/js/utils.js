// fvの文字アニメーション

// 「佐賀の～」を一文字ずつspanタグで分割してclass = "char"を付与する処理
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".d-txt").forEach((el) => {
    // .d-txtそれぞれに以下の処理を実行
    const text = el.textContent.trim(); // 余計な空白や改行を除去して純粋に文字だけを処理
    const newContent = text
      .split("") // 一文字ずつ分割
      .map((char) => {
        // mapは新しい配列を生成する
        return `<span class ="char">${char}</span>`; // 分割した文字をspanタグに入れる
      })
      .join(""); // 作った配列をくっつける
    el.innerHTML = newContent;
  });
});

// プラグイン「jquery.inview」がうまく動かなかったのでIntersectionObserverに置き換え
document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".inview, .fv-inview");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("fv-inview")) {
            setTimeout(() => {
              entry.target.classList.add("move");
            }, 700);
          } else {
            entry.target.classList.add("move");
          }
          observer.unobserve(entry.target); // 一度処理したら監視不要にする
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  targets.forEach((el) => observer.observe(el));
});
// IntersectionObserverここまで

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
          smallLinks.style.maxHeight = "0px"; // 高さを0に
          smallLinks.classList.remove("active"); // active を取り除く
          toggleButton.classList.remove("active"); // active を取り除く
        } else {
          // 非アクティブ状態なら高さを設定して開く
          const scrollHeight = smallLinks.scrollHeight; // scrollHeightはpaddingまでの高さを取得
          smallLinks.style.maxHeight = scrollHeight + "px"; // 取得した高さにsmallLinksの高さを書き換える
          smallLinks.classList.add("active"); // activeつける
          toggleButton.classList.add("active"); // activeつける
        }
      });
    }
  });
});
