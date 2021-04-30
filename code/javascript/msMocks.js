import { OrderForm } from '../../../../../entity/OrderForm';
import * as billingService from '../../../../../lib/billingService';
import { mocked } from 'ts-jest/utils';
import * as postmarkService from '../../../../../util/postmark';
import * as Log from '../../../../../util/logging';

jest.mock('../../../../../util/postmark');
jest.mock('../../../../../util/logging');
jest.mock('../../../../../lib/billingService');

const mockBillingService = mocked(billingService);
const mockedPostmarkService = mocked(postmarkService);
const mockedLoggingService = mocked(Log);

beforeEach(() => {
  jest.resetAllMocks();
  MockDate.set(nowDate);
  mockOrderFormRepo.save.mockImplementation((order) =>
    Promise.resolve(order as OrderForm)
);
  mockOrderFormRepo.findOne.mockResolvedValue(undefined);
});

mockCompanyRepo.findOne.mockResolvedValue(company);

expect(mockCompanyRepo.findOne).toHaveBeenCalledWith(companyId)

expect(order).toEqual<OrderForm>(
  expect.objectContaining({
    estimatedTotalCreditCents: 250000_00,
  })


const fillInOrder = (overrides: Partial<OrderForm> = {}) => ({
    companyId,
    programId,
    ...overrides,
});

//////////////////////////
// Mock a library
/////////////////////////////
import { Company } from '../entity/Company';
import { mock } from 'jest-mock-extended';
import { Repository, Connection } from 'typeorm';

export const mockCompanyRepo = mock<Repository<Company>>();

export const mockGetConnection = () => {
  return {
    manager: {
      getRepository: (type: any) => {
        switch (type) {
          case Company:
            return mockCompanyRepo;
          default:
            const error = `You need to add a mock repo for "${type}" to ${__filename}`;
            console.error(error);
            throw Error(error);
        }
      },
    },
  };
};

export const mockConnection = mock<Connection>();
export const mockCreateConnection = jest.fn(() =>
  Promise.resolve(mockConnection)
);

///////////////////////////
// __mocks__/typeorm.ts
//////////////////////////

import {
  mockGetConnection,
  mockCreateConnection,
} from '../src/__tests__/mockedRepositories';

const typeorm = jest.genMockFromModule('typeorm') as any;

typeorm.Column = () => jest.fn();
typeorm.Entity = () => jest.fn();
typeorm.PrimaryGeneratedColumn = () => jest.fn();
typeorm.ManyToOne = () => jest.fn();
typeorm.JoinColumn = () => jest.fn();
typeorm.OneToMany = () => jest.fn();
typeorm.OneToOne = () => jest.fn();
typeorm.getConnection = mockGetConnection;
typeorm.createConnection = mockCreateConnection;

module.exports = typeorm;
