import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import CommunityIssuesComponent from '../components/community/CommunityIssuesComponent'
import UserNotificationsComponent from '../components/user/UserNotificationsComponent'
import UserGroupsComponent from '../components/user/UserGroupsComponent'
import UserIssuesComponent from '../components/user/UserIssuesComponent'
import SideBarComponent from '../components/sidebar/SideBarComponent'
import HelloUserHeader from '../components/headers/HelloUserHeader'
import DashboardButtons from '../components/user/DashboardButtons'
import { auth } from '../firebase-config'
import { User } from 'firebase/auth'

export default function DashboardPage (): JSX.Element {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  function getUser (): void {
    auth.onAuthStateChanged((user) => {
      if (user != null) {
        setUser(user)
        setLoading(false)
      } else {
        void router.push('/login')
      }
    })
  }

  useEffect(() => {
    getUser()
  }, [])

  if (loading) {
    return (
        <div className="flex bg-violet-50 h-screen w-screen justify-evenly items-center">
        </div>
    )
  } else {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-1 hidden md:block bg-slate-50'>
            <SideBarComponent/>
          </div>
          <div className="col-span-6">
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6'>
              <div className='col-span-2'>
                <HelloUserHeader name={user?.displayName}/>
                <h1 className="font-bold text-stone-900 text-lg ml-6 mb-5">Your Groups</h1>
                <div className="grid grid-cols-2 gap-4 ml-5 h-80">
                  <UserGroupsComponent user={user} />
                </div>
              </div>
              <div className='col-span-2'>
                <div className="col-span-1 mt-28">
                  <h1 className="font-bold text-lg ml-7 mb-5">Notifications</h1>
                </div>
                <div className="grid grid-cols-1 h-80 ml-7">
                  <div className="col-span-1 bg-black rounded-md">
                    <div className="grid grid-cols-1 ml-5 gap-1 p-3">
                      <UserNotificationsComponent user={user}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-span-3'>
                <DashboardButtons/>
                <div className="col-span-1 mt-[3.75rem]">
                  <h1 className="font-bold text-lg ml-7 mb-5">Your Issues</h1>
                </div>
                <div className="grid grid-cols-1 h-80 ml-7 mr-7">
                  <div className="col-span-1 gap-1">
                    <UserIssuesComponent user={user}/>
                  </div>
                </div>
              </div>
              <div className='col-span-7 hidden md:block md:col-start-3 lg:col-start-1 p-5'>
                <CommunityIssuesComponent user={user}/>
              </div>
            </div>
          </div>
        </div>
    )
  }
}
