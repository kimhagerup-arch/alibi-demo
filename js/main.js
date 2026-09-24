/* ==========================================================================
   ALIBI – døra, Bakrommet (på siden: «den skjulte menyen») og bevegelsen
   Døra er et rent overlay: alt innhold ligger i DOM-en bak og er crawlbart
   uansett. sessionStorage: «alibi-inne» (døra vises én gang per økt) og
   «alibi-bakrom» (Bakrommet forblir åpent i økten) – delt mellom / og /no/.
   localStorage: «alibi-sprak» (valgt språk, leses av inline-skriptet på /).
   Tekstene JS skriver ut, ligger ikke her: se «alibi-tekst» i <head>.
   ========================================================================== */

/* Passordet – brukes av både døra og Bakrommet. Bytt det HER, ett sted.
   Små/store bokstaver spiller ingen rolle for den som taster, og æ/ø/å
   godtas som ae/oe/aa (turister med engelsk tastatur kommer også inn). */
var ALIBI_PASSORD = "æventyr";

(function () {
  "use strict";

  var reduserBevegelse = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var harIO = "IntersectionObserver" in window;
  var doraAktiv = false;
  var doraPassordAapning = null;
  var dorLukket = false;       // sann fra døra vises til den begynner å åpne seg
  var filmOppdater = null;     // settes av hero-filmen, kalles når døra åpner

  /* ---------- Tekstene JS skriver ut – per språk, generert inn i <head>
     som <script id="alibi-tekst" type="application/json"> fra tekst/*.json.
     Ingen strenger på noe språk skal ligge her i fila. ---------- */
  var TEKST = {};
  try {
    TEKST = JSON.parse(document.getElementById("alibi-tekst").textContent);
  } catch (e) {
    /* mangler tekstene, vises nøkkelen – bedre enn feil språk */
  }
  function t(nokkel) {
    return Object.prototype.hasOwnProperty.call(TEKST, nokkel) ? TEKST[nokkel] : nokkel;
  }

  // æ → ae, ø → oe, å → aa, små bokstaver – brukes på både input og fasit
  function normaliser(verdi) {
    return verdi
      .toLowerCase()
      .replace(/æ/g, "ae")
      .replace(/ø/g, "oe")
      .replace(/å/g, "aa");
  }
  var PASSORD_NORM = normaliser(ALIBI_PASSORD);

  function riktigPassord(verdi) {
    return normaliser(verdi.trim()) === PASSORD_NORM;
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
    bakromLinje.textContent = t("bakromAapnet");

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
        bakromStatus.textContent = t("feilPassord");
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
    dorLukket = true;

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
      lydKnapp.textContent = lydPaa ? t("lydPaa") : t("lydAv");
    });

    /* ---------- Å slippe inn ---------- */

    function slippInn(tilstand) {
      if (aapnet) return;
      aapnet = true;
      sessionStorage.setItem("alibi-inne", "1");
      scene.setAttribute("data-state", tilstand);
      // Døra begynner å åpne seg – kammerlys, støv og film bak den kan starte (pauset av inline-skriptet i <head>)
      document.documentElement.classList.remove("dor-lukket");
      dorLukket = false;
      if (filmOppdater) filmOppdater();

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

      if (bank === 1) status.textContent = t("bank1");
      if (bank === 2) status.textContent = t("bank2");

      if (bank >= BANK_MAAL) {
        if (reduserBevegelse) {
          status.textContent = t("fantOss");
          slippInn("aapner");
          return;
        }
        scene.setAttribute("data-state", "vurderer");
        status.textContent = "…";
        setTimeout(function () {
          status.textContent = t("fantOss");
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
      status.textContent = t("somDuVil");
      slippInn("aapner");
    });

    /* ---------- Passordet ---------- */

    function passordAapning() {
      laasOppBakrom(false); // den som kan passordet, får Bakrommet ferdig opplåst
      status.textContent = t("velkommenTilbake");
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
        status.textContent = t("feilPassord");
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
    var maal = e.target;
    if (maal && (maal.tagName === "INPUT" || maal.tagName === "TEXTAREA")) return;
    if (!e.key || e.key.length !== 1) return;
    // Bufferen holdes normalisert (æ → ae), så «æventyr» og «aeventyr» er like
    tastebuffer = (tastebuffer + normaliser(e.key)).slice(-PASSORD_NORM.length);
    if (tastebuffer !== PASSORD_NORM) return;
    tastebuffer = "";
    if (doraAktiv && doraPassordAapning) {
      doraPassordAapning();
    } else {
      laasOppBakrom(true);
    }
  });

  /* ========================================================================
     HERO-FILMEN
     Dekor i loop, lydløs. Spiller bare når alt dette stemmer: gjesten har
     ikke trykket pause, døra er ikke lukket, feltet er i syne, fanen er
     synlig, ingen redusert bevegelse og ingen sparemodus (de to siste gir
     plakat + knapp, og knappen kan starte filmen likevel). Uten JS: plakat
     og nettleserens kontroller (controls fjernes her).
     ======================================================================== */

  (function initFilm() {
    var felt = document.getElementById("hero-felt");
    var knapp = document.getElementById("film-knapp");
    if (!felt || !knapp) return;

    var forbindelse = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var sparemodus = !!(forbindelse && forbindelse.saveData);
    var gjestPauset = reduserBevegelse || sparemodus; // startvalg – husker gjestens trykk ut siden
    var iSyne = true;
    var film = null; // lages først når filmen skal spille (se kommentaren i malen)

    knapp.hidden = false;

    function lagFilm() {
      film = document.createElement("video");
      film.className = "hero-film";
      film.id = "hero-film";
      film.muted = true;
      film.setAttribute("muted", "");
      film.loop = true;
      film.setAttribute("playsinline", "");
      film.setAttribute("aria-hidden", "true");
      film.tabIndex = -1;
      film.preload = "auto";
      film.poster = felt.getAttribute("data-plakat");
      film.width = 960;
      film.height = 540;
      var kilde = document.createElement("source");
      kilde.src = felt.getAttribute("data-film");
      kilde.type = "video/mp4";
      film.appendChild(kilde);
      // Reserve for loop-attributtet: Playwrights WebKit pauser ved 0 etter
      // omstarten. Pauser filmen uten at vi ba om det, starter vi den igjen.
      film.addEventListener("pause", function () {
        if (kanSpille()) film.play().catch(function () {});
      });
      film.addEventListener("ended", function () {
        if (kanSpille()) { film.currentTime = 0; film.play().catch(function () {}); }
      });
      felt.insertBefore(film, knapp); // over plakaten, under knappen
    }

    function kanSpille() {
      return !gjestPauset && !dorLukket && iSyne && !document.hidden;
    }

    function oppdater() {
      if (kanSpille()) {
        if (!film) lagFilm();
        if (film.paused) {
          var p = film.play();
          if (p && p.catch) p.catch(function () { /* autoplay nektet – knappen finnes */ });
        }
      } else if (film && !film.paused) {
        film.pause();
      }
      var spiller = !gjestPauset;
      knapp.setAttribute("data-tilstand", spiller ? "spiller" : "pauset");
      knapp.setAttribute("aria-label", spiller ? t("filmPause") : t("filmSpill"));
    }
    filmOppdater = oppdater;

    knapp.addEventListener("click", function () {
      gjestPauset = !gjestPauset;
      oppdater();
    });

    if (harIO) {
      new IntersectionObserver(function (entries) {
        iSyne = entries[0].isIntersecting;
        oppdater();
      }, { threshold: 0.1 }).observe(felt);
    }
    document.addEventListener("visibilitychange", oppdater);

    oppdater();
  })();

  /* ========================================================================
     SPRÅKVELGEREN
     <details> virker uten JS; her: lukk på Esc og klikk utenfor, og husk
     valget i localStorage («alibi-sprak») – leses av inline-skriptet i
     <head> på /, som sender gjesten til /no/ hvis norsk er valgt. Gjelder
     også språklenka på døra (data-sprak).
     ======================================================================== */

  var sprakVelger = document.querySelector(".sprak");
  if (sprakVelger) {
    document.addEventListener("click", function (e) {
      if (sprakVelger.open && !sprakVelger.contains(e.target)) sprakVelger.open = false;
    });
    sprakVelger.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && sprakVelger.open) {
        sprakVelger.open = false;
        var knapp = sprakVelger.querySelector("summary");
        if (knapp) knapp.focus();
      }
    });
  }

  document.querySelectorAll("a[data-sprak]").forEach(function (lenke) {
    lenke.addEventListener("click", function () {
      try {
        localStorage.setItem("alibi-sprak", lenke.getAttribute("data-sprak"));
      } catch (e) {
        /* privat modus o.l. – valget huskes bare ikke */
      }
    });
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
      .querySelectorAll("h2, .huset-motto, .seksjon-ingress, .prosa, .medie-slot, .meny-kort, .meny-fotnote, .praktisk-rad, .bakrom-inngang")
      .forEach(function (el) {
        if (el.closest(".bakrom")) return; // Bakrommet har sin egen entré
        // Medieplassholdere inni kort (Huset) avsløres med kortet sitt, ikke dobbelt
        if (!el.classList.contains("meny-kort") && el.closest(".meny-kort")) return;
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
