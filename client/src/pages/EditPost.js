import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useParams } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ title: '', content: '', imageURL: '' });

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from('Posts')
        .select()
        .eq('id', id)
        .single();

      setPost(data);
    };

    fetchPost();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updatePost = async (event) => {
    event.preventDefault();
    // Construct the data to be updated
    const postData = { title: post.title, content: post.content, imageURL: post.imageURL };

    // Update post in the database
    await supabase.from('Posts').update(postData).eq('id', id);

    // Redirect back to the post page after updating
    window.location.href = `/`;
};

  return (
    <div>
      <form onSubmit={updatePost}>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          value={post.title} // Populate with post title
          onChange={handleChange}
        />
        <br />
        <br />
        <textarea
          rows="5"
          cols="50"
          id="content"
          name="content"
          placeholder="Content (Optional)"
          value={post.content} // Populate with post content
          onChange={handleChange}
        ></textarea>
        <br />
        <br />
        <input
          type="text"
          id="imageURL"
          name="imageURL"
          placeholder="Image URL (Optional)"
          value={post.imageURL} // Populate with post image URL
          onChange={handleChange}
        />
        <br />
        <br />
        <input type="submit" value="Update Post" method="POST"/>
      </form>
    </div>
  );
};

export default EditPost;
