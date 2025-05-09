import { Button } from "../ui/button"

export function TutorialButton() {
  return (
    <Button variant={"outline"} asChild>
      <a href="/tutorials">
        <span aria-label="Tutorials">Tutorials</span>
      </a>
    </Button>
  )
}