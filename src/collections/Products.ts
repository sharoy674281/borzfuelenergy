import { Product } from '@/payload-types'
import { CollectionConfig, PayloadRequest } from 'payload'

export const Products: CollectionConfig = {
  // 'slug' er URL-navnet for collection. API vil være /api/products
  slug: 'products',
  // Admin panel konfigurasjon
  admin: {
    useAsTitle: 'name', // Bruker 'name' som tittel i lister
    description: 'Administrer alle produkter - Admin only',
    defaultColumns: ['name', 'price', 'status', 'createdAt'], // Kolonner i liste-view
    group: 'Shop', // Grupperer i sidebar
    // Hide from customers
    hidden: ({ user }) => (user as any)?.role !== 'admin',
  },

  // Hvem kan gjøre hva
  access: {
    read: () => true, // Alle kan lese (offentlig API)
    create: ({ req }) => !!req.user, // Kun innloggede kan opprette
    update: ({ req }) => !!req.user, // Kun innloggede kan oppdatere
    delete: ({ req }) => !!req.user, // Kun innloggede kan slette
  },

  // Datastrukturen - basert på din BuySection komponent
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'F.eks: BORZFUEL SAVAGE FORMULA',
      },
    },

    {
      name: 'slug',
      type: 'text',
      unique: true, // Hver slug må være unik
      admin: {
        position: 'sidebar',
        description: 'URL-vennlig versjon (auto-genereres fra navn)',
      },
    },

    // PRISING - Fra din BuySection
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        step: 0.01, // Tillater $49.99 format
        placeholder: '49.99',
        description: 'Hovedpris i USD',
      },
    },

    {
      name: 'compareAtPrice',
      type: 'number',
      min: 0,
      admin: {
        step: 0.01,
        placeholder: '59.99',
        description: 'Original pris (for å vise rabatt)',
      },
    },

    // PRODUKT INFO
    {
      name: 'shortDescription',
      type: 'text',
      admin: {
        placeholder: 'Premium Pre-Workout',
        description: 'Kort beskrivelse som vises på produktkort',
      },
    },

    {
      name: 'description',
      type: 'richText',
      admin: {
        description: 'Detaljert produktbeskrivelse',
      },
    },

    // REVIEW DATA - Fra din komponent
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 5,
      defaultValue: 4.9,
      admin: {
        step: 0.1,
        description: 'Gjennomsnittlig rating (0-5 stjerner)',
      },
    },

    {
      name: 'reviewCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Antall kundeomtaler',
      },
    },

    // BADGES OG STATUS
    {
      name: 'badge',
      type: 'select',
      options: [
        { label: 'Best Seller', value: 'best-seller' },
        { label: 'New Formula', value: 'new-formula' },
        { label: 'Limited Edition', value: 'limited' },
        { label: 'None', value: 'none' },
      ],
      defaultValue: 'none',
      admin: {
        position: 'sidebar',
        description: 'Badge som vises på produktet',
      },
    },

    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },

    // INVENTORY
    {
      name: 'inStock',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Er produktet på lager?',
      },
    },

    {
      name: 'inventory',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Antall på lager',
      },
    },

    // FEATURES - Fra din komponent
    {
      name: 'features',
      type: 'array',
      admin: {
        description: 'Produktegenskaper som "Free shipping", "30-day guarantee"',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Truck (Shipping)', value: 'truck' },
            { label: 'Shield (Guarantee)', value: 'shield' },
            { label: 'Clock (Limited)', value: 'clock' },
            { label: 'Award (Quality)', value: 'award' },
          ],
        },
        {
          name: 'text',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Free shipping on orders over $75',
          },
        },
        {
          name: 'color',
          type: 'select',
          options: [
            { label: 'Green', value: 'green' },
            { label: 'Blue', value: 'blue' },
            { label: 'Yellow', value: 'yellow' },
            { label: 'Red', value: 'red' },
          ],
          defaultValue: 'blue',
        },
      ],
    },
  ],

  // HOOKS - Automatisk generering av slug
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-generer slug fra name hvis ikke satt
        if (data.name && !data.slug) {
          data.slug = data.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Erstatt spesialtegn med bindestreker
            .replace(/(^-|-$)/g, '') // Fjern bindestreker i begynnelse/slutt
        }
        return data
      },
    ],
  },
}
