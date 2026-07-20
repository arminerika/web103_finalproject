import { useState, useEffect } from 'react'
import { createPost, getArtist } from '../api.js'
import { useSearchParams } from 'react-router-dom';
import currentUser from "../currentUser.js";

export default function PostCreateForm() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [content, setContent] = useState("")
    const [artist, setArtist] = useState({})

    const artistId = searchParams.get('artist')
    
    useEffect(() => {
        getArtist(artistId).then(setArtist);
      }, [artistId]);

      const handleChange = (event) => {
        setContent(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        createPost(currentUser.id, artistId, content)
        window.location.href = `/artists/${artistId}?new_post=true`
    }

    return (
        <div>
            <div className="detail-titlebar">
                <h1>{artist.name}</h1>
            </div>
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit} className='edit-form'>
                <textarea
                    name="content"
                    placeholder='Text for new post'
                    id="content"
                    value={content}
                    onChange={handleChange}
                ></textarea>        
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}