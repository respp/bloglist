import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap';


export const DisplayUsers = () => {
  
  const users = useSelector(state => state.users)

  return (
    <>
      <h1>Users</h1>
      <Table striped bordered hover variant="dark">
          <tbody><tr>
            <td></td>
            <td>
              <b>blogs created</b>
            </td>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
               <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td><h4>{user.blogs.length}</h4></td>
            </tr>
          ))}
          </tbody>
      </Table>
    </>
  )
}
