import React,{ useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const UserList = ()=>{
    const [users,setUser] = useState([]);
    const [page,setPage] = useState(0);
    const [limit,setLimit] = useState(10);
    const [pages,setPages] = useState(0);
    const [row,setRows] = useState(0);
    const [keyword,setKeyword] = useState("");
    const [query,setQuery] = useState("");
    const [msg,setMsg] = useState("");
    
    useEffect(() =>{
        getUsers();
    },[page, keyword]);

    const getUsers = async () =>{
        const response = await axios.get(`http://localhost:2000/users?search_query=${keyword}&page=${page}&limit=${limit}`);
        setUser(response.data.result);
        setPage(response.data.page);
        setPages(response.data.totalPage);
        setRows(response.data.totalRows);
    };

    const changePage = ({ selected }) => {
        setPage(selected);
        if (selected===9){
            setMsg("Jika tidak ada, cari menggunakan kata kunci yang lebih spesifik!");
        } else{
            setMsg("")
        }
    };

    const searchData = (e) =>{
        e.preventDefault();
        setPage(0);
        setMsg("");
        setKeyword(query);
    }

    const deleteUser = async(id) =>{
        try{
            await axios.delete(`http://localhost:2000/users/${id}`);
            getUsers();
        } catch(error){
            console.log(error);
        }
    };
    //<Link to={`add`} className="button is-success">
            //    Add New
            //</Link>


return (
    <div className="container mt-5">
        <div className="columns">
            <div className="column is-centered">
                <form onSubmit={searchData}>
                    <div className="mb-5">
                        <Link to={`add`} className="button is-success">
                        Add New
                        </Link>
                    </div>
               
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input 
                                type="text"
                                className="input"
                                value={query}
                                onChange={(e)=>setQuery(e.target.value)}
                                placeholder="Find data here..."
                            />
                            </div>
                            <div className="control">
                                <button type="submit" className="button is-info">
                                    Search
                                </button>
                            </div>
                        
                    </div>
                </form>

                <table className="table is-striped is-bordered is-fullwidth mt-2">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user)=>(
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.gender}</td>
                            <td>
                                <Link
                                    to={`edit/${user.id}`}
                                    className="button is-small is-info mr-2">
                                        Edit
                                </Link>
                                <Link
                                    to={()=>deleteUser(user.id)}
                                    className="button is-small is-danger">
                                        Delete
                                    </Link>
                            </td>
                        </tr>
                        )
                        )}

                    </tbody>
                </table>
                
                <p>
                    Total Rows: {row} Page: {row ? page + 1 : 0} of {pages}
                </p>
                <p className="has-text-centered has-text-danger">{msg}</p>
                <nav className="pagination is-centered"
                     key={row}
                     role="navigation"
                     aria-label="pagination"
                >
                    <ReactPaginate 
                        previousLabel={"< Prev"}
                        nextLabel={"Next >"}
                        pageCount={Math.min(10, pages)}
                        onPageChange={changePage}
                        containerClassName={"pagination-list"}
                        pageLinkClassName={"pagination-link"}
                        previousLinkClassName={"pagination-previous"}
                        nextLinkClassName={"pagination-next"}
                        activeClassName={"pagination-link is-current"}
                        disabledLinkClassName={"pagination-link is-disabled"}
                    />

                </nav>
            </div>
        </div>
    </div>
)};


export default UserList;

