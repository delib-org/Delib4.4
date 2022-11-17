import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { DB } from "../../../control/firebase/config";
import { Post, PostJoi } from "../model/postModel";

export async function addPostToDB(post: Post) {
  try {
    const { error } = PostJoi.validate(post);
    if (error) throw error;

    const postRef = doc(DB, "posts", post.postId);

    await setDoc(postRef, { ...post, time: serverTimestamp() });
  } catch (error) {
    console.error(error);
  }
}

export function listenToPosts(councilId: string, addPostAsync: Function) {
  try {
    const postsRef = collection(DB, "posts");
    const q = query(
      postsRef,
      where("councilId", "==", councilId),
      orderBy("time", "desc"),
      limit(20)
    );
    return onSnapshot(q, (postsDB) => {
      try {
        postsDB.docChanges().forEach((change) => {
          try {
            if (change.type === "added") {
              const post: any = change.doc.data();

              if (post.time !== null) {
                post.time = post.time.seconds * 1000;
                addPostAsync(post);
              }
            }
            if (change.type === "modified") {
              const post: any = change.doc.data();
              post.time = post.time.seconds * 1000;
           
              addPostAsync(post);
            }
            if (change.type === "removed") {
            }
          } catch (error) {
            console.error(error);
          }
        });
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.error(error);
    return () => {};
  }
}
