import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const courseList = [
  {
    title: "Bio Tech",
    href: "/",
  },
  {
    title: "Chemitry",
    href: "/",
  },
  {
    title: "Physics",
    href: "/",
  },
  {
    title: "IS",
    href: "/",
  },
  {
    title: "computer science",
    href: "/",
  },
  {
    title: "Medicine",
    href: "/",
  },
];
const blogList = [
  {
    title: "University Guide",
    href: "/",
    topic: "navigate your new world: the ultimate University Starter Guide",
  },
  {
    title: "Departemnt Guide",
    href: "/",
    topic: "Choosing Your Path: A Deep Dive into University Department",
  },
  {
    title: "Campus Life",
    href: "/",
    topic: "Dorms, Clubs and cafteraias: What Campus life really Feels Like",
  },
  {
    title: "University love life",
    href: "/",
    topic: "Romance in Lecture Halls: the UnWritten Rules of Campus Dating",
  },
  {
    title: "Beyond Campus",
    href: "/",
    topic: "Beyound the Gates: hoe University Life Shapes Your World Outside",
  },
  {
    title: "Rate Your Univerity",
    href: "/",
    topic: "You voice Matters: share Your Expreience and Rate Your University",
  },
];

function Header() {
  return (
    <header className="flex justify-around outline-1 items-center h-20">
      <div>GibiMaterial</div>

      <NavigationMenu>
        <NavigationMenuList>
          {/* first */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-52">
                <NavigationMenuLink>About us</NavigationMenuLink>
                <NavigationMenuLink>Contact us</NavigationMenuLink>
                <NavigationMenuLink>Faq</NavigationMenuLink>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* second */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Course</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid md:grid-cols-2 grid-rows-3 w-[400px] md:w-[500px] lg:w-[600px] gap-2">
                {courseList.map(({ title, href }) => (
                  <CourseList key={title} title={title} href={href} />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Third */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Blog</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid md:grid-cols-2 grid-rows-3 w-[400px] md:w-[500px] lg:w-[600px] gap-2">
                {blogList.map(({ title, href, topic }) => (
                  <BlogList
                    key={title}
                    title={title}
                    href={href}
                    topic={topic}
                  />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/" className="font-semibold">
                Faculity Dashboard
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/" className="font-semibold">
                Dashboard
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div>
        <Button variant="outline">Login</Button>
        <Button variant="outline">Sign Up</Button>
      </div>
    </header>
  );
}

export default Header;

function CourseList({ title, href }: { title: string; href: string }) {
  return (
    <li key={title}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
function BlogList({
  title,
  href,
  topic,
}: {
  title: string;
  href: string;
  topic: string;
}) {
  return (
    <li key={title}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {topic}
          </p>{" "}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
