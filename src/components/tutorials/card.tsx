import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import * as Card from "../ui/card";

export type TutorialCardProps = {
  title: string;
  description: string;
  imageURL: string | { light: string; dark: string };
  easterEggImageURL?: string;
  technologies?: string[];
  framework?: string[];
  interactive?: boolean;
};

interface Props extends TutorialCardProps {}
export function TutorialCard({
  title,
  description,
  technologies,
  framework,
  imageURL,
  interactive = false,
  easterEggImageURL,
}: Props) {
  let easterEgg = false;
  const randomNumber = Math.floor(Math.random() * 10000);
  if (randomNumber === 122 && easterEggImageURL) {
    easterEgg = true;
  }
  return (
    <Card.Card>
      <Card.CardHeader>
        <div className='flex flex-row justify-between items-center'>
          <Card.CardTitle className='text-2xl font-bold'>
            {title}
          </Card.CardTitle>
          {((technologies && technologies.length > 0) ||
            (framework && framework.length > 0) ||
            interactive) && (
            <div className='flex flex-row gap-2'>
              {technologies &&
                technologies.map((tech, index) => (
                  <Badge key={index} variant='outline'>
                    {tech}
                  </Badge>
                ))}
              {framework &&
                framework.map((tech, index) => (
                  <Badge key={index} variant='outline'>
                    {tech}
                  </Badge>
                ))}
              {interactive && <Badge variant='destructive'>Interactive</Badge>}
            </div>
          )}
        </div>
        <Card.CardDescription>{description}</Card.CardDescription>
      </Card.CardHeader>
      <Card.CardContent>
        {easterEgg ? (
          <img src={easterEggImageURL} alt={title} className='w-auto h-full object-cover' />
        ) : typeof imageURL === "string" ? (
          <img
            src={imageURL}
            alt={title}
            className='w-auto h-full object-cover'
            loading="lazy"
          />
        ) : (
          <>
            <img
              src={imageURL.light}
              alt={title}
              className='w-auto h-auto object-cover dark:hidden'
            loading="lazy"
            />
            <img
              src={imageURL.dark}
              alt={title}
              className='w-auto h-auto object-cover hidden dark:block'
            loading="lazy"
            />
          </>
        )}
      </Card.CardContent>
      <Card.CardFooter>
        <Button variant='outline' asChild>
          <a href={`/tutorials/${title.toLowerCase().replaceAll(" ", "-")}`}>
            Check it out
          </a>
        </Button>
      </Card.CardFooter>
    </Card.Card>
  );
}
