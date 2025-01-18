import { api, HydrateClient } from "~/trpc/server";
import { Metadata } from "next";
import { db } from "~/server/db";
import { UserList } from "./_components/userList";

//  metadata只能在服务端组件导出，无法在客户端组件导出
export const generateMetadata = (): Metadata => {
  return { title: "首页" };
};

// 添加此行禁用静态生成
export const dynamic = "force-dynamic";

export default async function Home() {
  const users = await api.user.getUsers();

  // const users = await db.query.users.findMany();

  // console.log(users);

  return (
    <main className="">
      <div>
        <div>服务端渲染</div>

        <div>
          {users.map((user) => (
            <div key={user.id}>{user.name}</div>
          ))}
        </div>

        <div>客户端渲染</div>

        <UserList />
      </div>
    </main>
  );
}
