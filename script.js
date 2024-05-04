// Fetch data using .then
function fetchDataWithThen() {
  fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
  )
    .then((response) => response.json())
    .then((data) => renderTable(data))
    .catch((error) => console.error("Error fetching data:", error));
}

// Fetch data using async/await
async function fetchDataWithAsyncAwait() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    const data = await response.json();
    renderTable(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Render data into table
function renderTable(data) {
  const tableBody = document.getElementById("cryptoTableBody");
  tableBody.innerHTML = "";
  data.forEach((item) => {
    const row = `<tr>
        <td><img src="${item.image}" alt="${
      item.name
    } Logo" style="width: 20px; height: 20px;"> ${item.name}</td>
                      <td>${item.id}</td>
                      <td>${item.symbol}</td>
                      <td>$${item.current_price}</td>
                      <td>${item.price_change_percentage_24h.toFixed(2)}%</td>
                      <td>${item.total_volume}</td>
                    </tr>`;
    tableBody.innerHTML += row;
  });
}

// Search functionality (instead of using search button ,the input section will show result if it is present in array )
document.getElementById("searchInput").addEventListener("input", function () {
  const searchText = this.value.toLowerCase();
  const rows = document.querySelectorAll("#cryptoTableBody tr");
  rows.forEach((row) => {
    const name = row.cells[0].innerText.toLowerCase();
    if (name.includes(searchText)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});

// Sorting functions / Implement sorting logic based on market cap /
function sortByMarketCap() {
  const tableBody = document.getElementById("cryptoTableBody");
  const rows = Array.from(tableBody.getElementsByTagName("tr"));

  rows.sort((rowA, rowB) => {
    const marketCapA = parseFloat(
      rowA.cells[3].innerText.replace("$", "").replace(/,/g, "")
    );
    const marketCapB = parseFloat(
      rowB.cells[3].innerText.replace("$", "").replace(/,/g, "")
    );
    return marketCapB - marketCapA;
  });

  tableBody.innerHTML = "";
  rows.forEach((row) => tableBody.appendChild(row));
}

function sortByPercentageChange() {
  // Implement sorting logic based on percentage change
  const tableBody = document.getElementById("cryptoTableBody");
  const rows = Array.from(tableBody.getElementsByTagName("tr"));

  rows.sort((rowA, rowB) => {
    const percentageChangeA = parseFloat(
      rowA.cells[4].innerText.replace("%", "")
    );
    const percentageChangeB = parseFloat(
      rowB.cells[4].innerText.replace("%", "")
    );
    return percentageChangeB - percentageChangeA;
  });

  tableBody.innerHTML = "";
  rows.forEach((row) => tableBody.appendChild(row));
}

// Initial data fetch
fetchDataWithThen(); // You can choose either fetchDataWithThen or fetchDataWithAsyncAwait
