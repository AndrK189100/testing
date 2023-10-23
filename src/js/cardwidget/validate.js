export function definePaymentSystem(code) {
  switch (code[0]) {
    case "4":
      return "visa";
    case "5":
      if (Number(code[1]) >= 1 && Number(code[1]) <= 5) {
        return "mastercard";
      }
      return false;

    case "2":
      return "mir";
    case "6":
      if (code[1] === "2") {
        return "unionpay";
      }
      return false;
    default:
      return false;
  }
}

export function validateCarNumber(cardNumber) {
  const arrayNumbers = cardNumber.split("");
  //const lastDigit = Number(arrayNumbers.pop());
  let buffer = 0;

  arrayNumbers.reverse();
  for (let i = 0; i < arrayNumbers.length; i += 1) {
    let digit = Number(arrayNumbers[i]);
    (i + 1) % 2 ? digit : (digit *= 2);
    digit > 9 ? (buffer += digit - 9) : (buffer += digit);
  }
  return buffer % 10;
}
