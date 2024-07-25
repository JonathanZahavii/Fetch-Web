import { Grid } from '@mui/material';
import { Post as PostType } from '@shared/types/post.type';
import Post from './Post';

type PostsProps = {
  posts: PostType[];
  isEditable?: boolean;
};

const Posts: React.FC<PostsProps> = ({ posts, isEditable = false }: PostsProps) => {
  return (
    <Grid container direction={'column'} sx={{ paddingX: '10vh', justifyContent: 'center' }}>
      <Grid
        item
        container
        sx={{
          justifyContent: 'center',
          flexDirection: 'column',
          paddingX: '25vw',
          paddingY: '3vh',
        }}
      >
        {posts?.map((post: PostType) => (
          <Post post={post} key={post.uuid} isEditable={isEditable} />
        ))}
      </Grid>
    </Grid>
  );
};

export default Posts;
