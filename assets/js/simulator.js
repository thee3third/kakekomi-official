/* 山梨HPかけこみ寺 — simulator.js（料金シミュレーター）★このサイトの目玉
   ==========================================================================
   素のJavaScriptのみ。ライブラリ不使用。

   ■ 料金改定はこの PRICING を直すだけで全表示に反映されます ■
   （HTML側のプラン選択肢の表示価格・サービスページの料金表は別途手で揃えること。
     計算の正は常にこの定数。HTMLのvalue属性は plan の key と一致させる。）
   --------------------------------------------------------------------------
   計算ロジック:
     initialFee   = 選択プランの制作費（初期費用・一度きり）
     monthlyFee   = 月額（固定）
     months       = 利用月数（スライダー: MIN〜MAX）
     ----
     firstYearTotal = initialFee + monthlyFee * min(months, 12)
                      ※「初年度総額」= 制作費 + 最大12ヶ月ぶんの月額
                        （利用月数が12未満ならその月数ぶん）
     grandTotal     = initialFee + monthlyFee * months
                      ※「総額」= 制作費 + 利用月数ぶんの月額
     effectivePerMonth = round(grandTotal / months)
                      ※「月あたり実質負担」= 総額 ÷ 利用月数（制作費を月割り込み）
   ========================================================================== */
(function () {
  "use strict";

  /* === 料金定数（ここだけ直せば改定完了） ============================= */
  var PRICING = {
    plans: {
      // key は HTML の <input value="..."> と一致させる
      normal:  { label: "通常プラン",                 initialFee: 88000 },
      monitor: { label: "開業記念モニター（先着3店舗）", initialFee: 66000 }
    },
    monthlyFee: 6600,   // 月額（固定）
    months: { min: 6, max: 36, init: 12 }
  };
  /* =================================================================== */

  var root = document.getElementById("feeSimulator");
  if (!root) return;

  var planInputs = root.querySelectorAll('input[name="sim-plan"]');
  var range      = root.querySelector("#simMonths");
  var monthsOut  = root.querySelector("#simMonthsValue");
  var outFirst   = root.querySelector("#simFirstYear");
  var outTotal   = root.querySelector("#simTotal");
  var outMonth   = root.querySelector("#simPerMonth");

  if (!range || !outTotal) return;

  // スライダーの範囲を定数から設定（HTMLとJSの二重管理を避ける）
  range.min = PRICING.months.min;
  range.max = PRICING.months.max;
  range.value = PRICING.months.init;

  var prefersReduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 3桁区切り（¥記号は表示側のマークアップに任せる）
  function fmt(n) {
    return Math.round(n).toLocaleString("ja-JP");
  }

  function selectedPlanKey() {
    for (var i = 0; i < planInputs.length; i++) {
      if (planInputs[i].checked) return planInputs[i].value;
    }
    return "normal";
  }

  // 数字を更新し、変化したときだけ軽いカウントアップ＋バンプ演出
  function setNumber(el, value) {
    var target = Math.round(value);
    var current = parseInt(el.getAttribute("data-value") || "0", 10);
    if (current === target) return;
    el.setAttribute("data-value", String(target));

    // バンプ（CSS animation を付け直して再生）
    el.classList.remove("is-bumped");
    void el.offsetWidth; // リフロー強制でアニメーション再起動
    el.classList.add("is-bumped");

    if (prefersReduced) {
      el.firstChild ? (el.childNodes[0].nodeValue = fmt(target)) : (el.textContent = fmt(target));
      return;
    }

    // 220ms で current → target へカウントアップ
    var start = performance.now();
    var dur = 220;
    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      var val = Math.round(current + (target - current) * eased);
      // テキストノードのみ更新（中の <span class="yen"> は壊さない）
      el.childNodes[0].nodeValue = fmt(val);
      if (p < 1) requestAnimationFrame(tick);
      else el.childNodes[0].nodeValue = fmt(target);
    }
    requestAnimationFrame(tick);
  }

  function recalc() {
    var plan = PRICING.plans[selectedPlanKey()] || PRICING.plans.normal;
    var months = parseInt(range.value, 10) || PRICING.months.init;

    var initialFee = plan.initialFee;
    var monthly = PRICING.monthlyFee;

    var firstYearTotal = initialFee + monthly * Math.min(months, 12);
    var grandTotal     = initialFee + monthly * months;
    var perMonth       = grandTotal / months;

    monthsOut.textContent = months;
    setNumber(outFirst, firstYearTotal);
    setNumber(outTotal, grandTotal);
    setNumber(outMonth, perMonth);
  }

  // 初回は data-value を実値に合わせ、アニメ無しで初期表示
  [outFirst, outTotal, outMonth].forEach(function (el) {
    if (el) el.setAttribute("data-value", "-1");
  });

  for (var i = 0; i < planInputs.length; i++) {
    planInputs[i].addEventListener("change", recalc);
  }
  range.addEventListener("input", recalc);

  recalc();
})();
