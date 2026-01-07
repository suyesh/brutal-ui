import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function FieldDemo() {
  return (
    <div className="w-full max-w-[360px]">
      <Field>
        <FieldLabel>Email</FieldLabel>
        <FieldContent>
          <Input placeholder="you@example.com" type="email" />
          <FieldDescription>We will only use this for updates.</FieldDescription>
        </FieldContent>
      </Field>
    </div>
  )
}
