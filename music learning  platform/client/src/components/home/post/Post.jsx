import { styled, Box, Typography, Button } from '@mui/material';

const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 350px;
    & > img, & > p {
        padding: 0 5px 5px 5px;
    }
`;

const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150
});

// Text styles matching the Publish button color
const Text = styled(Typography)`
    color: #d65a0d; // Match the Publish button background color
    font-size: 12px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
    color:rgb(7, 6, 6); // Match the Publish button background color
`;

const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
    color:rgb(3, 2, 2); // Match the Publish button background color
`;

// Custom styled button for Publish
const PublishButton = styled(Button)(({ theme }) => ({
    backgroundColor: ' #f87f07e7', // Background color
    color: 'white', // Text color
    '&:hover': {
        backgroundColor: '#e08c61', // Hover color
    },
    marginTop: '10px', // Optional: Add some margin for spacing
}));

const Post = ({ post, onPublish }) => { // Accept onPublish as a prop
    const url = post.picture ? post.picture : '/home.png';
    
    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    } 

    return (
        <Container>
            <Image src={url} alt="post" />
            <Text>{post.categories}</Text>
            <Heading>{addEllipsis(post.title, 20)}</Heading>
            <Text>Author: {post.username}</Text>
            <Details>{addEllipsis(post.description, 100)}</Details>
            <PublishButton variant="contained" onClick={onPublish}>Click</PublishButton> {/* Call onPublish on click */}
        </Container>
    )
}

export default Post;