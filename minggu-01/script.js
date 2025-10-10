document.getElementById("showBtn").addEventListener("click", function() {
  const limit = parseInt(document.getElementById("limitInput").value);
  const output = document.getElementById("output");

  if (isNaN(limit) || limit <= 0) {
    output.textContent = "⚠️ Masukkan angka positif!";
    return;
  }

  let hasil = [];
  for (let i = 1; i <= limit; i += 2) {
    hasil.push(i);
  }

  output.textContent = hasil.join(", ");
});
