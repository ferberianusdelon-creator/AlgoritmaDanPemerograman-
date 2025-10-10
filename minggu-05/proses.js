function linearSearch(arr, target) {
  const steps = [];
  for (let i = 0; i < arr.length; i++) {
    steps.push(`Langkah ${i + 1}: Bandingkan dengan ${arr[i].barcode}`);
    if (arr[i].barcode === target) {
      return { index: i, produk: arr[i].produk, steps };
    }
  }
  return { index: -1, steps };
}

function binarySearch(arr, target) {
  const steps = [];
  let left = 0;
  let right = arr.length - 1;
  let langkah = 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    steps.push(`Langkah ${langkah++}: Bandingkan dengan ${arr[mid].barcode}`);
    if (arr[mid].barcode === target) {
      return { index: mid, produk: arr[mid].produk, steps };
    } else if (arr[mid].barcode < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return { index: -1, steps };
}

document.getElementById("btnCari").addEventListener("click", cariProduk);

function cariProduk() {
  const input = document.getElementById("inputBarcode").value.trim();
  const target = parseInt(input);
  const linearBox = document.getElementById("hasil-linear");
  const binaryBox = document.getElementById("hasil-binary");

  if (isNaN(target)) {
    linearBox.textContent = "Masukkan barcode yang valid.";
    binaryBox.textContent = "";
    linearBox.className = "hasil-box fail";
    binaryBox.className = "hasil-box";
    return;
  }

  const hasilLinear = linearSearch(daftarProduk, target);
  if (hasilLinear.index !== -1) {
    linearBox.className = "hasil-box success";
    linearBox.textContent =
      hasilLinear.steps.join("\n") +
      `\n\nProduk ditemukan: ${hasilLinear.produk} (Index ${hasilLinear.index}) setelah ${hasilLinear.steps.length} langkah.`;
  } else {
    linearBox.className = "hasil-box fail";
    linearBox.textContent =
      hasilLinear.steps.join("\n") + "\n\nProduk tidak ditemukan.";
  }

  const hasilBinary = binarySearch(daftarProduk, target);
  if (hasilBinary.index !== -1) {
    binaryBox.className = "hasil-box success";
    binaryBox.textContent =
      hasilBinary.steps.join("\n") +
      `\n\nProduk ditemukan: ${hasilBinary.produk} (Index ${hasilBinary.index}) setelah ${hasilBinary.steps.length} langkah.`;
  } else {
    binaryBox.className = "hasil-box fail";
    binaryBox.textContent =
      hasilBinary.steps.join("\n") + "\n\nProduk tidak ditemukan.";
  }
}
