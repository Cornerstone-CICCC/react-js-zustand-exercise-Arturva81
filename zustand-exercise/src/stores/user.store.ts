import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  firstname: string;
  lastname: string;
  age: number;
  hobbies: string[];
}

interface UserStore {
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  deleteUser: (id: string) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      users: [],
      addUser: (user) =>
        set((state) => ({
          users: [...state.users, { ...user, id: uuidv4() }],
        })),
      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((u) => u.id !== id),
        })),
    }),
    { name: 'user-storage' }
  )
);
