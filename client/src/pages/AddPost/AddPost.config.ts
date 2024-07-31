import { formatDatePicker } from '@/utils/formatDate.util';
import { Post, PostType } from '@shared/types/post.type';
import * as yup from 'yup';

export type AddPostProps = {
  isOpen: boolean;
  close: () => void;
  post?: Post;
  type?: PostType;
};

export type AddPostFormType = Omit<
  Post,
  'createdAt' | 'uuid' | 'user' | 'comments' | 'likes' | 'when' | 'type'
> & { when?: string };

export type LocationRecord = {
  _id: number;
  טבלה: string;
  סמל_ישוב: number;
  שם_ישוב: string;
  שם_ישוב_לועזי: string;
  סמל_נפה: number;
  שם_נפה: string;
  סמל_לשכת_מנא: number;
  לשכה: string;
  סמל_מועצה_איזורית: number;
  שם_מועצה: string;
};

export const createAddPostSchema = (): yup.ObjectSchema<AddPostFormType> =>
  yup.object({
    caption: yup.string().required(),
    petName: yup.string().required(),
    location: yup.string().required(),
    when:
    yup.string().test('type', '', value => value === PostType.PLAYDATE)
        ? yup.string().required()
        : yup.string(),
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
  when: formatDatePicker(new Date()),
  image: new File([''], 'defaultImage.png', { type: 'image/png' }),
};

export const getPostValues = (post?: Post) => {
  if (post)
    return {
      caption: post.caption,
      petName: post.petName,
      location: post.location,
      when: post?.when && formatDatePicker(post.when),
      image: post.image,
      type
    };
  return postDefaultValues;
};
