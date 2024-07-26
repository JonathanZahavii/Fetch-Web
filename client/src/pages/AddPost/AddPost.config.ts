import * as yup from 'yup';

export type AddPostProps = {
  isOpen: boolean;
  close: () => void;
};

export type AddPostFormType = {
  image: File | null;
  caption: string;
  petName: string;
  location: string;
  when: Date;
};

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
