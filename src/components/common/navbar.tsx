import { Button } from "../ui/button";
import { ModeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <header>
      <nav
        className='w-full h-16 bg-secondary/90 backdrop-blur-lg top-0 sticky flex flex-row justify-between items-center p-2'
        aria-label='Main navigation bar'
      >
        <Button variant='ghost' asChild>
          <a href='/'>
            {/* Use a heading or span for the site name/logo */}
            <span
              className='prose-h2-nounderline font-bold'
              aria-label='Homepage'
            >
              &lt;Code122 /&gt;
            </span>
          </a>
        </Button>
        <ModeToggle />
      </nav>
    </header>
  );
}
