import MockDate from 'mockdate';

// https://github.com/HugoDF/jest-mock-date-examples
// new Date()
// Date.now()

describe('with MockDate', () => {
  beforeAll(() => {
    MockDate.set(new Date('2019-05-14T11:01:58.135Z'));
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('mocks new date', () => {
    const date = new Date();
    expect(date).toEqual(new Date('2019-05-14T11:01:58.135Z'));
  });

  it('mocks now', () => {
    const now = Date.now();
    expect(now).toEqual(new Date('2019-05-14T11:01:58.135Z'));
  });
});


///////////////////////////
// https://codewithhugo.com/mocking-the-current-date-in-jest-tests/

describe('date', () => {
  it('mocks new date', () => {
    jest
      .spyOn(global, 'Date')
      .mockImplementationOnce(() => new Date('2019-05-14T11:01:58.135Z'));
    const date = new Date();
    expect(date).toEqual(new Date('2019-05-14T11:01:58.135Z'));
  });

  it('mocks now', () => {
    jest
      .spyOn(global, 'Date')
      .mockImplementationOnce(() => new Date('2019-05-14T11:01:58.135Z'));
    const now = Date.now();
    expect(now).toEqual(new Date('2019-05-14T11:01:58.135Z'));
  });
});
