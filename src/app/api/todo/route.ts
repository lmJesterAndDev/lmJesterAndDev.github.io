import { NextResponse } from 'next/server';

interface Todo {
  id: number;
  title: string;
  owner: string;
  completed: boolean;
}

let todos: Todo[] = [
  { id: 1, title: 'Пример задачи для админа', owner: 'admin', completed: false },
  { id: 2, title: 'Пример задачи для игрока', owner: 'player', completed: false },
];

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  try {
    const { title, owner } = await req.json();
    if (!title || !owner) {
      return NextResponse.json({ error: 'Missing title or owner' }, { status: 400 });
    }

    const newTodo: Todo = { id: Date.now(), title, owner, completed: false };
    todos.push(newTodo);

    return NextResponse.json(newTodo);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, completed } = await req.json();
    const todo = todos.find(t => t.id === id);
    if (!todo) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    todo.completed = completed;
    return NextResponse.json(todo);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
