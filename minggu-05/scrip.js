let kamus = ["abu-abu", "biru", "hijau", "hitam", "kuning", "merah", "putih", "ungu"];
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid; // ditemukan
    } else if (arr[mid] < target) {
      left = mid + 1; // geser ke kanan
    } else {
      right = mid - 1; 
    }
  }
  return -1;
}
function cariKata() {
  let target = document.getElementById("inputTarget").value.trim().toLowerCase();
  let index = binarySearch(kamus, target);
  let hasilBox = document.getElementById("hasil");
  if (index !== -1) {
    hasilBox.innerHTML = `Warna "<b>${target}</b>" ditemukan pada indeks ke-${index}`;
    hasilBox.className = "sukses";
  } else {
    hasilBox.innerHTML = `Warna "<b>${target}</b>" tidak ditemukan dalam kamus`;
    hasilBox.className = "gagal";
  }
}
