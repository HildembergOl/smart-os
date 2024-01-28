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
        label: 'Empresa',
        src: '/tenancy',
        icon: '',
        parent: null,
      },
      {
        id: 4,
        label: 'Pessoas',
        src: '/persons',
        icon: '',
        parent: null,
      },
      {
        id: 5,
        label: 'Serviços',
        src: '/services',
        icon: '',
        parent: null,
      },
      {
        id: 6,
        label: 'Tipo OS',
        src: '/typeos',
        icon: '',
        parent: null,
      },
    ],
  },
  {
    id: 7,
    label: 'Operações',
    src: '',
    icon: 'layout-list',
    parent: [
      {
        id: 8,
        label: 'Ordem de Serviços',
        src: '/orderservices',
        icon: '',
        parent: null,
      },
    ],
  },
] as unknown as MenuItemDataProps[]
