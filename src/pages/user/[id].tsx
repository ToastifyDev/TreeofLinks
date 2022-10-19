import Loading from "@/components/Loading";
import { trpc } from "@/utils/trpc";
import moment from "moment";
import { useRouter } from "next/router";
import {
  BsFillPersonFill,
  BsGenderAmbiguous,
  BsQuestionLg,
} from "react-icons/bs";
import { FaBirthdayCake, FaBriefcase } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import Nav from "../../components/Nav";

export default function UserPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = trpc.useQuery(["user", id as string]);

  if (isLoading) return <Loading />;

  if (!data) return;

  const birthdate = new Date(data?.birthdate as string);

  return (
    <>
      <Nav />
      <div className="mt-3 ml-3">
        <div className="flex flex-row items-center">
          <img src={data?.image} className="rounded-full" />
          <div>
            <h1 className="font-bold text-6xl ml-3">
              {data?.display_name || data?.name}
            </h1>
            <h2 className="font-light text-lg ml-3">
              {data?.name + "#" + data?.discriminator}
            </h2>
          </div>
        </div>
      </div>
      <div className="bg-[#E3E5E8] dark:bg-[#23272a] mt-5 mx-3 p-3 rounded-md">
        <h1 className="opacity-50 text-2xl font-bold">
          <BsFillPersonFill className="inline mb-1" /> About me
        </h1>
        <p className="mt-1">
          {data?.bio || "This user doesn't have a bio yet. Maybe they're shy?"}
        </p>
      </div>
      <div className="mx-3 grid grid-cols-3 gap-6">
        <div className="bg-[#E3E5E8] dark:bg-[#23272a] mt-5 p-3 rounded-md">
          <h1 className="opacity-50 text-2xl font-bold">
            <MdLocationOn className="inline mb-1" /> Location
          </h1>
          <p className="mt-1">{data?.location || "Unknown"}</p>
        </div>
        <div className="bg-[#E3E5E8] dark:bg-[#23272a] mt-5 p-3 rounded-md">
          <h1 className="opacity-50 text-2xl font-bold">
            <FaBirthdayCake className="inline mb-1" /> Birthdate
          </h1>
          <p className="mt-1">
            {data?.birthdate
              ? moment(
                  `${birthdate.getFullYear()}-${String(
                    birthdate.getMonth() + 1
                  ).padStart(2, "0")}-${String(birthdate.getDate()).padStart(
                    2,
                    "0"
                  )}`
                ).format("MMMM Do, YYYY")
              : "Unknown"}
          </p>
        </div>
        <div className="bg-[#E3E5E8] dark:bg-[#23272a] mt-5 p-3 rounded-md">
          <h1 className="opacity-50 text-2xl font-bold">
            <FaBriefcase className="inline mb-1" /> Occupation
          </h1>
          <p className="mt-1">{data?.occupation || "Unknown"}</p>
        </div>
      </div>
      <div className="mx-3 grid grid-cols-2 gap-6">
        <div className="bg-[#E3E5E8] dark:bg-[#23272a] mt-5 p-3 rounded-md">
          <h1 className="opacity-50 text-2xl font-bold">
            <BsGenderAmbiguous className="inline mb-1" /> Gender
          </h1>
          <p className="mt-1">{data?.gender || "Unknown"}</p>
        </div>
        <div className="bg-[#E3E5E8] dark:bg-[#23272a] mt-5 p-3 rounded-md">
          <h1 className="opacity-50 text-2xl font-bold">
            <BsQuestionLg className="inline mb-1" /> Pronouns
          </h1>
          <p className="mt-1">{data?.pronouns || "Unknown"}</p>
        </div>
      </div>
    </>
  );
}
