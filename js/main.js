/* ==========================================================================
   ALIBI – døra, Bakrommet og bevegelsen
   Døra er et rent overlay: alt innhold ligger i DOM-en bak og er crawlbart
   uansett. sessionStorage: «alibi-inne» (døra vises én gang per økt) og
   «alibi-bakrom» (Bakrommet forblir åpent i økten).
   ========================================================================== */

/* Passordet – brukes av både døra og Bakrommet. Bytt det HER, ett sted.
   Små/store bokstaver spiller ingen rolle for den som taster. */
var ALIBI_PASSORD = "æventyr";

(function () {
  "use strict";

  var reduserBevegelse = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var harIO = "IntersectionObserver" in window;
  var doraAktiv = false;
  var doraPassordAapning = null;

  function riktigPassord(verdi) {
    return verdi.trim().toLowerCase() === ALIBI_PASSORD.toLowerCase();
  }

  function rist(felt) {
    felt.classList.remove("feil");
    // Tvinger omstart av risteanimasjonen
    void felt.offsetWidth;
    felt.classList.add("feil");
  }

  /* ========================================================================
     BAKROMMET
     ======================================================================== */

  var bakromAapent = false;
  var bakrommet = document.getElementById("bakrommet");
  var bakromLinje = document.getElementById("bakrom-linje");
  var bakromUtloser = document.getElementById("bakrom-utloser");
  var bakromLaas = document.getElementById("bakrom-laas");
  var bakromFelt = document.getElementById("bakrom-felt");
  var bakromStatus = document.getElementById("bakrom-status");

  function laasOppBakrom(medFokus) {
    if (bakromAapent || !bakrommet) return;
    bakromAapent = true;
    sessionStorage.setItem("alibi-bakrom", "1");

    bakromLaas.hidden = true;
    bakromStatus.textContent = "";
    bakromLinje.textContent = "Du kan passordet. Bakrommet er ditt.";

    bakrommet.hidden = false;
    if (reduserBevegelse) {
      bakrommet.classList.add("aapen");
    } else {
      // To rAF: elementet må få én ramme som synlig før transition kan spille
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          bakrommet.classList.add("aapen");
        });
      });
    }

    if (medFokus) {
      var tittel = bakrommet.querySelector(".bakrom-tittel");
      if (tittel) tittel.focus();
    }
  }

  if (bakromUtloser) {
    bakromUtloser.addEventListener("click", function () {
      var skalVises = bakromLaas.hidden;
      bakromLaas.hidden = !skalVises;
      bakromUtloser.setAttribute("aria-expanded", String(skalVises));
      if (skalVises) bakromFelt.focus();
    });

    bakromFelt.addEventListener("input", function () {
      if (riktigPassord(bakromFelt.value)) laasOppBakrom(true);
    });

    bakromLaas.addEventListener("submit", function (e) {
      e.preventDefault();
      if (riktigPassord(bakromFelt.value)) {
        laasOppBakrom(true);
      } else {
        rist(bakromFelt);
        bakromStatus.textContent = "Det var ikke det.";
      }
    });

    if (sessionStorage.getItem("alibi-bakrom")) laasOppBakrom(false);
  }

  /* ========================================================================
     DØRA
     ======================================================================== */

  (function initDora() {
    var scene = document.getElementById("dora");
    if (!scene) return;

    if (sessionStorage.getItem("alibi-inne")) {
      scene.remove();
      return;
    }
    doraAktiv = true;

    var dorKnapp = document.getElementById("dor-knapp");
    var status = document.getElementById("dor-status");
    var prikker = scene.querySelectorAll(".bank-prikk");
    var hoppLenke = document.getElementById("gaa-rett-inn");
    var passordVis = document.getElementById("passord-vis");
    var passordWrap = document.getElementById("passord-felt-wrap");
    var passordFelt = document.getElementById("passord-felt");
    var lydKnapp = document.getElementById("lyd-knapp");

    var bakSceneElementer = [
      document.querySelector(".topplinje"),
      document.getElementById("hoved"),
      document.querySelector(".bunn"),
    ];

    var BANK_MAAL = 3;
    var bank = 0;
    var aapnet = false;
    var lydPaa = false;
    var lydKtx = null;

    // Innholdet bak døra skal ikke kunne nås med tastatur før man er inne
    bakSceneElementer.forEach(function (el) {
      if (el) el.inert = true;
    });
    document.body.style.overflow = "hidden";

    /* ---------- Lyd (WebAudio – ingen lydfil, av som standard) ---------- */

    function spillBank() {
      if (!lydPaa) return;
      try {
        if (!lydKtx) lydKtx = new (window.AudioContext || window.webkitAudioContext)();
        var t = lydKtx.currentTime;
        var osc = lydKtx.createOscillator();
        var gain = lydKtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(82, t);
        osc.frequency.exponentialRampToValueAtTime(48, t + 0.11);
        gain.gain.setValueAtTime(0.5, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
        osc.connect(gain).connect(lydKtx.destination);
        osc.start(t);
        osc.stop(t + 0.18);
      } catch (e) {
        /* lyd er pynt – feiler stille */
      }
    }

    lydKnapp.addEventListener("click", function () {
      lydPaa = !lydPaa;
      lydKnapp.setAttribute("aria-pressed", String(lydPaa));
      lydKnapp.textContent = lydPaa ? "Lyd: på" : "Lyd: av";
    });

    /* ---------- Å slippe inn ---------- */

    function slippInn(tilstand) {
      if (aapnet) return;
      aapnet = true;
      sessionStorage.setItem("alibi-inne", "1");
      scene.setAttribute("data-state", tilstand);

      var ferdig = false;
      function ryddOpp() {
        if (ferdig) return;
        ferdig = true;
        doraAktiv = false;
        scene.setAttribute("data-state", "borte");
        document.body.style.overflow = "";
        bakSceneElementer.forEach(function (el) {
          if (el) el.inert = false;
        });
        var logotype = document.querySelector(".logotype");
        if (logotype) logotype.focus({ preventScroll: true });
      }

      // Kun scenens egen transition teller – barnas (luke, dørblad) bobler opp
      scene.addEventListener("transitionend", function (e) {
        if (e.target === scene) ryddOpp();
      });
      // Reserveløsning om transitionend aldri fyres
      setTimeout(ryddOpp, reduserBevegelse ? 700 : 2200);
    }

    /* ---------- Bankingen ---------- */

    function bankPaa() {
      if (aapnet || scene.getAttribute("data-state") !== "lukket") return;

      bank++;
      spillBank();

      dorKnapp.classList.remove("banker");
      // Tvinger omstart av bankeanimasjonen
      void dorKnapp.offsetWidth;
      dorKnapp.classList.add("banker");

      prikker.forEach(function (prikk, i) {
        prikk.classList.toggle("tent", i < bank);
      });

      if (bank === 1) status.textContent = "En gang til.";
      if (bank === 2) status.textContent = "Én til …";

      if (bank >= BANK_MAAL) {
        if (reduserBevegelse) {
          status.textContent = "Du fant oss.";
          slippInn("aapner");
          return;
        }
        scene.setAttribute("data-state", "vurderer");
        status.textContent = "…";
        setTimeout(function () {
          status.textContent = "Du fant oss.";
        }, 1400);
        setTimeout(function () {
          slippInn("aapner");
        }, 2300);
      }
    }

    dorKnapp.addEventListener("click", bankPaa);

    /* ---------- «Gå rett inn» ---------- */

    hoppLenke.addEventListener("click", function (e) {
      e.preventDefault();
      status.textContent = "Som du vil.";
      slippInn("aapner");
    });

    /* ---------- Passordet ---------- */

    function passordAapning() {
      laasOppBakrom(false); // den som kan passordet, får Bakrommet ferdig opplåst
      status.textContent = "Velkommen tilbake.";
      slippInn(reduserBevegelse ? "aapner" : "hemmelig");
    }
    doraPassordAapning = passordAapning;

    passordVis.addEventListener("click", function () {
      var skjult = passordWrap.hidden;
      passordWrap.hidden = !skjult;
      passordVis.setAttribute("aria-expanded", String(skjult));
      if (skjult) passordFelt.focus();
    });

    passordFelt.addEventListener("input", function () {
      if (riktigPassord(passordFelt.value)) passordAapning();
    });

    passordWrap.addEventListener("submit", function (e) {
      e.preventDefault();
      if (riktigPassord(passordFelt.value)) {
        passordAapning();
      } else {
        rist(passordFelt);
        status.textContent = "Det var ikke det.";
      }
    });
  })();

  /* ========================================================================
     TASTE-EASTER-EGGET
     Den som bare begynner å taste passordet – foran døra eller inne –
     slipper forbi. Foran døra åpner det både dør og bakrom.
     ======================================================================== */

  var tastebuffer = "";
  document.addEventListener("keydown", function (e) {
    var t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
    if (!e.key || e.key.length !== 1) return;
    tastebuffer = (tastebuffer + e.key.toLowerCase()).slice(-ALIBI_PASSORD.length);
    if (tastebuffer !== ALIBI_PASSORD.toLowerCase()) return;
    tastebuffer = "";
    if (doraAktiv && doraPassordAapning) {
      doraPassordAapning();
    } else {
      laasOppBakrom(true);
    }
  });

  /* ========================================================================
     BEVEGELSEN
     ======================================================================== */

  // Ambient-animasjonene (kammerlys, støv) pauses når fanen ikke er synlig
  document.addEventListener("visibilitychange", function () {
    document.documentElement.classList.toggle("fane-skjult", document.hidden);
  });

  // Scroll-spy: bare en fargemarkering, ingen bevegelse – kjører alltid
  if (harIO) {
    var lenker = {};
    document.querySelectorAll(".topplinje-lenker a[href^='#']").forEach(function (a) {
      lenker[a.getAttribute("href").slice(1)] = a;
    });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Object.keys(lenker).forEach(function (id) {
          lenker[id].classList.toggle("aktiv", id === en.target.id);
        });
      });
    }, { rootMargin: "-35% 0px -60% 0px" });
    Object.keys(lenker).forEach(function (id) {
      var seksjon = document.getElementById(id);
      if (seksjon) spy.observe(seksjon);
    });
  }

  // Resten er ren bevegelse – hoppes helt over ved redusert bevegelse
  if (reduserBevegelse || !harIO) return;

  document.documentElement.classList.add("js-klar");

  /* ---------- Topplinja: skjules ned, glir inn opp ---------- */

  var topplinje = document.querySelector(".topplinje");
  var sisteY = window.scrollY;
  window.addEventListener("scroll", function () {
    var y = window.scrollY;
    if (y < 120 || y < sisteY - 4) {
      topplinje.classList.remove("topplinje-skjult");
    } else if (y > sisteY + 4) {
      topplinje.classList.add("topplinje-skjult");
    }
    sisteY = y;
  }, { passive: true });

  /* ---------- Scroll-avsløring ---------- */

  var maal = [];
  document.querySelectorAll(".seksjon:not(.seksjon-velkommen)").forEach(function (seksjon) {
    seksjon
      .querySelectorAll("h2, .seksjon-ingress, .prosa, .medie-slot, .meny-kort, .meny-fotnote, .praktisk-rad, .bakrom-inngang")
      .forEach(function (el) {
        if (el.closest(".bakrom")) return; // Bakrommet har sin egen entré
        maal.push(el);
      });
  });

  var kortIndeks = 0;
  maal.forEach(function (el) {
    el.classList.add("avslor");
    if (el.classList.contains("meny-kort")) {
      // Kortene tennes ett og ett
      el.style.transitionDelay = kortIndeks * 50 + "ms";
      kortIndeks++;
    }
  });

  var gjenstaar = maal.length;
  var avslorer = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      el.classList.add("avslort");
      // Etter avsløringen: fjern stagger-delayen så hover svarer umiddelbart
      el.addEventListener("transitionend", function h(e) {
        if (e.target !== el) return;
        el.style.transitionDelay = "";
        el.classList.add("i-ro");
        el.removeEventListener("transitionend", h);
      });
      avslorer.unobserve(el);
      gjenstaar--;
      if (gjenstaar === 0) avslorer.disconnect();
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });

  maal.forEach(function (el) {
    avslorer.observe(el);
  });

  /* ---------- Støv i lyset ---------- */

  var hero = document.querySelector(".seksjon-velkommen");
  if (hero) {
    var beholder = document.createElement("div");
    beholder.className = "stov";
    beholder.setAttribute("aria-hidden", "true");
    for (var i = 0; i < 15; i++) {
      var korn = document.createElement("span");
      korn.className = "stov-korn";
      korn.style.setProperty("--x", (Math.random() * 100).toFixed(1) + "%");
      korn.style.setProperty("--dur", (18 + Math.random() * 16).toFixed(1) + "s");
      korn.style.setProperty("--delay", (-Math.random() * 30).toFixed(1) + "s"); // negativ: allerede underveis
      korn.style.setProperty("--drift", (Math.random() * 3 - 1.5).toFixed(1) + "rem");
      korn.style.setProperty("--o", (0.12 + Math.random() * 0.18).toFixed(2));
      korn.style.setProperty("--s", (Math.random() < 0.5 ? 2 : 3) + "px");
      beholder.appendChild(korn);
    }
    // Først i seksjonen, så tekst tegnes over støvet
    hero.insertBefore(beholder, hero.firstChild);
  }
})();
