export function convertToCurrency(
  number: number,
  currency?: string,
  currencyCountry?: string
) {
const countryInfo = currencyCountry ?? "pt-BR"
  const parsedNumber = new Intl.NumberFormat(countryInfo, {
    style: "currency",
    currency: currency ?? "BRL",
  }).format(number);

  return parsedNumber;
}
