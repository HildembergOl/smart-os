import { MenuItemDataProps } from '@/components/MenuNested'

export const data = [
  {
    id: 1,
    label: 'Permissões',
    src: '',
    icon: 'download',
    parent: null,
  },
  {
    id: 2,
    label: 'Cadastros',
    src: '',
    icon: 'folder-plus',
    parent: [
      {
        id: 3,
        label: 'Pessoas',
        src: '/persons',
        icon: '',
        parent: null,
      },
      {
        id: 4,
        label: 'Serviços',
        src: '/services',
        icon: '',
        parent: null,
      },
    ],
  },
] as unknown as MenuItemDataProps[]
