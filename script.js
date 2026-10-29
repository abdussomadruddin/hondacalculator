// Honda Malaysia, Peninsular private registration. Verified 29 October 2026.
const vehicles = {
  "City": {
    slug: "city",
    variants: {
      "1.5L E": { bodyPrice: 89560, retailPrice: 89900 },
      "1.5L V": { bodyPrice: 94560, retailPrice: 94900 },
      "1.5L RS": { bodyPrice: 99560, retailPrice: 99900 },
      "1.5L e:HEV RS": { bodyPrice: 111560, retailPrice: 111900 },
    },
  },
  "City Hatchback": {
    slug: "city-hatchback",
    variants: {
      "1.5L V": { bodyPrice: 95560, retailPrice: 95900 },
      "1.5L RS": { bodyPrice: 100560, retailPrice: 100900 },
      "1.5L e:HEV RS": { bodyPrice: 112560, retailPrice: 112900 },
    },
  },
  "WR-V": {
    slug: "wr-v",
    variants: {
      "1.5L E": { bodyPrice: 94560, retailPrice: 94900 },
      "1.5L V": { bodyPrice: 98560, retailPrice: 98900 },
      "1.5L RS": { bodyPrice: 104560, retailPrice: 104900 },
    },
  },
  "Civic": {
    slug: "civic",
    variants: {
      "1.5L E": { bodyPrice: 133560, retailPrice: 133900 },
      "1.5L V": { bodyPrice: 144560, retailPrice: 144900 },
      "1.5L RS": { bodyPrice: 149560, retailPrice: 149900 },
      "2.0L e:HEV RS": { bodyPrice: 167123.5, retailPrice: 167900 },
    },
  },
  "HR-V": {
    slug: "hrv",
    variants: {
      "1.5L S": { bodyPrice: 115530, retailPrice: 115900 },
      "1.5L T E": { bodyPrice: 130530, retailPrice: 130900 },
      "1.5L T V": { bodyPrice: 137530, retailPrice: 137900 },
      "1.5L e:HEV RS": { bodyPrice: 143530, retailPrice: 143900 },
    },
  },
  "CR-V": {
    slug: "crv",
    variants: {
      "2.0L e:HEV E": { bodyPrice: 177362.8, retailPrice: 178200 },
      "1.5L V": { bodyPrice: 181530, retailPrice: 181900 },
      "2.0L e:HEV RS": { bodyPrice: 195062.8, retailPrice: 195900 },
    },
  },
  "Type R": {
    slug: "type-r",
    variants: {
      "Type R": { bodyPrice: 399072, retailPrice: 399900 },
    },
  },
  "e:N1": {
    slug: "en1",
    variants: {
      "e:N1": { bodyPrice: 149402, retailPrice: 150060 },
    },
  },
  "Prelude": {
    slug: "prelude",
    variants: {
      "Prelude": { bodyPrice: 277173.5, retailPrice: 278000 },
    },
  },
};

const promotion = {
  startsOn: "2026-10-01",
  endsOn: "2026-10-31",
  launchStartsOn: "2026-10-19",
  rewards: { "City": 7000, "City Hatchback": 4000, "Civic": 20000, "HR-V": 20000, "CR-V": 20000, "WR-V": 8000 },
};

function isPromotionActive(date = new Date()) {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kuala_Lumpur",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
  return today >= promotion.startsOn && today <= promotion.endsOn;
}

function getDefaultRebate(model, date = new Date()) {
  const launchDate = new Date(`${promotion.launchStartsOn}T00:00:00+08:00`);
  return model === "City Hatchback" && date >= launchDate && isPromotionActive(date)
    ? 4000
    : 0;
}

function updatePromotionNote() {
  const model = modelSelect.value;
  const note = document.querySelector("#rebate-note");
  const reward = promotion.rewards[model];
  if (!isPromotionActive()) {
    note.textContent = "Rebate RM0 assumed. Confirm current offers with dealer.";
  } else if (model === "City Hatchback" && getDefaultRebate(model) > 0) {
    note.textContent = "RM4,000 launch cash reward. Register by 31 Oct 2026; T&Cs apply.";
  } else if (reward) {
    note.textContent = `October rewards up to ${formatRM(reward)}; eligibility applies. Confirm cash rebate with dealer.`;
  } else {
    note.textContent = "No verified cash rebate assumed. Confirm with dealer.";
  }
}

const colors = {
  "Platinum White Pearl": { swatch: "#f0eee6" },
  "Ignite Red Metallic": { swatch: "#b40b20" },
  "Stellar Diamond Pearl": { swatch: "#cbd5db" },
  "Meteoroid Gray Metallic": { swatch: "#53555a" },
  "Canyon River Blue Metallic": { swatch: "#334d64" },
  "Crystal Black Pearl": { swatch: "#17181a" },
  "Blazing Red Pearl": { swatch: "#b71420" },
  "Blazing Red Pearl + Dual Tone": { swatch: "linear-gradient(#17181a 35%, #b71420 35%)" },
  "Championship White": { swatch: "#f1efdf" },
  "Aqua Topaz Metallic": { swatch: "#7aabac" },
  "Urban Grey Pearl": { swatch: "#92958f" },
  "Winter Frost Pearl": { swatch: "#f1f3f5" },
  "Rallye Red": { swatch: "#ce1727" },
};

const vehicleImages = {
  "City": { src: "assets/models/city.png", alt: "Honda City sedan" },
  "City Hatchback": { src: "assets/models/city-hatchback.png", alt: "Honda City Hatchback" },
  "WR-V": { src: "assets/models/wr-v.png", alt: "Honda WR-V compact SUV" },
  "Civic": { src: "assets/models/civic.png", alt: "Honda Civic sedan" },
  "HR-V": { src: "assets/models/hr-v.png", alt: "Honda HR-V SUV" },
  "CR-V": { src: "assets/models/cr-v.png", alt: "Honda CR-V SUV" },
  "Type R": { src: "assets/models/type-r.png", alt: "Honda Civic Type R" },
  "e:N1": { src: "assets/models/en1.png", alt: "Honda e:N1 electric SUV" },
  "Prelude": { src: "assets/models/prelude.png", alt: "Honda Prelude coupe" },
};

const colorAvailability = {
  "City": {
    default: ["Platinum White Pearl", "Meteoroid Gray Metallic", "Blazing Red Pearl"],
    "1.5L V": ["Platinum White Pearl", "Meteoroid Gray Metallic", "Stellar Diamond Pearl", "Blazing Red Pearl"],
    "1.5L RS": ["Platinum White Pearl", "Meteoroid Gray Metallic", "Stellar Diamond Pearl", "Blazing Red Pearl"],
  },
  "City Hatchback": {
    default: ["Blazing Red Pearl", "Platinum White Pearl", "Stellar Diamond Pearl", "Meteoroid Gray Metallic"],
    "1.5L e:HEV RS": ["Blazing Red Pearl", "Platinum White Pearl", "Meteoroid Gray Metallic"],
  },
  "WR-V": {
    default: ["Platinum White Pearl", "Meteoroid Gray Metallic", "Stellar Diamond Pearl", "Blazing Red Pearl"],
    "1.5L RS": ["Platinum White Pearl", "Meteoroid Gray Metallic", "Stellar Diamond Pearl", "Blazing Red Pearl", "Blazing Red Pearl + Dual Tone"],
  },
  "Civic": {
    default: ["Canyon River Blue Metallic", "Platinum White Pearl", "Meteoroid Gray Metallic", "Ignite Red Metallic"],
    "1.5L V": ["Canyon River Blue Metallic", "Platinum White Pearl", "Meteoroid Gray Metallic", "Crystal Black Pearl", "Ignite Red Metallic"],
  },
  "HR-V": {
    default: ["Platinum White Pearl", "Stellar Diamond Pearl", "Meteoroid Gray Metallic", "Crystal Black Pearl"],
  },
  "CR-V": {
    default: ["Canyon River Blue Metallic", "Platinum White Pearl", "Meteoroid Gray Metallic", "Blazing Red Pearl"],
  },
  "Type R": { default: ["Championship White"] },
  "e:N1": { default: ["Platinum White Pearl", "Aqua Topaz Metallic", "Urban Grey Pearl"] },
  "Prelude": { default: ["Winter Frost Pearl", "Rallye Red", "Crystal Black Pearl"] },
};

const colorSurcharges = {
  "City": { "Platinum White Pearl": 400, "Blazing Red Pearl": 400 },
  "City Hatchback": { "Platinum White Pearl": 400, "Blazing Red Pearl": 400 },
  "WR-V": {
    "Platinum White Pearl": 400,
    "Blazing Red Pearl": 400,
    "Blazing Red Pearl + Dual Tone": 2200,
  },
  "Civic": {
    "Platinum White Pearl": 800,
    "Ignite Red Metallic": 800,
    "Canyon River Blue Metallic": 800,
  },
  "HR-V": { "Platinum White Pearl": 800 },
  "CR-V": {
    "Platinum White Pearl": 800,
    "Blazing Red Pearl": 800,
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
const vehicleImage = document.querySelector("#vehicle-image");

const outputElements = {
  priceAfterRebate: document.querySelector("#price-after-rebate"),
  estimatedInsurance: document.querySelector("#estimated-insurance"),
  otrPrice: document.querySelector("#otr-price"),
  depositAmount: document.querySelector("#deposit-amount"),
  monthlySelected: document.querySelector("#monthly-selected"),
  monthlyDeposit7: document.querySelector("#monthly-deposit-7"),
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

function calculateMonthlyPayment(loanAmount, annualInterestRate, years) {
  const months = years * 12;
  return (loanAmount + loanAmount * annualInterestRate * years) / months;
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
  const model = vehicles[modelSelect.value];
  bodyPriceInput.value = model.variants[variantSelect.value].bodyPrice;
  rebateInput.value = getDefaultRebate(modelSelect.value);
  updatePromotionNote();
  document.querySelector("#pricing-source").href =
    `https://www.honda.com.my/model/${model.slug}/pricing`;
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
  form.classList.toggle("has-custom-deposit", isCustom);
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
  const insuranceRate = includesInsurance ? 0.033 : 0;
  const loanYears = Math.min(
    9,
    Math.max(1, Math.round(getNumber(loanPeriodSelect))),
  );
  const loanMonths = loanYears * 12;
  const variant = vehicles[modelSelect.value].variants[variantSelect.value];
  // Use the published OTR/selling-price difference so charges are not counted twice.
  const onRoadFees = Math.round((variant.retailPrice - variant.bodyPrice) * 100) / 100;

  const priceAfterRebate = Math.max(
    0,
    bodyPrice + colorSurcharge - rebate,
  );
  const grossInsurance = priceAfterRebate * insuranceRate;
  const estimatedInsurance = grossInsurance * (1 - ncd);
  const otrPrice = priceAfterRebate + onRoadFees + estimatedInsurance;
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
  const monthlyFullLoan9 = calculateMonthlyPayment(otrPrice, interestRate, 9);
  const monthlySelected = calculateMonthlyPayment(
    loanAfterDeposit,
    interestRate,
    loanYears,
  );
  const monthlyDeposit7 = calculateMonthlyPayment(
    loanAfterDeposit,
    interestRate,
    7,
  );

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
    onRoadFees,
    estimatedInsurance,
    otrPrice,
    depositAmount,
    depositLabel,
    selectedLoanLabel,
    sevenYearLoanLabel,
    fullLoan9Label: "Full loan, 9 years",
    requestedDeposit,
    loanAfterDeposit,
    monthlyFullLoan9,
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
  }).forEach(([key, value]) => {
    outputElements[key].textContent = formatRM(value);
  });

  const selectedVehicleImage =
    vehicleImages[modelSelect.value] || vehicleImages.City;

  document.querySelector("#mobile-monthly").textContent = formatRM(monthlySelected);

  document.querySelector("#result-vehicle").textContent =
    `Honda ${modelSelect.value} · ${variantSelect.value}`;
  document.querySelector("#result-color").textContent = colorSelect.value;
  vehicleImage.src = selectedVehicleImage.src;
  vehicleImage.alt = selectedVehicleImage.alt;
  document.querySelector("#estimated-insurance-label").textContent =
    includesInsurance ? "Estimated insurance" : "Insurance excluded";
  document.querySelector("#otr-price-label").textContent =
    includesInsurance ? "OTR price with insurance" : "OTR price without insurance";
  document.querySelector("#otr-fees-note").textContent =
    `Includes ${formatRM(onRoadFees)} on-road fees`;
  document.querySelector("#deposit-result-label").textContent =
    depositResultLabel;
  document.querySelector("#monthly-selected-label").textContent =
    selectedLoanLabel;
  document.querySelector("#monthly-selected-note").textContent =
    `${loanYears} ${loanYears === 1 ? "year" : "years"} · ${loanMonths} months`;
  document.querySelector("#monthly-deposit-7-label").textContent =
    sevenYearLoanLabel;

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
    `On-road fees: ${formatRM(result.onRoadFees)}`,
    result.includesInsurance
      ? `Estimated insurance (${formatPercentage(result.ncd)}% NCD): ${formatRM(result.estimatedInsurance)}`
      : "Insurance: Excluded",
    result.includesInsurance
      ? `OTR with insurance: *${formatRM(result.otrPrice)}*`
      : `OTR without insurance: *${formatRM(result.otrPrice)}*`,
    "",
    `Deposit amount: ${formatRM(result.depositAmount)}`,
    `Loan after deposit: ${formatRM(result.loanAfterDeposit)}`,
    "",
    `${result.fullLoan9Label}: *${formatRM(result.monthlyFullLoan9)}/month*`,
    `${result.sevenYearLoanLabel}: *${formatRM(result.monthlyDeposit7)}/month*`,
    "",
    `${result.selectedLoanLabel}: *${formatRM(result.monthlySelected)}/month*`,
  ].join("\n");
}

function lockPageZoom() {
  const zoomKeys = new Set(["+", "-", "=", "_", "0"]);

  document.addEventListener(
    "wheel",
    (event) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
      }
    },
    { passive: false },
  );

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && zoomKeys.has(event.key)) {
      event.preventDefault();
    }
  });

  ["gesturestart", "gesturechange", "gestureend"].forEach((eventName) => {
    document.addEventListener(eventName, (event) => event.preventDefault());
  });
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
  rebateInput.value = getDefaultRebate(modelSelect.value);
  interestRateInput.value = 2.25;
  insuranceOptionSelect.value = "include";
  ncdSelect.value = 0;
  depositOptionSelect.value = "10";
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
form.addEventListener("input", (event) => {
  // Selects calculate on change, after their dependent options are refreshed.
  if (event.target instanceof HTMLInputElement) {
    calculate();
  }
});
form.addEventListener("change", calculate);
copyButton.addEventListener("click", copyResult);
resetButton.addEventListener("click", resetCalculator);

populateModels();
syncInsuranceOption();
syncDepositOption();
lockPageZoom();
calculate();
