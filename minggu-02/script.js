let queue = [];
let currentNumber = 0;

const ambilBtn = document.getElementById("ambil");
const panggilBtn = document.getElementById("panggil");
const currentDisplay = document.getElementById("current");
const queueList = document.getElementById("queue");

// Fungsi ambil nomor
ambilBtn.addEventListener("click", () => {
  currentNumber++;
  queue.push(currentNumber);
  renderQueue();
});

// Fungsi panggil nomor
panggilBtn.addEventListener("click", () => {
  if (queue.length > 0) {
    const next = queue.shift();
    currentDisplay.textContent = next;
    renderQueue();
  } else {
    alert("Tidak ada antrian!");
  }
});

// Render daftar antrian
function renderQueue() {
  queueList.innerHTML = "";
  queue.forEach(num => {
    const li = document.createElement("li");
    li.textContent = `Antrian ${num}`;
    queueList.appendChild(li);
  });
}
