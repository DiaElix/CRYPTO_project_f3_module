const apiUrl =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

let coinsData = [];
let filteredCoins = [];



function fetchUsingThen() {

    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            console.log("Data fetched using .then():", data);

            coinsData = data;
            filteredCoins = data;

            displayCoins(filteredCoins);

        })
        .catch(function(error) {

            console.log("Error:", error);

        });
}



async function fetchUsingAsyncAwait() {

    try {

        const response = await fetch(apiUrl);

        const data = await response.json();

        console.log("Data fetched using async/await:", data);

        coinsData = data;
        filteredCoins = data;

        displayCoins(filteredCoins);

    } catch (error) {

        console.log("Error:", error);

    }
}



function formatNumber(number) {

    return new Intl.NumberFormat("en-US").format(number);

}



function displayCoins(data) {

    const tableBody =
        document.getElementById("cryptoTableBody");

    tableBody.innerHTML = "";


    data.forEach(function(coin, index) {

        const row = document.createElement("tr");


        row.innerHTML = `
            <td>${index + 1}</td>

            <td>
                <img
                    src="${coin.image}"
                    alt="${coin.name}"
                    class="coin-image"
                >
                ${coin.name}
            </td>

            <td>${coin.symbol.toUpperCase()}</td>

            <td>$${formatNumber(coin.current_price)}</td>

            <td class="${coin.price_change_percentage_24h >= 0 ? "positive" : "negative"}"> ${coin.price_change_percentage_24h.toFixed(2)}%</td>

            <td>$${formatNumber(coin.market_cap)}</td>

            <td>$${formatNumber(coin.total_volume)}</td>
        `;


        tableBody.appendChild(row);

    });

}


function searchCoins() {

    const searchInput =
        document.getElementById("searchInput");

    const searchText =
        searchInput.value.toLowerCase();


    filteredCoins = coinsData.filter(function(coin) {

        return (
            coin.name.toLowerCase().includes(searchText) ||
            coin.symbol.toLowerCase().includes(searchText)
        );

    });


    displayCoins(filteredCoins);

}


function sortByMarketCap() {

    filteredCoins.sort(function(a, b) {

        return b.market_cap - a.market_cap;

    });


    displayCoins(filteredCoins);

}


function sortByPercentageChange() {

    filteredCoins.sort(function(a, b) {

        return (
            b.price_change_percentage_24h -
            a.price_change_percentage_24h
        );

    });


    displayCoins(filteredCoins);

}


document
    .getElementById("searchButton")
    .addEventListener("click", searchCoins);

document
    .getElementById("marketCapButton")
    .addEventListener("click", sortByMarketCap);

document
    .getElementById("percentageButton")
    .addEventListener("click", sortByPercentageChange);

fetchUsingThen();