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
          observer.unobserve(entry.target);
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
