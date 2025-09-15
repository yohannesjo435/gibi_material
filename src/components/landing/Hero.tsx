import { Button } from "../ui/button";
import Image from "next/image";

function Hero() {
  return (
    <section className="w-[90%] mt-6 m-auto flex gap-20 flex-col-reverse items-center justify-center md:flex-row">
      <div className="flex flex-col flex-1 gap-6">
        <h1 className="text-5xl">Get All Your University Materials Here.</h1>
        <p>
          Download university notes, past papers, and study guides—all in one
          place. Fast, free, and built for students.
        </p>
        <div className="flex gap-2">
          <Button variant="outline">Browse Course</Button>
          <Button variant="outline">Read</Button>
        </div>
      </div>

      <div className="flex flex-1 justify-end">
        <Image src={"/hero.png"} alt="hero" width={500} height={500} />
      </div>
    </section>
  );
}

export default Hero;
