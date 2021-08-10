import * as productRepo from './productRepo';

export function featuredProducts() {
  const id = 1;
  console.log({productRepo})
  return productRepo.find(id);
}

