const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const generatedCodes = new Set();

function generateCouponCode(length = 12) {
  let couponCode = "";

  do {
    couponCode = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      couponCode += characters[randomIndex];
    }
  } while (generatedCodes.has(couponCode));

  generatedCodes.add(couponCode);
  return couponCode;
}

export { generateCouponCode };
