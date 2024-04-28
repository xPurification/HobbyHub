import './ViewPost.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../client';

const ViewPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, []);

    const fetchPost = async () => {
        const { data, error } = await supabase
            .from('Posts')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching post:', error.message);
        } else {
            // Calculate relative time
            const createdTimeAgo = calculateTimeAgo(data.created_at);
            // Update post with relative time
            setPost({ ...data, created_at: createdTimeAgo });
        }
    };

    const calculateTimeAgo = (timestamp) => {
        const now = new Date();
        const createdAt = new Date(timestamp);
        const diff = now - createdAt;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        if (months > 0) {
            return `${months} month${months > 1 ? 's' : ''} ago`;
        } else if (weeks > 0) {
            return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
        } else if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        }
    };

    const fetchComments = async () => {
        try {
            const { data, error } = await supabase
                .from('Posts')
                .select('comments')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching comments:', error.message);
            } else {
                // Ensure comments data is an array
                let commentsArray = [];
                if (typeof data.comments === 'string') {
                    // Parse the string to convert it into an array
                    commentsArray = JSON.parse(data.comments);
                } else if (Array.isArray(data.comments)) {
                    // If already an array, use it directly
                    commentsArray = data.comments;
                } else {
                    console.error('Comments data is not an array:', data.comments);
                }

                // Set the comments state
                setComments(commentsArray);
            }
        } catch (error) {
            console.error('Error fetching comments:', error.message);
        }
    };

    const handleChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!newComment.trim()) return;

        // Combine new comment with existing comments
        const updatedComments = [...comments, newComment];

        await supabase.from('Posts').update({ comments: updatedComments }).eq('id', id);

        setComments(updatedComments);
        setNewComment('');
    };

    const handleUpvote = async () => {
        try {
            // Increment the upvotes count by one
            const updatedUpvotes = post.upvotes + 1;

            // Update the upvotes count in the database
            await supabase.from('Posts').update({ upvotes: updatedUpvotes }).eq('id', id);

            // Update the local state with the new upvotes count
            setPost(prevPost => ({ ...prevPost, upvotes: updatedUpvotes }));
        } catch (error) {
            console.error('Error upvoting post:', error.message);
        }
    };

    const deletePost = async () => {
        try {
            // Delete the post from the database
            await supabase.from('Posts').delete().eq('id', id);
            // Redirect the user to the home page or another appropriate page
            // Here, we'll just navigate back to the home page
            window.location.href = '/';
        } catch (error) {
            console.error('Error deleting post:', error.message);
        }
    };

    return (
        <div className="ViewPost">
            {post ? (
                <div>
                    <p className="created_at">Created {post.created_at}</p>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                    {post.imageURL && (
                        <div className="postImageContainer">
                            <img src={post.imageURL} alt="Post" className="postImage" />
                        </div>
                    )}
                    <div className="postDetails">
                        <button className="upvoteButton" onClick={handleUpvote}>👍{post.upvotes} upvotes</button>
                        <div>
                            <Link to={`/edit/${id}`} className="editDeleteButtons">✏️</Link>
                            <button className="editDeleteButtons" onClick={deletePost}>🗑️</button>
                        </div>
                    </div>

                    <div>
                        {comments.length > 0 ? (
                            <div>
                                <h2>Comments:</h2>
                                <ul>
                                    {comments.map((comment, index) => (
                                        <li key={index} className="comment">{comment}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p>No comments yet.</p>
                        )}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <textarea
                            rows="3"
                            cols="50"
                            value={newComment}
                            onChange={handleChange}
                            placeholder="Add a comment..."
                        ></textarea>
                        <br />
                        <button type="submit">Submit Comment</button>
                    </form>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ViewPost;