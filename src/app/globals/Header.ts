import { GlobalConfig } from "payload"

export const Header: GlobalConfig = {
  slug: 'header',
  admin: {
    description: 'Header innstillinger for hele nettsiden',
    group: 'Site Settings',
    hidden: ({ user }) => (user as any)?.role !== 'admin', // Hide from customers
  },

  access: {
    read: ({ req }) => (req.user as any)?.role === 'admin', // Only admins can read
    update: ({ req }) => (req.user as any)?.role === 'admin', // Only admins can update
  },

  fields: [
    {
      name: 'logo',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'BORZFUEL',
          admin: {
            description: 'Logo tekst',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Logo bilde (valgfritt)',
          },
        },
      ],
    },

    {
      name: 'navigation',
      type: 'array',
      admin: {
        description: 'Hovednavigasjon i header',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Product',
          },
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          admin: {
            placeholder: '#buy',
          },
        },
        {
          name: 'external',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Åpne i ny fane?',
          },
        },
      ],
    },
  ],
}

