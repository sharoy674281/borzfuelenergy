import { CollectionConfig } from "payload";

export const Ingredients: CollectionConfig = {
  slug: 'ingredients',

  admin: {
    useAsTitle: 'name',
    description: 'Administrer ingredienser og deres fordeler',
    defaultColumns: ['name', 'amount', 'category', 'product'],
    group: 'Content', // Grupperer med Media
  },

  access: {
    read: () => true, // Offentlig API
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'F.eks: L-Citrulline Malate',
      },
    },

    {
      name: 'amount',
      type: 'text', // Text fordi det kan være "8,000mg" eller "2.5g"
      required: true,
      admin: {
        placeholder: '8,000mg',
        description: 'Mengde per serving (inkluder enhet som mg, g, osv.)',
      },
    },

    {
      name: 'benefit',
      type: 'textarea',
      required: true,
      admin: {
        rows: 3,
        placeholder: 'Enhanced blood flow and massive pumps',
        description: 'Hva denne ingrediensen gjør',
      },
    },

    // KATEGORI - Fra din komponent (Pump, Energy, osv.)
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Pump',
          value: 'pump',
        },
        {
          label: 'Endurance',
          value: 'endurance',
        },
        {
          label: 'Energy',
          value: 'energy',
        },
        {
          label: 'Focus',
          value: 'focus',
        },
        {
          label: 'Cognitive',
          value: 'cognitive',
        },
        {
          label: 'Strength',
          value: 'strength',
        },
      ],
      admin: {
        description: 'Hvilken type fordel denne ingrediensen gir',
      },
    },

    // KOBLING TIL PRODUKT
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products', // Kobler til Products collection
      hasMany: true, // En ingrediens kan være i flere produkter
      admin: {
        description: 'Hvilke produkter inneholder denne ingrediensen',
      },
    },

    // SORTERING
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Rekkefølge ingrediensen skal vises (lavest nummer først)',
      },
    },

    // EKSTRA INFO
    {
      name: 'description',
      type: 'richText',
      admin: {
        description: 'Detaljert beskrivelse av ingrediensen (valgfritt)',
      },
    },

    {
      name: 'clinicalDose',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Er dette en klinisk dosering?',
      },
    },

    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Fremhev denne ingrediensen',
      },
    },
  ],

  // Standard sortering etter order felt
  defaultSort: 'order',
}

