import { Card } from "flowbite-react";

export default function MyCourse() {
  return (
    <div className="flex flex-col space-y-2 font-montserrat">
      <h1 className="font-semibold text-2xl mb-4">My course</h1>
      <Course />
      <Course />
      <Course />
      <Course />
    </div>
  );
}

function Course() {
  return (
    <div className="mb-16">
      <Card className=" w-full md:w-2/3 lg:w-1/2 px-4 py-2">
        <div className="flex      flex-col">
          <h1>Course name placed here</h1>
          <p>progress persentage</p>
          <div className="flex items-center justify-between">
            <p className="font-bold">staus</p>
            <button className=" font-montserrat font-bold border hover:text-white hover:bg-yellow-500 text-yellow-500 px-3 py-2 border-yellow-300 transition-all duration-200">
              Resume
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
