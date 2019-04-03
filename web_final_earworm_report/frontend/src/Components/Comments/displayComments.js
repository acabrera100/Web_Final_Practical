import React,{ Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

class CommentDisplay extends Component{
  constructor(props){
    super(props)
    this.state={
      comments:[]
    }
  }
  componentDidMount(){

  axios.get(`/comments/song/${this.state.song_id}`)
  .then(response=>{
    this.setState({
      comments:response.data.comments
    })
  })


  }
  displayFunction = this.state.comments.map((el,i)=>{
    return(
      <div className='singleComment' key={i}>
        {el.comment_body}<br/>
        By: <Link to={`/user/${el.user_id}`}>{el.username} <br/></Link>
      </div>
    )
  })
  render(){
    return(<></>)
  }
}
export default CommentDisplay
