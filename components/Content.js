import Image from 'next/image';
import { locationSVG } from '/public/assets/icons';

export default function Content({ image, title, location }) {
  return (
    <div className='contentInfoContainer flex items-center px-5 sm:px-10 py-4 bg-white'>
      <Image
        src={image}
        alt={`${title} image`}
        width={96}
        height={96}
        className='rounded-md mr-7'
      />
      <div className='contentText'>
        <span className='font-semibold text-[14px] sm:text-[16px] md:text-[19px] mb-2'>{title}</span>
        <div className='flex items-center'>
          <span className='mr-3'>{locationSVG}</span>
          <span className='text-[14px] md:text-[17px]'>{location}</span>
        </div>
      </div>
    </div>
  )
}