import { Post } from '@shared/types/post.type';
import * as yup from 'yup';

export type AddPostProps = {
  isOpen: boolean;
  close: () => void;
  post?: Post;
};

export type AddPostFormType = Omit<Post, 'createdAt' | 'uuid' | 'user' | 'comments' | 'likes'>;

export const createAddPostSchema = (): yup.ObjectSchema<AddPostFormType> =>
  yup.object({
    caption: yup.string().required(),
    petName: yup.string().required(),
    location: yup.string().required(),
    when: yup.date().required(),
    image: yup
      .mixed<File>()
      .required()
      .test(
        'fileSize',
        'File too large',
        value => !value || (value && value.size <= 1024 * 1024 * 5) // 5MB limit
      )
      .test(
        'fileFormat',
        'Unsupported Format',
        value => !value || (value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type))
      ),
  });

export const postDefaultValues = {
  caption: '',
  petName: '',
  location: '',
  when: new Date(),
  image: new File([''], 'defaultImage.png', { type: 'image/png' }),
};
