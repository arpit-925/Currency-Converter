const fromDropDown = document.querySelector("select[name='from']");
const toDropDown = document.querySelector("select[name='to']");
const exchangeBtn = document.querySelector("button");
const amountInput = document.querySelector("input");
const msgDiv = document.querySelector(".msg");
const fromImg = document.querySelector(".from img");
const toImg = document.querySelector(".to img");

const countryList = {
   AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW"
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
