import { Post } from '@shared/types/post.type';
import { useQuery } from '@tanstack/react-query';

export const USE_GET_POSTS_KEY = 'posts';

const fetchPosts = async (userUuid?: string) => {
  console.log(userUuid);
  //   return (await api.get<PostType[]>(`/posts/${userUuid}`)).data;
  const mockPosts: Post[] = [
    {
      image: new File([''], 'image1.jpg', { type: 'image/jpeg' }),
      caption: 'This is the first post',
      petName: 'Buddy',
      when: new Date(),
      createdAt: '2022-01-01',
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
      location: 'HOLON',
    },
    {
      image: new File([''], 'image1.jpg', { type: 'image/jpeg' }),
      caption: 'This is the second post',
      petName: 'Buddy',
      when: new Date(),
      createdAt: '2022-01-01',
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

export const useGetPosts = (userUuid?: string) =>
  useQuery({
    queryKey: [USE_GET_POSTS_KEY],
    queryFn: () => fetchPosts(userUuid),
  });
