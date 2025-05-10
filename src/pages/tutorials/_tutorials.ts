import type { TutorialCardProps } from "@/components/tutorials/card";

type TutorialListType = {
  title: string;
  description: string;
  technologies: string[];
  tutorials: TutorialCardProps[];
};

export const tutorials: TutorialListType[] = [
  {
    title: "Vanilla Web Development",
    description: "Making a website from nothing to a full hosted website",
    technologies: ["html", "css", "javascript"],
    tutorials: [
      {
        title: "Git",
        description: "Using Git™ and Github to manage your code",
        imageURL: {
          light: "/brand-icons/Git-Icon-Black.png",
          dark: "/brand-icons/Git-Icon-White.png",
        },
        easterEggImageURL: "/brand-icons/Git-Icon-1788C.png",
        technologies: ["git", "github"],
      },
      {
        title: "HTML",
        description: "The standard markup language for the web",
        imageURL: {
          light: "/brand-icons/HTML5_1Color_Black.png",
          dark: "/brand-icons/HTML5_1Color_White.png",
        },
        easterEggImageURL: "/brand-icons/HTML5_Logo_512.png",
        technologies: ["html"],
        interactive: true,
      },
      {
        title: "CSS",
        description: "The standard way to style web pages",
        imageURL: {
          light: "/brand-icons/css-dark.png",
          dark: "/brand-icons/css-light.png",
        },
        easterEggImageURL: "/brand-icons/css-primary.png",
        technologies: ["css"],
        interactive: true,
      },
      {
        title: "JavaScript",
        description: "The standard scripting language for the web.",
        imageURL: {
          light: "/brand-icons/js_dark.png",
          dark: "/brand-icons/js_light.png",
        },
        easterEggImageURL: "/brand-icons/js.png",
        technologies: ["javascript"],
      },
    ],
  },
];
