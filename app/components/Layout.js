import Head from 'next/head'
import Navbarr from './Navbarr'

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Rotten Potatoes</title>
    </Head>
    <Navbarr></Navbarr>
    {children}
  </>
)

export default Layout;