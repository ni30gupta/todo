import { Button, ListGroup, Pagination } from 'react-bootstrap'
import React from 'react'
import './fetchApp.css'
function FetchApp() {
     const [data, setData] = React.useState({})
     const [users, setUsers] = React.useState([])
     const [pages, setPages] = React.useState([])
     const [page_no, setPage_no] = React.useState(1)


     React.useEffect(() => {
          fetch(`https://reqres.in/api/users?page=${page_no}`)
               .then(response => response.json())
               .then(result => {
                    setData(result)
                    // setPage(result.total)
                    setUsers(result.data)
                    let init = []
                    for (let i = 1; i < result.total + 1; i++) {
                         init.push(i)
                    }
                    setPages(init)
               })
     }, [page_no])



     const changePage = (page_id) => {
          setPage_no(page_id)
     }



     let active = page_no;
     let items = [];
     for (let number = 1; number <= pages.length; number++) {
          items.push(
               <Pagination.Item onClick={() => changePage(number)} key={number} active={number === active}>
                    {number}
               </Pagination.Item>,
          );
     }
     console.log(pages)
     return (
          <div className="main">
               <div className="users">
                    <h2 className="text-decoration-underline">Users list</h2>

                    {
                         users.length > 0 ? (users.map(user => {
                              return (
                                   <ListGroup>
                                        <ListGroup.Item >{user.first_name}</ListGroup.Item>

                                   </ListGroup>
                              )
                         })) : (<h1>No Data Found</h1>)
                    }

               </div>
               <div className="page">
                    <Pagination>{items}</Pagination>
               </div>
          </div >
     )
}




export default FetchApp
