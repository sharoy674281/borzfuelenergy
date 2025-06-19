import { CollectionConfig } from "payload"

export const Benefits: CollectionConfig = {
  slug: 'benefits',

  admin: {
    useAsTitle: 'title',
    description: 'Produktfordeler som vises på produktsiden',
    defaultColumns: ['title', 'highlight', 'product', 'order'],
    group: 'Content',
  },

  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'EXPLOSIVE ENERGY',
      },
    },

    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        rows: 3,
        placeholder: 'Scientifically formulated to deliver sustained energy...',
      },
    },

    {
      name: 'highlight',
      type: 'text',
      admin: {
        placeholder: '300mg Caffeine',
        description: 'Nøkkelinformasjon som fremheves',
      },
    },

    // ICON - Fra din komponent
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [
        { label: 'Zap (Energy)', value: 'zap' },
        { label: 'Target (Focus)', value: 'target' },
        { label: 'Battery (Endurance)', value: 'battery' },
        { label: 'Brain (Mind-Muscle)', value: 'brain' },
        { label: 'Shield (Protection)', value: 'shield' },
        { label: 'Award (Quality)', value: 'award' },
      ],
      admin: {
        description: 'Ikon som vises med fordelen',
      },
    },

    // KOBLING TIL PRODUKT
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: {
        description: 'Hvilke produkter har denne fordelen',
      },
    },

    // SORTERING
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Rekkefølge fordelen skal vises',
      },
    },

    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Fremhev denne fordelen',
      },
    },
  ],

  defaultSort: 'order',
}
