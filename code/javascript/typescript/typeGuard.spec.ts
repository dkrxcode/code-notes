// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
// https://kentcdodds.com/blog/typescript-function-syntaxes
// https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullablet

describe("Type Guards", () => {

  it('type narrowing of list', () => {
    function notNullish<T>(
      value: T,
    ): value is Exclude<T, undefined | null> {
      return value !== undefined && value !== null;
    }

    type BaseAnimal = { type: string };
    type Fish = BaseAnimal & { type: 'fish', swim: () => void };
    type Bird = BaseAnimal & { type: 'bird',  fly: () => void };
    type Human = BaseAnimal & { type: 'human', swim?: () => void, fly?: () => void };
    type Animal = Fish | Bird | Human

    function move(animal: Animal) {
      if (animal.type === 'fish') {
        return animal.swim();
      }
      return animal.fly();
    }

    const arrayWithFalsyValues: Array<number | undefined | null> = [1, undefined, 0, 2, null];

    // Doesn't work, still Array<number | undefined>
    const arrayWithoutFalsyValues1 = arrayWithFalsyValues.filter(Boolean);

    const arrayWithoutFalsyValues2: Array<number> = arrayWithFalsyValues.filter(notNullish);

    expect(arrayWithoutFalsyValues2).toEqual([1, 0, 2]);
  });
});

describe("Assert Functions", () => {
  it("asdf", () => {
    type NewUser = {
      name: string
      displayName: string | null
    }

    interface User extends NewUser {
      displayName: string
    }
    type UserWithDisplayName = NewUser & {displayName: string};

    function checkDisplayName(user: NewUser) {
      if (!user.displayName) throw new Error('Oh no, user has no displayName')
    }

    function assertDisplayName(
      user: NewUser,
    ): asserts user is User {
      if (user.displayName === undefined) throw new Error('Oh no, user has no displayName')
    }

    function isUser2(
      user: NewUser,
    ): user is User {
      return user.displayName !== undefined
    }

    function mapNewUserToUser(user: NewUser): User {
      // checkDisplayName(user); // TS Error: Not good enough
      // assertDisplayName(user); // Ok, will ensure user is type User
      if(isUser2(user)) { // Good
        return user;
      } else {
        return {...user, displayName: user.name }
      }
    }

    const user1 = { name: 'foo', displayName: 'bar'};
    const userWithDName = mapNewUserToUser(user1);
    expect(userWithDName.displayName.toUpperCase()).toEqual('BAR');

    const user2 = { name: 'alice', displayName: null };
    const userWithDName2 = mapNewUserToUser(user2);
    expect(userWithDName2.displayName.toUpperCase()).toEqual('alice');
  });
});
