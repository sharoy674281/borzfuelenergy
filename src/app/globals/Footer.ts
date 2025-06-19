import { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    description: 'Footer innstillinger - Admin only',
    group: 'Site Settings',
    // Hide from customers
    hidden: ({ user }) => (user as any)?.role !== 'admin',
  },

  access: {
    read: () => true, // Offentlig lesing
    update: ({ req }) => !!req.user, // Kun admin kan endre
  },

  fields: [
    {
      name: 'brand',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          defaultValue: 'BORZFUEL',
          admin: {
            placeholder: 'BORZFUEL',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Premium pre-workout supplement for elite performance.',
          admin: {
            rows: 2,
          },
        },
      ],
    },

    {
      name: 'socialLinks',
      type: 'array',
      admin: {
        description: 'Sosiale medier lenker',
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'YouTube', value: 'youtube' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'https://instagram.com/borzfuel',
          },
        },
      ],
    },

    {
      name: 'linkSections',
      type: 'array',
      admin: {
        description: 'Footer link seksjoner (SHOP, SUPPORT, osv.)',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'SHOP',
          },
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'Pre-Workout',
              },
            },
            {
              name: 'href',
              type: 'text',
              required: true,
              admin: {
                placeholder: '/products',
              },
            },
          ],
        },
      ],
    },

    {
      name: 'newsletter',
      type: 'group',
      admin: {
        description: 'Newsletter seksjon',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'JOIN THE PACK',
          admin: {
            placeholder: 'JOIN THE PACK',
          },
        },
        {
          name: 'description',
          type: 'text',
          defaultValue: 'Get exclusive offers, news and early access. No spam.',
          admin: {
            placeholder: 'Get exclusive offers...',
          },
        },
        {
          name: 'placeholder',
          type: 'text',
          defaultValue: 'Enter your email',
          admin: {
            placeholder: 'Enter your email',
          },
        },
        {
          name: 'buttonText',
          type: 'text',
          defaultValue: 'SUBSCRIBE',
          admin: {
            placeholder: 'SUBSCRIBE',
          },
        },
      ],
    },

    {
      name: 'legal',
      type: 'group',
      fields: [
        {
          name: 'copyrightText',
          type: 'text',
          defaultValue: '© 2025 BorzFuel. All rights reserved.',
          admin: {
            description: 'Copyright tekst',
          },
        },
        {
          name: 'disclaimer',
          type: 'textarea',
          defaultValue:
            '*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.',
          admin: {
            rows: 3,
            description: 'Legal disclaimer',
          },
        },
      ],
    },
  ],
}

