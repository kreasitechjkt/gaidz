
type Review = {
  // number of stars
  nstar: number,

  // number of vote
  nvote: number
}

export function calcReviews(inputs: Review[]): number {
  if (inputs.length === 0) return 0;

  let sum = 0;
  let avg = 0;
  for (let i = 0; inputs.length > i; i++) {
    avg += (inputs[i].nstar * inputs[i].nvote);
    sum += inputs[i].nvote;
  }
  return avg / sum;
}

