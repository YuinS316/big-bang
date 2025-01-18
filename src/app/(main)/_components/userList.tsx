"use client";

import { clientApi } from "~/trpc/react";

export function UserList() {
  const [users, { refetch, isLoading }] =
    clientApi.user.getUsers.useSuspenseQuery();

  return (
    <>
      <div>
        <button onClick={() => refetch()}>刷新</button>
      </div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {users.map((user) => (
              <div key={user.id}>{user.name}</div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
