<<<<<<< HEAD
'use strict';

/**
 * Description of the available API
 * GET https://lego-api-blue.vercel.app/deals
 * Search for specific deals
 * This endpoint accepts the following optional query string parameters:
 * - page - page of deals to return
 * - size - number of deals to return
 *
 * GET https://lego-api-blue.vercel.app/sales
 * Search for current Vinted sales for a given Lego set ID
 * This endpoint accepts the following optional query string parameters:
 * - id - Lego set ID to return
 */

// Current deals on the page
let currentDeals = [];
let currentPagination = {};

// Instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectLegoSetIds = document.querySelector('#lego-set-id-select');
const sectionDeals = document.querySelector('#deals');
=======
// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

/**
Description of the available api
GET https://lego-api-blue.vercel.app/deals

Search for specific deals

This endpoint accepts the following optional query string parameters:

- `page` - page of deals to return
- `size` - number of deals to return

GET https://lego-api-blue.vercel.app/sales

Search for current Vinted sales for a given lego set id

This endpoint accepts the following optional query string parameters:

- `id` - lego set id to return
*/

// current deals on the page
let currentDeals = [];
let currentPagination = {};

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectLegoSetIds = document.querySelector('#lego-set-id-select');
const sectionDeals= document.querySelector('#deals');
>>>>>>> d8a914d26a4820813cb724f1642af3b6037af5a6
const spanNbDeals = document.querySelector('#nbDeals');

/**
 * Set global value
 * @param {Array} result - deals to display
 * @param {Object} meta - pagination meta info
 */
<<<<<<< HEAD
const setCurrentDeals = ({ result, meta }) => {
    currentDeals = result;
    currentPagination = meta;
};

/**
 * Fetch deals from API
 * @param {Number} [page=1] - current page to fetch
 * @param {Number} [size=12] - size of the page
 * @return {Object}
 */
const fetchDeals = async (page = 1, size = 6) => {
    try {
        const response = await fetch(`https://lego-api-blue.vercel.app/deals?page=${page}&size=${size}`);
        const body = await response.json();

        if (body.success !== true) {
            console.error(body);
            return { currentDeals, currentPagination };
        }

        return body.data;
    } catch (error) {
        console.error(error);
        return { currentDeals, currentPagination };
    }
=======
const setCurrentDeals = ({result, meta}) => {
  currentDeals = result;
  currentPagination = meta;
};

/**
 * Fetch deals from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchDeals = async (page = 1, size = 6) => {
  try {
    const response = await fetch(
      `https://lego-api-blue.vercel.app/deals?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentDeals, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentDeals, currentPagination};
  }
>>>>>>> d8a914d26a4820813cb724f1642af3b6037af5a6
};

/**
 * Render list of deals
<<<<<<< HEAD
 * @param {Array} deals
 */
const renderDeals = deals => {
    if (!deals || deals.length === 0) {
        sectionDeals.innerHTML = `<p>No deals found for the entered search criteria.</p>`;
        return;
    }

    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    div.className = 'deals-container';

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const template = deals
        .map(deal => {
            const isFavorite = favorites.some(favorite => favorite.uuid === deal.uuid);
            return `
        <div class="deal-card">
          <div class="deal-header">
            <span class="deal-id">${deal.id}</span>
          </div>
          <img src="${deal.photo || 'default-image.jpg'}" alt="${deal.title}" class="deal-image">
          <div class="deal-info">
            <h3 class="deal-title">${deal.title}</h3>
            <p class="deal-price">${deal.price} €</p>
          </div>
          <button class="deal-button" data-link="${deal.link}">Voir sur le site</button>
          <span
            class="favorite-btn"
            data-id="${deal.uuid}"
            style="cursor: pointer; color: ${isFavorite ? 'yellow' : 'black'};"
          >
            ★
          </span>
          <br /><br />
        </div>`;
        })
        .join('');

    div.innerHTML = template;
    fragment.appendChild(div);
    sectionDeals.innerHTML = '';
    sectionDeals.appendChild(fragment);

    const dealButtons = div.querySelectorAll('.deal-button');
    dealButtons.forEach(button => {
        button.addEventListener('click', event => {
            const link = event.target.getAttribute('data-link');
            if (link) {
                window.open(link, '_blank');
            } else {
                alert('Lien non disponible pour ce produit.');
            }
        });
    });

    const favoriteButtons = div.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', event => {
            const dealId = event.target.getAttribute('data-id');
            toggleFavoriteDeal(dealId, deals);
            renderDeals(deals);
        });
    });
=======
 * @param  {Array} deals
 */
const renderDeals = deals => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = deals
    .map(deal => {
      return `
      <div class="deal" id=${deal.uuid}>
        <span>${deal.id}</span>
        <a href="${deal.link}">${deal.title}</a>
        <span>${deal.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionDeals.innerHTML = '<h2>Deals</h2>';
  sectionDeals.appendChild(fragment);
>>>>>>> d8a914d26a4820813cb724f1642af3b6037af5a6
};

/**
 * Render page selector
<<<<<<< HEAD
 * @param {Object} pagination
 */
const renderPagination = pagination => {
    const { currentPage, pageCount } = pagination;
    const container = document.querySelector('#pagination-container');
    container.innerHTML = `<span>${pageCount} pages au total : </span>`;

    const paginationHTML = Array.from({ length: pageCount }, (v, i) => {
        return `<button class="${i + 1 === currentPage ? 'selected' : ''}" onclick="changePage(${i + 1})">${i + 1}</button>`;
    }).join(' ');

    container.innerHTML += paginationHTML;
};

window.changePage = async page => {
    const pageSize = parseInt(selectShow.value);
    const deals = await fetchDeals(page, pageSize);
    setCurrentDeals(deals);
    render(currentDeals, currentPagination);
};

/**
 * Render Lego set IDs selector
 * @param {Array} deals
 */
const renderLegoSetIds = deals => {
    const ids = getIdsFromDeals(deals);
    const options = ids.map(id => `<option value="${id}">${id}</option>`).join('');
    selectLegoSetIds.innerHTML = options;
=======
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render lego set ids selector
 * @param  {Array} lego set ids
 */
const renderLegoSetIds = deals => {
  const ids = getIdsFromDeals(deals);
  const options = ids.map(id => 
    `<option value="${id}">${id}</option>`
  ).join('');

  selectLegoSetIds.innerHTML = options;
>>>>>>> d8a914d26a4820813cb724f1642af3b6037af5a6
};

/**
 * Render page selector
<<<<<<< HEAD
 * @param {Object} pagination
 */
const renderIndicators = pagination => {
    const { count } = pagination;
    spanNbDeals.innerHTML = count;
};

const render = (deals, pagination) => {
    renderDeals(deals);
    renderPagination(pagination);
    renderIndicators(pagination);
    renderLegoSetIds(deals);
=======
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbDeals.innerHTML = count;
};

const render = (deals, pagination) => {
  renderDeals(deals);
  renderPagination(pagination);
  renderIndicators(pagination);
  renderLegoSetIds(deals)
>>>>>>> d8a914d26a4820813cb724f1642af3b6037af5a6
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of deals to display
 */
<<<<<<< HEAD
selectShow.addEventListener('change', async event => {
    const size = parseInt(event.target.value);
    const deals = await fetchDeals(1, size);
    setCurrentDeals(deals);
    render(currentDeals, currentPagination);
});

document.addEventListener('DOMContentLoaded', async () => {
    const deals = await fetchDeals();
    setCurrentDeals(deals);
    render(currentDeals, currentPagination);
});

document.getElementById('search-form').addEventListener('submit', async event => {
    event.preventDefault();
    const dealId = document.getElementById('search-input').value.trim();

    if (dealId === '') {
        renderDeals(currentDeals);
        return;
    }

    const filteredDeals = currentDeals.filter(deal => deal.id === dealId);

    if (filteredDeals.length === 0) {
        alert('Aucun deal trouvé pour l\'ID spécifié.');
    }

    renderDeals(filteredDeals);
});

document.getElementById('search-input').addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.querySelector('#search-form button').click();
    }
});

selectPage.addEventListener('change', async event => {
    const page = parseInt(event.target.value);
    const pageSize = parseInt(selectShow.value);
    const deals = await fetchDeals(page, pageSize);
    setCurrentDeals(deals);
    render(currentDeals, currentPagination);
});

document.getElementById('filter-discount').addEventListener('click', () => {
    const filteredDeals = filterDealsByDiscount(currentDeals);
    renderDeals(filteredDeals);
});

document.getElementById('filter-commented').addEventListener('click', () => {
    const filteredDeals = filterDealsByComments(currentDeals);
    renderDeals(filteredDeals);
});

document.getElementById('filter-hot-deals').addEventListener('click', () => {
    const filteredDeals = filterDealsByHotDeals(currentDeals);
    renderDeals(filteredDeals);
});

document.getElementById('sort-select').addEventListener('change', function () {
    const selectedOption = this.value;

    if (selectedOption === 'price-asc') {
        const sortedDeals = sortByPriceAscending(currentDeals);
        renderDeals(sortedDeals);
    }
    if (selectedOption === 'price-desc') {
        const sortedDeals = sortByPriceDescending(currentDeals);
        renderDeals(sortedDeals);
    }
    if (selectedOption === 'date-asc') {
        const sortedDeals = Anciently(currentDeals);
        renderDeals(sortedDeals);
    }
    if (selectedOption === 'date-desc') {
        const sortedDeals = Recently(currentDeals);
        renderDeals(sortedDeals);
    }
});

document.querySelector('#lego-set-id-select').addEventListener('change', async event => {
    const setId = event.target.value;
    if (!setId) {
        console.error("No Lego set ID selected.");
        return;
    }

    const vintedSales = await fetchVintedSales(setId);
    const stats = calculatePriceStatistics(vintedSales);
    const lifetime = calculateLifetimeValue(vintedSales);
    renderPriceStatistics(stats);
    renderLifetimeValue(lifetime);
    renderVintedSales(vintedSales);
});

document.querySelector('#filter-favorites').addEventListener('click', () => {
    filterFavoriteDeals();
});

/**
 * Fetch sales from API
 * @param {String|Number} setId
 * @return {Array}
 */
const fetchVintedSales = async setId => {
    try {
        const url = `https://lego-api-blue.vercel.app/sales?id=${setId}`;
        const response = await fetch(url);

        if (!response.ok) {
            console.error("Failed to fetch sales. HTTP status:", response.status);
            return [];
        }

        const data = await response.json();
        return data.data.result || [];
    } catch (error) {
        console.error("Error fetching Vinted sales:", error);
        return [];
    }
};

/**
 * Render sales
 * @param {Array} sales
 */
const renderVintedSales = sales => {
    const salesContainerElement = document.querySelector('#salesContainer');
    const nbSales = document.querySelector('#nbSales');

    if (!salesContainerElement) {
        console.error('Sales container element not found in the DOM.');
        return;
    }

    nbSales.textContent = sales.length;
    salesContainerElement.innerHTML = '';

    if (sales.length === 0) {
        salesContainerElement.innerHTML = `<p>No sales found for the selected Lego set.</p>`;
        return;
    }

    const salesContent = sales.map(sale =>
        `<div class="vinted-sale" id="${sale.uuid}">
      <a href="${sale.link}" target="_blank" rel="noopener noreferrer">${sale.title}</a>
      <span>Price: ${sale.price} €</span>
    </div>`
    ).join('');

    salesContainerElement.innerHTML = salesContent;
};

/**
 * Filter deals by best discount
 * @param {Array} deals
 * @return {Array}
 */
const filterDealsByDiscount = deals => {
    return deals.filter(deal => parseFloat(deal.discount) > 50);
};

/**
 * Filter deals by most commented
 * @param {Array} deals
 * @return {Array}
 */
const filterDealsByComments = deals => {
    return deals.filter(deal => deal.comments >= 15);
};

/**
 * Filter deals by hot deals
 * @param {Array} deals
 * @return {Array}
 */
const filterDealsByHotDeals = deals => {
    return deals.filter(deal => deal.temperature >= 100);
};

/**
 * Sort deals by price ascending
 * @param {Array} deals
 * @return {Array}
 */
const sortByPriceAscending = deals => {
    return deals.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
};

/**
 * Sort deals by price descending
 * @param {Array} deals
 * @return {Array}
 */
const sortByPriceDescending = deals => {
    return deals.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
};

/**
 * Sort deals by date ascending
 * @param {Array} deals
 * @return {Array}
 */
const Recently = deals => {
    return deals.sort((a, b) => new Date(a.published) - new Date(b.published));
};

/**
 * Sort deals by date descending
 * @param {Array} deals
 * @return {Array}
 */
const Anciently = deals => {
    return deals.sort((a, b) => new Date(b.published) - new Date(a.published));
};

/**
 * Calculate price statistics
 * @param {Array} sales
 * @return {Object}
 */
const calculatePriceStatistics = sales => {
    if (sales.length === 0) {
        return { average: 0, p5: 0, p25: 0, p50: 0 };
    }
    const prices = sales.map(sale => parseFloat(sale.price)).sort((a, b) => a - b);

    const average = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const p5 = prices[Math.floor(prices.length * 0.05)] || prices[0];
    const p25 = prices[Math.floor(prices.length * 0.25)] || prices[0];
    const p50 = prices[Math.floor(prices.length * 0.50)] || prices[0];

    return { average, p5, p25, p50 };
};

/**
 * Render price statistics
 * @param {Object} stats
 */
const renderPriceStatistics = stats => {
    const averageElement = document.querySelector('#averagePrice');
    const p5Element = document.querySelector('#p5Price');
    const p25Element = document.querySelector('#p25Price');
    const p50Element = document.querySelector('#p50Price');

    if (averageElement) averageElement.textContent = stats.average.toFixed(2) + " €";
    if (p5Element) p5Element.textContent = stats.p5.toFixed(2) + " €";
    if (p25Element) p25Element.textContent = stats.p25.toFixed(2) + " €";
    if (p50Element) p50Element.textContent = stats.p50.toFixed(2) + " €";
};

/**
 * Calculate lifetime value
 * @param {Array} sales
 * @return {Number}
 */
const calculateLifetimeValue = sales => {
    if (sales.length === 0) {
        return 0;
    }

    const dates = sales
        .map(sale => new Date(sale.published))
        .filter(date => !isNaN(date));

    if (dates.length === 0) {
        return 0;
    }

    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    const lifetimeInDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24));

    return lifetimeInDays;
};

/**
 * Render lifetime value
 * @param {Number} lifetime
 */
const renderLifetimeValue = lifetime => {
    const lifetimeElement = document.querySelector('#lifetimeValue');
    if (lifetimeElement) {
        lifetimeElement.textContent = `${lifetime} days`;
    }
};

/**
 * Toggle favorite deal
 * @param {String} dealId
 */
const toggleFavoriteDeal = dealId => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const dealIndex = favorites.findIndex(fav => fav.uuid === dealId);

    if (dealIndex >= 0) {
        favorites.splice(dealIndex, 1);
    } else {
        const deal = currentDeals.find(deal => deal.uuid === dealId);
        if (deal) {
            favorites.push(deal);
        }
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderDeals(currentDeals);
};

/**
 * Filter favorite deals
 */
const filterFavoriteDeals = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        alert("No favorite deals to display.");
        return;
    }

    renderDeals(favorites);
};
=======
selectShow.addEventListener('change', async (event) => {
  const deals = await fetchDeals(currentPagination.currentPage, parseInt(event.target.value));

  setCurrentDeals(deals);
  render(currentDeals, currentPagination);
});

document.addEventListener('DOMContentLoaded', async () => {
  const deals = await fetchDeals();

  setCurrentDeals(deals);
  render(currentDeals, currentPagination);
});
>>>>>>> d8a914d26a4820813cb724f1642af3b6037af5a6
