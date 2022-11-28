import { useLayoutEffect } from 'react'
import { Footer, Navbar } from '../../components'
import Linkify from 'react-linkify'

const PrivacyPolicy = () => {

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <Navbar />

      <div className="xl:px-20 lg:px-16 sm:px-10 px-4">
        <section className="pt-24 pb-10">
          <span className="font-lato text-xs font-medium">   
            <a className="hover:text-primary" href="#">{'<'} Back </a> | 
            <a className="hover:text-primary" href="#"> Home </a> {'>'} Privacy & Policy
          </span>
        </section>

        <section className="md:pb-14 pb-10">
          <h1 className="font-jakarta lg:text-4xl md:text-3xl text-2xl font-semibold md:mb-14 mb-10">PRIVACY & POLICY</h1>
          <img className="w-screen" src="/assets/images/BannerPrivacyPolicy.jpg" />
        </section>

        <section className="lg:w-1/2 sm:w-2/3 w-[90%] mx-auto flex flex-col flex-wrap">
          <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
            <a className='text-[#0000ee]' target='blank' href={decoratedHref} key={key}>
              {decoratedText}
            </a>
          )}>
            <div className="md:pb-7 pb-4">
              <h2 className="font-jakarta lg:text-xl md:text-lg text-base font-medium tracking-[3%] mb-[10px]">KEBIJAKAN PRIVASI</h2>
              <p className="font-lato lg:text-base md:text-sm text-xs font-normal tracking-[3%] mb-2">Kebijakan Privasi ini menjelaskan bagaimana informasi pribadi Anda dikumpulkan, digunakan, dan dibagikan saat Anda mengunjungi atau melakukan pembelian dari https://www.esteticohome.com</p>
            </div>
            <div className="md:pb-7 pb-4">
              <h2 className="font-jakarta lg:text-xl md:text-lg text-base font-medium tracking-[3%] mb-[10px]">INFORMASI PRIBADI YANG KAMI KUMPULKAN</h2>
              <p className="font-lato lg:text-base md:text-sm text-xs font-normal tracking-[3%] mb-2">Saat Anda mengunjungi situs, kami secara otomatis mengumpulkan informasi tertentu tentang perangkat Anda, termasuk informasi tentang browser web Anda, alamat IP, zona waktu, dan beberapa cookie yang diinstal pada perangkat Anda. Selain itu, saat Anda menelusuri website, kami mengumpulkan informasi tentang halaman web atau produk individual yang Anda lihat, situs web atau istilah pencarian apa yang merujuk Anda ke situs, dan informasi tentang bagaimana Anda berinteraksi dengan Situs. Kami menyebut informasi yang dikumpulkan secara otomatis ini sebagai “Informasi Perangkat.” Kami mengumpulkan Informasi Perangkat menggunakan teknologi berikut:
                <ul className="list-disc">
                  <li>
                    "Cookies" adalah file data yang ditempatkan di perangkat atau komputer Anda dan sering kali menyertakan pengenal unik anonim. Untuk informasi lebih lanjut tentang cookie, dan cara menonaktifkan cookie, kunjungi http://www.allaboutcookies.org
                  </li>
                  <li>
                    "File log" melacak tindakan yang terjadi di Situs, dan mengumpulkan data termasuk alamat IP Anda, jenis browser, penyedia layanan Internet, halaman rujukan/keluar, dan cap tanggal/waktu.
                  </li>
                  <li>
                    "Web beacon", "tag", dan "piksel" adalah file elektronik yang digunakan untuk merekam informasi tentang cara Anda menjelajahi website.
                  </li>
                </ul>
              </p>
              <p className="font-lato lg:text-base md:text-sm text-xs font-normal tracking-[3%] mb-2">Selain itu, ketika Anda melakukan pembelian atau mencoba melakukan pembelian melalui website, kami mengumpulkan informasi tertentu dari Anda, termasuk nama Anda, alamat penagihan, alamat pengiriman, informasi pembayaran (termasuk nomor kartu kredit), alamat email, dan nomor telepon. Kami menyebut informasi ini sebagai “Informasi Pemesanan.”</p>
              <p className="font-lato lg:text-base md:text-sm text-xs font-normal tracking-[3%] mb-2">Ketika kami berbicara tentang "Informasi Pribadi" dalam Kebijakan Privasi ini, kami berbicara tentang Informasi Perangkat dan Informasi Pemesanan.</p>
            </div>
            <div className="md:pb-7 pb-4">
              <h2 className="font-jakarta lg:text-xl md:text-lg text-base font-medium tracking-[3%] mb-[10px]">BAGAIMANA KAMI MENGGUNAKAN INFORMASI PRIBADI ANDA?</h2>
              <p className="font-lato lg:text-base md:text-sm text-xs font-normal tracking-[3%] mb-2">Kami menggunakan Informasi Pesanan yang kami kumpulkan secara umum untuk memenuhi pesanan apa pun yang dilakukan melalui website (termasuk memproses informasi pembayaran Anda, mengatur pengiriman, dan memberi Anda faktur dan/atau konfirmasi pesanan). Selain itu, kami menggunakan Informasi Pesanan ini untuk:
                <ul className="list-disc">
                  <li>
                    Komunikasi denganmu;
                  </li>
                  <li>
                    Menyaring pesanan kami untuk kemungkinan risiko atau penipuan; dan
                  </li>
                  <li>
                    Jika sejalan dengan preferensi yang telah Anda bagikan kepada kami, berikan informasi atau iklan kepada Anda terkait dengan produk atau layanan kami.
                  </li>
                </ul>
              </p>
              <p className="font-lato lg:text-base md:text-sm text-xs font-normal tracking-[3%] mb-2">Kami menggunakan Informasi Perangkat yang kami kumpulkan untuk membantu kami menyaring potensi risiko dan penipuan (khususnya, alamat IP Anda), dan secara lebih umum untuk meningkatkan dan mengoptimalkan website kami (misalnya, dengan menghasilkan analitik tentang bagaimana pelanggan kami menelusuri dan berinteraksi dengan website, dan untuk menilai keberhasilan kampanye pemasaran dan periklanan kami).</p>
            </div>
            <div className="md:pb-7 pb-4">
              <h2 className="font-jakarta lg:text-xl md:text-lg text-base font-medium tracking-[3%] mb-[10px]">BERBAGI INFORMASI PRIBADI ANDA</h2>
              <p className="font-lato lg:text-base md:text-sm text-xs font-normal tracking-[3%] mb-2">Kami membagikan informasi pribadi Anda dengan pihak ketiga untuk membantu kami menggunakan informasi pribadi Anda, sebagaimana dijelaskan di atas. Misalnya, kami menggunakan Lightspeed untuk memperkuat toko online kami Anda dapat membaca lebih lanjut tentang bagaimana Lightspeed menggunakan Informasi Pribadi Anda di sini link lightspeed. Kami juga menggunakan Google Analytics untuk membantu kami memahami bagaimana pelanggan kami menggunakan website ini. Anda dapat membaca lebih lanjut tentang bagaimana Google menggunakan Informasi Pribadi Anda di sini: https://www.google.com/intl/id/policies/privacy. Anda juga dapat memilih keluar dari Google Analytics di sini: https://tools.google.com/dlpage/gaoptout
              </p>
              <p className="font-lato lg:text-base md:text-sm text-xs font-normal tracking-[3%] mb-2">Terakhir, kami juga dapat membagikan informasi pribadi Anda untuk mematuhi undang-undang dan peraturan yang berlaku, untuk menanggapi panggilan pengadilan, surat perintah penggeledahan, atau permintaan sah lainnya untuk informasi yang kami terima, atau untuk melindungi hak-hak kami.</p>
            </div>
            <div className="md:pb-7 pb-4">
              <h2 className="font-jakarta lg:text-xl md:text-lg text-base font-medium tracking-[3%] mb-[10px]">IKLAN PERILAKU</h2>
              <p className="font-lato lg:text-base md:text-sm text-xs font-normal tracking-[3%] mb-2">Saat Anda Seperti yang dijelaskan di atas, kami menggunakan informasi pribadi Anda untuk memberi Anda iklan bertarget atau komunikasi pemasaran yang kami yakini mungkin menarik bagi Anda. Untuk informasi lebih lanjut tentang cara kerja iklan bertarget, Anda dapat mengunjungi halaman Network Advertising Initiative’s (NAI) di http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work. Anda dapat memilih keluar dari iklan bertarget dengan:
                <ul className="list-disc">
                  <li>
                    FACEBOOK - https://www.facebook.com/settings/?tab=ads
                  </li>
                  <li>
                    GOOGLE - https://www.google.com/settings/ads/anonymous
                  </li>
                  <li>
                    BING - https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads
                  </li>
                </ul>
              </p>
              <p className="font-lato lg:text-base md:text-sm text-xs font-normal tracking-[3%] mb-2">Selain itu, Anda dapat memilih keluar dari beberapa layanan ini dengan mengunjungi portal penyisihan Digital Advertising Alliance di: http://optout.aboutads.info/.</p>
            </div>
            <div className="md:pb-7 pb-4">
              <h2 className="font-jakarta lg:text-xl md:text-lg text-base font-medium tracking-[3%] mb-[10px]">JANGAN TRACK</h2>
              <p className="font-lato lg:text-base md:text-sm text-xs font-normal tracking-[3%] mb-2">Harap dicatat bahwa kami tidak mengubah pengumpulan data dan praktik penggunaan website kami ketika kami melihat sinyal Jangan Lacak dari browser Anda.</p>
            </div>
            <div className="md:pb-7 pb-4">
              <h2 className="font-jakarta lg:text-xl md:text-lg text-base font-medium tracking-[3%] mb-[10px]">HAK ANDA</h2>
              <p className="font-lato lg:text-base md:text-sm text-xs font-normal tracking-[3%] mb-2">Jika Anda adalah penduduk Eropa, Anda berhak mengakses informasi pribadi yang kami simpan tentang Anda dan meminta agar informasi pribadi Anda diperbaiki, diperbarui, atau dihapus. Jika Anda ingin menggunakan hak ini, silakan hubungi kami melalui informasi kontak di bawah ini.</p>
              <p className="font-lato lg:text-base md:text-sm text-xs font-normal tracking-[3%] mb-2">Selain itu, jika Anda adalah penduduk Eropa, kami mencatat bahwa kami memproses informasi Anda untuk memenuhi kontrak yang mungkin kami miliki dengan Anda (misalnya jika Anda melakukan pemesanan melalui website), atau untuk mengejar kepentingan bisnis sah kami yang tercantum di atas. Selain itu, harap perhatikan bahwa informasi Anda akan ditransfer ke luar Eropa, termasuk ke Kanada dan Amerika Serikat.</p>
            </div>
            <div className="md:pb-7 pb-4">
              <h2 className="font-jakarta lg:text-xl md:text-lg text-base font-medium tracking-[3%] mb-[10px]">MELINDUNGI DATA PELANGGAN</h2>
              <p className="font-lato lg:text-base md:text-sm text-xs font-normal tracking-[3%] mb-2">Kami mengumpulkan, menggunakan, dan mengirimkan data pribadi yang terkait dengan pelanggan sesuai dengan undang-undang dan peraturan nasional dan Eropa yang berlaku. Kami menghormati privasi pelanggan dan merupakan satu-satunya pemilik informasi yang dikumpulkan melalui situs web kami, kecuali ditentukan oleh yang lain. Informasi yang diberikan oleh pelanggan tidak akan dijual, dibagikan, atau disewakan kepada pihak ketiga dengan cara apa pun selain yang dinyatakan dalam pernyataan privasi situs web. Kami berhak untuk mempublikasikan informasi tentang pengunjung jika ada alasan untuk menganggap bahwa publikasi informasi diperlukan untuk mengidentifikasi, menghubungi atau membuka kasus pengadilan terhadap seseorang yang, baik disengaja atau tidak, melukai atau merusak hak dan properti milik kami, pengguna lain dari situs web atau orang lain yang mungkin mengalami kerusakan. Kami berhak memberikan informasi tentang pengguna jika dengan itikad baik hukum mewajibkannya. Saat Anda melakukan pemesanan melalui website, kami akan menyimpan informasi pemesanan Anda untuk catatan kami kecuali dan sampai Anda meminta kami untuk menghapus informasi ini.</p>
            </div>
            <div className="md:pb-7 pb-4">
              <h2 className="font-jakarta lg:text-xl md:text-lg text-base font-medium tracking-[3%] mb-[10px]">PERUBAHAN</h2>
              <p className="font-lato lg:text-base md:text-sm text-xs font-normal tracking-[3%] mb-2">Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu untuk mencerminkan misalnya, perubahan pada praktik kami atau untuk alasan operasional, hukum, atau peraturan lainnya.</p>
            </div>
            <div className="md:pb-7 pb-4">
              <h2 className="font-jakarta lg:text-xl md:text-lg text-base font-medium tracking-[3%] mb-[10px]">HUBUNGI KAMI</h2>
              <p className="font-lato lg:text-base md:text-sm text-xs font-normal tracking-[3%] mb-2">Untuk informasi lebih lanjut tentang praktik privasi kami, jika Anda memiliki pertanyaan, atau jika Anda ingin mengajukan keluhan, silakan hubungi kami melalui email di hello@esteticohome.com </p>
            </div>
          </Linkify>
        </section>
      </div>

      <Footer />
    </div>
  )
}

export default PrivacyPolicy