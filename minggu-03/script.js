/* Simple Queue class */
class Queue {
  constructor() { this.items = []; }
  enqueue(x){ this.items.push(x); }
  dequeue(){ return this.items.length? this.items.shift(): null; }
  isEmpty(){ return this.items.length === 0; }
  getAll(){ return this.items.slice(); }
}

/* state */
const antrian = new Queue();
let nomorUrut = 0;
const MAX_HISTORY = 12;

/* elements */
const namaInput = document.getElementById('namaInput');
const btnTambah = document.getElementById('btnTambah');
const btnPanggil = document.getElementById('btnPanggil');
const daftarEl = document.getElementById('daftarAntrian');
const riwayatEl = document.getElementById('riwayat');
const display = document.getElementById('display');
const displayValue = document.getElementById('displayValue');
const message = document.getElementById('message');

/* helper: show short message */
function showMessage(text, type = 'info'){
  message.textContent = text;
  message.classList.add('show');
  message.style.color = (type === 'error')? '#ffb3b3' : '#e0ffea';
  clearTimeout(message._t);
  message._t = setTimeout(()=> message.classList.remove('show'), 1800);
}

/* update daftar (queue) */
function updateDaftarAntrian(){
  const all = antrian.getAll();
  if(all.length === 0){
    daftarEl.innerHTML = 'Kosong';
    return;
  }
  daftarEl.innerHTML = all.map(it => `<div class="item">No. ${it.no} — ${escapeHtml(it.nama)}</div>`).join('');
}

/* update riwayat (ke-atas terbaru) */
function prependRiwayat(text){
  // create item
  const div = document.createElement('div');
  div.className = 'item';
  div.innerText = text;
  // prepend
  if(riwayatEl.innerText === 'Belum ada panggilan') riwayatEl.innerHTML = '';
  riwayatEl.prepend(div);
  // keep max
  while(riwayatEl.children.length > MAX_HISTORY){
    riwayatEl.removeChild(riwayatEl.lastChild);
  }
}

/* UI effects */
function flashDisplayEmpty(){
  display.classList.add('flash-empty');
  displayValue.textContent = 'Kosong';
  setTimeout(()=>{ display.classList.remove('flash-empty'); displayValue.textContent = '--'; }, 900);
}
function blinkDisplay(){
  display.classList.add('blink');
  setTimeout(()=> display.classList.remove('blink'), 900);
}

/* escape HTML to avoid injection */
function escapeHtml(s){
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

/* actions */
function tambahAntrian(){
  const nama = (namaInput.value || '').trim();
  if(!nama){
    showMessage('Nama tidak boleh kosong', 'error');
    return;
  }
  nomorUrut++;
  antrian.enqueue({ no: nomorUrut, nama: nama });
  namaInput.value = '';
  updateDaftarAntrian();
  showMessage(`No. ${nomorUrut} ditambahkan`);
  namaInput.focus();
}

function panggilAntrian(){
  const orang = antrian.dequeue();
  if(!orang){
    showMessage('Antrian kosong', 'error');
    flashDisplayEmpty();
    return;
  }
  const text = `No. ${orang.no} — ${orang.nama}`;
  displayValue.textContent = text;
  blinkDisplay();
  prependRiwayat(text);
  updateDaftarAntrian();
}

/* keyboard: Enter = tambah */
namaInput.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter'){ tambahAntrian(); e.preventDefault(); }
});

/* attach buttons */
btnTambah.addEventListener('click', tambahAntrian);
btnPanggil.addEventListener('click', panggilAntrian);

/* init */
updateDaftarAntrian();
