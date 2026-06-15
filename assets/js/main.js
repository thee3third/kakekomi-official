/* 山梨HPかけこみ寺 — main.js
   - スマホ用ハンバーガーメニューの開閉
   - スクロールで要素がふわっと現れる控えめな演出（.reveal）
   依存なし・軽量を維持する。 */
(function () {
  "use strict";

  /* ---- ハンバーガーメニュー ---- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("globalNav");
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.setAttribute("data-open", String(open));
      toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ---- スクロール出現演出 ----
     .reveal を付けた要素が画面に入ったら .is-visible を付与。
     reduced-motion の利用者には即時表示（CSS側で打ち消し）。 */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (!("IntersectionObserver" in window)) {
      // 非対応ブラウザは全部表示してしまう（演出は飾りなので機能を損なわない）
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }
})();
