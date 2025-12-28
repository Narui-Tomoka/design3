// .sub_tit に .move クラスが追加されることを監視する
const subTitElement = document.querySelector(".fv__subtitle");
const fvTitElement = document.querySelector(".fv__title");

if (subTitElement) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        if (subTitElement.classList.contains("move")) {
          // 2秒後に .fv_tit に .move クラスを付与
          setTimeout(() => {
            if (fvTitElement) {
              fvTitElement.classList.add("move");
            }
          }, 2000); // 2000ミリ秒 = 2秒
        }
      }
    });
  });

  // オブザーバーの設定
  observer.observe(subTitElement, {
    attributes: true, // クラス変更を監視
  });
}
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".img:nth-child(1)").classList.add("start");
  }, 5000); // 適宜調整
});
document.addEventListener("DOMContentLoaded", function () {
  const mySwiper = new Swiper(".topics__swiper", {
    slidesPerView: "auto",
    spaceBetween: 36,
    grabCursor: true,
    speed: 800, // スピードを800ミリ秒に設定
    mousewheel: true, // トラックパッドやマウスホイールのサポートを有効にする
    freeMode: true, // 自由スクロールモードを有効化
    scrollbar: {
      el: ".swiper-scrollbar",
    },
    navigation: {
      nextEl: ".topics_slide_area .button-next",
      prevEl: ".topics_slide_area .button-prev",
    },
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const mySwiper02 = new Swiper(".voice_swiper", {
    slidesPerView: "auto",
    spaceBetween: 36,
    grabCursor: true,
    speed: 800, // スピードを500ミリ秒に設定
    scrollbar: {
      el: ".swiper-scrollbar02",
    },
    navigation: {
      nextEl: ".voice_slide_area .button-next",
      prevEl: ".voice_slide_area .button-prev",
    },
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // .project-slider
  let projectSwiper;
  function enableProjectSwiper() {
    projectSwiper = new Swiper(".project-slide .project-slider", {
      slidesPerView: "auto",
      spaceBetween: 20,
      grabCursor: true,
      speed: 800,
      freeMode: true, // 自由スクロールモードを有効化
      mousewheel: {
        forceToAxis: true, // Y軸（垂直）のスクロール操作は通常通りに動作
      },
      // mousewheel: true, // トラックパッドやマウスホイールのサポートを有効にする
      scrollbar: {
        el: ".swiper-scrollbar-project",
        draggable: true,
      },
      navigation: {
        nextEl: ".project-slide .button-next",
        prevEl: ".project-slide .button-prev",
      },
    });
  }

  // .story-slider
  let storySwiper;
  function enableStorySwiper() {
    storySwiper = new Swiper(".story-slide .story-slider", {
      slidesPerView: "auto",
      spaceBetween: 20,
      grabCursor: true,
      freeMode: true, // 自由スクロールモードを有効化
      mousewheel: {
        forceToAxis: true, // Y軸（垂直）のスクロール操作は通常通りに動作
      },
      speed: 800,
      scrollbar: {
        el: ".swiper-scrollbar-story",
        draggable: true,
      },
      navigation: {
        nextEl: ".story-slide .button-next",
        prevEl: ".story-slide .button-prev",
      },
    });
  }

  // 初期化
  enableProjectSwiper();
  enableStorySwiper();

  // ウィンドウリサイズ時にSwiperを更新
  window.addEventListener("resize", function () {
    enableProjectSwiper();
    enableStorySwiper();
  });
});
