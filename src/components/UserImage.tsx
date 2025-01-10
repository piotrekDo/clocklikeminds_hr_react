import { FaRegCircleUser } from 'react-icons/fa6';

interface Props {
  imgUrl: string | undefined;
}

export const UserImage = ({ imgUrl }: Props) => {
  if (imgUrl) {
    return (
      <img
        src={imgUrl}
        style={{
          height: '100%',
          objectFit: 'contain',
          borderRadius: '50px',
        }}
        referrerPolicy='no-referrer'
      />
    );
  } else {
    return <FaRegCircleUser filter='blur(2px)' opacity={0.4} size={'100%'} />;
  }
};
