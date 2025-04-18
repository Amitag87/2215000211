import { useEffect, useState } from 'react';
import { fetchPosts, fetchComments } from '../services/api';

export default function TrendingPostPage() {
  const [trendingPost, setTrendingPost] = useState(null);

  useEffect(() => {
    Promise.all([fetchPosts(), fetchComments()]).then(([p, c]) => {
      const commentCount = c.data.reduce((acc, comment) => {
        acc[comment.postId] = (acc[comment.postId] || 0) + 1;
        return acc;
      }, {});

      const sorted = p.data.map(post => ({
        ...post,
        commentCount: commentCount[post.id] || 0
      })).sort((a, b) => b.commentCount - a.commentCount);

      setTrendingPost(sorted[0]);
    });
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Trending Post</h1>
      {trendingPost && (
        <div className="border p-4 rounded shadow">
          <h2 className="font-semibold">{trendingPost.title}</h2>
          <p>{trendingPost.body}</p>
          <p className="text-sm mt-2 text-gray-600">Comments: {trendingPost.commentCount}</p>
        </div>
      )}
    </div>
  );
}
