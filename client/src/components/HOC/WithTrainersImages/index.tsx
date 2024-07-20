import { TrainersImages } from '@/components';

export const WithTrainersImages = <P extends object>(Component: React.FC<P>) => {
  return (props: P) => (
    <>
      <TrainersImages />
      <Component {...props} />
    </>
  );
};
