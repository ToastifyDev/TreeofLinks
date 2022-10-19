import Loading from "@/components/Loading";
import Nav from "@/components/Nav";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import components from "@/styles/components.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useState } from "react";
import debounce from "lodash/debounce";
import Link from "next/link";

export default function Settings() {
  const { data: session } = useSession();

  const { data, isLoading } = trpc.useQuery(["user", session?.user.id]);
  const mutation = trpc.useMutation(["user"]);
  const [slug, setSlug] = useState("");
  const { data: taken, refetch } = trpc.useQuery(
    ["checkSlug", { id: session?.user.id, slug }],
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  let url;
  if (typeof window !== "undefined") {
    url = window.location.origin;
  }

  if (isLoading) return <Loading />;

  async function onSubmit(e: any) {
    e.preventDefault();

    if (e.target[1].value) {
      mutation.mutate({
        id: session?.user.id as string,
        display_name: e.target[1].value,
      });
    } else {
      mutation.mutate({
        id: session?.user.id as string,
        display_name: null,
      });
    }

    if (e.target[0].value) {
      mutation.mutate({
        id: session?.user.id as string,
        slug: e.target[0].value,
      });
    } else {
      mutation.mutate({
        id: session?.user.id as string,
        slug: null,
      });
    }

    if (e.target[2].value) {
      mutation.mutate({
        id: session?.user.id as string,
        bio: e.target[2].value,
      });
    } else {
      mutation.mutate({
        id: session?.user.id as string,
        bio: null,
      });
    }

    if (e.target[3].value) {
      mutation.mutate({
        id: session?.user.id as string,
        location: e.target[3].value,
      });
    } else {
      mutation.mutate({
        id: session?.user.id as string,
        location: null,
      });
    }

    if (e.target[4].value) {
      mutation.mutate({
        id: session?.user.id as string,
        birthdate: new Date(e.target[4].value).toString(),
      });
    } else {
      mutation.mutate({
        id: session?.user.id as string,
        birthdate: null,
      });
    }

    if (e.target[5].value) {
      mutation.mutate({
        id: session?.user.id as string,
        occupation: e.target[5].value,
      });
    } else {
      mutation.mutate({
        id: session?.user.id as string,
        occupation: null,
      });
    }

    if (e.target[6].value) {
      mutation.mutate({
        id: session?.user.id as string,
        gender: e.target[6].value,
      });
    }

    if (e.target[7].value) {
      mutation.mutate({
        id: session?.user.id as string,
        pronouns: e.target[7].value,
      });
    } else {
      mutation.mutate({
        id: session?.user.id as string,
        pronouns: null,
      });
    }

    alert("Changes saved successfully!");
  }

  const birthdate = new Date(data?.birthdate as string);

  return (
    <>
      <Nav />
      {session ? (
        <>
          <div className="mt-8 flex flex-col items-center w-screen">
            <form onSubmit={onSubmit} className="w-80 md:w-[34rem]">
              <div className="grid grid-cols-2 gap-6 mb-1">
                <label className="block">
                  <span>GitHub</span>
                  <input
                    type="text"
                    className="mt-1 block w-full text-black focus:ring-green-500 focus:border-green-500"
                    defaultValue={data?.socials?.github || ""}
                  />
                </label>
              </div>
              <br />
              <button
                type="submit"
                className={components.button + ` mb-8`}
                disabled={taken}
              >
                Save
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="text-center mt-5">
          <h1 className="font-light text-2xl">
            You have to be logged in order to use this page.
          </h1>
        </div>
      )}
    </>
  );
}
