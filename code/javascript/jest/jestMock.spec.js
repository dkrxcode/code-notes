// $ npm test -- jestMocks

// Todo:
// * allow and expect mocks

//================================================
// Mocking in Jest
//================================================

import User from "./user" // If it is a class that is exported
import * as helpers from "./helpers" // If it is exported functions

describe('Mock', () => {
  it('basic mock', () => {
    const myMock = jest.fn();

    myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

    expect(myMock()).toEqual(10);
    expect(myMock()).toEqual('x');
    expect(myMock()).toEqual(true);
  })

  it('promise', async () => {
    const promise = jest.fn().mockResolvedValue({data: 1});
    const result = await promise();
    expect(result.data).toEqual(1);
  })

  it('mock class', () => {
    jest.spy(User, "email").mockReturnValue('fake@example.com');
    const email = User(1, 'Alice', 'alice@internet.com').email;
    expect(email).toEqual('fake@example.com');
  })
})

// Must be imported:
// import axios from 'axios';
jest.mock('axios');

test('should fetch users', () => {
  const resp = {data: [{name: 'Bob'}]};
  axios.get.mockResolvedValue(resp);
  axios.get().then(resp => expect(resp).toEqual(resp));
});

// Mock an interface with jest-mock-extended
const mockedAnvilClient = mock<AnvilClientInterface>();

// Mocking a constructor
import Anvil from '@anvilco/anvil';
import { mock } from 'jest-mock-extended';
import { AnvilClientInterface } from '../../../../lib/anvilPdfClient';

jest.mock('@anvilco/anvil', () => jest.fn());
const mockedAnvilClient = mock<AnvilClientInterface>();
Anvil.mockImplementation(() => mockedAnvilClient);
mockedAnvilClient.fillPDF.mockResolvedValue({ statusCode: 200, data: [] });
