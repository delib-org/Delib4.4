import {FC} from 'react'
import { Post } from '../board/model/postModel'
import moment from 'moment';


interface PostCardProps{
    post:Post
}
const PostCard:FC<PostCardProps> = ({post}) => {
  return (
    <div className='postCard'>
        <div className="postCard__text">
            {post.text}
        </div>
        <div className="postCard__time">
            {moment(post.time).fromNow()}
        </div>
    </div>
  )
}

export default PostCard