class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  getAll() {
    return this.items;
  }
}

let antrian = new Queue();
let nomorUrut = 0;

function updateDaftarAntrian() {
  let daftar = document.getElementById("daftarAntrian");
  if (antrian.isEmpty()) {
    daftar.innerHTML = "Kosong";
  } else {
    daftar.innerHTML = antrian.getAll()
      .map(item => `<div class="antrian-item">No. ${item.no} - ${item.nama}</div>`)
      .join("");
  }
}

function tambahAntrian() {
  let nama = document.getElementById("namaInput").value;
  if (nama.trim() === "") {
    alert("Nama tidak boleh kosong!");
    return;
  }
  nomorUrut++;
  antrian.enqueue({ no: nomorUrut, nama: nama });
  document.getElementById("namaInput").value = "";
  updateDaftarAntrian();
}

function panggilAntrian() {
  let orang = antrian.dequeue();
  if (orang === null) {
    document.getElementById("sedangDilayani").innerText = "--";
    alert("Tidak ada antrian!");
  } else {
    document.getElementById("sedangDilayani").innerText =
      `No. ${orang.no} - ${orang.nama}`;
    updateDaftarAntrian();
  }
}

updateDaftarAntrian();
