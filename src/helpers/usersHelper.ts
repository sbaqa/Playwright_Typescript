import * as fs from 'fs';

type User = {
  username: string;
  password: string;
};

export function getUserCredentials(userKey: string): User {
  const file = fs.readFileSync('src/data/users.json', 'utf8');
  const data: Record<string, User> = JSON.parse(file);

  const user = data[userKey];

  if (!user) {
    throw new Error(`User "${userKey}" not found in users.json`);
  }

  return user;
}
