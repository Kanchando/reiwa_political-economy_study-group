// 令和政治勉強会 偉人イラスト（SVGコミック・ラインアート）

(function() {
  function drawTrump(cx, cy, s = 1) {
    return `
    <g class="figure trump" transform="translate(${cx},${cy}) scale(${s})">
      <path d="M-22,35 L-26,55 L26,55 L22,35 Z" fill="#2259a6" stroke="#222" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M-8,35 L0,50 L8,35 Z" fill="#ffffff" stroke="#222" stroke-width="1.8"/>
      <path d="M-3,37 L3,37 L5,55 L0,58 L-5,55 Z" fill="#d62828" stroke="#222" stroke-width="1.8"/>
      <path d="M-18,35 L-8,48 L-5,35 M18,35 L8,48 L5,35" fill="none" stroke="#222" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M-15,10 C-16,26 -12,35 0,35 C12,35 16,26 15,10 C15,0 12,-4 0,-4 C-12,-4 -15,0 -15,10 Z" fill="#fedac2" stroke="#222" stroke-width="2.5"/>
      <path d="M-15,12 C-18,12 -18,18 -15,20 M15,12 C18,12 18,18 15,20" fill="#fedac2" stroke="#222" stroke-width="2"/>
      <path d="M-10,9 L-4,11 M10,9 L4,11" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="-6" cy="14" r="1.8" fill="#222"/>
      <circle cx="6" cy="14" r="1.8" fill="#222"/>
      <path d="M0,13 L-2,19 L1,19" fill="none" stroke="#222" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <ellipse cx="0" cy="25" rx="4" ry="3" fill="#8a2525" stroke="#222" stroke-width="1.8"/>
      <path d="M-8,22 C-6,26 -5,28 -5,29 M8,22 C6,26 5,28 5,29" fill="none" stroke="#222" stroke-width="1.4" stroke-linecap="round"/>
      <path d="M-17,8 C-20,0 -16,-14 -3,-14 C10,-14 18,-10 20,-2 C22,6 18,10 16,10 C14,4 12,0 8,-2 C2,-4 -6,-2 -10,3 C-13,6 -15,8 -17,8 Z" fill="#f9d45c" stroke="#222" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M-10,-6 C-3,-9 8,-7 14,-2" fill="none" stroke="#222" stroke-width="1.8" stroke-linecap="round"/>
    </g>`;
  }

  function drawPutin(cx, cy, s = 1) {
    return `
    <g class="figure putin" transform="translate(${cx},${cy}) scale(${s})">
      <path d="M-22,35 L-25,55 L25,55 L22,35 Z" fill="#2d3748" stroke="#222" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M-8,35 L0,48 L8,35 Z" fill="#ffffff" stroke="#222" stroke-width="1.8"/>
      <path d="M-3,37 L3,37 L4,55 L0,57 L-4,55 Z" fill="#4299e1" stroke="#222" stroke-width="1.8"/>
      <path d="M-18,35 L-8,46 L-4,35 M18,35 L8,46 L4,35" fill="none" stroke="#222" stroke-width="2.2"/>
      <path d="M-14,8 C-15,22 -11,33 0,33 C11,33 15,22 14,8 C14,-2 10,-6 0,-6 C-10,-6 -14,-2 -14,8 Z" fill="#fde3cf" stroke="#222" stroke-width="2.5"/>
      <path d="M-14,12 C-17,12 -17,19 -14,21 M14,12 C17,12 17,19 14,21" fill="#fde3cf" stroke="#222" stroke-width="2"/>
      <path d="M-14,5 C-12,0 -8,-3 0,-3 C8,-3 12,0 14,5 C13,-8 8,-12 0,-12 C-8,-12 -13,-8 -14,5 Z" fill="#d9cbba" stroke="#222" stroke-width="2"/>
      <path d="M-9,10 L-3,10 M9,10 L3,10" stroke="#222" stroke-width="2" stroke-linecap="round"/>
      <circle cx="-6" cy="14" r="1.5" fill="#222"/>
      <circle cx="6" cy="14" r="1.5" fill="#222"/>
      <path d="M0,10 L-1.5,19 L1.5,19" fill="none" stroke="#222" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M-6,25 L6,25" stroke="#222" stroke-width="1.8" stroke-linecap="round"/>
    </g>`;
  }

  function drawYoshida(cx, cy, s = 1) {
    return `
    <g class="figure yoshida" transform="translate(${cx},${cy}) scale(${s})">
      <path d="M-22,35 L-25,55 L25,55 L22,35 Z" fill="#33333b" stroke="#222" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M-8,35 L0,48 L8,35 Z" fill="#ffffff" stroke="#222" stroke-width="1.8"/>
      <path d="M-3,37 L3,37 L4,55 L0,57 L-4,55 Z" fill="#7d1d28" stroke="#222" stroke-width="1.8"/>
      <path d="M-16,8 C-16,25 -10,35 0,35 C10,35 16,25 16,8 C16,-6 10,-12 0,-12 C-10,-12 -16,-6 -16,8 Z" fill="#fee0cb" stroke="#222" stroke-width="2.5"/>
      <path d="M-16,5 C-18,10 -17,18 -15,20 M16,5 C18,10 17,18 15,20" stroke="#e0e0e0" stroke-width="3" stroke-linecap="round"/>
      <circle cx="-6" cy="12" r="5" fill="#ffffff" fill-opacity="0.5" stroke="#222" stroke-width="2"/>
      <circle cx="6" cy="12" r="5" fill="#ffffff" fill-opacity="0.5" stroke="#222" stroke-width="2"/>
      <path d="M-1,12 L1,12" stroke="#222" stroke-width="2"/>
      <circle cx="-6" cy="12" r="1.5" fill="#222"/>
      <circle cx="6" cy="12" r="1.5" fill="#222"/>
      <path d="M-2,16 L0,19 L2,19" fill="none" stroke="#222" stroke-width="1.8"/>
      <path d="M-7,25 Q-2,28 3,25" fill="none" stroke="#222" stroke-width="2" stroke-linecap="round"/>
      <path d="M2,24 L14,21 L15,24 L3,27 Z" fill="#8c5836" stroke="#222" stroke-width="1.5"/>
      <ellipse cx="14.5" cy="22.5" rx="1.5" ry="1.2" fill="#e63946"/>
      <path d="M16,20 Q20,16 18,12 Q16,8 21,5" fill="none" stroke="#aaa" stroke-width="1.5" stroke-dasharray="2 2"/>
    </g>`;
  }

  function drawCaesar(cx, cy, s = 1) {
    return `
    <g class="figure caesar" transform="translate(${cx},${cy}) scale(${s})">
      <path d="M-22,35 L-25,55 L25,55 L22,35 Z" fill="#f8f9fa" stroke="#222" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M-15,35 Q-5,48 10,55 L16,55 Q5,42 -5,35 Z" fill="#7a3b88" stroke="#222" stroke-width="1.8"/>
      <path d="M-14,6 C-14,23 -8,33 0,33 C8,33 14,23 14,6 C14,-6 8,-10 0,-10 C-8,-10 -14,-6 -14,6 Z" fill="#fde2cb" stroke="#222" stroke-width="2.5"/>
      <path d="M-14,4 C-15,-4 -8,-12 0,-12 C8,-12 15,-4 14,4 C10,-2 6,-4 0,-4 C-6,-4 -10,-2 -14,4 Z" fill="#8d7768" stroke="#222" stroke-width="2"/>
      <path d="M-15,-2 Q-10,-8 0,-8 Q10,-8 15,-2" fill="none" stroke="#2a9d8f" stroke-width="3" stroke-linecap="round"/>
      <circle cx="-10" cy="-6" r="2.5" fill="#2a9d8f"/>
      <circle cx="-4" cy="-8" r="2.5" fill="#2a9d8f"/>
      <circle cx="4" cy="-8" r="2.5" fill="#2a9d8f"/>
      <circle cx="10" cy="-6" r="2.5" fill="#2a9d8f"/>
      <circle cx="-5" cy="11" r="1.8" fill="#222"/>
      <circle cx="5" cy="11" r="1.8" fill="#222"/>
      <path d="M0,8 L-1,16 L2,16" fill="none" stroke="#222" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M-5,23 Q0,26 5,23" fill="none" stroke="#222" stroke-width="2" stroke-linecap="round"/>
    </g>`;
  }

  function drawGenghis(cx, cy, s = 1) {
    return `
    <g class="figure genghis" transform="translate(${cx},${cy}) scale(${s})">
      <path d="M-22,35 L-25,55 L25,55 L22,35 Z" fill="#2a7b6e" stroke="#222" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M-5,35 L12,48 L8,55 L-8,55 Z" fill="#e9c46a" stroke="#222" stroke-width="1.8"/>
      <path d="M-15,8 C-15,24 -9,34 0,34 C9,34 15,24 15,8 C15,-4 9,-8 0,-8 C-9,-8 -15,-4 -15,8 Z" fill="#fed6b2" stroke="#222" stroke-width="2.5"/>
      <path d="M-16,4 C-16,-2 0,-18 0,-18 C0,-18 16,-2 16,4 Z" fill="#b0413e" stroke="#222" stroke-width="2.2" stroke-linejoin="round"/>
      <ellipse cx="0" cy="4" rx="17" ry="5" fill="#fffdfa" stroke="#222" stroke-width="2.2"/>
      <circle cx="0" cy="-18" r="3" fill="#e9c46a" stroke="#222" stroke-width="1.8"/>
      <path d="M-9,12 Q-5,8 -2,12" fill="none" stroke="#222" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M9,12 Q5,8 2,12" fill="none" stroke="#222" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M-3,17 Q0,19 3,17" fill="none" stroke="#222" stroke-width="2"/>
      <path d="M-8,21 Q-2,20 0,22 Q2,20 8,21 Q4,26 0,25 Q-4,26 -8,21 Z" fill="#222"/>
      <path d="M-3,26 L0,36 L3,26 Z" fill="#222"/>
    </g>`;
  }

  function drawMao(cx, cy, s = 1) {
    return `
    <g class="figure mao" transform="translate(${cx},${cy}) scale(${s})">
      <path d="M-22,35 L-25,55 L25,55 L22,35 Z" fill="#52796f" stroke="#222" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M-6,35 L0,40 L6,35" fill="none" stroke="#222" stroke-width="2"/>
      <circle cx="0" cy="45" r="1.5" fill="#222"/>
      <circle cx="0" cy="51" r="1.5" fill="#222"/>
      <path d="M-15,8 C-16,24 -10,34 0,34 C10,34 16,24 15,8 C15,-4 10,-8 0,-8 C-10,-8 -15,-4 -15,8 Z" fill="#fde0c8" stroke="#222" stroke-width="2.5"/>
      <path d="M-16,6 C-17,-3 -10,-12 0,-12 C10,-12 17,-3 16,6 C13,0 8,-4 0,-4 C-8,-4 -13,0 -16,6 Z" fill="#2b2d42" stroke="#222" stroke-width="2"/>
      <circle cx="-6" cy="13" r="1.8" fill="#222"/>
      <circle cx="6" cy="13" r="1.8" fill="#222"/>
      <path d="M-9,9 L-3,9 M9,9 L3,9" stroke="#222" stroke-width="2" stroke-linecap="round"/>
      <path d="M0,11 L-1.5,18 L2,18" fill="none" stroke="#222" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M-6,24 Q0,28 6,24" fill="none" stroke="#222" stroke-width="2" stroke-linecap="round"/>
      <circle cx="-1" cy="30" r="1.2" fill="#222"/>
    </g>`;
  }

  window.FIGURES = {
    drawTrump,
    drawPutin,
    drawYoshida,
    drawCaesar,
    drawGenghis,
    drawMao
  };
})();
