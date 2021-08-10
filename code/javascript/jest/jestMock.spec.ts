// $ npm test -- jestMocks

// Todo:
// * allow and expect mocks
// * expect(mock.foo).toHaveBeenCalledWith(23);

//================================================
// Mocking in Jest
//================================================

import User from "./user" // If it is a class that is exported
import * as helpers from "./helpers" // If it is exported functions
import Product from './productClass';

describe('Mock', () => {
  it('basic mock', () => {
    const countMock = jest.fn()
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(2)
      .mockReturnValue(3);

    expect(countMock()).toEqual(1);
    expect(countMock()).toEqual(2);
    expect(countMock()).toEqual(3);
  });

  it('promise', async () => {
    const promise = jest.fn().mockResolvedValue({ data: 1 });
    const result = await promise();
    expect(result.data).toEqual(1);
  });

  it('mock class', () => {
    const product = new Product('foo', 100);
    jest.spyOn(product, 'discountPrice').mockReturnValue(50);
    const price = product.discountPrice(10);
    expect(price).toEqual(50);
  })
});

// Must be imported:
import axios, {AxiosStatic} from 'axios';
import {mocked} from "ts-jest/utils";
import { mock } from 'jest-mock-extended';
import * as productService from './productService';
import * as productRepo from './productRepo';

jest.mock('axios');
jest.mock('./productRepo');

test('should fetch users', () => {
  const axiosMock = mock<AxiosStatic>(); // Typesafe mock based off of interface
  const resp = {data: [{name: 'Bob'}]};
  axiosMock.get.mockResolvedValue(resp);
  axiosMock.get('http://example.com').then(resp => expect(resp).toEqual(resp));
});

test('typesafe mocking dependent', () => {
  const productRepoMock = mocked(productRepo); // Typesafe mock based off of functions
  productRepoMock.find.mockReturnValue(new Product('Fancy', 333));
  const result = productService.featuredProducts();
  expect(result).toBeDefined();
  expect(result!.name).toEqual('Fancy');
});

test('typesafe mocking bad', () => {
  // const productRepoMock = mock<typeof productRepo>();
  const productRepoMock = mock(productRepo);
  productRepoMock.find.mockReturnValue(new Product('Fancy', 333)); // Does not type check in intellij
  const result = productService.featuredProducts();
  expect(result).toBeDefined();
  expect(result!.name).toEqual('Fancy');
});



