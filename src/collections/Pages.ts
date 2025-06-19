import { CollectionConfig } from "payload"

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    description: 'Bygg sider med drag & drop blokker - Admin only',
    defaultColumns: ['title', 'slug', 'status'],
    group: 'Content',
    // Hide from customers
    hidden: ({ user }) => (user as any)?.role !== 'admin',
  },

  // 🛡️ SIKKER ACCESS
  access: {
    read: () => true, // Offentlig lesing
    create: ({ req }) => !!req.user, // Kun admin kan lage sider
    update: ({ req }) => !!req.user, // Kun admin kan endre
    delete: ({ req }) => !!req.user, // Kun admin kan slette
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'F.eks: BorzFuel Home Page',
      },
    },

    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL for siden (auto-genereres fra tittel)',
      },
    },

    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },

    // 🧱 HER ER BLOCKS MAGIEN!
    {
      name: 'layout',
      type: 'blocks',
      admin: {
        description: 'Bygg siden din ved å legge til og organisere blokker',
      },
      blocks: [
        // HERO BLOCK
        {
          slug: 'hero',
          labels: {
            singular: 'Hero Section',
            plural: 'Hero Sections',
          },
          fields: [
            {
              name: 'mainTitle',
              type: 'text',
              required: true,
              defaultValue: 'UNLEASH THE BORZ IN YOU',
              admin: {
                placeholder: 'UNLEASH THE BORZ IN YOU',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              defaultValue:
                'Dominate your workouts with the most powerful pre-workout formula designed for peak performance, extreme focus and savage intensity.',
              admin: {
                rows: 3,
              },
            },
            {
              name: 'productImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Hovedproduktbilde i hero',
              },
            },
            {
              name: 'ctaText',
              type: 'text',
              defaultValue: 'BUY NOW',
              admin: {
                placeholder: 'BUY NOW',
              },
            },
            {
              name: 'ctaLink',
              type: 'text',
              defaultValue: '#buy',
              admin: {
                placeholder: '#buy',
              },
            },
            {
              name: 'showTrustedBy',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Vis "Trusted by 1000+ Athletes"?',
              },
            },
          ],
        },

        // PRODUCT SHOWCASE BLOCK
        {
          slug: 'productShowcase',
          labels: {
            singular: 'Product Showcase',
            plural: 'Product Showcases',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'CLAIM YOUR POWER',
              admin: {
                placeholder: 'CLAIM YOUR POWER',
              },
            },
            {
              name: 'subtitle',
              type: 'text',
              defaultValue: 'Limited stock available. High demand product.',
              admin: {
                placeholder: 'Limited stock available...',
              },
            },
            {
              name: 'featuredProduct',
              type: 'relationship',
              relationTo: 'products',
              required: true,
              admin: {
                description: 'Hvilket produkt skal vises i denne seksjonen?',
              },
            },
            {
              name: 'showOffer',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Vis "LIMITED TIME OFFER" boks?',
              },
            },
            {
              name: 'offerText',
              type: 'textarea',
              defaultValue: 'Buy 2 containers, get 1 free. Use code BORZPACK at checkout.',
              admin: {
                rows: 2,
                condition: (data) => data.showOffer === true,
              },
            },
          ],
        },

        // BENEFITS BLOCK
        {
          slug: 'benefits',
          labels: {
            singular: 'Benefits Section',
            plural: 'Benefits Sections',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'UNLEASH YOUR FULL POTENTIAL',
              admin: {
                placeholder: 'UNLEASH YOUR FULL POTENTIAL',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              defaultValue:
                'BorzFuel is engineered for those who refuse to be average. For the hunters, not the hunted.',
              admin: {
                rows: 2,
              },
            },
            {
              name: 'selectedBenefits',
              type: 'relationship',
              relationTo: 'benefits',
              hasMany: true,
              admin: {
                description: 'Velg hvilke benefits som skal vises',
              },
            },
            {
              name: 'layout',
              type: 'select',
              options: [
                { label: 'Grid (4 columns)', value: 'grid-4' },
                { label: 'Grid (3 columns)', value: 'grid-3' },
                { label: 'Grid (2 columns)', value: 'grid-2' },
              ],
              defaultValue: 'grid-4',
            },
            {
              name: 'showCta',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Vis "CLAIM YOUR POWER" knapp?',
              },
            },
          ],
        },

        // INGREDIENTS BLOCK
        {
          slug: 'ingredients',
          labels: {
            singular: 'Ingredients Section',
            plural: 'Ingredients Sections',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'SCIENCE-BACKED FORMULA',
              admin: {
                placeholder: 'SCIENCE-BACKED FORMULA',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              defaultValue:
                'Every ingredient in clinical doses. No fillers. No compromises. Just pure performance backed by research.',
              admin: {
                rows: 2,
              },
            },
            {
              name: 'selectedIngredients',
              type: 'relationship',
              relationTo: 'ingredients',
              hasMany: true,
              admin: {
                description: 'Velg hvilke ingredienser som skal vises',
              },
            },
            {
              name: 'showFeatures',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Vis features grid (Clinical Doses, Third-Party Tested, osv.)?',
              },
            },
          ],
        },

        // TESTIMONIALS BLOCK (hardkodet for nå)
        {
          slug: 'testimonials',
          labels: {
            singular: 'Testimonials Section',
            plural: 'Testimonials Sections',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: "THE PACK DOESN'T LIE",
              admin: {
                placeholder: "THE PACK DOESN'T LIE",
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              defaultValue:
                'Join the elite athletes who have unleashed their inner Borz. Real results from real warriors.',
              admin: {
                rows: 2,
              },
            },
            {
              name: 'showStats',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Vis statistikk (4.9 rating, 500+ reviews, osv.)?',
              },
            },
          ],
        },

        // NEWSLETTER BLOCK
        {
          slug: 'newsletter',
          labels: {
            singular: 'Newsletter Section',
            plural: 'Newsletter Sections',
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
            {
              name: 'backgroundStyle',
              type: 'select',
              options: [
                { label: 'Gradient (default)', value: 'gradient' },
                { label: 'Solid dark', value: 'solid' },
                { label: 'Image background', value: 'image' },
              ],
              defaultValue: 'gradient',
            },
          ],
        },
      ],
    },

    // SEO
    {
      name: 'seo',
      type: 'group',
      admin: {
        position: 'sidebar',
        description: 'SEO innstillinger for denne siden',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            placeholder: 'SEO tittel (vises i Google)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            rows: 3,
            placeholder: 'SEO beskrivelse (vises i Google)',
          },
        },
      ],
    },
  ],

  // Auto-generer slug fra title
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.title && !data.slug) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        return data
      },
    ],
  },
}

