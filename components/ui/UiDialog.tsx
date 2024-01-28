import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { useState } from 'react'
import { UiButton } from './UiButton'

interface UiDialogProps {
  children: React.ReactNode
}

export const UiDialog = ({ children }: UiDialogProps) => {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 z-[1] bg-black/40" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-[1] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialog.Title className="m-0 text-[17px] font-medium text-black">
            Tem certeza?
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-5 mt-4 text-[15px] leading-normal text-black">
            Essa ação não pode ser desfeita. Isso excluirá permanentemente o
            registro.
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <AlertDialog.Cancel asChild>
              <UiButton variant={'secondary'} className="h-9">
                Cancelar
              </UiButton>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <UiButton variant={'cancel'} className="w-40">
                Excluir Registro
              </UiButton>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
