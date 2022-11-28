import Linkify from 'react-linkify'
import { Link } from 'react-router-dom'
import { useLayoutEffect, useState } from 'react'

import { Footer, Navbar } from '../../components'

const KnowledgeBase = () => {
  const [selectedTab, setSelectedTab] = useState(0)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <Navbar />
      <div className='pt-24 xl:px-20 lg:px-16 sm:px-10 px-4'>
        <span className='font-lato text-xs font-medium'>
          <span>
            <Link to='/'>{'<'} Back</Link>
          </span>
          <span> | Home {'>'} Knowledge Base </span>
        </span>
        <h1 className='font-jakarta font-medium text-2xl md:text-3xl lg:text-4xl tracking-wide mb-4 mt-12'>Knowledge Base</h1>
        <div className='grid grid-cols-2'>
          <div className='col-span-2 md:col-span-1'>
            <button
              onClick={() => setSelectedTab(0)}
              className={'block w-full md:w-3/4 py-3 md:py-5 lg:py-7 px-2 text-left font-jakarta font-medium text-xs md:text-sm lg:text-base tracking-wide text-black' + (selectedTab == 0 && ' border-y-2 border-r-2 cart-shadow border-primary md:rounded-r-[30px]')}>BAGAIMANA CARA MELAKUKAN PEMBELIAN DI ESTETICO HOME</button>
            <button
              onClick={() => setSelectedTab(1)}
              className={'block w-full md:w-3/4 py-3 md:py-5 lg:py-7 px-2 text-left font-jakarta font-medium text-xs md:text-sm lg:text-base tracking-wide text-black' + (selectedTab == 1 && ' border-y-2 border-r-2 cart-shadow border-primary md:rounded-r-[30px]')}>BAGAIMANA CARA BAYAR DI ESTETICO HOME</button>
            <button
              onClick={() => setSelectedTab(2)}
              className={'block w-full md:w-3/4 py-3 md:py-5 lg:py-7 px-2 text-left font-jakarta font-medium text-xs md:text-sm lg:text-base tracking-wide text-black' + (selectedTab == 2 && ' border-y-2 border-r-2 cart-shadow border-primary md:rounded-r-[30px]')}>CARA MENGGUNAKAN DISCOUNT CODE DI ESTETICO HOME</button>
            <button
              onClick={() => setSelectedTab(3)}
              className={'block w-full md:w-3/4 py-3 md:py-5 lg:py-7 px-2 text-left font-jakarta font-medium text-xs md:text-sm lg:text-base tracking-wide text-black' + (selectedTab == 3 && ' border-y-2 border-r-2 cart-shadow border-primary md:rounded-r-[30px]')}>LUPA KATA SANDI</button>
            <button
              onClick={() => setSelectedTab(4)}
              className={'block w-full md:w-3/4 py-3 md:py-5 lg:py-7 px-2 text-left font-jakarta font-medium text-xs md:text-sm lg:text-base tracking-wide text-black' + (selectedTab == 4 && ' border-y-2 border-r-2 cart-shadow border-primary md:rounded-r-[30px]')}>CARA DAFTAR AKUN ESTETICO HOME</button>
          </div>
          <ul className='col-span-2 md:col-span-1 cart-shadow mt-12 md:mt-0 pl-6 pr-8 list-disc text-lg'>
            {selectedTab == 0 && (
              textHowToBuy.map((item, index) => {
                return(
                  <li key={index} className='mb-3 md:mb-7 ml-3'>
                    <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                      <a className='text-[#0000ee]' target='blank' href={decoratedHref} key={key}>
                        {decoratedText}
                      </a>
                    )}>
                      <p className='font-lato text-sm md:text-base text-black whitespace-pre-line text-justify tracking-wide'>{item.content}</p>
                    </Linkify>
                  </li>
                )
              })
            )}
            {selectedTab == 1 && (
              textHowToPay.map((item, index) => {
                return(
                  <li key={index} className='mb-3 md:mb-7 ml-3'>
                    <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                      <a className='text-[#0000ee]' target='blank' href={decoratedHref} key={key}>
                        {decoratedText}
                      </a>
                    )}>
                      <p className='font-lato text-sm md:text-base text-black whitespace-pre-line text-justify tracking-wide'>{item.content}</p>
                    </Linkify>
                  </li>
                )
              })
            )}
            {selectedTab == 2 && (
              textHowToUseDiscount.map((item, index) => {
                return(
                  <li key={index} className='mb-3 md:mb-7 ml-3'>
                    <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                      <a className='text-[#0000ee]' target='blank' href={decoratedHref} key={key}>
                        {decoratedText}
                      </a>
                    )}>
                      <p className='font-lato text-sm md:text-base text-black whitespace-pre-line text-justify tracking-wide'>{item.content}</p>
                    </Linkify>
                  </li>
                )
              })
            )}
            {selectedTab == 3 && (
              textForgotPassword.map((item, index) => {
                return(
                  <li key={index} className='mb-3 md:mb-7 ml-3'>
                    <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                      <a className='text-[#0000ee]' target='blank' href={decoratedHref} key={key}>
                        {decoratedText}
                      </a>
                    )}>
                      <p className='font-lato text-sm md:text-base text-black whitespace-pre-line text-justify tracking-wide'>{item.content}</p>
                    </Linkify>
                  </li>
                )
              })
            )}
            {selectedTab == 4 && (
              textHowToRegister.map((item, index) => {
                return(
                  <li key={index} className='mb-3 md:mb-7 ml-3'>
                    <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                      <a className='text-[#0000ee]' target='blank' href={decoratedHref} key={key}>
                        {decoratedText}
                      </a>
                    )}>
                      <p className='font-lato text-sm md:text-base text-black whitespace-pre-line text-justify tracking-wide'>{item.content}</p>
                    </Linkify>
                  </li>
                )
              })
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const textHowToBuy = [
  {
    content: 'Kunjungi website esteticohome.com dalam browser anda.',
  },
  {
    content: 'Klik pojok kanan atas untuk log in (jika memiliki akun) dan sign up untuk pengguna baru.',
  },
  {
    content: 'Isi data yang diminta dengan sebenar-benarnya',
  },
  {
    content: 'Setelah login, kamu bisa memilih produk Estetico Home yang kamu inginkan.',
  },
  {
    content: 'Kamu bisa memasukkan product Estetico Home ke dalam wishlist kamu',
  },
  {
    content: 'Setelah memilih product yang kamu mau, pilih menu Add to Cart untuk menambahkan product pilihanmu ke dalam keranjang belanjaanmu',
  },
  {
    content: 'Klik Keranjang kamu apabila sudah selesai melakukan pemilihan produk, lalu pilih Proceed to Checkout',
  },
  {
    content: 'Kemudian isi data anda dan klik Ship to This Address untuk pengiriman dengan alamat yang sesuai dengan akun anda. Untuk pengiriman dengan alamat yang berbeda anda klik Ship to Different Address dan isi dengan alamat sesuai yang anda tuju.',
  },
  {
    content: 'Untuk pengambilan barang di toko anda bisa pilih Pickup in Store dan untuk pengiriman langsung ke alamat yang dituju pilih Home Delivery.',
  },
  {
    content: 'Pilih Invoice dan lanjut klik Buy untuk melanjutkan pesanan anda ke halaman Confirm Payment.',
  },
]

const textHowToPay = [
  {
    content: 'Pada halaman Check Out, periksa kembali alamat pengirimanmu',
  },
  {
    content: 'Jika kamu mau kirim ke alamat yang berbeda, kamu tinggal klik "ship to different address"',
  },
  {
    content: 'Selanjutnya, pada bagian Shipping Method kamu boleh pilih ke kota mana barang akan dikirimkan',
  },
  {
    content: 'Review Kembali orderan kamu',
  },
  {
    content: 'Kalau kamu memiliki kode diskon, kamu bisa mengisinya pada bagian "Discount Code" lalu klik apply.',
  },
  {
    content: 'Lalu Klik BUY',
  },
  {
    content: 'Kamu akan masuk ke halaman "Order Summary" dan klik "Continue"',
  },
  {
    content: 'Pilih salah satu Bank di halaman Pembayaran (jika kamu memilih menu Bank Transfer) lalu klik "SEE ACCOUNT NUMBER" untuk dapetin Nomor Virtual Akun kamu',
  },
  {
    content: 'Masukkan Kartu Credit kamu dengan lengkap (jika kamu memilih Credit Card) lalu klik "PAY NOW"',
  },
  {
    content: 'Lakukan pembayaran sesuai metode yang telah dipilih, sebelum estimasi waktu yang diberikan berakhir.',
  },
]

const textHowToUseDiscount = [
  {
    content: 'Pada halaman check out, pilih Discount Code ',
  },
  {
    content: 'Lalu ketik kode yang kamu miliki atau salin code yang sudah kamu copy pada halaman yang tertera',
  },
  {
    content: 'Terakhir, klik APPLY',
  },
  {
    content: 'Discount Code yang sudah kamu masukkan otomatis akan terpasang dan terkalkulasi saat kamu melakukan pembayaran',
  },
]

const textForgotPassword = [
  {
    content: 'Klik Login di pojok kanan atas halaman Estetico Home',
  },
  {
    content: 'Klik Forgot your password',
  },
  {
    content: 'Masukkan email kamu yang terdaftar. Klik Submit',
  },
  {
    content: 'Kemudian cek email kamu dan klik link untuk mengubah password kamu.',
  },
  {
    content: 'Masukkan password baru lalu ulangi password ',
  },
  {
    content: 'Kamu sudah berhasil mengubah password, silahkan coba Login kembali.',
  },
]

const textHowToRegister = [
  {
    content: 'Klik login di pojok kanan atas homepage Estetico Home',
  },
  {
    content: 'Pilih "Create Account"',
  },
  {
    content: 'Isi data lengkap kamu, alamat serta password akun kamu. Lalu klik Register',
  },
  {
    content: 'Kemudian, kamu bisa login menggunakan email dan password yang sudah kamu buat. Happy Shopping!',
  },
]

export default KnowledgeBase