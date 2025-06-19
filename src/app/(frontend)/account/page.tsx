'use client'

import React, { useState } from 'react'
import { useCustomerAuth } from '../context/CustomerAuthContext'
import { User, Mail, Save, Check } from 'lucide-react'

export default function AccountPage() {
  const { customer, updateProfile } = useCustomerAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  
  const [formData, setFormData] = useState({
    firstName: customer?.firstName || '',
    lastName: customer?.lastName || '',
    email: customer?.email || '',
    marketingConsent: customer?.marketingConsent || false,
  })

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    const success = await updateProfile({
      firstName: formData.firstName,
      lastName: formData.lastName,
      marketingConsent: formData.marketingConsent,
    })

    if (success) {
      setMessage('Profile updated successfully!')
      setIsEditing(false)
    } else {
      setMessage('Failed to update profile. Please try again.')
    }

    setSaving(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleCancel = () => {
    setFormData({
      firstName: customer?.firstName || '',
      lastName: customer?.lastName || '',
      email: customer?.email || '',
      marketingConsent: customer?.marketingConsent || false,
    })
    setIsEditing(false)
    setMessage('')
  }

  if (!customer) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">My Profile</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg ${
          message.includes('success') 
            ? 'bg-green-600/20 text-green-400 border border-green-600' 
            : 'bg-red-600/20 text-red-400 border border-red-600'
        }`}>
          <div className="flex items-center space-x-2">
            {message.includes('success') && <Check className="w-4 h-4" />}
            <span>{message}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            First Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              disabled={!isEditing}
              className={`w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 ${
                isEditing 
                  ? 'focus:outline-none focus:border-blue-500' 
                  : 'cursor-not-allowed opacity-75'
              }`}
              placeholder="John"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Last Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              disabled={!isEditing}
              className={`w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 ${
                isEditing 
                  ? 'focus:outline-none focus:border-blue-500' 
                  : 'cursor-not-allowed opacity-75'
              }`}
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 cursor-not-allowed opacity-75"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Email cannot be changed. Contact support if you need to update your email.
          </p>
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="marketing"
              checked={formData.marketingConsent}
              onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
              disabled={!isEditing}
              className={`mr-3 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 ${
                !isEditing ? 'cursor-not-allowed opacity-75' : ''
              }`}
            />
            <label htmlFor="marketing" className="text-sm text-gray-300">
              I want to receive marketing emails about new products and offers
            </label>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="flex items-center space-x-4 mt-8">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>

          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="bg-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-gray-600">
        <h3 className="text-lg font-medium text-white mb-2">Account Status</h3>
        <div className="flex items-center space-x-4 text-sm">
          <span className="text-gray-400">Status:</span>
          <span className={`px-2 py-1 rounded ${
            customer.customerStatus === 'active' 
              ? 'bg-green-600/20 text-green-400' 
              : 'bg-yellow-600/20 text-yellow-400'
          }`}>
            {customer.customerStatus || 'Active'}
          </span>
        </div>
        <div className="flex items-center space-x-4 text-sm mt-2">
          <span className="text-gray-400">Role:</span>
          <span className="text-blue-400 capitalize">{customer.role}</span>
        </div>
      </div>
    </div>
  )
}
