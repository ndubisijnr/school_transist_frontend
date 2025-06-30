export function generateReference(length = 10, prefix = '', suffix = '') {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomPart = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomPart += characters[randomIndex];
  }

  return `${prefix}${randomPart}${suffix}`;
}

// Example usage:
// console.log(generateReference(12, 'REF-', '-NG'));     // e.g. 'REF-A9DKXMP4TQWL-NG'
