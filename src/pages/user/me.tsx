import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { GetServerSideProps } from "next";
import Nav from "@/components/Nav";
import Document from "@/components/Document";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (!session)
    return {
      props: {},
    };
  else
    return {
      redirect: {
        destination: `/user/${session?.user.id}`,
        permanent: false,
      },
    };
};

export default function MePage() {
  return (
    <>
      <Document />
      <Nav />
      <div className="text-center mt-5">
        <h1 className="font-light text-2xl">
          You have to be logged in order to use this page.
        </h1>
      </div>
    </>
  );
}
