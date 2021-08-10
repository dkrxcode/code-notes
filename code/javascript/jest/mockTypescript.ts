// Mocking a constructor
// jest.mock('@anvilco/anvil', () => jest.fn());
jest.mock('./productClass', () => jest.fn());

import Product, {ProductInterface} from './productClass';
import {mock} from 'jest-mock-extended';

describe('type safe mocks', () => {
  it('constructor mock', () => {
    // Mock an interface with jest-mock-extended
    const mockedProduct = mock<ProductInterface>();
    Product.mockImplementation(() => mockedProduct);
    mockedProduct.discountPrice.mockReturnValue(200);
  })
});
