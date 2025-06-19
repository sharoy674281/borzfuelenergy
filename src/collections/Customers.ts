import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',

  admin: {
    useAsTitle: 'email',
    description: 'Kunder som kjøper produkter',
    group: 'E-commerce',
  },
  auth: {
    // Separate auth for customers - ikke admin
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 minutter
  },
  access: {
    // Customers can only read/update their own data
    read: ({ req }) => {
      // For now, allow all authenticated users to read
      if (req.user) {
        return true
      }
      return false
    },
    create: () => true, // Anyone can register as customer
    update: ({ req }) => {
      // Only authenticated users can update
      return !!req.user
    },
    delete: ({ req }) => {
      // Only authenticated users can delete (will be refined later)
      return !!req.user
    },
  },

  fields: [
    // Basic info
    {
      name: 'firstName',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'John',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Doe',
      },
    },

    // Email kommer automatisk fra auth

    {
      name: 'phone',
      type: 'text',
      admin: {
        placeholder: '+47 123 45 678',
      },
    },

    // Shipping address
    {
      name: 'shippingAddress',
      type: 'group',
      label: 'Shipping Address',
      fields: [
        {
          name: 'street',
          type: 'text',
          admin: {
            placeholder: 'Storgata 1',
          },
        },
        {
          name: 'city',
          type: 'text',
          admin: {
            placeholder: 'Oslo',
          },
        },
        {
          name: 'postalCode',
          type: 'text',
          admin: {
            placeholder: '0123',
          },
        },
        {
          name: 'country',
          type: 'select',
          defaultValue: 'NO',
          options: [
            { label: 'Norway', value: 'NO' },
            { label: 'Sweden', value: 'SE' },
            { label: 'Denmark', value: 'DK' },
            { label: 'Finland', value: 'FI' },
          ],
        },
      ],
    },

    // Billing address (optional, kan være samme som shipping)
    {
      name: 'billingAddress',
      type: 'group',
      label: 'Billing Address',
      admin: {
        description: 'Leave empty to use shipping address',
      },
      fields: [
        {
          name: 'street',
          type: 'text',
        },
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'postalCode',
          type: 'text',
        },
        {
          name: 'country',
          type: 'select',
          options: [
            { label: 'Norway', value: 'NO' },
            { label: 'Sweden', value: 'SE' },
            { label: 'Denmark', value: 'DK' },
            { label: 'Finland', value: 'FI' },
          ],
        },
      ],
    },

    // Customer preferences
    {
      name: 'marketingConsent',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Customer agrees to receive marketing emails',
      },
    },

    {
      name: 'dateOfBirth',
      type: 'date',
      admin: {
        description: 'For age verification (18+ required for supplements)',
      },
    },

    // Customer status
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Banned', value: 'banned' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],

  hooks: {
    beforeChange: [
      ({ data }) => {
        // Ensure customer is 18+ for supplement purchases
        if (data.dateOfBirth) {
          const today = new Date()
          const birthDate = new Date(data.dateOfBirth)
          const age = today.getFullYear() - birthDate.getFullYear()

          if (age < 18) {
            throw new Error('Customers must be 18 or older to purchase supplements')
          }
        }

        return data
      },
    ],
  },
}
