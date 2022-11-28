import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'

import { Footer, Navbar } from '../../components'
import { useWindowDimensions } from '../../utils'

const About = () => {
  const { width, height } = useWindowDimensions()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <Navbar />
      <div className='xl:px-20 lg:px-16 sm:px-10 px-4'>
        <div className='pt-24 flex justify-between'>
          <span className='font-lato text-xs font-medium'>
            <span>
              <Link to='/'>{'<'} Back</Link>
            </span>
            <span> | Home {'>'} About Us </span>
          </span>
        </div>
        <div className='mt-12 mb-16'>
          <h1 className='font-jakarta font-medium text-3xl md:text-4xl lg:text-5xl text-black tracking-wide uppercase'>About Us</h1>
        </div>
        <section className='mt-12 mb-16'>
          <img src='/assets/images/ImgAbout1.png' />
          <div className='grid grid-cols-3 my-14 md:my-28'>
            <div className='col-span-3 md:col-span-1 flex flex-col items-center justify-center'>
              <img src='/assets/icons/IconLogoAlt.svg' className='w-14 h-auto'/>
              <h3 className='font-jakarta font-medium text-3xl md:text-4xl text-black mt-4 tracking-wide'>Estetico Home</h3>
            </div>
            <div className='col-span-3 md:col-span-2 mt-10 md:mt-0'>
              <p className='font-lato text-xl md:text-2xl text-black tracking-[2px] md:text-justify leading-9'>Dipasarkan dengan merek Estetico, kami adalah grup yang bergerak di bidang marmer dan perusahaan konsultan yang mengkhususkan diri dalam kemewahan alami marmer dan kualitas yang menjamin desain alami dan modern. <br/><br /> Proses ini benar-benar kreatif. Itu hanya muncul secara bertahap sebagai hasil dari eksplorasi terus-menerus tentang bagaimana desain ini bisa menjadi lebih inovatif.</p>
            </div>
          </div>
          <div className='grid grid-cols-3 my-14 md:my-28'>
            <div className='col-span-3 md:col-span-1 order-first md:order-last flex flex-col items-center justify-center'>
              <img src='/assets/icons/IconVision.svg' className='w-14 h-auto'/>
              <h3 className='font-jakarta font-medium text-3xl md:text-4xl text-black mt-4 tracking-wide'>Visi Kami</h3>
            </div>
            <div className='col-span-3 md:col-span-2 mt-10 md:mt-0'>
              <p className='font-lato text-xl md:text-2xl text-black tracking-[2px] md:text-justify leading-9'>Visi kami adalah mampu menghasilkan furniture berbahan marmer terbaik, dengan bahan yang sangat bagus dan sesuai dengan keinginan seluruh Indonesia hingga manca negara.</p>
            </div>
          </div>
          <div className='grid grid-cols-3 my-14 md:my-28'>
            <div className='col-span-3 md:col-span-1 flex flex-col items-center justify-center'>
              <img src='/assets/icons/IconMission.svg' className='w-14 h-auto'/>
              <h3 className='font-jakarta font-medium text-3xl md:text-4xl text-black mt-4 tracking-wide'>Misi Kami</h3>
            </div>
            <div className='col-span-3 md:col-span-2 mt-10 md:mt-0'>
              <p className='font-lato text-xl md:text-2xl text-black tracking-[2px] md:text-justify leading-9'>Misi kami adalah mendorong segala kemungkinan dan mengembangkan potensi desain yang ada dengan membuat marmer dengan kualitas yang lebih tinggi guna membangun suasana desain yang lebih natural dan modern.</p>
            </div>
          </div>
          <div className='grid grid-cols-3 my-14 md:my-28'>
            <div className='col-span-3 md:col-span-1 order-first md:order-last flex flex-col items-center justify-center'>
              <img src='/assets/images/ImgAbout3.png' className='w-2/3 h-auto' />
            </div>
            <div className='col-span-3 md:col-span-2 mt-10 md:mt-0'>
              <p className='font-lato text-xl md:text-2xl text-black tracking-[2px] md:text-justify leading-9'>Memberikan karya seni terbaik dengan tim profesional kami untuk memberikan mahakarya dari berbagai macam gaya hidup dan peralatan rumah tangga dengan mengutamakan nilai estetika dan kegunaan untuk setiap jenis produk.</p>
            </div>
          </div>
          <div className='grid grid-cols-3 my-14 md:my-28'>
            <div className='col-span-3 md:col-span-1 flex flex-col items-center justify-center'>
              <img src='/assets/images/ImgAbout4.png' className='w-2/3 h-auto' />
            </div>
            <div className='col-span-3 md:col-span-2 mt-10 md:mt-0'>
              <p className='font-lato text-xl md:text-2xl text-black tracking-[2px] md:text-justify leading-9'>Sangat umum bahwa kualitas marmer adalah salah satu jenis batu alam terbaik di bumi. Oleh karena itu, kami menggunakan marmer sebagai bahan utama untuk menciptakan produk yang memiliki nilai tinggi dan memuaskan keinginan untuk menciptakan karya yang indah dan elegan.</p>
            </div>
          </div>
        </section>
        <section className='mt-20 mb-16'>
          <img src='/assets/images/ImgAbout2.png' />
          <div className='grid grid-cols-3 my-14 md:my-28'>
            <div className='col-span-3 md:col-span-1 flex flex-col items-center justify-center'>
              <img src='/assets/icons/IconLogoAlt.svg' className='w-14 h-auto'/>
              <h3 className='font-jakarta font-medium text-3xl md:text-4xl text-black mt-4 tracking-wide'>Estetico Home</h3>
            </div>
            <div className='col-span-3 md:col-span-2 mt-10 md:mt-0'>
              <p className='font-lato text-xl md:text-2xl text-black tracking-[2px] md:text-justify leading-9'>Marketed under the brand name Estetico, we are a group engaged in marble and a consulting company specializing in the natural luxury of marble and the quality that guarantees a natural and modern design. <br /><br />This process is really creative. It only emerged gradually as a result of constant exploration of how this design could become more innovative.</p>
            </div>
          </div>
          <div className='grid grid-cols-3 my-14 md:my-28'>
            <div className='col-span-3 md:col-span-1 order-first md:order-last flex flex-col items-center justify-center'>
              <img src='/assets/icons/IconVision.svg' className='w-14 h-auto'/>
              <h3 className='font-jakarta font-medium text-3xl md:text-4xl text-black mt-4 tracking-wide'>Our Vision</h3>
            </div>
            <div className='col-span-3 md:col-span-2 mt-10 md:mt-0'>
              <p className='font-lato text-xl md:text-2xl text-black tracking-[2px] md:text-justify leading-9'>Our vision is to be able to produce best furniture made of marble, with very good materials and in accordance with the wishes of all over Indonesia to foreign countries.</p>
            </div>
          </div>
          <div className='grid grid-cols-3 my-14 md:my-28'>
            <div className='col-span-3 md:col-span-1 flex flex-col items-center justify-center'>
              <img src='/assets/icons/IconMission.svg' className='w-14 h-auto'/>
              <h3 className='font-jakarta font-medium text-3xl md:text-4xl text-black mt-4 tracking-wide'>Our Mission</h3>
            </div>
            <div className='col-span-3 md:col-span-2 mt-10 md:mt-0'>
              <p className='font-lato text-xl md:text-2xl text-black tracking-[2px] md:text-justify leading-9'>Our mission is to encourage all possibilities and develop the potential of existing designs by making marble of higher quality in order to build a more natural and modern design atmosphere.</p>
            </div>
          </div>
          <div className='grid grid-cols-3 my-14 md:my-28'>
            <div className='col-span-3 md:col-span-1 order-first md:order-last flex flex-col items-center justify-center'>
              <img src='/assets/images/ImgAbout3.png' className='w-2/3 h-auto' />
            </div>
            <div className='col-span-3 md:col-span-2 mt-10 md:mt-0'>
              <p className='font-lato text-xl md:text-2xl text-black tracking-[2px] md:text-justify leading-9'>Providing the best works of art with our professional team to provide masterpieces of various kinds of lifestyle and household appliances by prioritizing aesthetic values and uses for each type of product.</p>
            </div>
          </div>
          <div className='grid grid-cols-3 my-14 md:my-28'>
            <div className='col-span-3 md:col-span-1 flex flex-col items-center justify-center'>
              <img src='/assets/images/ImgAbout4.png' className='w-2/3 h-auto' />
            </div>
            <div className='col-span-3 md:col-span-2 mt-10 md:mt-0'>
              <p className='font-lato text-xl md:text-2xl text-black tracking-[2px] md:text-justify leading-9'>It is very common that the quality of marble is one of the best types of natural stone on earth. Therefore, we use marble as the main material to create products that have high value and satisfy the desire to create beautiful and elegant works.</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default About