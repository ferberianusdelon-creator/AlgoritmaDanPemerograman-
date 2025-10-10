document.getElementById("reverseBtn").addEventListener("click", function() {
  const inputText = document.getElementById("userInput").value;
  if (inputText.trim() === "") {
    document.getElementById("output").textContent = "⚠️ Harap masukkan teks terlebih dahulu!";
    return;
  }

  // Membalikkan string
  const reversedText = inputText.split("").reverse().join("");
  document.getElementById("output").textContent = reversedText;
});
