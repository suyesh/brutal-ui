import { Bold, Italic, Underline } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"

export default function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button className="rounded-r-none" size="sm" variant="neutral">
        <Bold className="size-4" />
      </Button>
      <ButtonGroupSeparator />
      <Button className="rounded-none" size="sm" variant="neutral">
        <Italic className="size-4" />
      </Button>
      <ButtonGroupSeparator />
      <Button className="rounded-l-none" size="sm" variant="neutral">
        <Underline className="size-4" />
      </Button>
    </ButtonGroup>
  )
}
