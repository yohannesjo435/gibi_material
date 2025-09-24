import CourseSection from "@/components/CourseSection";
import Hero from "@/components/landing/Hero";

const page = () => {
  return (
    <div className="grid gap-32 mb-10 max-w-[1500px] m-auto">
      <Hero />
      <CourseSection />
    </div>
  );
};

export default page;
