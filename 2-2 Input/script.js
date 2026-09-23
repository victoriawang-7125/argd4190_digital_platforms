/* ---------- Shape Templates ---------- */
const svgTemplates = {
  head: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="currentColor"/></svg>`,
  ear: `<svg viewBox="0 0 100 100"><path d="M50 4 L12 92 L88 92 Z" fill="currentColor"/></svg>`,
  eye: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="currentColor"/></svg>`,
  nose: `<svg viewBox="0 0 100 100"><path d="M12 18 L88 18 L50 86 Z" fill="currentColor"/></svg>`,
  mouth: `<svg viewBox="0 0 100 100"><path d="M50 12 Q33 55 12 32 M50 12 Q67 55 88 32" stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round"/></svg>`,
  whiskers: `<svg viewBox="0 0 100 100"><path d="M2 38 L36 45 M2 50 L36 50 M2 62 L36 55 M98 38 L64 45 M98 50 L64 50 M98 62 L64 55" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  paw: `<svg viewBox="0 0 100 100">
    <circle cx="50" cy="52" r="47" fill="currentColor"/>
    <ellipse cx="50" cy="65" rx="26" ry="22" fill="#2b2320"/>
    <ellipse cx="20" cy="35" rx="12" ry="15" fill="#2b2320"/>
    <ellipse cx="48" cy="20" rx="12" ry="15" fill="#2b2320"/>
    <ellipse cx="76" cy="35" rx="12" ry="15" fill="#2b2320"/>
    <ellipse cx="90" cy="55" rx="10" ry="13" fill="#2b2320" transform="rotate(30 90 55)"/>
  </svg>`,
  sun: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="currentColor"/></svg>`
};

/* ---------- Emoji Map for Toggle Buttons ---------- */
const emojiMap = {
  title: '📝', sub: '💬',
  head: '🐱', earL: '👂', earR: '👂',
  eyeL: '👁️', eyeR: '👁️',
  nose: '👃', mouth: '👄', whiskers: '🐾',
  paw1: '🐾', paw2: '🐾', sun: '☀️'
};

/* ---------- Poster Parts ---------- */
let elements = [
  {id:'title',  type:'text',  text:'Cute Cat Poster',            x:50, y:14, size:40, scale:1, skew:0, color:'#5c3524', visible:true},
  {id:'sub',    type:'text',  text:'purrfectly customizable', x:50, y:23, size:12, scale:1, skew:0, color:'#b08d80', visible:true},
  {id:'head',   type:'shape', shape:'head',   x:50,   y:52.5, size:140, scale:1, skew:0,   color:'#f2b6a0', visible:true},
  {id:'earL',   type:'shape', shape:'ear',    x:57,   y:42,   size:44,  scale:1.35, skew:14,  color:'#f2b6a0', visible:true},
  {id:'earR',   type:'shape', shape:'ear',    x:43,   y:42,   size:44,  scale:1.35, skew:-14, color:'#f2b6a0', visible:true},
  {id:'eyeL',   type:'shape', shape:'eye',    x:44.5, y:49.5, size:14,  scale:1, skew:0,   color:'#2b2320', visible:true},
  {id:'eyeR',   type:'shape', shape:'eye',    x:55.5, y:49.5, size:14,  scale:1, skew:0,   color:'#2b2320', visible:true},
  {id:'nose',   type:'shape', shape:'nose',   x:50,   y:55,   size:18,  scale:1, skew:0,   color:'#e08a6b', visible:true},
  {id:'mouth',  type:'shape', shape:'mouth',  x:50,   y:59,   size:36,  scale:1, skew:0,   color:'#2b2320', visible:true},
  {id:'whiskers', type:'shape', shape:'whiskers', x:50, y:54.5, size:150, scale:1, skew:0, color:'#2b2320', visible:true},
  {id:'paw1',   type:'shape', shape:'paw',     x:34, y:67, size:44,  scale:1, skew:-4, color:'#f2b6a0', visible:true},
  {id:'paw2',   type:'shape', shape:'paw',     x:66, y:67, size:44,  scale:1, skew:4,  color:'#f2b6a0', visible:true},
  {id:'sun',    type:'shape', shape:'sun',     x:73, y:33, size:64,  scale:1.05, skew:0, color:'#f6d365', visible:true}
];
const initialState = JSON.parse(JSON.stringify(elements));
let selectedId = 'title';

const poster = document.getElementById('poster');
const chooser = document.getElementById('chooser');

/* ---------- Functions ---------- */
function getEl(id){ return elements.find(e => e.id === id); }
function getDom(id){ return document.getElementById('dom-'+id); }

function buildDom(data){
  const div = document.createElement('div');
  div.className = 'element' + (data.type === 'text' ? ' text-el' : '');
  div.id = 'dom-' + data.id;
  if(data.type === 'shape'){
    div.innerHTML = svgTemplates[data.shape];
  } else {
    div.textContent = data.text;
  }
  div.addEventListener('click', () => selectElement(data.id));
  poster.appendChild(div);
}

function renderElement(id){
  const data = getEl(id);
  const dom = getDom(id);
  dom.style.left = data.x + '%';
  dom.style.top = data.y + '%';
  dom.style.transform = `translate(-50%,-50%) scale(${data.scale}) skewX(${data.skew}deg)`;
  dom.style.color = data.color;
  if(data.type === 'text'){
    dom.style.fontSize = data.size + 'px';
    dom.style.color = data.color;
    dom.textContent = data.text;
  } else {
    dom.style.width = data.size + 'px';
    dom.style.height = data.size + 'px';
  }
  dom.style.display = data.visible ? '' : 'none';
}

function renderAll(){ elements.forEach(e => renderElement(e.id)); }

function buildChooser(){
  chooser.innerHTML = '';
  elements.forEach(e => {
    const b = document.createElement('button');
    const emoji = emojiMap[e.id] || '🔷';
    b.textContent = emoji + ' ' + e.id;
    b.dataset.id = e.id;
    b.style.opacity = e.visible ? '1' : '0.4';
    b.addEventListener('click', () => selectElement(e.id));
    chooser.appendChild(b);
  });
}

function selectElement(id){
  selectedId = id;
  document.querySelectorAll('.element').forEach(d => d.classList.remove('selected'));
  getDom(id).classList.add('selected');
  document.querySelectorAll('#chooser button').forEach(b => b.classList.toggle('active', b.dataset.id === id));
  syncControls();
}

function syncControls(){
  const data = getEl(selectedId);
  const isText = data.type === 'text';
  document.getElementById('row-text').style.display = isText ? 'block' : 'none';
  document.getElementById('row-color').style.display = 'block';

  document.getElementById('ctrl-text').value = isText ? data.text : '';
  document.getElementById('ctrl-x').value = data.x;
  document.getElementById('ctrl-y').value = data.y;
  document.getElementById('ctrl-size').value = data.size;
  document.getElementById('ctrl-scale').value = data.scale;
  document.getElementById('ctrl-skew').value = data.skew;
  document.getElementById('ctrl-color').value = data.color;
  document.getElementById('ctrl-visible').checked = data.visible;
  updateLabels(data);
}

function updateLabels(data){
  document.getElementById('lbl-x').textContent = data.x + '%';
  document.getElementById('lbl-y').textContent = data.y + '%';
  document.getElementById('lbl-size').textContent = data.size + 'px';
  document.getElementById('lbl-scale').textContent = data.scale.toFixed(2) + 'x';
  document.getElementById('lbl-skew').textContent = data.skew + '°';
}

function bindProp(controlId, prop, isNumber){
  document.getElementById(controlId).addEventListener('input', (e) => {
    const data = getEl(selectedId);
    data[prop] = isNumber ? parseFloat(e.target.value) : e.target.value;
    renderElement(selectedId);
    updateLabels(data);
  });
}

/* ---------- Default Startup ---------- */
elements.forEach(buildDom);
renderAll();
buildChooser();
selectElement(selectedId);

bindProp('ctrl-x', 'x', true);
bindProp('ctrl-y', 'y', true);
bindProp('ctrl-size', 'size', true);
bindProp('ctrl-scale', 'scale', true);
bindProp('ctrl-skew', 'skew', true);
bindProp('ctrl-color', 'color', false);
bindProp('ctrl-text', 'text', false);

document.getElementById('ctrl-visible').addEventListener('change', (e) => {
  const data = getEl(selectedId);
  data.visible = e.target.checked;
  renderElement(selectedId);
  buildChooser();
  document.querySelectorAll('#chooser button').forEach(b => b.classList.toggle('active', b.dataset.id === selectedId));
});

document.getElementById('resetBtn').addEventListener('click', () => {
  elements = JSON.parse(JSON.stringify(initialState));
  renderAll();
  selectElement(selectedId);
});
