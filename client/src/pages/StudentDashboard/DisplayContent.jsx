import { Button } from "flowbite-react";

export default function DisplayContent() {
  return (
    <div className="w-full min-h-screen border px-2 py-4">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/2h9CqRlHzrc?si=TcFMUXeu8HjH0dwR"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <div className="">
        article placed here
      </div>
      <div className="">
        quiz
      </div>
      <div className="flex justify-between w-full ">
        <Button color="green">Previous</Button>
        <Button color="blue">Next</Button>
      </div>
    </div>
  );
}
