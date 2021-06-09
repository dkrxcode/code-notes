// $ npm test -- jestMocks

// Todo:
// * allow and expect mocks
// * expect(mock.foo).toHaveBeenCalledWith(23);

//================================================
// Mocking in Jest
//================================================

import User from "./user" // If it is a class that is exported
import * as helpers from "./helpers" // If it is exported functions

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
    jest.spy(User, "email").mockReturnValue('fake@example.com');
    const email = User(1, 'Alice', 'alice@internet.com').email;
    expect(email).toEqual('fake@example.com');
  })
});

// Must be imported:
import axios from 'axios';
jest.mock('axios');

test('should fetch users', () => {
  const resp = {data: [{name: 'Bob'}]};
  axios.get.mockResolvedValue(resp);
  axios.get('http://example.com').then(resp => expect(resp).toEqual(resp));
});



