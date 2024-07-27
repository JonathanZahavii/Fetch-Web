import { Divider, Grid } from '@mui/material';
import { Post as PostType } from '@shared/types/post.type';
import { Fragment } from 'react';
import Post from './Post';

type PostsProps = {
  posts: PostType[];
  isEditable?: boolean;
};

const Posts: React.FC<PostsProps> = ({ posts, isEditable = false }) => {
  return (
    <Grid container direction={'column'} sx={{ paddingX: '10vh', justifyContent: 'center' }}>
      <Grid
        item
        container
        sx={{
          justifyContent: 'center',
          flexDirection: 'column',
          paddingX: '25vw',
        }}
      >
        {posts?.map((post: PostType, index) => (
          <Fragment key={post.uuid}>
            <Post post={post} key={post.uuid} isEditable={isEditable} />
            {posts.length - 1 !== index && <Divider />}
          </Fragment>
        ))}
      </Grid>
    </Grid>
  );
};

export default Posts;
