import React, { useState, useEffect, useContext } from 'react';
import { styled, Box, TextareaAutosize, Button, InputBase, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);
    const [category, setCategory] = useState(''); // State for category selection

    const url = post.picture ? post.picture : '/home.png';
    
    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                
                const response = await API.uploadFile(data);
                post.picture = response.data;
            }
        }
        getImage();
        post.categories = category || location.search?.split('=')[1] || 'All'; // Update categories with selected category
        post.username = account.username;
    }, [file, category]) // Add category to dependencies

    const savePost = async () => {
        await API.createPost(post);
        navigate('/');
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value); // Update category state
    }

    return (
        <Container>
            <style>
                {`
                    .publish-button {
                        background-color: #d65a0d; /* Your desired background color */
                        color: white; /* Text color */
                    }
                    .publish-button:hover {
                        background-color: #e08c61; /* Hover color */
                    }
                `}
            </style>

            <Image src={url} alt="post" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField onChange={(e) => handleChange(e)} name='title' placeholder="Title" />
                <Button onClick={() => savePost()} variant="contained" className="publish-button">Publish</Button>
            </StyledFormControl>

            <FormControl fullWidth style={{ marginTop: '20px' }}>
                <InputLabel id="category-label">Select Category</InputLabel>
                <Select
                    labelId="category-label"
                    value={category}
                    onChange={handleCategoryChange}
                    displayEmpty
                >
                    <MenuItem value="Chordophones">Chordophones</MenuItem>
                    <MenuItem value="Aerophones">Aerophones</MenuItem>
                    <MenuItem value="Idiophones">Idiophones</MenuItem>
                    <MenuItem value="Membranophones">Membranophones</MenuItem>
                    <MenuItem value="Keyboard-Instruments">Keyboard Instruments</MenuItem>
                    <MenuItem value="Electronic-Instruments">Electronic Instruments </MenuItem>
                </Select>
            </FormControl>

            <Textarea
                rowsMin={5}
                placeholder="Tell your story..."
                name='description'
                onChange={(e) => handleChange(e)} 
            />
        </Container>
    )
}

export default CreatePost;