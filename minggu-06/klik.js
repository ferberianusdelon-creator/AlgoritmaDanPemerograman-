let mahasiswa = [
  { nama: "Rafael", nilai: 78 },
  { nama: "Dewi", nilai: 90 },
  { nama: "Budi", nilai: 65 },
  { nama: "Citra", nilai: 88 },
  { nama: "Andi", nilai: 70 }
];

const tbody = document.getElementById("tabelMahasiswa");
const statusText = document.getElementById("status");

function renderTable(data) {
  tbody.innerHTML = "";
  data.forEach((mhs, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="text" value="${mhs.nama}" onchange="updateData(${i}, 'nama', this.value)" /></td>
      <td><input type="number" value="${mhs.nilai}" onchange="updateData(${i}, 'nilai', this.value)" /></td>
    `;
    tbody.appendChild(row);
  });
}

function updateData(index, field, value) {
  mahasiswa[index][field] = field === 'nilai' ? Number(value) : value;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort(mode) {
  statusText.textContent = "Sedang mengurutkan...";
  let arr = [...mahasiswa];
  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const rows = tbody.querySelectorAll("tr");

      rows[j].classList.add("highlight");
      rows[j + 1].classList.add("highlight");
      await delay(600);

      const condition = mode === "ascending"
        ? arr[j].nilai > arr[j + 1].nilai
        : arr[j].nilai < arr[j + 1].nilai;

      if (condition) {
        rows[j].classList.remove("highlight");
        rows[j + 1].classList.remove("highlight");
        rows[j].classList.add("swap");
        rows[j + 1].classList.add("swap");

        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        renderTable(arr);

        const newRows = tbody.querySelectorAll("tr");
        newRows[j].classList.add("swap");
        newRows[j + 1].classList.add("swap");
        await delay(600);
      }

      const allRows = tbody.querySelectorAll("tr");
      allRows.forEach(r => r.classList.remove("highlight", "swap"));
    }

    const doneRows = tbody.querySelectorAll("tr");
    doneRows[n - i - 1].classList.add("done");
  }

  mahasiswa = arr;
  renderTable(mahasiswa);
  const allRows = tbody.querySelectorAll("tr");
  allRows.forEach(r => r.classList.add("done"));
  statusText.textContent = `Data telah diurutkan secara ${mode}.`;
}

renderTable(mahasiswa);