'use client'

import React from 'react'
import { Package, Calendar, CreditCard, Truck } from 'lucide-react'

export default function OrdersPage() {
  // TODO: Fetch real orders from API when order system is implemented
  const orders = [
    {
      id: '1001',
      date: '2024-12-15',
      status: 'delivered',
      total: 1299,
      items: [
        { name: 'BorzFuel Energy Booster', quantity: 2 },
        { name: 'BorzFuel Pre-Workout', quantity: 1 },
      ],
    },
    {
      id: '1002',
      date: '2024-12-10',
      status: 'shipped',
      total: 899,
      items: [{ name: 'BorzFuel Recovery Formula', quantity: 1 }],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-600/20 text-green-400 border-green-600'
      case 'shipped':
        return 'bg-blue-600/20 text-blue-400 border-blue-600'
      case 'processing':
        return 'bg-yellow-600/20 text-yellow-400 border-yellow-600'
      case 'cancelled':
        return 'bg-red-600/20 text-red-400 border-red-600'
      default:
        return 'bg-gray-600/20 text-gray-400 border-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Package className="w-4 h-4" />
      case 'shipped':
        return <Truck className="w-4 h-4" />
      case 'processing':
        return <CreditCard className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">My Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No orders yet</h3>
          <p className="text-gray-400 mb-6">
            When you place your first order, it will appear here.
          </p>
          <a
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors inline-block"
          >
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-white">Order #{order.id}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-400 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(order.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`inline-flex items-center space-x-2 px-3 py-1 rounded-lg border text-sm ${getStatusColor(order.status)}`}
                  >
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </div>
                  <div className="text-lg font-bold text-white mt-2">
                    {(order.total / 100).toFixed(2)} kr
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-600 pt-4">
                <h4 className="text-white font-medium mb-2">Items</h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-300">
                        {item.name} × {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-600">
                <button className="text-blue-400 hover:text-blue-300 text-sm">View Details</button>
                {order.status === 'delivered' && (
                  <button className="text-blue-400 hover:text-blue-300 text-sm">Reorder</button>
                )}
                {order.status === 'shipped' && (
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    Track Package
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
