class Queue {
  constructor(){this.items=[];}
  enqueue(x){this.items.push(x);}
  dequeue(){return this.items.length?this.items.shift():null;}
  isEmpty(){return this.items.length===0;}
  getAll(){return this.items.slice();}
}

const q=new Queue();let no=0;
const namaInput=document.getElementById('namaInput');
const btnTambah=document.getElementById('btnTambah');
const btnPanggil=document.getElementById('btnPanggil');
const daftarEl=document.getElementById('daftarAntrian');
const riwayatEl=document.getElementById('riwayat');
const displayVal=document.getElementById('displayValue');
const msg=document.getElementById('message');

function showMsg(t){
  msg.textContent=t;
  msg.classList.add('show');
  clearTimeout(msg._t);
  msg._t=setTimeout(()=>msg.classList.remove('show'),1500);
}

function updateDaftar(){
  if(q.isEmpty()){daftarEl.innerHTML="Kosong";return;}
  daftarEl.innerHTML=q.getAll().map(it=>`<div class="item">No. ${it.no} — ${it.nama}</div>`).join('');
}

function add(){
  const nama=(namaInput.value||"").trim();
  if(!nama){showMsg("Nama kosong!");return;}
  no++;
  q.enqueue({no,no:nama});
}

function tambah(){
  const nama=(namaInput.value||"").trim();
  if(!nama){showMsg("Nama kosong!");return;}
  no++;
  q.enqueue({no,no, nama});
  namaInput.value="";
  updateDaftar();
  showMsg(`No. ${no} ditambahkan`);
}

function panggil(){
  const orang=q.dequeue();
  if(!orang){displayVal.textContent="Kosong";showMsg("Tidak ada antrian");updateDaftar();return;}
  const teks=`No. ${orang.no} — ${orang.nama}`;
  displayVal.textContent=teks;
  displayVal.style.animation="flash 0.6s ease";
  setTimeout(()=>displayVal.style.animation="",700);
  if(riwayatEl.innerText==="Belum ada panggilan"){riwayatEl.innerHTML="";}
  const div=document.createElement("div");
  div.className="item";
  div.textContent=teks;
  riwayatEl.prepend(div);
  updateDaftar();
}

namaInput.addEventListener("keydown",e=>{if(e.key==="Enter"){tambah();}});
btnTambah.addEventListener("click",tambah);
btnPanggil.addEventListener("click",panggil);

updateDaftar();
