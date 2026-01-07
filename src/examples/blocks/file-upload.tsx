import FileUpload from "@/components/blocks/file-upload"

export default function FileUploadDemo() {
  return (
    <FileUpload
      // Update copy and accepted file types.
      title="Drag & drop upload"
      description="Drop assets here or click to upload. Max 50MB."
      accept=".png,.jpg,.pdf,.svg"
    />
  )
}
