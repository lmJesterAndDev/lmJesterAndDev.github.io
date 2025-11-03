export type User = {
  username: string;
  password: string;
  role: "user" | "owner";
};

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  owner: string; // username
};

export const users: User[] = [
  { username: "maks", password: "1234", role: "owner" },
  { username: "anna", password: "pass1", role: "user" },
  { username: "ivan", password: "pass2", role: "user" },
];

export let todos: Todo[] = [
  { id: "1", title: "Сделать сайт", completed: false, owner: "maks" },
  { id: "2", title: "Написать статью", completed: true, owner: "anna" },
];
