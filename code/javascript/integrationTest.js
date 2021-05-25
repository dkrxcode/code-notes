// For anyone working on Billing next week, I created a "integration" test (in the snippet above ^) that ensures the services work with the database connected.
// It saved me from a lot of manual testing and I found it very helpful for refactoring migrations and ensuring the order flow worked at least from the backend services to the db perspective.
// It uses a hardcoded company and program (creates them if they don't exist) and I'm pretty sure this wont run on CI so don't check it in.
// To prevent myself form accidentally checking it in, I added a global ~/.gitignore_global in my home directory with the pattern *_ignore.* . Then you have to tell git to use it
// git config --global core.excludesfile ~/.gitignore_global
// orderAcceptFlowIntegration_ignore.test.ts

import { createConnection, Connection } from 'typeorm';
import { ConnectionName } from '../../lib/connection';
import {
  GetOrderRepo,
  GetUserRepo,
  GetProductRepo,
  GetBillingRepo,
} from '../../lib/repositories';
import {
  FillInEmptyOrder,
  FillInEmptyProduct,
  FillInEmptyUser,
} from '../serviceHelpers';
import {
  ProductNameEnum,
  ProductStageEnum,
  BusinessTypesEnum,
  BillingScheduleTypeEnum,
} from '../../serverConstants';
import { GetOrder, AcceptOrder } from '../../lib/order/orderService';
import { Order } from '../../entity/Order';
import { BillingSchedule } from '../../entity/BillingSchedule';

jest.unmock('typeorm');

describe('order flow', () => {
  function start() {
    return createConnection(ConnectionName()).then((connection: Connection) => {
      return connection;
    });
  }

  beforeAll(async () => await start());

  async function setup() {
    const companyName = '__INTEGRATION_TEST__';

    let program;
    let company = await GetUserRepo().findOne({
      where: { name: companyName },
      relations: ['programs'],
    });
    if (!company) {
      program = FillInEmptyProduct();
      company = FillInEmptyUser({
        name: companyName,
        programs: [program],
      });
    }
    company.business_type = BusinessTypesEnum.S_CORP;
    company.fiscal_year_end_date = 'April';
    company = await GetUserRepo().save(company);
    program = company.programs![0];
    if (!program) {
      program = FillInEmptyProduct({ company_id: company.id });
    }
    program.name = ProductNameEnum.FED_RD_TAX;
    program.stage = ProductStageEnum.QUALIFYING;
    program.tax_year = 2020;
    program = await GetProductRepo().save(program);

    (
      await GetOrderRepo().find({ where: { programId: program.id } })
    ).map((order: Partial<Order>) => GetOrderRepo().delete(order));

    (
      await GetBillingRepo().find({
        where: { company_id: company.id, program_id: program.id },
      })
    ).map((schedule: Partial<BillingSchedule>) =>
      GetBillingRepo().delete(schedule)
    );
    console.log({ companyId: company.id, programId: program.id });
    return { company, program };
  }

  test('saves and loads order', async () => {
    const { company, program } = await setup();

    const order = FillInEmptyOrder({
      companyId: company.id,
      programId: program.id,
    });
    const savedOrder = await GetOrderRepo().save(order);

    const foundOrder1 = await GetOrderRepo().findOne(savedOrder.id);
    expect(foundOrder1).not.toBeUndefined();
  });

  test('calculates and saves order, approves, and creates billing schedules', async () => {
    const { company, program } = await setup();

    // === Comment out setup() to hardcode a company/program to test with ===
    // const companyId = 608;
    // const programId = 1161;
    // const company: Company = Get(await GetUserRepo().findOne(companyId));
    // const program: Program = Get(await GetProductRepo().findOne(programId));

    // Calculate and save order
    const getResult = await GetOrder(company.id, program.id);
    expect(getResult.error).toBeUndefined();
    expect(getResult.order).not.toBeUndefined();
    console.log({ order: getResult.order });

    const foundOrder1 = await GetOrderRepo().findOne({
      where: { programId: program.id },
    });
    expect(foundOrder1).not.toBeUndefined();

    // Accept Order
    const result = await AcceptOrder(company.id, program.id).catch((error) => {
      console.error(error);
    });
    expect(result).toBeUndefined();

    const foundOrder2 = await GetOrderRepo().findOne({
      where: { programId: program.id },
    });
    expect(foundOrder2!.acceptedAt).not.toBeUndefined();

    const schedules = await GetBillingRepo().find({
      where: { company_id: company.id, program_id: program.id },
    });

    // Creates Billing Schedules
    expect(schedules.length).toEqual(3);
    expect(
      schedules.find((s) => s.type === BillingScheduleTypeEnum.BILLING)
    ).not.toBeUndefined();
    expect(
      schedules.find((s) => s.type === BillingScheduleTypeEnum.FUNDING)
    ).not.toBeUndefined();
    expect(
      schedules.find((s) => s.type === BillingScheduleTypeEnum.PAYBACK)
    ).not.toBeUndefined();
  });
});
