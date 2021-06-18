import "./PostList.css";

import Post from "../Post";

const PostList = (props) => {
  return (
    <div className="PostList">
      {props.postsArray && props.postsArray.map(postData => {
        return <Post postData={postData} userDetails={props.userDetails} key={postData._id} />
      })}
    </div>
  )
}

export default PostList;