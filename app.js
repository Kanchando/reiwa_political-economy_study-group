// 令和政治勉強会 スマホファースト・メインスクリプト

document.addEventListener("DOMContentLoaded", function () {
  const data = window.POLITICS_STUDY_DATA;
  const figures = window.FIGURES;
  const worldMap = window.WORLD_MAP;

  if (!data || !worldMap || !figures) {
    console.error("Required data not found.");
    return;
  }

  const { sessions, regions } = data;

  // DOM Elements
  const mapContainer = document.getElementById("map-svg-root");
  const mapScrollPane = document.getElementById("map-scroll-pane");
  const tlGrid = document.getElementById("tl");
  const tlScrollPane = document.getElementById("tl-scroll-pane");
  const cardsGrid = document.getElementById("cards");
  const sheetPopup = document.getElementById("sheet-popup");
  const sheetContent = document.getElementById("sheet-content");
  const sheetClose = document.getElementById("sheet-close");
  const popupBackdrop = document.getElementById("popup-backdrop");
  const regionChips = document.getElementById("region-chips");

  // Country region key mapping
  const countryRegionMap = {
    "392": "jp",
    "156": "cn",
    "158": "cn",
    "643": "ru",
    "840": "us",
    "364": "ui",
    // Mongol Empire (historic max extent)
    "496": "mn", "398": "mn", "860": "mn", "795": "mn", "417": "mn", "762": "mn",
    "004": "mn", "368": "mn", "408": "mn", "410": "mn", "804": "mn", "268": "mn",
    "051": "mn", "031": "mn",
    // Roman Empire (Mediterranean Basin)
    "380": "rm", "250": "rm", "724": "rm", "620": "rm", "300": "rm", "792": "rm",
    "818": "rm", "788": "rm", "434": "rm", "012": "rm", "504": "rm", "826": "rm",
    "056": "rm", "756": "rm", "040": "rm", "191": "rm", "705": "rm", "070": "rm",
    "688": "rm", "008": "rm", "807": "rm", "499": "rm", "100": "rm", "642": "rm",
    "760": "rm", "422": "rm", "376": "rm", "400": "rm", "275": "rm", "196": "rm",
    "348": "rm", "442": "rm", "528": "rm"
  };

  // ==========================================================================
  // 1. Popup & Bottom Sheet System
  // ==========================================================================
  function openPopup(htmlContent) {
    sheetContent.innerHTML = htmlContent;
    popupBackdrop.classList.add("active");
    sheetPopup.classList.add("active");
  }

  function closePopup() {
    popupBackdrop.classList.remove("active");
    sheetPopup.classList.remove("active");
    document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
  }

  sheetClose.addEventListener("click", closePopup);
  popupBackdrop.addEventListener("click", closePopup);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePopup();
  
  // Preview param support for instant testing
  const urlParams = new URLSearchParams(window.location.search);
  const previewReg = urlParams.get('preview');
  if (previewReg) {
    showRegionPopup(previewReg);
  }
});


  // Show details for a specific region (handles single or multi-session regions like Rome)
  function showRegionPopup(regKey) {
    const regSessions = sessions.filter((s) => s.region === regKey);
    if (!regSessions.length) return;

    const regInfo = regions[regKey];
    let cardsHtml = "";

    regSessions.forEach((s) => {
      cardsHtml += `
      <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="sheet-item-card">
        <div class="item-header">
          <b>第${s.n}回 ${s.title}</b>
          <span class="item-badge">${s.type} ↗</span>
        </div>
        <div class="item-sub">📅 ${s.period}｜${s.subtitle}</div>
        <div class="item-btn">
          <span>${s.type} で資料を開く</span>
          <span>→</span>
        </div>
      </a>`;
    });

    const contentHtml = `
      <h4>
        <i style="background:${regInfo.color}"></i>
        ${regInfo.name} ― ${regSessions.length}回分
      </h4>
      <div class="sheet-desc">該当する回の資料リンク（Canva / Webサイト）へ移動できます。</div>
      ${cardsHtml}
    `;

    openPopup(contentHtml);
  }

  // Show details for a single session (e.g. from timeline bar)
  function showSessionPopup(sessionNum) {
    const s = sessions[sessionNum - 1];
    if (!s) return;

    const regInfo = regions[s.region];
    const contentHtml = `
      <h4>
        <i style="background:${regInfo.color}"></i>
        第${s.n}回 ${s.title}
      </h4>
      <div class="sheet-desc">
        <b>${s.period}</b>｜${s.subtitle}<br>
        <p style="margin-top:6px; color:#444; font-weight:600;">${s.summary}</p>
      </div>
      <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="sheet-item-card" style="background:#fff7f8; border-color:var(--red);">
        <div class="item-header">
          <b>資料を開く (${s.type})</b>
          <span class="item-badge">${s.type} ↗</span>
        </div>
        <div class="item-btn" style="border:none; padding-top:4px;">
          <span>タップして別タブで閲覧</span>
          <span>→</span>
        </div>
      </a>
    `;

    openPopup(contentHtml);
  }

  // ==========================================================================
  // 2. Render World Map
  // ==========================================================================
  let svgHtml = `<svg viewBox="0 0 ${worldMap.width} ${worldMap.height}" id="world-svg">`;

  // Draw countries
  for (const c of worldMap.countries) {
    const regKey = countryRegionMap[c.id] || (c.name === "Kosovo" ? "rm" : null);
    const fillColor = regKey ? regions[regKey].color : "";
    const isHighlight = !!regKey;
    svgHtml += `<path class="land ${isHighlight ? "hl" : ""}" data-region="${regKey || ""}" d="${c.d}" ${
      regKey ? `style="fill:${fillColor}"` : ""
    }/>`;
  }

  const markers = worldMap.markers;

  // Tripartite relation curve: US - Iran - China
  svgHtml += `
  <g class="rel">
    <path d="M${markers.usa} Q${(markers.usa[0] + markers.iran[0]) / 2},${markers.usa[1] - 70} ${markers.iran}"/>
    <path d="M${markers.iran} Q${(markers.iran[0] + markers.china[0]) / 2},${markers.iran[1] + 30} ${markers.china}"/>
  </g>`;

  // Historical Figures on Map
  svgHtml += `<g class="map-figure" data-region="us" transform="translate(0,0)">${figures.drawTrump(markers.usa[0] + 20, markers.usa[1] + 15, 0.72)}</g>`;
  svgHtml += `<g class="map-figure" data-region="ru" transform="translate(0,0)">${figures.drawPutin(markers.russia[0] + 65, markers.russia[1] + 20, 0.72)}</g>`;
  svgHtml += `<g class="map-figure" data-region="cn" transform="translate(0,0)">${figures.drawMao(markers.china[0], markers.china[1] + 10, 0.7)}</g>`;
  svgHtml += `<g class="map-figure" data-region="mn" transform="translate(0,0)">${figures.drawGenghis(markers.mongolia[0] - 25, markers.mongolia[1] - 5, 0.7)}</g>`;
  svgHtml += `<g class="map-figure" data-region="jp" transform="translate(0,0)">${figures.drawYoshida(markers.japan[0] + 20, markers.japan[1] + 30, 0.62)}</g>`;
  svgHtml += `<g class="map-figure" data-region="rm" transform="translate(0,0)">${figures.drawCaesar(markers.rome[0] - 25, markers.rome[1] + 35, 0.7)}</g>`;

  // Tags with Session Numbers
  function renderTag(x, y, regKey, numStr, label) {
    const w = 34 + label.length * 13.2 + (numStr.length > 1 ? 10 : 0);
    const cr = numStr.length > 1 ? 12 : 10;
    return `
    <g class="map-tag" data-region="${regKey}">
      <rect x="${x}" y="${y - 13}" width="${w}" height="26" rx="13"/>
      <circle cx="${x + 13}" cy="${y}" r="${cr}" style="fill:${regions[regKey].color}"/>
      <text class="num" x="${x + 13}" y="${y + 1}" style="font-size:${numStr.length > 2 ? 9 : 11}px">${numStr}</text>
      <text x="${x + 13 + cr + 6}" y="${y + 1}">${label}</text>
    </g>`;
  }

  svgHtml += renderTag(markers.usa[0] - 75, markers.usa[1] - 40, "us", "9", "アメリカ");
  svgHtml += renderTag(markers.russia[0], markers.russia[1] - 30, "ru", "4", "ロシア");
  svgHtml += renderTag(markers.china[0] + 20, markers.china[1] + 48, "cn", "3", "中国・台湾");
  svgHtml += renderTag(markers.mongolia[0] + 5, markers.mongolia[1] - 28, "mn", "5", "モンゴル帝国");
  svgHtml += renderTag(markers.iran[0] - 35, markers.iran[1] + 35, "ui", "2", "米・イラン・中国");
  svgHtml += renderTag(markers.japan[0] + 18, markers.japan[1] - 8, "jp", "1", "日本");
  svgHtml += renderTag(markers.rome[0] - 115, markers.rome[1] - 38, "rm", "6-8", "ローマ帝国");

  svgHtml += "</svg>";
  mapContainer.innerHTML = svgHtml;

  // Add click handlers for map elements
  mapContainer.querySelectorAll("[data-region]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      const r = el.getAttribute("data-region");
      if (r) showRegionPopup(r);
    });
  });

  // Region Quick Chips click & auto-scroll
  const markerKeyMap = {
    jp: "japan",
    ui: "iran",
    cn: "china",
    ru: "russia",
    mn: "mongolia",
    rm: "rome",
    us: "usa"
  };

  regionChips.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const r = chip.getAttribute("data-reg");
      regionChips.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");

      // Auto-scroll map pane to center marker
      const mKey = markerKeyMap[r];
      if (mKey && markers[mKey]) {
        const markerX = markers[mKey][0];
        const svgW = worldMap.width;
        const paneW = mapScrollPane.clientWidth;
        const scrollTarget = (markerX / svgW) * mapContainer.scrollWidth - paneW / 2;
        mapScrollPane.scrollTo({ left: Math.max(0, scrollTarget), behavior: "smooth" });
      }

      showRegionPopup(r);
    });
  });

  // ==========================================================================
  // 3. Render Timeline
  // ==========================================================================
  const BP = [-1600, -800, 500, 1200, 1800, 2030];
  const FR = [0, 0.04, 0.44, 0.54, 0.64, 1.0];

  function getTlWidth() {
    const paneW = tlScrollPane.clientWidth;
    // On mobile, guarantee at least 820px so time scale isn't squashed
    return Math.max(820, paneW - 140);
  }

  function calcX(year, totalWidth) {
    for (let i = 0; i < BP.length - 1; i++) {
      if (year <= BP[i + 1]) {
        return (FR[i] + ((year - BP[i]) / (BP[i + 1] - BP[i])) * (FR[i + 1] - FR[i])) * totalWidth;
      }
    }
    return totalWidth;
  }

  const LH = 54;
  const lanes = [
    ["日本", ["jp"]],
    ["米・イラン・中", ["ui"]],
    ["中国・モンゴル", ["cn", "mn"]],
    ["ロシア", ["ru"]],
    ["ローマ", ["rm"]],
    ["アメリカ", ["us"]]
  ];

  function renderTimeline() {
    const W_TL = getTlWidth();
    let tlHtml = "";

    lanes.forEach(([laneName, regKeys], i) => {
      tlHtml += `<div class="lane" style="top:${i * LH}px"><b>${laneName}</b></div>`;

      const laneSessions = sessions.filter(
        (s) => regKeys.includes(s.region) && !["rm", "mn"].includes(s.region)
      );

      laneSessions.forEach((s) => {
        const x1 = calcX(s.startYear, W_TL);
        const x2 = calcX(s.endYear, W_TL);
        const barWidth = Math.max(32, x2 - x1);
        tlHtml += `
        <div class="tl-bar" data-sn="${s.n}" style="left:${x1}px;width:${barWidth}px;top:${
          i * LH + 12
        }px;background:${regions[s.region].color};">
          <span class="n">${s.n}</span>
        </div>`;
      });
    });

    // Rome bars (6, 7, 8 on Lane 4)
    [6, 7, 8].forEach((n) => {
      const s = sessions[n - 1];
      const x1 = calcX(s.startYear, W_TL);
      const x2 = calcX(s.endYear, W_TL);
      const barWidth = Math.max(28, x2 - x1);
      tlHtml += `
      <div class="tl-bar" data-sn="${s.n}" style="left:${x1}px;width:${barWidth}px;top:${
        4 * LH + 12
      }px;background:${regions.rm.color};">
        <span class="n">${s.n}</span>
      </div>`;
    });

    // Mongol bar (5 on Lane 2)
    {
      const s = sessions[4];
      const x1 = calcX(s.startYear, W_TL);
      const x2 = calcX(s.endYear, W_TL);
      const barWidth = Math.max(28, x2 - x1);
      tlHtml += `
      <div class="tl-bar" data-sn="${s.n}" style="left:${x1}px;width:${barWidth}px;top:${
        2 * LH + 12
      }px;background:${regions.mn.color};">
        <span class="n">${s.n}</span>
      </div>`;
    }

    // Axis
    const ticks = [
      [-1600, "前1600"],
      [-753, "前753"],
      [-27, "前27"],
      [180, "180"],
      [476, "476"],
      [862, "862"],
      [1206, "1206"],
      [1600, "1600"],
      [1912, "1912"],
      [1953, "1953"],
      [2026, "2026"]
    ];

    tlHtml += `<div class="axis">
      ${ticks
        .map(
          ([y, l]) =>
            `<span class="tick" style="left:${calcX(y, W_TL)}px">${l}</span>`
        )
        .join("")}
      <span class="brk" style="left:${calcX(-800, W_TL)}px">≈</span>
      <span class="brk" style="left:${calcX(500, W_TL)}px">≈</span>
      <span class="brk" style="left:${calcX(1800, W_TL)}px">≈</span>
    </div>
    <div class="now" style="left:${calcX(2026, W_TL)}px"><span>いま</span></div>`;

    tlGrid.innerHTML = tlHtml;

    // Attach click listeners to all timeline bars
    tlGrid.querySelectorAll(".tl-bar").forEach((bar) => {
      bar.addEventListener("click", (e) => {
        e.stopPropagation();
        const sn = parseInt(bar.getAttribute("data-sn"), 10);
        showSessionPopup(sn);
      });
    });
  }

  renderTimeline();
  window.addEventListener("resize", renderTimeline);

  // ==========================================================================
  // 4. Render Cards Grid
  // ==========================================================================
  const figureRendererMap = {
    trump: figures.drawTrump(32, 22, 0.68),
    putin: figures.drawPutin(32, 22, 0.68),
    yoshida: figures.drawYoshida(32, 22, 0.65),
    caesar: figures.drawCaesar(32, 22, 0.68),
    genghis: figures.drawGenghis(32, 22, 0.68),
    mao: figures.drawMao(32, 22, 0.68)
  };

  cardsGrid.innerHTML = sessions
    .map(
      (s) => `
    <article class="card" id="card-${s.n}">
      <div class="card-head" style="background:${regions[s.region].color}">
        <span class="no-badge"><small>No.</small>${String(s.n).padStart(2, "0")}</span>
        <div class="illust-box">
          <svg width="68" height="68" viewBox="0 0 64 64">${figureRendererMap[s.figure] || ""}</svg>
        </div>
        <span class="type-tag ${s.type === "Webサイト" ? "web" : ""}">${s.type}</span>
      </div>
      <div class="card-body">
        <h3>第${s.n}回 ${s.title}</h3>
        <div class="subtitle-text">${s.subtitle}</div>
        <div class="date-range">📅 ${s.period}</div>
        <div class="summary-text">${s.summary}</div>
        <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="go-link">
          <span>資料を開く (${s.type})</span>
          <i>→</i>
        </a>
      </div>
    </article>`
    )
    .join("");

  // ==========================================================================
  // 5. Scroll spy for Bottom Nav
  // ==========================================================================
  const bnavItems = {
    map: document.getElementById("bnav-map"),
    tl: document.getElementById("bnav-tl"),
    cards: document.getElementById("bnav-cards")
  };

  const sections = {
    map: document.getElementById("map-section"),
    tl: document.getElementById("timeline-section"),
    cards: document.getElementById("cards-section")
  };

  window.addEventListener(
    "scroll",
    () => {
      const scrollPos = window.scrollY + 200;
      if (scrollPos >= sections.cards.offsetTop) {
        setActiveNav("cards");
      } else if (scrollPos >= sections.tl.offsetTop) {
        setActiveNav("tl");
      } else {
        setActiveNav("map");
      }
    },
    { passive: true }
  );

  function setActiveNav(key) {
    Object.keys(bnavItems).forEach((k) => {
      if (bnavItems[k]) {
        bnavItems[k].classList.toggle("active", k === key);
      }
    });
  }
});
