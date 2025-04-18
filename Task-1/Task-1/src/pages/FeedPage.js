import { useEffect, useState } from 'react';
import { fetchPosts } from '../services/api';

export default function FeedPage() {
  const [posts, setPosts] = useState([]);

  const loadPosts = () => {
    fetchPosts().then(res => {
      const sorted = res.data.sort((a, b) => new Date(b.timestamp || b.createdAt) - new Date(a.timestamp || a.createdAt));
      setPosts(sorted);
    });
  };

  useEffect(() => {
    loadPosts();
    const interval = setInterval(loadPosts, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Live Feed</h1>
      {posts.map(post => (
        <div key={post.id} className="border p-4 rounded mb-4">
          <h2 className="font-semibold">{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}