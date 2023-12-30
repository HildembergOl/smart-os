import Icon from '@/components/Icon'
import { Indicator } from '@/components/Indicator'
import {
  UiCard,
  UiCardDescription,
  UiCardHeader,
  UiCardTitle,
} from '@/components/ui/UiCard'
import { UiContainer } from '@/components/ui/UiContainer'

const Page = () => {
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
          <UiContainer className="flex-1 justify-evenly flex flex-row p-4 gap-4 max-md:flex-col">
            <UiCard className={`w-80 bg-green/90`}>
              <Indicator
                title={'Realizados'}
                value={0}
                icon={<Icon name="thumbs-up" />}
              />
            </UiCard>
            <UiCard className={`w-80 bg-primary/90`}>
              <Indicator
                title={'Pendentes'}
                value={0}
                icon={<Icon name="thumbs-down" />}
              />
            </UiCard>
            <UiCard className={`w-80 bg-violet/90`}>
              <Indicator
                title={'Em Andamento'}
                value={0}
                icon={<Icon name="refresh-cw" />}
              />
            </UiCard>
            <UiCard className={`w-80 bg-blue/90`}>
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
export default Page
