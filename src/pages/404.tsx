import Nav from "@/components/Nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <div className="text-center mt-5">
        <h1 className="font-bold text-4xl">Whoops...</h1>
        <p>The page you were trying to visit does not exist.</p>
      </div>
    </>
  );
}
