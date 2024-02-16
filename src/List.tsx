import React, { useEffect } from "react";
import { fetchPost } from "./store/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import store, { IRootState } from "./store/store";
const List = () => {
  const dispatch = useDispatch<typeof store.dispatch>();

  useEffect(() => {
    dispatch(fetchPost());
  }, [dispatch]);
  const { posts, status, error } = useSelector((state: IRootState) => state);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>List of Posts</h1>
      <ul>
        {posts.map((post: { id: number; title: string; body: string }) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
