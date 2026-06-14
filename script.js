const vehicles = {
  "City": {
    variants: {
      "1.5L S": 84900,
      "1.5L E": 89900,
      "1.5L V": 94900,
      "1.5L RS": 99900,
      "1.5L e:HEV RS": 111900,
    },
  },
  "City Hatchback": {
    variants: {
      "1.5L S": 85900,
      "1.5L E": 90900,
      "1.5L V": 95900,
      "1.5L RS": 100900,
      "1.5L e:HEV RS": 112900,
    },
  },
  "WR-V": {
    variants: {
      "1.5L S": 89900,
      "1.5L E": 95900,
      "1.5L V": 99900,
      "1.5L RS": 107900,
    },
  },
  "Civic": {
    variants: {
      "1.5L E": 133900,
      "1.5L V": 144900,
      "1.5L RS": 149900,
      "2.0L e:HEV RS": 167900,
    },
  },
  "HR-V": {
    variants: {
      "1.5L S": 115900,
      "1.5L Turbo E": 130900,
      "1.5L Turbo V": 137900,
      "1.5L e:HEV RS": 143900,
    },
  },
  "CR-V": {
    variants: {
      "2.0L e:HEV E": 178200,
      "1.5L Turbo V AWD": 181900,
      "2.0L e:HEV RS": 195900,
    },
  },
};

const colors = {
  "Platinum White Pearl": { swatch: "#f0eee6" },
  "Ignite Red Metallic": { swatch: "#b40b20" },
  "Phoenix Orange Pearl": { swatch: "#e8471b" },
  "Stellar Diamond Pearl": { swatch: "#cbd5db" },
  "Meteoroid Gray Metallic": { swatch: "#53555a" },
  "Canyon River Blue Metallic": { swatch: "#334d64" },
  "Crystal Black Pearl": { swatch: "#17181a" },
  "Blazing Red Pearl": { swatch: "#b71420" },
};

const colorAvailability = {
  "City": {
    default: [
      "Phoenix Orange Pearl",
      "Ignite Red Metallic",
      "Meteoroid Gray Metallic",
      "Platinum White Pearl",
      "Stellar Diamond Pearl",
    ],
    "1.5L e:HEV RS": [
      "Phoenix Orange Pearl",
      "Ignite Red Metallic",
      "Meteoroid Gray Metallic",
      "Platinum White Pearl",
    ],
  },
  "City Hatchback": {
    default: [
      "Ignite Red Metallic",
      "Platinum White Pearl",
      "Stellar Diamond Pearl",
      "Meteoroid Gray Metallic",
      "Phoenix Orange Pearl",
    ],
    "1.5L e:HEV RS": [
      "Ignite Red Metallic",
      "Platinum White Pearl",
      "Meteoroid Gray Metallic",
      "Phoenix Orange Pearl",
    ],
  },
  "WR-V": {
    default: [
      "Ignite Red Metallic",
      "Platinum White Pearl",
      "Stellar Diamond Pearl",
      "Meteoroid Gray Metallic",
      "Phoenix Orange Pearl",
    ],
  },
  "Civic": {
    default: [
      "Canyon River Blue Metallic",
      "Platinum White Pearl",
      "Meteoroid Gray Metallic",
      "Crystal Black Pearl",
      "Ignite Red Metallic",
    ],
    "2.0L e:HEV RS": [
      "Canyon River Blue Metallic",
      "Platinum White Pearl",
      "Meteoroid Gray Metallic",
      "Ignite Red Metallic",
    ],
  },
  "HR-V": {
    default: [
      "Platinum White Pearl",
      "Stellar Diamond Pearl",
      "Meteoroid Gray Metallic",
      "Crystal Black Pearl",
      "Phoenix Orange Pearl",
    ],
  },
  "CR-V": {
    default: [
      "Canyon River Blue Metallic",
      "Platinum White Pearl",
      "Meteoroid Gray Metallic",
      "Blazing Red Pearl",
    ],
  },
};

const colorSurcharges = {
  "City": {
    "Platinum White Pearl": 400,
    "Phoenix Orange Pearl": 400,
    "Ignite Red Metallic": 400,
  },
  "City Hatchback": {
    "Platinum White Pearl": 400,
    "Phoenix Orange Pearl": 400,
    "Ignite Red Metallic": 400,
  },
  "WR-V": {
    "Platinum White Pearl": 400,
    "Phoenix Orange Pearl": 400,
    "Ignite Red Metallic": 400,
  },
  "Civic": {
    "Platinum White Pearl": 800,
    "Ignite Red Metallic": 800,
    "Canyon River Blue Metallic": 800,
  },
};

const form = document.querySelector("#loan-form");
const modelSelect = document.querySelector("#model");
const variantSelect = document.querySelector("#variant");
const colorSelect = document.querySelector("#color");
const colorSwatch = document.querySelector("#color-swatch");
const bodyPriceInput = document.querySelector("#body-price");
const colorSurchargeInput = document.querySelector("#color-surcharge");
const rebateInput = document.querySelector("#rebate");
const interestRateInput = document.querySelector("#interest-rate");
const insuranceOptionSelect = document.querySelector("#insurance-option");
const ncdSelect = document.querySelector("#ncd");
const depositOptionSelect = document.querySelector("#deposit-option");
const loanPeriodSelect = document.querySelector("#loan-period");
const customDepositField = document.querySelector("#custom-deposit-field");
const customDepositInput = document.querySelector("#custom-deposit");
const depositMessage = document.querySelector("#deposit-message");
const copyButton = document.querySelector("#copy-button");
const copyStatus = document.querySelector("#copy-status");
const resetButton = document.querySelector("#reset-button");
const rebateMessage = document.querySelector("#rebate-message");

const outputElements = {
  priceAfterRebate: document.querySelector("#price-after-rebate"),
  estimatedInsurance: document.querySelector("#estimated-insurance"),
  otrPrice: document.querySelector("#otr-price"),
  depositAmount: document.querySelector("#deposit-amount"),
  monthlySelected: document.querySelector("#monthly-selected"),
  monthlyDeposit7: document.querySelector("#monthly-deposit-7"),
  monthlyHero: document.querySelector("#monthly-hero"),
};

const currency = new Intl.NumberFormat("en-MY", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

let latestResult = {};

function formatRM(value) {
  return `RM ${currency.format(Number.isFinite(value) ? value : 0)}`;
}

function formatPercentage(value) {
  return Number.isInteger(value)
    ? value.toFixed(0)
    : value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

function getNumber(input) {
  const value = Number.parseFloat(input.value);
  return Number.isFinite(value) ? value : 0;
}

function populateSelect(select, items) {
  select.innerHTML = "";
  items.forEach((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    select.append(option);
  });
}

function populateModels() {
  populateSelect(modelSelect, Object.keys(vehicles));
  modelSelect.value = "City";
  populateVariants();
}

function populateVariants() {
  const variants = Object.keys(vehicles[modelSelect.value].variants);
  populateSelect(variantSelect, variants);
  variantSelect.value = variants.includes("1.5L V") ? "1.5L V" : variants[0];
  syncVariant();
}

function populateColors() {
  const currentColor = colorSelect.value;
  const modelColors = colorAvailability[modelSelect.value];
  const availableColors =
    modelColors[variantSelect.value] || modelColors.default;

  populateSelect(colorSelect, availableColors);
  colorSelect.value = availableColors.includes(currentColor)
    ? currentColor
    : availableColors.includes("Platinum White Pearl")
      ? "Platinum White Pearl"
      : availableColors[0];
  syncColor();
}

function syncVariant() {
  bodyPriceInput.value =
    vehicles[modelSelect.value].variants[variantSelect.value];
  populateColors();
}

function syncColor() {
  const selectedColor = colors[colorSelect.value];
  colorSurchargeInput.value =
    colorSurcharges[modelSelect.value]?.[colorSelect.value] || 0;
  colorSwatch.style.background = selectedColor.swatch;
  calculate();
}

function validateRebate(bodyPrice, colorSurcharge, rebate) {
  const field = rebateInput.closest(".field");
  const availablePrice = bodyPrice + colorSurcharge;
  const hasError = rebate > availablePrice;

  field.classList.toggle("has-error", hasError);
  rebateInput.setAttribute("aria-invalid", String(hasError));
  rebateMessage.textContent = hasError
    ? "Rebate exceeds the vehicle price. Calculated totals are capped at RM 0.00."
    : "";
}

function syncDepositOption() {
  const isCustom = depositOptionSelect.value === "custom";
  customDepositField.classList.toggle("is-hidden", !isCustom);
  customDepositInput.disabled = !isCustom;
  calculate();
}

function syncInsuranceOption() {
  const includesInsurance = insuranceOptionSelect.value === "include";
  ncdSelect.disabled = !includesInsurance;
  calculate();
}

function validateDeposit(otrPrice, requestedDeposit) {
  const hasError =
    depositOptionSelect.value === "custom" && requestedDeposit > otrPrice;

  customDepositField.classList.toggle("has-error", hasError);
  customDepositInput.setAttribute("aria-invalid", String(hasError));
  depositMessage.textContent = hasError
    ? "Deposit exceeds the OTR price. Loan amount is capped at RM 0.00."
    : "";
}

function calculate() {
  const bodyPrice = Math.max(0, getNumber(bodyPriceInput));
  const colorSurcharge = Math.max(0, getNumber(colorSurchargeInput));
  const rebate = Math.max(0, getNumber(rebateInput));
  const interestRate =
    Math.min(20, Math.max(0, getNumber(interestRateInput))) / 100;
  const ncdPercentage = Math.min(
    100,
    Math.max(0, getNumber(ncdSelect)),
  );
  const ncd = ncdPercentage / 100;
  const includesInsurance = insuranceOptionSelect.value === "include";
  const insuranceRate = includesInsurance ? 0.03 : 0;
  const loanYears = Math.min(
    9,
    Math.max(1, Math.round(getNumber(loanPeriodSelect))),
  );
  const loanMonths = loanYears * 12;

  const priceAfterRebate = Math.max(
    0,
    bodyPrice + colorSurcharge - rebate,
  );
  const grossInsurance = priceAfterRebate * insuranceRate;
  const estimatedInsurance = grossInsurance * (1 - ncd);
  const otrPrice = priceAfterRebate + estimatedInsurance;
  const isFullLoan = depositOptionSelect.value === "full";
  const isCustomDeposit = depositOptionSelect.value === "custom";
  const requestedDeposit = isFullLoan
    ? 0
    : isCustomDeposit
      ? Math.max(0, getNumber(customDepositInput))
      : otrPrice * 0.1;
  const depositAmount = Math.min(otrPrice, requestedDeposit);
  const depositLabel = isFullLoan
    ? "Full loan"
    : isCustomDeposit
      ? "Custom deposit"
      : "10% deposit";
  const depositResultLabel = isFullLoan ? "Deposit amount" : depositLabel;
  const selectedLoanLabel = isFullLoan
    ? `Full loan, ${loanYears} ${loanYears === 1 ? "year" : "years"}`
    : `${depositLabel}, loan ${loanYears} ${loanYears === 1 ? "year" : "years"}`;
  const sevenYearLoanLabel = isFullLoan
    ? "Full loan, 7 years"
    : `${depositLabel}, loan 7 years`;
  const loanAfterDeposit = otrPrice - depositAmount;
  const monthlySelected =
    (loanAfterDeposit + loanAfterDeposit * interestRate * loanYears) /
    loanMonths;
  const monthlyDeposit7 =
    (loanAfterDeposit + loanAfterDeposit * interestRate * 7) / 84;

  latestResult = {
    model: modelSelect.value,
    variant: variantSelect.value,
    color: colorSelect.value,
    bodyPrice,
    colorSurcharge,
    rebate,
    interestRate: interestRate * 100,
    ncd: ncdPercentage,
    includesInsurance,
    insuranceRate: insuranceRate * 100,
    loanYears,
    loanMonths,
    priceAfterRebate,
    estimatedInsurance,
    otrPrice,
    depositAmount,
    depositLabel,
    selectedLoanLabel,
    sevenYearLoanLabel,
    requestedDeposit,
    loanAfterDeposit,
    monthlySelected,
    monthlyDeposit7,
  };

  Object.entries({
    priceAfterRebate,
    estimatedInsurance,
    otrPrice,
    depositAmount,
    monthlySelected,
    monthlyDeposit7,
    monthlyHero: monthlySelected,
  }).forEach(([key, value]) => {
    outputElements[key].textContent = formatRM(value);
  });

  document.querySelector("#result-vehicle").textContent =
    `Honda ${modelSelect.value} · ${variantSelect.value}`;
  document.querySelector("#result-color").textContent = colorSelect.value;
  document.querySelector("#estimated-insurance-label").textContent =
    includesInsurance ? "Estimated insurance" : "Insurance excluded";
  document.querySelector("#otr-price-label").textContent =
    includesInsurance ? "OTR price with insurance" : "Price excluding insurance";
  document.querySelector("#deposit-result-label").textContent =
    depositResultLabel;
  document.querySelector("#monthly-selected-label").textContent =
    selectedLoanLabel;
  document.querySelector("#monthly-selected-note").textContent =
    `${loanYears} ${loanYears === 1 ? "year" : "years"} · ${loanMonths} months`;
  document.querySelector("#monthly-deposit-7-label").textContent =
    sevenYearLoanLabel;
  document.querySelector("#monthly-hero-note").textContent =
    `${depositLabel} · ${loanYears} ${loanYears === 1 ? "year" : "years"}`;

  validateRebate(bodyPrice, colorSurcharge, rebate);
  validateDeposit(otrPrice, requestedDeposit);
  copyStatus.textContent = "";
}

function buildWhatsAppMessage() {
  const result = latestResult;
  return [
    "*HONDA LOAN ESTIMATE*",
    "",
    `Model: Honda ${result.model}`,
    `Variant: ${result.variant}`,
    `Color: ${result.color}`,
    "",
    `Body price: ${formatRM(result.bodyPrice)}`,
    `Color surcharge: ${formatRM(result.colorSurcharge)}`,
    `Rebate: ${formatRM(result.rebate)}`,
    `Price after rebate: ${formatRM(result.priceAfterRebate)}`,
    result.includesInsurance
      ? `Estimated insurance (${formatPercentage(result.ncd)}% NCD): ${formatRM(result.estimatedInsurance)}`
      : "Insurance: Excluded",
    result.includesInsurance
      ? `OTR with insurance: *${formatRM(result.otrPrice)}*`
      : `Price excluding insurance: *${formatRM(result.otrPrice)}*`,
    "",
    `Deposit amount: ${formatRM(result.depositAmount)}`,
    `Loan after deposit: ${formatRM(result.loanAfterDeposit)}`,
    `${result.sevenYearLoanLabel}: *${formatRM(result.monthlyDeposit7)}/month*`,
  ].join("\n");
}

async function copyResult() {
  const message = buildWhatsAppMessage();

  try {
    await navigator.clipboard.writeText(message);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = message;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  copyStatus.textContent = "Copied. Ready to paste into WhatsApp.";
  copyButton.querySelector("span").textContent = "Result copied";
  window.setTimeout(() => {
    copyButton.querySelector("span").textContent =
      "Copy WhatsApp-ready result";
  }, 1800);
}

function resetCalculator() {
  modelSelect.value = "City";
  populateVariants();
  variantSelect.value = "1.5L V";
  syncVariant();
  colorSelect.value = "Platinum White Pearl";
  syncColor();
  rebateInput.value = 0;
  interestRateInput.value = 2.25;
  insuranceOptionSelect.value = "include";
  ncdSelect.value = 0;
  depositOptionSelect.value = "full";
  loanPeriodSelect.value = "9";
  customDepositInput.value = 0;
  syncInsuranceOption();
  syncDepositOption();
  calculate();
}

modelSelect.addEventListener("change", populateVariants);
variantSelect.addEventListener("change", syncVariant);
colorSelect.addEventListener("change", syncColor);
insuranceOptionSelect.addEventListener("change", syncInsuranceOption);
depositOptionSelect.addEventListener("change", syncDepositOption);
form.addEventListener("input", calculate);
form.addEventListener("change", calculate);
copyButton.addEventListener("click", copyResult);
resetButton.addEventListener("click", resetCalculator);

populateModels();
syncInsuranceOption();
syncDepositOption();
calculate();
