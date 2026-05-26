import { useState } from 'react';
import { useUserStore } from './stores/user.store';

const HOBBIES = ['Reading', 'Gaming', 'Cooking', 'Hiking', 'Traveling', 'Music', 'Sports'];

function User() {
  const users = useUserStore((state) => state.users);
  const addUser = useUserStore((state) => state.addUser);
  const deleteUser = useUserStore((state) => state.deleteUser);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);

  const handleHobbyChange = (hobby: string) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobby) ? prev.filter((h) => h !== hobby) : [...prev, hobby]
    );
  };

  const handleAddUser = () => {
    if (!firstname || !lastname || !age) return;
    addUser({ firstname, lastname, age: Number(age), hobbies: selectedHobbies });
    setFirstname('');
    setLastname('');
    setAge('');
    setSelectedHobbies([]);
  };

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstname} {user.lastname}, Age: {user.age}
            {user.hobbies.length > 0 && <span> | Hobbies: {user.hobbies.join(', ')}</span>}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
        <input
          type="text"
          placeholder="Firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <div>
          {HOBBIES.map((hobby) => (
            <label key={hobby}>
              <input
                type="checkbox"
                checked={selectedHobbies.includes(hobby)}
                onChange={() => handleHobbyChange(hobby)}
              />
              {hobby}
            </label>
          ))}
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default User;
