import Icon from '@/components/Icon'
import { Indicator } from '@/components/Indicator'
import {
  UiCard,
  UiCardDescription,
  UiCardHeader,
  UiCardTitle,
} from '@/components/ui/UiCard'
import { UiContainer } from '@/components/ui/UiContainer'

export default function Page() {
  return (
    <UiContainer variant={'page'}>
      <UiContainer>
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Olá visitante,</UiCardTitle>
            <UiCardDescription>Bem vindo ao Smart Os</UiCardDescription>
          </UiCardHeader>
        </UiCard>
      </UiContainer>
      <UiContainer>
        <UiCard className="h-full ">
          <UiContainer className="flex flex-1 flex-row justify-evenly gap-4 p-4 max-md:flex-col">
            <UiCard className={`w-80 bg-green-600/60`}>
              <Indicator
                title={'Realizados'}
                value={0}
                icon={<Icon name="thumbs-up" />}
              />
            </UiCard>
            <UiCard className={`w-80 bg-yellow-600/60`}>
              <Indicator
                title={'Pendentes'}
                value={0}
                icon={<Icon name="thumbs-down" />}
              />
            </UiCard>
            <UiCard className={`w-80 bg-violet-600/60`}>
              <Indicator
                title={'Em Andamento'}
                value={0}
                icon={<Icon name="refresh-cw" />}
              />
            </UiCard>
            <UiCard className={`w-80 bg-blue-600/90`}>
              <Indicator
                title={'À Faturar'}
                value={0}
                icon={<Icon name="circle-dollar-sign" />}
              />
            </UiCard>
          </UiContainer>
          <UiContainer></UiContainer>
        </UiCard>
      </UiContainer>
    </UiContainer>
  )
}
