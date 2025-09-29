const judulBuku = [
  "Algoritma dan Pemrograman",
  "Pemrograman Web",
  "Dasar Basis Data",
  "Jaringan Komputer",
  "Struktur Data"
];
const daftar = document.getElementById("daftar-buku");
judulBuku.forEach(judul => {
  const li = document.createElement("li");
  li.textContent = judul;
  daftar.appendChild(li);
});
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].toLowerCase() === target.toLowerCase()) {
      return i;
    }
  }
  return -1;
}
document.getElementById("btnCari").addEventListener("click", () => {
  const target = document.getElementById("inputJudul").value.trim();
  const hasilDiv = document.getElementById("hasil");
  if (!target) {
    hasilDiv.textContent = "⚠️ Silakan ketik judul buku dulu.";
    return;
  }
  const index = linearSearch(judulBuku, target);
  if (index !== -1) {
    hasilDiv.textContent = `✅ Judul "${target}" ditemukan pada indeks ke-${index}`;
  } else {
    hasilDiv.textContent = `❌ Judul "${target}" tidak ditemukan.`;
  }
});
