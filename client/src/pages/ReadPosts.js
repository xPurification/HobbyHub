import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import Card from '../components/Card';

const ReadPosts = () => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, [searchQuery, sortBy]);

    const fetchPosts = async () => {
        let { data, error } = await supabase.from('Posts').select('*');
        if (error) {
            console.error('Error fetching posts:', error.message);
        } else {
            // Filter posts based on search query
            if (searchQuery.trim() !== '') {
                data = data.filter(post =>
                    post.title.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }
            // Sort posts based on sortBy option
            if (sortBy === 'created_at') {
                data = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            } else if (sortBy === 'upvotes') {
                data = data.sort((a, b) => b.upvotes - a.upvotes);
            }
            // Format the created_at timestamps
            data = data.map(post => ({
                ...post,
                created_at: formatTimestamp(post.created_at)
            }));
            setPosts(data);
        }
    };

    const formatTimestamp = (timestamp) => {
        const now = new Date();
        const createdAt = new Date(timestamp);
        const diff = now.getTime() - createdAt.getTime(); // Difference in milliseconds
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
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSortBy = (sortByOption) => {
        setSortBy(sortByOption);
    };

    return (
        <div className="ReadPosts">
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <div>
                <p>Order by: </p>
                <button onClick={() => handleSortBy('created_at')}>Newest</button>
                <button onClick={() => handleSortBy('upvotes')}>Most Popular</button>
            </div>
            {posts.length > 0 ? (
                posts.map((post) => <Card key={post.id} {...post} />)
            ) : (
                <h2>No Posts Found</h2>
            )}
        </div>
    );
};

export default ReadPosts;
