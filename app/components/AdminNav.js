
//import Link from 'next/link';
import Link from './ActiveLink';
import { Nav } from 'react-bootstrap';

function AdminNav() {
  return (

    <div className="container px-0 py-4">
      <Nav className="d-flex justify-content-around" variant="pills">
        <Nav.Item>
          <Link activeClassName="active" as="/admin" href="/admin" passHref>
            <Nav.Link>Movies</Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link activeClassName="active" as="/admin/ratings" href="/admin/ratings" passHref>
            <Nav.Link>Ratings</Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link activeClassName="active" as="/admin/users" href="/admin/users" passHref>
            <Nav.Link>Users</Nav.Link>
          </Link>
        </Nav.Item>
      </Nav>
    </div >
  )
}
export default AdminNav