import { LatestPost } from "~/app/_components/post";
import { UploadButton } from "~/components/common/uploader";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { unstable_noStore as noStore } from "next/cache";

export default async function Home() {
  noStore();
  return (
    <main className="">
      <div>
        <UploadButton endpoint="imageUploader" />
        <div>你好</div>
      </div>
    </main>
  );
}
