(function () {
  var PREFIX = 'stm728_';

  var scriptEl = document.currentScript || (function () {
    var s = document.getElementsByTagName('script');
    return s[s.length - 1];
  })();

  var images = [
    "https://stmify.site/ads/1000150061.jpg",
    "https://stmify.site/ads/1000150065.jpg",
    "https://stmify.site/ads/1000150063.jpg",
    "https://stmify.site/ads/1000150062.jpg"
  ];

  // প্রতিটি ছবির আলাদা টার্গেট লিংক এখানে দাও
  var links = [
    "https://stmify.site/go1",
    "https://stmify.site/go2",
    "https://stmify.site/go3",
    "https://stmify.site/go4"
  ];

  var delay = 4000; // ৪ সেকেন্ডে একবার পরিবর্তন
  var openInNewTab = true;

  // container বানানো
  var container = document.createElement('div');
  container.className = PREFIX + 'rotator';
  container.style.width = '728px';
  container.style.height = '90px';
  container.style.position = 'relative';
  container.style.overflow = 'hidden';
  container.style.display = 'block';
  container.style.background = '#000';

  try {
    scriptEl.parentNode.insertBefore(container, scriptEl);
  } catch {
    (document.body || document.documentElement).appendChild(container);
  }

  // CSS
  var css = `
    .${PREFIX}rotator{box-sizing:border-box;}
    .${PREFIX}slide{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;transition:opacity .5s ease;cursor:pointer;}
    .${PREFIX}slide img{width:100%;height:100%;object-fit:cover;display:block;border:0;}
    .${PREFIX}slide.${PREFIX}active{opacity:1;z-index:2;}
    .${PREFIX}dots{position:absolute;bottom:6px;right:8px;display:flex;gap:5px;z-index:5;}
    .${PREFIX}dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,0.4);border:0;cursor:pointer;}
    .${PREFIX}dot.${PREFIX}active{background:#fff;}
    @media(max-width:728px){
      .${PREFIX}rotator{width:100%!important;height:auto!important;aspect-ratio:728/90;}
    }
  `;
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var slides = [], dots = [];
  var dotsWrap = document.createElement('div');
  dotsWrap.className = PREFIX + 'dots';

  for (let i = 0; i < images.length; i++) {
    let a = document.createElement('a');
    a.className = PREFIX + 'slide';
    a.href = links[i];
    if (openInNewTab) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    let img = document.createElement('img');
    img.src = images[i];
    img.alt = 'Ad ' + (i + 1);
    a.appendChild(img);
    container.appendChild(a);
    slides.push(a);

    let dot = document.createElement('button');
    dot.className = PREFIX + 'dot';
    dot.addEventListener('click', function () { goTo(i); reset(); });
    dotsWrap.appendChild(dot);
    dots.push(dot);
  }
  container.appendChild(dotsWrap);

  let current = 0;
  function update() {
    slides.forEach((s, i) => s.classList.toggle(PREFIX + 'active', i === current));
    dots.forEach((d, i) => d.classList.toggle(PREFIX + 'active', i === current));
  }

  function goTo(i) {
    current = i % slides.length;
    update();
  }

  function next() {
    current = (current + 1) % slides.length;
    update();
  }

  let timer;
  function reset() {
    clearInterval(timer);
    timer = setInterval(next, delay);
  }

  container.addEventListener('mouseenter', () => clearInterval(timer));
  container.addEventListener('mouseleave', reset);

  update();
  reset();

})();

