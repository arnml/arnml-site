'use client'

import { Button } from '@/components/ui/button'

interface DeleteConfirmButtonProps {
  confirmMessage: string
}

export function DeleteConfirmButton({
  confirmMessage,
}: Readonly<DeleteConfirmButtonProps>) {
  return (
    <Button
      type="submit"
      variant="outline"
      size="sm"
      className="text-red-600 hover:text-red-700 dark:text-red-400"
      onClick={(e) => {
        if (!confirm(confirmMessage)) {
          e.preventDefault()
        }
      }}
    >
      Delete
    </Button>
  )
}
