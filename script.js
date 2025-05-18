const fromDropDown = document.querySelector("select[name='from']");
const toDropDown = document.querySelector("select[name='to']");
const exchangeBtn = document.querySelector("button");
const amountInput = document.querySelector("input");
const msgDiv = document.querySelector(".msg");
const fromImg = document.querySelector(".from img");
const toImg = document.querySelector(".to img");

const countryList = {
  USD: "US", INR: "IN", EUR: "FR", GBP: "GB", JPY: "JP", AUD: "AU", CAD: "CA", CHF: "CH", CNY: "CN", ZAR: "ZA"
};

const currencies = Object.keys(countryList);

// Populate dropdowns
currencies.forEach(currency => {
  let option1 = document.createElement("option");
  option1.value = currency;
  option1.text = currency;
  if (currency === "USD") option1.selected = true;
  fromDropDown.appendChild(option1);

  let option2 = document.createElement("option");
  option2.value = currency;
  option2.text = currency;
  if (currency === "INR") option2.selected = true;
  toDropDown.appendChild(option2);
});

// Update flags
function updateFlag(dropDown, imgTag) {
  const code = dropDown.value;
  imgTag.src = `https://flagsapi.com/${countryList[code]}/flat/64.png`;
}
fromDropDown.addEventListener("change", () => updateFlag(fromDropDown, fromImg));
toDropDown.addEventListener("change", () => updateFlag(toDropDown, toImg));

// Fetch and convert currency
exchangeBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const amount = parseFloat(amountInput.value);
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  if (isNaN(amount) || amount <= 0) {
    msgDiv.innerText = "Please enter a valid amount.";
    return;
  }

  const url = `https://open.er-api.com/v6/latest/${fromCurrency}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.rates[toCurrency]) {
      msgDiv.innerText = `Exchange rate for ${toCurrency} not available.`;
      return;
    }

    const rate = data.rates[toCurrency];
    const converted = (rate * amount).toFixed(2);

    msgDiv.innerText = `${amount} ${fromCurrency} = ${converted} ${toCurrency}`;
  } catch (err) {
    msgDiv.innerText = "Failed to fetch exchange rate.";
    console.error(err);
  }
});

// Initialize flags
updateFlag(fromDropDown, fromImg);
updateFlag(toDropDown, toImg);
