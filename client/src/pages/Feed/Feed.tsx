import Posts from '@/components/Posts';
import { Post as PostType } from '@shared/types/post.type';
import { useQuery } from '@tanstack/react-query';

const fetchPosts = async () => {
  //   const data = (await api.get<PostType[]>('/posts')).data;
  const mockPosts: PostType[] = [
    {
      image: 'https://example.com/image1.jpg',
      caption: 'This is the first post',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-01',
      uuid: '1',
      user: {
        uuid: '1',
        name: 'John Doe',
        email: 'johndoe',
        photoURL: 'https://example.com/avatar1.jpg',
      },
      comments: [
        {
          uuid: '1',
          content: 'Great post!',
          createdAt: '2022-01-01',
          user: {
            uuid: '2',
            name: 'Jane Smith',
            email: 'janesmith',
            photoURL: 'https://example.com/avatar2.jpg',
          },
        },
        {
          uuid: '2',
          content: 'Nice photo!',
          createdAt: '2022-01-01',
          user: {
            uuid: '3',
            name: 'Bob Johnson',
            email: 'bobjohnson',
            photoURL: 'https://example.com/avatar3.jpg',
          },
        },
      ],
      likes: 10,
      location: 'New York City',
    },
    {
      image: 'https://example.com/image1.jpg',
      caption: 'This is the second post',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-01',
      uuid: '2',
      user: {
        uuid: '1',
        name: 'John Doe',
        email: 'johndoe',
        photoURL: 'https://example.com/avatar1.jpg',
      },
      comments: [
        {
          uuid: '3',
          content: 'Great post!',
          createdAt: '2022-01-01',
          user: {
            uuid: '2',
            name: 'Jane Smith',
            email: 'janesmith',
            photoURL: 'https://example.com/avatar2.jpg',
          },
        },
        {
          uuid: '4',
          content: 'Nice photo!',
          createdAt: '2022-01-01',
          user: {
            uuid: '3',
            name: 'Bob Johnson',
            email: 'bobjohnson',
            photoURL: 'https://example.com/avatar3.jpg',
          },
        },
      ],
      likes: 20,
      location: 'New York City',
    },
  ];
  return mockPosts;
};

const Feed: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  return isLoading || !data ? <p>Loading...</p> : <Posts posts={data} />;
};

export default Feed;
