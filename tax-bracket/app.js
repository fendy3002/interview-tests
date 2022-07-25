const getPTKP = (kategori) => {
  switch(kategori) {
    case 'TK0': 
      return 54000000;
    case 'K0': 
      return 58500000;
    case 'K1': 
      return 63000000;

    default:
      return 0;
  }
};

const taxBracket = [
  [500, 30],
  [250, 25],
  [50, 15],
  [0, 5],
];

// income = monthly
// income: number, kategori (PTKP): string
const calculateTax = (income, kategori) => {
  const yearlyIncome = income * 12;
  const PKP = yearlyIncome - getPTKP(kategori);
  let totalPajak = 0;
  let remainingPKP = PKP;
  for(let oneBracket of taxBracket){
    const [thresholdInMillion, percentage] = oneBracket;
    const threshold = thresholdInMillion * 1000000;
    const taxableInBracket = remainingPKP - threshold;
    if(taxableInBracket > 0) {
      totalPajak += Math.ceil(taxableInBracket * percentage / 100);
      remainingPKP -= taxableInBracket;
    }
  }
  return totalPajak;
};

const testCases = [
  {income: 6500000, kategori: 'K1', tax: 750000},
  {income: 25000000, kategori: 'TK0', tax: 31900000},
];
for(const testCase of testCases){
  const calculatedTax = calculateTax(testCase.income, testCase.kategori);
  if(calculatedTax != testCase.tax){
    console.error(testCase, calculatedTax);
  }
}