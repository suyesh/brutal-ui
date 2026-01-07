import { Mail } from "lucide-react"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  ItemDescription,
} from "@/components/ui/item"
import { Button } from "@/components/ui/button"

export default function ItemDemo() {
  return (
    <ItemGroup className="w-full max-w-[420px]">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <Mail />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Weekly newsletter</ItemTitle>
          <ItemDescription>Latest updates and product tips.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="neutral">
            View
          </Button>
        </ItemActions>
      </Item>
    </ItemGroup>
  )
}
