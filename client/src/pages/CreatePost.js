import React, { useState } from 'react';
import { supabase } from '../client'
import './CreatePost.css'

const CreatePost = () => {

    const [post, setPost] = useState({ title: "", content: "", imageURL: "" })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault();
    
        const postData = { title: post.title, created_at: new Date().toISOString() };
    
        if (post.content.trim() !== '') {
            postData.content = post.content;
        }
    
        if (post.imageURL.trim() !== '') {
            postData.imageURL = post.imageURL;
        }
    
        try {
            const { data, error } = await supabase.from('Posts').insert(postData);
    
            if (error) {
                console.error('Error creating post:', error.message);
            } else {
                console.log('Post created successfully:', data);
                // Optionally, you can redirect the user to the home page after successful creation
                window.location.href = "/";
            }
        } catch (error) {
            console.error('Error creating post:', error.message);
        }
    };
    
    

    return (
        <div>
            <form>
                <input type="text" id="title" name="title" placeholder="Title" onChange={handleChange} /><br />
                <br />

                <textarea rows="5" cols="50" id="content" name="content" placeholder="Content (Optional)" onChange={handleChange}>
                </textarea>
                <br />

                <input type="text" id="imageURL" name="imageURL" placeholder="Image URL (Optional)" onChange={handleChange} /><br />
                <br />

                <input type="submit" value="Create Post" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreatePost