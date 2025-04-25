'use client'

import { useTheme } from '@/context/theme-context'
import { Bell, Mail, UserPlus, Heart } from 'lucide-react'
import MainLayout from '../components/layout/mainLayout'

const notifications = [
  {
    id: 1,
    type: 'follow',
    user: 'Jara',
    avatar: '/images/esportshall.png',
    time: 'hace 2h',
    read: true
  },
  {
    id: 2,
    type: 'like',
    user: 'Ayman',
    avatar: '/images/esportshall.png',
    time: 'hace 5h',
    read: true
  },
  {
    id: 3,
    type: 'mention',
    user: 'EsportsTeam',
    avatar: '/images/esportshall.png',
    time: 'hace 1d',
    read: true
  }
]

function NotificationsPage() {
  const { theme } = useTheme()

  return (
    <>
      <h1 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Notificaciones
      </h1>

      <div className={`border rounded-lg overflow-hidden ${theme === 'dark' ? 'border-dark-300' : 'border-gray-200'}`}>
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            className={`p-4 flex items-start gap-4 transition-colors cursor-pointer ${
              theme === 'dark' ? 'hover:bg-dark-300/50' : 'hover:bg-gray-50'
            } ${index !== notifications.length - 1 ? (theme === 'dark' ? 'border-b border-dark-300' : 'border-b border-gray-200') : ''} ${
              !notification.read ? (theme === 'dark' ? 'bg-dark-200' : 'bg-blue-50') : (theme === 'dark' ? 'bg-dark-200/80' : 'bg-white')
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 pt-1">
                {notification.type === 'follow' && <UserPlus className="text-brand-yellow" size={24} />}
                {notification.type === 'like' && <Heart className="text-brand-yellow" size={24} />}
                {notification.type === 'mention' && <Mail className="text-brand-yellow" size={24} />}
              </div>

              <div className="flex-grow">
                <img src={notification.avatar} alt={notification.user} className="w-8 h-8 rounded-full mr-3 float-left"/>
                <p className={`mb-1 ${theme === 'dark' ? 'text-neutral-200' : 'text-gray-800'}`}>
                  <span className="font-semibold">{notification.user}</span> {notification.type === 'follow' ? 'ha comenzado a seguirte.' : notification.type === 'like' ? 'le ha gustado tu publicación.' : 'te ha mencionado.'}
                </p>
                <p className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`}>
                  {notification.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

const WrappedNotificationsPage = () => (
  <MainLayout>
    <NotificationsPage />
  </MainLayout>
)

export default WrappedNotificationsPage