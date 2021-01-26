
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import MyAccount from '../components/MyAccount'
import Accounts from '../components/Accounts'
import Favorites from '../components/Favorites'

export default function Profile() {
  const [session, loading] = useSession();



  return <>
    <div className=" container col-md-10 my-3 ">
      {!session && <>
        Veuillez vous connecter pour accéder à cette page <br />
      </>}
      {session && <>

        <Tabs defaultActiveKey="myaccount" id="tab">
          <Tab eventKey="myaccount" title="Mon Compte" variant="tabs" className="text-body">
            <MyAccount></MyAccount>
          </Tab>
          <Tab eventKey="profile" title="Mes Favoris" variant="tabs">
            <Favorites></Favorites>
          </Tab>
        </Tabs>


      </>}
    </div>
  </>

}
