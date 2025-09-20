"use client";
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
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "./ToggleTheme";

const courseList = [
  {
    title: "Bio Tech",
    href: "/course",
  },
  {
    title: "Chemitry",
    href: "/course",
  },
  {
    title: "Physics",
    href: "/course",
  },
  {
    title: "IS",
    href: "/course",
  },
  {
    title: "computer science",
    href: "/course",
  },
  {
    title: "Medicine",
    href: "/course",
  },
];
const blogList = [
  {
    title: "University Guide",
    href: "/course",
    topic: "navigate your new world: the ultimate University Starter Guide",
  },
  {
    title: "Departemnt Guide",
    href: "/course",
    topic: "Choosing Your Path: A Deep Dive into University Department",
  },
  {
    title: "Campus Life",
    href: "/course",
    topic: "Dorms, Clubs and cafteraias: What Campus life really Feels Like",
  },
  {
    title: "University love life",
    href: "/course",
    topic: "Romance in Lecture Halls: the UnWritten Rules of Campus Dating",
  },
  {
    title: "Beyond Campus",
    href: "/course",
    topic: "Beyound the Gates: hoe University Life Shapes Your World Outside",
  },
  {
    title: "Rate Your Univerity",
    href: "/course",
    topic: "You voice Matters: share Your Expreience and Rate Your University",
  },
];

function Header() {
  return (
    <header className="relative w-full flex flex-col md:flex-row justify-around outline-1 items-center h-32 py-3 md:h-20">
      <SidebarTrigger className="top-1/2 left-5 -translate-1/2 absolute" />
      <div>GibiMaterial</div>

      <NavigationMenu>
        <NavigationMenuList>
          {/* first */}
          <NavigationMenuItem className="">
            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-[150px] md:w-52">
                <NavigationMenuLink>About us</NavigationMenuLink>
                <NavigationMenuLink>Contact us</NavigationMenuLink>
                <NavigationMenuLink>Faq</NavigationMenuLink>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* second */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid md:grid-cols-2 grid-rows-3 w-[150px] md:w-[500px] lg:w-[600px] gap-2">
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
              <ul className="grid grid-cols-2 grid-rows-3 w-[250px] md:w-[500px] lg:w-[600px] gap-2">
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

          {/* Fourth */}
          <NavigationMenuItem className="hidden md:flex">
            <NavigationMenuLink asChild>
              <Link href="/" className="font-semibold">
                Faculity Dashboard
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Fifth */}
          <NavigationMenuItem className="hidden md:flex">
            <NavigationMenuLink asChild>
              <Link href="/" className="font-semibold">
                Dashboard
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex gap-2">
        <Button variant="outline">Login</Button>
        <Button variant="outline">Sign Up</Button>
        <ModeToggle />
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
