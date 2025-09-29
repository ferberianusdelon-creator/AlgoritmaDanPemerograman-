document.getElementById('btnCari').addEventListener('click', () => {
  const input = document.getElementById('inputArray').value.trim();

  if (!input) {
    alert('Masukkan angka terlebih dahulu!');
    return;
  }

  const arr = input.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));

  if (arr.length === 0) {
    alert('Input tidak valid!');
    return;
  }

  let max1 = -Infinity, max2 = -Infinity, max3 = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max1) {
      max3 = max2;
      max2 = max1;
      max1 = arr[i];
    } else if (arr[i] > max2) {
      max3 = max2;
      max2 = arr[i];
    } else if (arr[i] > max3) {
      max3 = arr[i];
    }
  }
  document.getElementById('hasil').innerHTML = `
    <p>Angka terbesar pertama: <b>${max1}</b></p>
    <p>Angka terbesar kedua: <b>${max2}</b></p>
    <p>Angka terbesar ketiga: <b>${max3}</b></p>
  `;
});
