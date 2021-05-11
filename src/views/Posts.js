import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { API_BASE } from "../config/env";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../components/Posts/Posts.css";
import PostsPagination from '../components/Posts/PostsPagination'
import EditPosts from '../components/Posts/EditPosts'
import PostsList from '../components/Posts/PostsList'

export default class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      totalPages: 0,
      pageNumber: 0,
      limit: 0,
      onSubmit: false,
      onSubmit2: false,
      isedited: false,
      currentPost: "",
    };
    this.getData();
  }

  editPost = (id) => {
    console.log(id)
    this.setState({
      isedited: true,
      currentPost: id,
    });
    console.log("currentPost=> ", this.state.currentPost)
  }


  componentDidMount() {
    this.getData();
    // this.editPost()
  }

  editedFalse = () => {
    this.setState({ isedited: false })
  }


  handleDelete = (myId) => {
    const newPostList = this.state.posts.filter((P) => P.id !== myId);
    console.log(newPostList);

    this.setState({
      posts: newPostList,
      onSubmit: true
    });

    axios.put(`${API_BASE}posts/delete/${myId}`, {
    })
      .then(newPostList.length === 0 ? setTimeout(() => {
        window.location.reload()
      }, 200) : null)
  };


  handlePostPage = (e) => {
    const totalPage = this.state.totalPages
    console.log(e.target.value)
    const currentPage = (e.target.value - 1)
    this.setState({ pageNumber: currentPage })
    console.log(this.state.pageNumber)

    axios
      .get(`${API_BASE}posts/?page=${currentPage}`)
      .then((json) => this.setState({
        posts: json.data.docs,
        totalPages: json.data.totalPages,
        limit: json.data.limit
      }))
  }



  getData() {
    axios
      .get(`${API_BASE}posts/?page=${this.state.pageNumber}`)
      // .then((json) =>console.log(json.data.docs))
      .then((json) => this.setState({
        posts: json.data.docs,
        totalPages: json.data.totalPages
      }))
      .then((json) => console.log(this.state.totalPages))
  }





  render() {

    return (
      <div>
        {/* <Table striped bordered hover>
          <thead>
            <tr>
              <th>Number</th>
              <th>Title</th>
              <th>Type</th>
              <th>Updated</th>
              <th>---</th>
            </tr>
          </thead>
          {this.state.posts.map((post, index) => (
            <tbody>
              <tr>
                <td>
                  {this.state.limit * this.state.pageNumber + (index + 1)}
                </td>
                <td>{post.title}</td>
                <td>{post.post_type === true ? "News" : "Campaigns"}</td>
                <td>{post.updated_at}</td>
                <td>
                  <div className="d-flex">
                    
                      <button
                        type="button"
                        className="btn btn-sm btn-success mr-2 gap-3"
                        onClick={() => { this.editPost(post.id) }}
                      >
                        Edit
                      </button>
                    
                    <Link to={`/`}>
                      <button
                        type="button"
                        onClick={(event) => this.handleDelete(post.id)}
                        className="btn btn-sm btn-danger mx-auto"
                      >
                        Delete
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
   
        
        <PostsPagination totalPages={this.state.totalPages} handlePostPage={this.handlePostPage}></PostsPagination>
        
          
        <div className="text-right mr-4">
          <Link to={`newpost/`}>
            <button className="btn btn-primary">Add New Post</button>
          </Link>
        </div> */}
        {/* <div> */}
        {this.state.isedited ? <EditPosts id={this.state.currentPost} editedFalse={this.editedFalse} /> : <PostsList editPost={this.editPost} />}
        {/* </div> */}
      </div>

    );
  }
}