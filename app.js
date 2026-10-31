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
  const tlMatrix = document.getElementById("v-tl-matrix");
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

  // Figure SVGs map
  const figureRendererMap = {
    trump: figures.drawTrump(32, 22, 0.68),
    putin: figures.drawPutin(32, 22, 0.68),
    yoshida: figures.drawYoshida(32, 22, 0.65),
    caesar: figures.drawCaesar(32, 22, 0.68),
    genghis: figures.drawGenghis(32, 22, 0.68),
    mao: figures.drawMao(32, 22, 0.68)
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
    if (regionChips) {
      regionChips.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    }
  }

  if (sheetClose) sheetClose.addEventListener("click", closePopup);
  if (popupBackdrop) popupBackdrop.addEventListener("click", closePopup);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePopup();
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
          <span class="item-badge ${s.type === 'Webサイト' ? 'web' : ''}">${s.type} ↗</span>
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

  // Show details for a single session (from timeline vertical bar)
  function showSessionPopup(sessionNum) {
    const s = sessions[sessionNum - 1];
    if (!s) return;

    const regInfo = regions[s.region] || { name: "", color: "#e0e0e0" };
    const contentHtml = `
      <h4>
        <i style="background:${regInfo.color}"></i>
        第${s.n}回 ${s.title}
      </h4>
      <div class="sheet-desc">
        <b>📅 ${s.period}</b>｜${s.subtitle}<br>
        <p style="margin-top:8px; color:#444; font-weight:600; line-height:1.55;">${s.summary}</p>
      </div>
      <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="sheet-item-card" style="background:#fff7f8; border-color:var(--red); margin-top:14px;">
        <div class="item-header">
          <b style="font-size:15px; color:var(--red);">資料を開く (${s.type})</b>
          <span class="item-badge ${s.type === 'Webサイト' ? 'web' : ''}">${s.type} ↗</span>
        </div>
        <div class="item-btn" style="border:none; padding-top:4px;">
          <span>タップして別タブで閲覧する</span>
          <span style="font-weight:900;">→</span>
        </div>
      </a>
    `;

    openPopup(contentHtml);
  }

  // ==========================================================================
  // 2. Render World Map (画面幅に100%フィット・スクロール不要)
  // ==========================================================================
  if (mapContainer) {
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
    svgHtml += `<g class="map-figure" data-region="us">${figures.drawTrump(markers.usa[0] + 20, markers.usa[1] + 15, 0.72)}</g>`;
    svgHtml += `<g class="map-figure" data-region="ru">${figures.drawPutin(markers.russia[0] + 65, markers.russia[1] + 20, 0.72)}</g>`;
    svgHtml += `<g class="map-figure" data-region="cn">${figures.drawMao(markers.china[0], markers.china[1] + 10, 0.7)}</g>`;
    svgHtml += `<g class="map-figure" data-region="mn">${figures.drawGenghis(markers.mongolia[0] - 25, markers.mongolia[1] - 5, 0.7)}</g>`;
    svgHtml += `<g class="map-figure" data-region="jp">${figures.drawYoshida(markers.japan[0] + 20, markers.japan[1] + 30, 0.62)}</g>`;
    svgHtml += `<g class="map-figure" data-region="rm">${figures.drawCaesar(markers.rome[0] - 25, markers.rome[1] + 35, 0.7)}</g>`;

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
        if (r) {
          if (regionChips) {
            regionChips.querySelectorAll(".chip").forEach((c) => {
              c.classList.toggle("active", c.getAttribute("data-reg") === r);
            });
          }
          showRegionPopup(r);
        }
      });
    });
  }

  // Region Quick Chips click
  if (regionChips) {
    regionChips.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const r = chip.getAttribute("data-reg");
        regionChips.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        showRegionPopup(r);
      });
    });
  }

  // ==========================================================================
  // 3. Render Matrix Timeline (X: 地域 × Y: 西暦 の縦型並行年表)
  // ==========================================================================
  const BP = [-800, -27, 500, 1150, 1850, 2030];
  const FR = [0, 0.22, 0.38, 0.52, 0.68, 1.0];

  function calcY(year, totalHeight) {
    for (let i = 0; i < BP.length - 1; i++) {
      if (year <= BP[i + 1]) {
        return (
          (FR[i] +
            ((year - BP[i]) / (BP[i + 1] - BP[i])) * (FR[i + 1] - FR[i])) *
          totalHeight
        );
      }
    }
    return totalHeight;
  }

  const columns = [
    { name: "日本", flag: "🇯🇵", sessionNums: [1] },
    { name: "米伊中", flag: "🕊️", sessionNums: [2] },
    { name: "中国・蒙", flag: "🇨🇳", sessionNums: [5, 3] }, // モンゴル(5) -> 中国(3)
    { name: "ロシア", flag: "🇷🇺", sessionNums: [4] },
    { name: "ローマ", flag: "🏛️", sessionNums: [6, 7, 8] },
    { name: "アメリカ", flag: "🇺🇸", sessionNums: [9] }
  ];

  const shortLabels = {
    1: "戦後政治史",
    2: "米伊中関係",
    3: "2つの中国",
    4: "ロシア史",
    5: "モンゴル",
    6: "建国〜帝政",
    7: "五賢帝",
    8: "西ローマ",
    9: "アメリカ政治"
  };

  const ticks = [
    [-753, "前753"],
    [-27, "前27"],
    [180, "180"],
    [476, "476"],
    [862, "862"],
    [1206, "1206"],
    [1368, "1368"],
    [1860, "1860"],
    [1912, "1912"],
    [1946, "1946"],
    [2026, "いま"]
  ];

  const breaks = [-400, 680, 1600];

  function renderMatrixTimeline() {
    if (!tlMatrix) return;

    const TOTAL_H = 780;

    // 1. Column Headers (X axis)
    let headerHtml = `<div class="v-tl-header-row">`;
    columns.forEach((col) => {
      headerHtml += `
      <div class="v-tl-col-header">
        <span class="col-badge">${col.flag} ${col.name}</span>
      </div>`;
    });
    headerHtml += `</div>`;

    // 2. Body (Y axis ticks, horizontal grid lines, and columns with vertical bars)
    let bodyHtml = `<div class="v-tl-body">`;

    // Y axis (West year ticks)
    bodyHtml += `<div class="v-tl-y-axis">`;
    ticks.forEach(([year, label]) => {
      const y = calcY(year, TOTAL_H);
      const isNow = year === 2026;
      bodyHtml += `<span class="v-tl-tick ${isNow ? "now" : ""}" style="top:${y}px">${label}</span>`;
    });
    breaks.forEach((by) => {
      const y = calcY(by, TOTAL_H);
      bodyHtml += `<span class="v-tl-brk" style="top:${y}px">≈</span>`;
    });
    bodyHtml += `</div>`;

    // Horizontal grid lines across all columns
    ticks.forEach(([year]) => {
      const y = calcY(year, TOTAL_H);
      bodyHtml += `<div class="v-tl-gridline" style="top:${y}px"></div>`;
    });

    // Columns
    bodyHtml += `<div class="v-tl-columns">`;
    columns.forEach((col) => {
      bodyHtml += `<div class="v-tl-col">`;

      col.sessionNums.forEach((sn) => {
        const s = sessions[sn - 1];
        if (!s) return;

        const y1 = calcY(s.startYear, TOTAL_H);
        const y2 = calcY(s.endYear, TOTAL_H);
        let minH = 38;
        if (sn === 5) minH = 62; // モンゴル帝国 (「モンゴル」3文字が余裕で収まる高さ)
        if (sn === 7) minH = 56; // 五賢帝
        if (sn === 8) minH = 56; // 西ローマ
        const barH = Math.max(minH, y2 - y1);
        const regColor = regions[s.region] ? regions[s.region].color : "#ddd";
        const hasText = barH >= 42;

        bodyHtml += `
        <div class="tl-bar-v" data-sn="${s.n}" style="top:${y1}px; height:${barH}px; background:${regColor};" title="第${s.n}回 ${s.title}">
          <span class="n">${s.n}</span>
          ${hasText ? `<span class="bar-title">${shortLabels[s.n]}</span>` : ""}
        </div>`;
      });

      bodyHtml += `</div>`;
    });
    bodyHtml += `</div>`; // .v-tl-columns

    bodyHtml += `</div>`; // .v-tl-body

    tlMatrix.innerHTML = headerHtml + bodyHtml;

    // Attach click listeners to bars
    tlMatrix.querySelectorAll(".tl-bar-v").forEach((bar) => {
      bar.addEventListener("click", (e) => {
        e.stopPropagation();
        const sn = parseInt(bar.getAttribute("data-sn"), 10);
        showSessionPopup(sn);
      });
    });
  }

  renderMatrixTimeline();
  window.addEventListener("resize", renderMatrixTimeline);

  // ==========================================================================
  // 4. Render All Sessions Cards Section
  // ==========================================================================
  if (cardsGrid) {
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
  }

  // ==========================================================================
  // 5. Scroll spy for Bottom Nav
  // ==========================================================================
  const bnavItems = {
    map: document.getElementById("bnav-map"),
    tl: document.getElementById("bnav-tl"),
    cards: document.getElementById("bnav-cards")
  };

  const sectionsMap = {
    map: document.getElementById("map-section"),
    tl: document.getElementById("timeline-section"),
    cards: document.getElementById("cards-section")
  };

  window.addEventListener(
    "scroll",
    () => {
      const scrollPos = window.scrollY + 200;
      if (sectionsMap.cards && scrollPos >= sectionsMap.cards.offsetTop) {
        setActiveNav("cards");
      } else if (sectionsMap.tl && scrollPos >= sectionsMap.tl.offsetTop) {
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

  // URL Preview Param Support (e.g. ?preview=rm or ?session=5)
  const urlParams = new URLSearchParams(window.location.search);
  const previewReg = urlParams.get("preview");
  const previewSession = urlParams.get("session");
  if (previewSession) {
    showSessionPopup(parseInt(previewSession, 10));
  } else if (previewReg && regions[previewReg]) {
    showRegionPopup(previewReg);
  }
});
