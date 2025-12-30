// swiperの設定
// ★同じスワイパーでも2つの書き方が使われている
// パターン①DOMContentLoaded + new Swiper
// パターン②let ○○Swiper + enable関数

// topicsとvoiceはコンテンツ量から考えて画面幅に関係なくスクロールする/しないで固定
// →画面幅が変わっても再構成されない構造

// ①DOMContentLoaded + new Swiper
document.addEventListener("DOMContentLoaded", function () {
  const mySwiper = new Swiper(".topics__swiper", {
    slidesPerView: "auto",
    spaceBetween: 36,
    grabCursor: true,
    speed: 800, // スピードを800ミリ秒に設定
    mousewheel: true, // トラックパッドやマウスホイールのサポートを有効にする
    freeMode: true, // 自由スクロールモードを有効化
    scrollbar: {
      el: ".topics .swiper-scrollbar",
    },
    navigation: {
      nextEl: ".topics .button-next",
      prevEl: ".topics .button-prev",
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const mySwiper02 = new Swiper(".voice_swiper", {
    slidesPerView: "auto",
    spaceBetween: 36,
    grabCursor: true,
    speed: 800, // スピードを800ミリ秒に設定
    scrollbar: {
      el: ".swiper-scrollbar02",
    },
    navigation: {
      nextEl: ".voice_slide_area .button-next",
      prevEl: ".voice_slide_area .button-prev",
    },
  });
});

// パターン②let ○○Swiper + enable関数
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
        el: ".project-slide .swiper-scrollbar",
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
        el: ".story-slide .swiper-scrollbar",
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
  // レスポンシブ対応
  window.addEventListener("resize", function () {
    enableProjectSwiper();
    enableStorySwiper();
  });
});
