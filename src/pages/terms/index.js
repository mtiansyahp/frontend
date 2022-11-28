import Linkify from 'react-linkify'
import { Link } from 'react-router-dom'
import { useLayoutEffect, useState } from 'react'

import { Footer, Navbar } from '../../components'

const Terms = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english')

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
          <span> | Home {'>'} Terms of Service </span>
        </span>
        {selectedLanguage == 'english' && (
          <h1 className='font-jakarta font-medium text-2xl md:text-3xl lg:text-4xl tracking-wide mb-4 mt-12'>Terms of Service</h1>
        )}
        {selectedLanguage == 'indonesia' && (
          <h1 className='font-jakarta font-medium text-2xl md:text-3xl lg:text-4xl tracking-wide mb-4 mt-12'>Kebijakan Layanan</h1>
        )}
        <div className='grid grid-cols-2'>
          <div className='col-span-2 md:col-span-1'>
            <button
              onClick={() => setSelectedLanguage('english')}
              className={'block w-full md:w-3/4 py-3 md:py-5 lg:py-7 px-2 text-left font-jakarta font-medium text-xs md:text-sm lg:text-base tracking-wide text-black' + (selectedLanguage == 'english' && ' border-y-2 border-r-2 cart-shadow border-primary md:rounded-r-[30px]')}>English</button>
            <button
              onClick={() => setSelectedLanguage('indonesia')}
              className={'block w-full md:w-3/4 py-3 md:py-5 lg:py-7 px-2 text-left font-jakarta font-medium text-xs md:text-sm lg:text-base tracking-wide text-black' + (selectedLanguage == 'indonesia' && ' border-y-2 border-r-2 cart-shadow border-primary md:rounded-r-[30px]')}>Indonesia</button>
          </div>
          <div className='col-span-2 md:col-span-1 cart-shadow mt-12 md:mt-0 pl-6 pr-8'>
            {selectedLanguage == 'english' && (
              textTermsEnglish.map((item, index) => {
                return(
                  <div key={index} className='mb-7'>
                    <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                      <a className='text-[#0000ee]' target='blank' href={decoratedHref} key={key}>
                        {decoratedText}
                      </a>
                    )}>
                      <p className='mb-2.5 font-jakarta font-medium text-xl md:text-2xl text-black tracking-wide'>{item.title}</p>
                      <p className='font-lato text-lg md:text-xl text-black whitespace-pre-line text-justify'>{item.content}</p>
                    </Linkify>
                  </div>
                )
              })
            )}
            {selectedLanguage == 'indonesia' && (
              textTermsIndonesia.map((item, index) => {
                return(
                  <div key={index} className='mb-7'>
                    <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                      <a className='text-[#0000ee]' target='blank' href={decoratedHref} key={key}>
                        {decoratedText}
                      </a>
                    )}>
                      <p className='mb-2.5 font-jakarta font-medium text-xl md:text-2xl text-black tracking-wide'>{item.title}</p>
                      <p className='font-lato text-lg md:text-xl text-black whitespace-pre-line text-justify'>{item.content}</p>
                    </Linkify>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const textTermsEnglish = [
  {
    title: 'Overview',
    content: 'This website is operated by PT. Estetico Fournir Agung. Throughout the site, the terms “we”, “us” and “our” refer to PT. Estetico Fournir Agung. PT. Estetico Fournir Agung offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.\n\nBy visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply  to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.\n\nPlease read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.\n\nAny new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.\n\nOur store is hosted on Lightspeed eCom. They provide us with the online e-commerce platform that allows us to sell our products and services to you.',
  },
  {
    title: 'SECTION 1 - ONLINE STORE TERMS',
    content: 'By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.\n\nYou may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws). You must not transmit any worms or viruses or any code of a destructive nature. A breach or violation of any of the Terms will result in an immediate termination of your Services',
  },
  {
    title: 'SECTION 2 - GENERAL CONDITIONS',
    content: 'We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us. The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.',
  },
  {
    title: 'SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION',
    content: 'We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk. This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.',
  },
  {
    title: 'SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES',
    content: 'Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.',
  },
  {
    title: 'SECTION 5 - PRODUCTS OR SERVICES (if applicable)',
    content: 'Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy. We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor\'s display of any color will be accurate.\n\nWe reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at anytime without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited.\n\nWe do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.',
  },
  {
    title: 'SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION',
    content: 'We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.\n\nYou agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed. For more detail, please review our Returns Policy.',
  },
  {
    title: 'SECTION 7 - OPTIONAL TOOLS',
    content: 'We may provide you with access to third-party tools over which we neither monitor nor have any control nor input. You acknowledge and agree that we provide access to such tools ”as is” and “as available” without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools. Any use by you of optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s). We may also, in the future, offer new services and/or features through the website (including, the release of new tools and resources). Such new features and/or services shall also be subject to these Terms of Service.',
  },
  {
    title: 'SECTION 8 - THIRD-PARTY LINKS',
    content: 'Certain content, products and services available via our Service may include materials from third-parties. Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third-parties. We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party\'s policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.',
  },
  {
    title: 'SECTION 9 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS',
    content: 'If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, \'comments\'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.\n\nWe may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party’s intellectual property or these Terms of Service.\n\nYou agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e-mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.',
  },
  {
    title: 'SECTION 10 - PERSONAL INFORMATION',
    content: 'Your submission of personal information through the store is governed by our Privacy Policy. To view our Privacy Policy.',
  },
  {
    title: 'SECTION 11 - ERRORS, INACCURACIES AND OMISSIONS',
    content: 'Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order). We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in the Service or on any related website has been modified or updated.',
  },
  {
    title: 'SECTION 12 - PROHIBITED USES',
    content: 'In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content:\n\n(a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.',
  },
  {
    title: 'SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY',
    content: 'We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free. We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable. You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you. You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are (except as expressly stated by us) provided \'as is\' and \'as available\' for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement.\n\nIn no case shall PT. Estetico Fournir Agung, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.',
  },
  {
    title: 'SECTION 14 - INDEMNIFICATION',
    content: 'You agree to indemnify, defend and hold harmless PT. Estetico Fournir Agung and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.',
  },
  {
    title: 'SECTION 15 - SEVERABILITY',
    content: 'In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.',
  },
  {
    title: 'SECTION 16 - TERMINATION',
    content: 'The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes. These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.\n\nIf in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).',
  },
  {
    title: 'SECTION 17 - ENTIRE AGREEMENT',
    content: 'The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision. These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).\n\nAny ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.',
  },
  {
    title: 'SECTION 18 - GOVERNING LAW',
    content: 'These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of Indonesian E-Commerce Laws.',
  },
  {
    title: 'SECTION 19 - CHANGES TO TERMS OF SERVICE',
    content: 'You can review the most current version of the Terms of Service at any time at this page. We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.',
  },
  {
    title: 'SECTION 20 - CONTACT INFORMATION',
    content: 'Questions about the Terms of Service should be sent to us at hello@esteticohome.com.',
  },
]

const textTermsIndonesia = [
  {
    title: 'PENINJAUAN',
    content: 'Website ini dioperasikan oleh PT. Estetico Fournir Agung. Di semua situs, istilah “kami”, “kita” dan “milik kami” mengacu pada PT. Estetico Fournir Agung. PT. Estetico Fournir Agung menawarkan situs web ini, termasuk semua informasi, alat-alat dan layanan yang tersedia dari situs ini kepada anda, pengguna, dengan syarat anda menerima semua syarat, ketentuan, kebijakan, dan pemberitahuan yang dinyatakan di sini.\n\nDengan mengunjungi situs kami dan atau membeli sesuatu dari kami, anda terlibat dalam “layanan” kami dan setuju untuk terikat dengan syarat dan ketentuan berikut (“Terms of Service”, “Terms”), termasuk syarat dan ketentuan dan kebijakan tambahan tersebut direferensikan di sini dan/atau tersedia melalui hyperlink. Ketentuan Layanan ini berlaku untuk semua pengguna situs, termasuk pada pengguna browsing, vendor, pelanggan, pedagang, dan/atau kontributor konten.\n\nHarap baca Ketentuan Layanan ini dengan cermat sebelum mengakses atau menggunakan situs web kami. Dengan mengakses atau menggunakan bagian mana pun dari situs, anda setuju untuk terikat dengan Ketentuan Layanan ini. Jika Anda tidak menyetujui semua syarat dan ketentuan perjanjian ini, maka anda tidak boleh mengakses situs web atau menggunakan layanan apa pun. Jika Ketentuan Layanan ini dianggap sebagai penawaran, penerimaan secara tegas terbatas pada Ketentuan Layanan ini.\n\nSetiap fitur atau alat baru yang ditambahkan ke toko juga harus tunduk pada Ketentuan Layanan. Anda dapat meninjau versi terbaru dari Persyaratan Layanan kapan saja di halaman ini. Kami berhak memperbarui, mengubah, atau mengganti bagian mana pun dari Ketentuan Layanan ini dengan memposting pembaruan dan/atau perubahan pada situs web kami. Anda bertanggung jawab untuk memeriksa halaman ini secara berkala untuk mengetahui perubahannya. Penggunaan atau akses Anda yang berkelanjutan ke situs web setelah posting perubahan apa pun merupakan penerimaan atas perubahan tersebut. Toko kami di-host di Lightspeed eCom. Mereka memberi kami platform e-commerce online yang memungkinkan kami menjual produk dan layanan kami kepada Anda.',
  },
  {
    title: 'BAGIAN 1 - KETENTUAN TOKO ONLINE',
    content: 'Dengan menyetujui Ketentuan Layanan ini, Anda menyatakan bahwa Anda setidaknya berusia dewasa di negara bagian atau provinsi tempat tinggal Anda, atau bahwa Anda adalah usia mayoritas di negara bagian atau provinsi tempat tinggal Anda dan Anda telah memberi kami persetujuan Anda untuk mengizinkan salah satu tanggungan kecil Anda untuk menggunakan situs ini.\n\nAnda tidak boleh menggunakan produk kami untuk tujuan ilegal atau tidak sah, dalam penggunaan Layanan Anda juga tidak boleh melanggar hukum apa pun di yurisdiksi Anda (termasuk tetapi tidak terbatas pada undang-undang hak cipta).\n\nAnda tidak boleh mengirimkan worm atau virus atau kode apa pun yang bersifat merusak.\n\nPelanggaran atau pelanggaran terhadap salah satu Persyaratan akan mengakibatkan penghentian segera Layanan Anda.',
  },
  {
    title: 'BAGIAN 2 - KETENTUAN UMUM',
    content: 'Kami berhak untuk menolak layanan kepada siapa pun dengan alasan apa pun kapan saja.\n\nAnda memahami bahwa konten Anda (tidak termasuk informasi kartu kredit), dapat ditransfer tidak terenkripsi dan melibatkan (a) transmisi melalui berbagai jaringan; dan (b) perubahan untuk mematuhi dan menyesuaikan dengan persyaratan teknis jaringan atau perangkat penghubung. Informasi kartu kredit selalu dienkripsi selama transfer melalui jaringan.\n\nAnda setuju untuk tidak mereproduksi, menggandakan, menyalin, menjual, menjual kembali, atau mengeksploitasi bagian mana pun dari Layanan, penggunaan Layanan, atau akses ke Layanan atau kontak apa pun di situs web yang menyediakan layanan, tanpa izin tertulis dari kami.\n\nJudul yang digunakan dalam perjanjian ini disertakan hanya untuk kemudahan dan tidak akan membatasi atau memengaruhi Ketentuan ini.',
  },
  {
    title: 'BAGIAN 3 - AKURASI, KELENGKAPAN DAN KETEPATAN WAKTU INFORMASI',
    content: 'Kami tidak bertanggung jawab jika informasi yang tersedia di situs ini tidak akurat, lengkap, atau terkini. Materi di situs ini disediakan hanya untuk informasi umum dan tidak boleh diandalkan atau digunakan sebagai satu-satunya dasar untuk membuat keputusan tanpa berkonsultasi dengan sumber informasi utama, lebih akurat, lebih lengkap, atau lebih tepat waktu. Setiap ketergantungan pada materi di situs ini adalah risiko Anda sendiri.\n\nSitus ini mungkin berisi informasi sejarah tertentu. Informasi historis, tentu saja, tidak terkini dan disediakan hanya untuk referensi Anda. Kami berhak untuk mengubah isi situs ini setiap saat, tetapi kami tidak memiliki kewajiban untuk memperbarui informasi apa pun di situs kami. Anda setuju bahwa Anda bertanggung jawab untuk memantau perubahan pada situs kami.',
  },
  {
    title: 'BAGIAN 4 - MODIFIKASI LAYANAN DAN HARGA',
    content: 'Harga produk kami dapat berubah sewaktu-waktu tanpa pemberitahuan. Kami berhak setiap saat untuk mengubah atau menghentikan Layanan (atau bagian atau kontennya) tanpa pemberitahuan kapanpun. Kami tidak bertanggung jawab kepada Anda atau pihak ketiga mana pun atas modifikasi, perubahan harga, penangguhan, atau penghentian Layanan.',
  },
  {
    title: 'BAGIAN 5 - PRODUK ATAU LAYANAN (jika berlaku)',
    content: 'Produk atau layanan tertentu mungkin tersedia secara eksklusif secara online melalui situs web. Produk atau layanan ini mungkin memiliki jumlah terbatas dan hanya dapat dikembalikan atau ditukar sesuai dengan Kebijakan Pengembalian kami.\n\nKami telah melakukan segala upaya untuk menampilkan seakurat mungkin warna dan gambar produk kami yang muncul di toko. Kami tidak dapat menjamin bahwa tampilan monitor komputer Anda dengan warna apa pun akan akurat.\n\nKami berhak, tetapi tidak berkewajiban, untuk membatasi penjualan produk atau Layanan kami kepada orang, wilayah geografis, atau yurisdiksi mana pun. Kami dapat menggunakan hak ini berdasarkan kasus per kasus. Kami berhak membatasi jumlah produk atau layanan apa pun yang kami tawarkan. Semua deskripsi produk atau harga produk dapat berubah sewaktu-waktu tanpa pemberitahuan, atas kebijakan kami sendiri. Kami berhak untuk menghentikan produk apa pun kapan saja. Penawaran apa pun untuk produk atau layanan apa pun yang dibuat di situs ini tidak berlaku jika dilarang.\n\nKami tidak menjamin bahwa kualitas produk, layanan, informasi, atau materi lain yang dibeli atau diperoleh oleh Anda akan memenuhi harapan Anda, atau kesalahan apa pun dalam Layanan akan diperbaiki.',
  },
  {
    title: 'BAGIAN 6 - AKURASI INFORMASI PENAGIHAN DAN AKUN',
    content: 'Kami berhak menolak pesanan apa pun yang Anda berikan kepada kami. Kami dapat, atas kebijakan kami sendiri, membatasi atau membatalkan jumlah yang dibeli per orang, per rumah tangga, atau per pesanan. Pembatasan ini dapat mencakup pesanan yang dilakukan oleh atau di bawah akun pelanggan yang sama, kartu kredit yang sama, dan/atau pesanan yang menggunakan alamat penagihan dan/atau pengiriman yang sama. Jika kami melakukan perubahan atau membatalkan pesanan, kami dapat mencoba memberi tahu Anda dengan menghubungi email dan/atau alamat penagihan/nomor telepon yang diberikan pada saat pesanan dibuat. Kami berhak membatasi atau melarang pesanan yang, menurut penilaian kami, tampaknya dilakukan oleh dealer, pengecer, atau distributor.\n\nAnda setuju untuk memberikan informasi akun dan pembelian terkini, lengkap dan akurat untuk semua pembelian yang dilakukan di toko kami. Anda setuju untuk segera memperbarui akun Anda dan informasi lainnya, termasuk alamat email dan nomor kartu kredit Anda serta tanggal kedaluwarsa, sehingga kami dapat menyelesaikan transaksi Anda dan menghubungi Anda sesuai kebutuhan. Untuk detail lebih lanjut, harap tinjau Kebijakan Pengembalian kami.',
  },
  {
    title: 'BAGIAN 7 - ALAT OPSIONAL',
    content: 'Kami dapat memberi Anda akses ke alat pihak ketiga yang tidak kami pantau atau kontrol atau masukan apa pun. Anda mengakui dan setuju bahwa kami menyediakan akses ke alat-alat tersebut "sebagaimana adanya" dan "sebagaimana tersedia" tanpa jaminan, representasi, atau ketentuan apa pun dan tanpa dukungan apa pun. Kami tidak akan memiliki kewajiban apa pun yang timbul dari atau terkait dengan penggunaan optional Anda atas alat pihak ketiga.\n\nSetiap penggunaan oleh Anda atas alat opsional yang ditawarkan melalui situs sepenuhnya merupakan risiko dan kebijaksanaan Anda sendiri dan Anda harus memastikan bahwa Anda memahami dan menyetujui persyaratan alat yang disediakan oleh penyedia pihak ketiga yang relevan.\n\nKami juga dapat, di masa mendatang, menawarkan layanan dan/atau fitur baru melalui situs web (termasuk, rilis alat dan sumber daya baru). Fitur dan/atau layanan baru tersebut juga harus tunduk pada Ketentuan Layanan ini.',
  },
  {
    title: 'BAGIAN 8 - TAUTAN PIHAK KETIGA',
    content: 'Konten, produk, dan layanan tertentu yang tersedia melalui Layanan kami dapat mencakup materi dari pihak ketiga. Tautan pihak ketiga di situs ini dapat mengarahkan Anda ke situs web pihak ketiga yang tidak berafiliasi dengan kami. Kami tidak bertanggung jawab untuk memeriksa atau mengevaluasi konten atau keakuratan dan kami tidak menjamin dan tidak akan memiliki kewajiban atau tanggung jawab apa pun atas materi atau situs web pihak ketiga, atau untuk materi, produk, atau layanan pihak ketiga lainnya.\n\nKami tidak bertanggung jawab atas kerugian atau kerusakan apa pun yang terkait dengan pembelian atau penggunaan barang, layanan, sumber daya, konten, atau transaksi lain apa pun yang dilakukan sehubungan dengan situs web pihak ketiga mana pun. Harap tinjau dengan cermat kebijakan dan praktik pihak ketiga dan pastikan Anda memahaminya sebelum Anda terlibat dalam transaksi apa pun. Keluhan, klaim, kekhawatiran, atau pertanyaan tentang produk pihak ketiga harus ditujukan kepada pihak ketiga.',
  },
  {
    title: 'BAGIAN 9 - KOMENTAR PENGGUNA, UMPAN BALIK, DAN PENGIRIMAN LAINNYA',
    content: 'Jika, atas permintaan kami, Anda mengirim kiriman spesifik tertentu (misalnya entri kontes) atau tanpa permintaan dari kami, Anda mengirim ide kreatif, saran, proposal, rencana, atau materi lainnya, baik secara online, melalui email, melalui surat pos, atau lainnya (secara kolektif, \'komentar\'), Anda setuju bahwa kami dapat, kapan saja, tanpa batasan, mengedit, menyalin, menerbitkan, mendistribusikan, menerjemahkan, dan menggunakan dalam media apa pun komentar apa pun yang Anda teruskan kepada kami. Kami sedang dan tidak berkewajiban (1) untuk menjaga kerahasiaan komentar apa pun; (2) untuk membayar kompensasi untuk setiap komentar; atau (3) untuk menanggapi setiap komentar.\n\nKami dapat, tetapi tidak berkewajiban untuk, memantau, mengedit, atau menghapus konten yang kami tentukan atas kebijakan kami sendiri yang melanggar hukum, menyinggung, mengancam, memfitnah, memfitnah, pornografi, cabul atau tidak pantas atau melanggar kekayaan intelektual pihak mana pun atau Ketentuan Layanan ini.\n\nAnda setuju bahwa komentar Anda tidak akan melanggar hak pihak ketiga mana pun, termasuk hak cipta, merek dagang, privasi, kepribadian, atau hak pribadi atau hak milik lainnya. Anda selanjutnya setuju bahwa komentar Anda tidak akan mengandung materi yang memfitnah atau melanggar hukum, kasar atau cabul, atau mengandung virus komputer atau malware lain yang dengan cara apa pun dapat memengaruhi pengoperasian Layanan atau situs web terkait apa pun. Anda tidak boleh menggunakan alamat email palsu, berpura-pura menjadi orang lain selain diri Anda sendiri, atau menyesatkan kami atau pihak ketiga tentang asal usul komentar apa pun. Anda bertanggung jawab penuh atas setiap komentar yang Anda buat dan keakuratannya. Kami tidak bertanggung jawab dan tidak bertanggung jawab atas komentar apa pun yang diposting oleh Anda atau pihak ketiga mana pun.',
  },
  {
    title: 'BAGIAN 10 - INFORMASI PRIBADI',
    content: 'Pengiriman informasi pribadi Anda melalui toko diatur oleh Kebijakan Privasi kami. Klik untuk melihat Kebijakan Privasi kami (hyperlink).',
  },
  {
    title: 'BAGIAN 11 - KESALAHAN, KETIDAKAKURATAN DAN KELALAIAN',
    content: 'Adakalanya mungkin ada informasi di situs kami atau di Layanan yang berisi kesalahan ketik, ketidakakuratan, atau kelalaian yang mungkin terkait dengan deskripsi produk, harga, promosi, penawaran, biaya pengiriman produk, waktu transit, dan ketersediaan. Kami berhak untuk memperbaiki kesalahan, ketidakakuratan atau kelalaian, dan untuk mengubah atau memperbarui informasi atau membatalkan pesanan jika ada informasi dalam Layanan atau situs web terkait yang tidak akurat setiap saat tanpa pemberitahuan sebelumnya (termasuk setelah Anda mengajukan pesanan Anda).\n\nKami tidak berkewajiban untuk memperbarui, mengubah, atau mengklarifikasi informasi dalam Layanan atau situs web terkait, termasuk tanpa batasan, informasi harga, kecuali sebagaimana diwajibkan oleh hukum. Tidak ada pembaruan atau tanggal pembaruan tertentu yang diterapkan dalam Layanan atau situs web terkait apa pun, yang harus diambil untuk menunjukkan bahwa semua informasi dalam Layanan atau situs web terkait telah dimodifikasi atau diperbarui.\n\n',
  },
  {
    title: 'BAGIAN 12 - PENGGUNAAN YANG DILARANG',
    content: 'Selain larangan lain sebagaimana diatur dalam Ketentuan Layanan, Anda dilarang menggunakan situs atau kontennya:\n\n(a) untuk tujuan yang melanggar hukum; (b) meminta orang lain untuk melakukan atau berpartisipasi dalam tindakan yang melanggar hukum; (c) melanggar peraturan internasional, federal, provinsi atau negara bagian, aturan, undang-undang, atau peraturan lokal; (d) untuk melanggar atau melanggar hak kekayaan intelektual kami atau hak kekayaan intelektual orang lain; (e) melecehkan, menyalahgunakan, menghina, mencelakai, mencemarkan nama baik, memfitnah, meremehkan, mengintimidasi, atau mendiskriminasi berdasarkan jenis kelamin, orientasi seksual, agama, etnis, ras, usia, asal kebangsaan, atau kecacatan; (f) menyampaikan informasi palsu atau menyesatkan; (g) untuk mengunggah atau mengirimkan virus atau jenis kode berbahaya lainnya yang akan atau mungkin digunakan dengan cara apa pun yang akan memengaruhi fungsi atau pengoperasian Layanan atau situs web terkait, situs web lain, atau Internet; (h) untuk mengumpulkan atau melacak informasi pribadi orang lain; (i) melakukan spam, phish, pharm, dalih, spider, crawl, atau scrape; (j) untuk tujuan cabul atau tidak bermoral; atau (k) mengganggu atau menghindari fitur keamanan Layanan atau situs web terkait, situs web lain, atau Internet. Kami berhak untuk menghentikan penggunaan Layanan atau situs web terkait oleh Anda karena melanggar salah satu penggunaan yang dilarang.',
  },
  {
    title: 'BAGIAN 13 - PENOLAKAN JAMINAN; BATASAN TANGGUNG JAWAB',
    content: 'Kami tidak menjamin, menyatakan atau menjamin bahwa penggunaan Anda atas layanan kami tidak akan terganggu, tepat waktu, aman atau bebas dari kesalahan. Kami tidak menjamin bahwa hasil yang mungkin diperoleh dari penggunaan layanan akan akurat atau dapat diandalkan.\n\nAnda setuju bahwa dari waktu ke waktu kami dapat menghapus layanan untuk jangka waktu yang tidak terbatas atau membatalkan layanan kapan saja, tanpa pemberitahuan kepada Anda.\n\nAnda secara tegas setuju bahwa penggunaan Anda atas, atau ketidakmampuan untuk menggunakan, layanan ini merupakan risiko Anda sendiri. Layanan dan semua produk dan layanan yang dikirimkan kepada Anda melalui layanan (kecuali sebagaimana dinyatakan secara tegas oleh kami) disediakan \'sebagaimana adanya\' dan \'sebagaimana tersedia\' untuk Anda gunakan, tanpa representasi, jaminan, atau ketentuan apa pun, baik tersurat maupun tersirat, termasuk semua jaminan tersirat atau kondisi yang dapat diperjualbelikan, kualitas yang dapat diperdagangkan, kesesuaian untuk tujuan tertentu, daya tahan, hak milik, dan non-pelanggaran.\n\nDalam hal apapun PT. Estetico Fournir Agung, direktur, pejabat, karyawan, afiliasi, agen, kontraktor, pekerja magang, pemasok, penyedia layanan, atau pemberi lisensi kami bertanggung jawab atas segala cedera, kehilangan, klaim, atau kerugian langsung, tidak langsung, insidental, hukuman, khusus, atau konsekuensial dalam bentuk apa pun, termasuk, tanpa batasan, kehilangan keuntungan, kehilangan pendapatan, kehilangan tabungan, kehilangan data, biaya penggantian, atau kerusakan serupa, baik berdasarkan kontrak, kesalahan (termasuk kelalaian), kewajiban ketat atau lainnya, yang timbul dari penggunaan Anda atas setiap layanan atau produk apa pun yang diperoleh dengan menggunakan layanan, atau untuk klaim lain apa pun yang terkait dengan cara apa pun atas penggunaan Anda atas layanan atau produk apa pun, termasuk, namun tidak terbatas pada, kesalahan atau kelalaian apa pun dalam konten apa pun, atau kehilangan atau kerusakan dalam bentuk apa pun yang timbul sebagai akibat dari penggunaan layanan atau konten (atau produk) apa pun yang diposting, dikirimkan, atau disediakan melalui layanan, meskipun kemungkinannya telah diberitahukan.\n\nKarena beberapa negara bagian atau yurisdiksi tidak mengizinkan pengecualian atau pembatasan tanggung jawab atas kerusakan konsekuensial atau insidental, di negara bagian atau yurisdiksi tersebut, tanggung jawab kami akan dibatasi hingga batas maksimum yang diizinkan oleh hukum.',
  },
  {
    title: 'BAGIAN 14 - GANTI RUGI',
    content: 'Anda setuju untuk mengganti kerugian, membela dan membebaskan PT. Estetico Fournir Agung dan induk, anak perusahaan, afiliasi, mitra, pejabat, direktur, agen, kontraktor, pemberi lisensi, penyedia layanan, subkontraktor, pemasok, pekerja magang dan karyawan kami, bebas dari tuntutan atau tuntutan apa pun, termasuk biaya pengacara yang wajar, yang dibuat oleh pihak mana pun karena atau timbul dari pelanggaran Anda terhadap Persyaratan Layanan ini atau dokumen yang disertakan sebagai referensi, atau pelanggaran Anda terhadap hukum apa pun atau hak pihak ketiga.',
  },
  {
    title: 'BAGIAN 15 - KETERPISAHAN',
    content: 'Jika ada ketentuan dari Ketentuan Layanan ini yang dianggap melanggar hukum, batal atau tidak dapat dilaksanakan, ketentuan tersebut tetap dapat dilaksanakan sejauh diizinkan oleh hukum yang berlaku, dan bagian yang tidak dapat dilaksanakan akan dianggap terputus dari Ketentuan ini. Layanan, penentuan tersebut tidak akan mempengaruhi keabsahan dan keberlakuan ketentuan lainnya yang tersisa.',
  },
  {
    title: 'BAGIAN 16 - PENGHENTIAN',
    content: 'Kewajiban dan kekurangan para pihak yang timbul sebelum tanggal pengakhiran akan tetap berlaku setelah pengakhiran perjanjian ini untuk semua tujuan. Ketentuan Layanan ini berlaku kecuali dan sampai diakhiri oleh Anda atau kami. Anda dapat mengakhiri Ketentuan Layanan ini kapan saja dengan memberi tahu kami bahwa Anda tidak lagi ingin menggunakan Layanan kami, atau ketika Anda berhenti menggunakan situs kami. Jika menurut penilaian kami Anda gagal, atau kami menduga bahwa Anda telah gagal, untuk mematuhi persyaratan atau ketentuan apa pun dari Persyaratan Layanan ini, kami juga dapat mengakhiri perjanjian ini kapan saja tanpa pemberitahuan dan Anda akan tetap bertanggung jawab atas semua jumlah yang jatuh tempo sampai dan termasuk tanggal pengakhiran; dan/atau karenanya dapat menolak akses Anda ke Layanan kami (atau bagian apa pun darinya).',
  },
  {
    title: 'BAGIAN 17 - SELURUH PERJANJIAN',
    content: 'Kegagalan kami untuk melaksanakan atau menegakkan hak atau ketentuan apa pun dari Ketentuan Layanan ini tidak akan dianggap sebagai pengesampingan hak atau ketentuan tersebut. Ketentuan Layanan ini dan setiap kebijakan atau aturan operasi yang diposting oleh kami di situs ini atau sehubungan dengan Layanan merupakan keseluruhan perjanjian dan pemahaman antara Anda dan kami dan mengatur penggunaan Layanan oleh Anda, menggantikan perjanjian, komunikasi, dan proposal sebelumnya atau pada saat yang bersamaan baik lisan atau tertulis, antara Anda dan kami (termasuk, namun tidak terbatas pada, versi Persyaratan Layanan sebelumnya). Setiap ambiguitas dalam interpretasi Ketentuan Layanan ini tidak boleh ditafsirkan terhadap pihak penyusun.',
  },
  {
    title: 'BAGIAN 18 - HUKUM YANG MENGATUR',
    content: 'Ketentuan Layanan ini dan setiap perjanjian terpisah di mana kami menyediakan Layanan kepada Anda akan diatur oleh dan ditafsirkan sesuai dengan hukum Undang-undang E-Commerce Indonesia.',
  },
  {
    title: 'BAGIAN 19 - PERUBAHAN PERSYARATAN LAYANAN',
    content: 'Anda dapat meninjau versi terbaru dari Persyaratan Layanan kapan saja di halaman ini. Kami berhak, atas kebijakan kami sendiri, untuk memperbarui, mengubah, atau mengganti bagian mana pun dari Ketentuan Layanan ini dengan memposting pembaruan dan perubahan ke situs web kami. Merupakan tanggung jawab Anda untuk memeriksa situs web kami secara berkala untuk mengetahui perubahannya. Penggunaan atau akses Anda yang berkelanjutan ke situs web atau Layanan kami setelah posting perubahan apa pun pada Ketentuan Layanan ini merupakan penerimaan atas perubahan tersebut.',
  },
  {
    title: 'BAGIAN 20 - INFORMASI KONTAK',
    content: 'Pertanyaan tentang Ketentuan Layanan harus dikirimkan kepada kami di hello@esteticohome.com',
  },
]

export default Terms