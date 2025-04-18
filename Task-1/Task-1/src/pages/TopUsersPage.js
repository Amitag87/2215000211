import { useEffect, useState } from 'react';
import { fetchUsers, fetchPosts, fetchComments } from '../services/api';

export default function TopUsersPage() {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    Promise.all([fetchUsers(), fetchPosts(), fetchComments()]).then(([u, p, c]) => {
      const commentCountByPost = c.data.reduce((acc, comment) => {
        acc[comment.postId] = (acc[comment.postId] || 0) + 1;
        return acc;
      }, {});

      const commentCountByUser = p.data.reduce((acc, post) => {
        acc[post.userId] = (acc[post.userId] || 0) + (commentCountByPost[post.id] || 0);
        return acc;
      }, {});

      const enriched = u.data.map(user => ({
        ...user,
        commentCount: commentCountByUser[user.id] || 0
      }));

      setTopUsers(enriched.sort((a, b) => b.commentCount - a.commentCount).slice(0, 5));
    });
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Top 5 Users with Most Commented Posts</h1>
      <ul>
        {topUsers.map(user => (
          <li key={user.id} className="mb-2">
            {user.name} - {user.commentCount} comments
          </li>
        ))}
      </ul>
    </div>
  );
}