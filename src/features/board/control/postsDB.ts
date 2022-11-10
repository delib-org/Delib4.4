import { collection, doc, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc,where } from "firebase/firestore";
import { DB } from "../../../control/firebase/config";
import { Post, PostJoi } from "../model/postModel";


export async function addPostToDB(post:Post){
    try {
        const {error} = PostJoi.validate(post);
        if(error) throw error;

        const postRef = doc(DB, 'posts',post.postId);
       
        const some = await setDoc(postRef, {...post, time:serverTimestamp()});
        console.log(some);
        console.log(new Date().getTime())
        
    } catch (error) {
        console.error(error)
    }
}

export function listenToPosts(councilId:string,addPostAsync:Function){
    try {
        const postsRef = collection(DB,'posts');
        const q = query(postsRef,where('councilId','==',councilId),orderBy('time','asc'), limit(20));
        return onSnapshot(q, postsDB=>{

            postsDB.docChanges().forEach((change) => {
                console.log(change.type)
                if (change.type === "added") {
                    const post:any =change.doc.data();
                    post.time = post.time.seconds*1000;
                    addPostAsync(post);
                }
                if (change.type === "modified") {
                    const post:any =change.doc.data();
                    post.time = post.time.seconds*1000;
                    addPostAsync(post);
                }
                if (change.type === "removed") {
                    console.log("Removed city: ", change.doc.data());
                }
              });
        })
    } catch (error) {
        console.error(error);
        return ()=>{}
    }
}