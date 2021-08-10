interface IUser {
  id: string;
  name: string;
  email: string;
}

function User(id, name, email): IUser {
    return {
        id,
        name,
        email,
    }
}

export default User;
