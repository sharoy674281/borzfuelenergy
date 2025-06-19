import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    description: 'Admin users only - customers use /account',
    defaultColumns: ['email', 'role', 'firstName', 'lastName', 'createdAt'],
    // Hide this collection from customers in admin panel
    hidden: ({ user }) => (user as any)?.role !== 'admin',
  },
  auth: true,
  fields: [
    // Email added by default

    // User Role
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'customer',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Customer', value: 'customer' },
      ],
      admin: {
        position: 'sidebar',
        description: 'User role determines access level',
      },
      access: {
        // Allow first user (ID 1) to always update roles, or existing admins
        update: ({ req }) => {
          const user = req.user as any
          // First user (usually the site owner) can always update roles
          if (user?.id === '1' || user?.id === 1) {
            return true
          }
          // Or existing admins
          return user?.role === 'admin'
        },
      },
    },

    // Basic info (for customers)
    {
      name: 'firstName',
      type: 'text',
      admin: {
        placeholder: 'John',
        condition: (_, siblingData) => siblingData?.role === 'customer',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      admin: {
        placeholder: 'Doe',
        condition: (_, siblingData) => siblingData?.role === 'customer',
      },
    },

    {
      name: 'phone',
      type: 'text',
      admin: {
        placeholder: '+47 123 45 678',
        condition: (_, siblingData) => siblingData?.role === 'customer',
      },
    },

    // Shipping address (for customers)
    {
      name: 'shippingAddress',
      type: 'group',
      label: 'Shipping Address',
      admin: {
        condition: (_, siblingData) => siblingData?.role === 'customer',
      },
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

    // Billing address (for customers) - can be same as shipping or different
    {
      name: 'billingAddress',
      type: 'group',
      label: 'Billing Address',
      admin: {
        condition: (_, siblingData) => siblingData?.role === 'customer',
        description: 'Leave empty to use shipping address for billing',
      },
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

    // Customer preferences
    {
      name: 'marketingConsent',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Customer agrees to receive marketing emails',
        condition: (_, siblingData) => siblingData?.role === 'customer',
      },
    },

    {
      name: 'dateOfBirth',
      type: 'date',
      admin: {
        description: 'For age verification (18+ required for supplements)',
        condition: (_, siblingData) => siblingData?.role === 'customer',
      },
    },

    // Customer status
    {
      name: 'customerStatus',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Banned', value: 'banned' },
      ],
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) => siblingData?.role === 'customer',
      },
    },
  ],

  access: {
    // Everyone can read their own data
    read: ({ req }) => {
      if (req.user) {
        // Admins can read all users
        if ((req.user as any).role === 'admin') {
          return true
        }
        // Users can only read their own data
        return { id: { equals: req.user.id } }
      }
      return false
    },
    // Anyone can create (for customer registration)
    create: () => true,
    // Users can update their own data, admins can update any
    update: ({ req }) => {
      if (req.user) {
        if ((req.user as any).role === 'admin') {
          return true
        }
        return { id: { equals: req.user.id } }
      }
      return false
    },
    // Only admins can delete
    delete: ({ req }) => (req.user as any)?.role === 'admin',
  },

  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        // Ensure first user is always admin (emergency recovery)
        if (req.user && ((req.user as any).id === '1' || (req.user as any).id === 1)) {
          // First user should always be admin
          if (operation === 'update' && data.role !== 'admin') {
            data.role = 'admin'
          }
        }

        // Force role to 'customer' for new users created via API (not admin panel)
        if (operation === 'create' && !req.user) {
          // If no authenticated user is creating this (i.e., public registration), force customer role
          data.role = 'customer'
        }

        // Prevent accidentally changing admin users to customer
        if (
          operation === 'update' &&
          req.user &&
          (req.user as any).role !== 'admin' &&
          data.role === 'admin'
        ) {
          // Only admins can create/update admin users (except first user)
          if ((req.user as any).id !== '1' && (req.user as any).id !== 1) {
            throw new Error('Only administrators can modify admin users')
          }
        }

        // Ensure customer is 18+ for supplement purchases
        if (data.role === 'customer' && data.dateOfBirth) {
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
