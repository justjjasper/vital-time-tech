import Image from 'next/image';

export default function Header() {
  return (
    <section className='headerSection mt-4 mb-7 px-5'>
      <div className='headerContainer flex justify-center'>
        <Image
          src='https://assets-global.website-files.com/64bf132a23a9341a7a5d7e4a/6597427449a861ffb2fe1fbf_Logo%20Sideways.png'
          alt='Vital Time Tech Image'
          width={550}
          height={400}
        />
      </div>
    </section>
  )
}