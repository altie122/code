import { Button } from "../ui/button"

export function TutorialButton() {
  return (
    <Button variant={"outline"} asChild>
      <a href="/tutorials" className="prose-a-remove-style">
        <span aria-label="Tutorials">Tutorials</span>
      </a>
    </Button>
  )
}