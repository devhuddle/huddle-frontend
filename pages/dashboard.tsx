import { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import CommunityIssuesComponent from '../components/community/CommunityIssuesComponent';
import UserNotificationsComponent from '../components/user/UserNotificationsComponent';
import UserGroupsComponent from '../components/user/UserGroupsComponent';
import UserIssuesComponent from '../components/user/UserIssuesComponent';
import SideBarComponent from '../components/sidebar/SideBarComponent'
import { useGlobalContext } from '../context/GlobalContext'
import HelloUserHeader from '../components/headers/HelloUserHeader';
import DashboardButtons from '../components/user/DashboardButtons';

export default function DashboardPage() {
  const { isAuthenticated, setIsAuthenticated } = useGlobalContext();
  const [user, setUser] = useState({} as User);
  const [isStateLoaded, setIsStateLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      const userCredentialsString = window.localStorage.getItem('user')
      const userCredentials = JSON.parse(userCredentialsString || '{}')
      if (userCredentials?.uid) {
        setUser(userCredentials)
        setIsAuthenticated(true)
      } else {
        router.push('/login')
      }
    }
  })

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7'>
      <div className='col-span-1 hidden md:block bg-slate-50'>
        <SideBarComponent />
      </div>
      <div className="col-span-6">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6'>
          <div className='col-span-2'>
            <HelloUserHeader name={user.displayName} />
            <h1 className="font-bold text-stone-900 text-lg ml-6 mb-5">Your Groups</h1>
            <div className="grid grid-cols-2 gap-4 ml-5 h-80">
              <UserGroupsComponent />
            </div>
          </div>
          <div className='col-span-2'>
            <UserNotificationsComponent />
          </div>
          <div className='col-span-3'>
            <DashboardButtons />
            <div className="col-span-1 mt-[3.75rem]">
              <h1 className="font-bold text-lg ml-7 mb-5">Your Issues</h1>
            </div>
            <div className="grid grid-cols-1 h-80 ml-7 mr-7">
                <div className="col-span-1 gap-1">
                  <UserIssuesComponent />
                </div>
            </div>
          </div>
          <div className='col-span-7 hidden md:block md:col-start-3 lg:col-start-1 p-5'>
            <CommunityIssuesComponent />
          </div>
        </div>
      </div>
    </div>
  )
}
