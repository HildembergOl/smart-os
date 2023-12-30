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
        <AlertDialog.Overlay className="bg-black/40 data-[state=open]:animate-overlayShow fixed inset-0 z-[1]" />
        <AlertDialog.Content className="z-[1] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialog.Title className="text-black m-0 text-[17px] font-medium">
            Tem certeza?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-black mt-4 mb-5 text-[15px] leading-normal">
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
