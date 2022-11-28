import Linkify from 'react-linkify'
import { Link } from 'react-router-dom'
import { useLayoutEffect, useState } from 'react'

import { Footer, Navbar } from '../../components'

const FAQ = () => {
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
          <span> | Home {'>'} Terms of Service </span>
        </span>
        <h1 className='font-jakarta font-medium text-2xl md:text-3xl lg:text-4xl tracking-wide mb-4 mt-12'>Frequently Asked Question (FAQ)</h1>
        <div className='grid grid-cols-2'>
          <div className='col-span-2 md:col-span-1'>
            <button
              onClick={() => setSelectedTab(0)}
              className={'block w-full md:w-3/4 py-3 md:py-5 lg:py-7 px-2 text-left font-jakarta font-medium text-xs md:text-sm lg:text-base tracking-wide text-black' + (selectedTab == 0 && ' border-y-2 border-r-2 cart-shadow border-primary md:rounded-r-[30px]')}>General</button>
            <button
              onClick={() => setSelectedTab(1)}
              className={'block w-full md:w-3/4 py-3 md:py-5 lg:py-7 px-2 text-left font-jakarta font-medium text-xs md:text-sm lg:text-base tracking-wide text-black' + (selectedTab == 1 && ' border-y-2 border-r-2 cart-shadow border-primary md:rounded-r-[30px]')}>Payment</button>
            <button
              onClick={() => setSelectedTab(2)}
              className={'block w-full md:w-3/4 py-3 md:py-5 lg:py-7 px-2 text-left font-jakarta font-medium text-xs md:text-sm lg:text-base tracking-wide text-black' + (selectedTab == 2 && ' border-y-2 border-r-2 cart-shadow border-primary md:rounded-r-[30px]')}>Shipping and Return</button>
          </div>
          <div className='col-span-2 md:col-span-1 cart-shadow mt-12 md:mt-0 pl-6 pr-8'>
            {selectedTab == 0 && (
              textGeneral.map((item, index) => {
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
            {selectedTab == 1 && (
              textPayment.map((item, index) => {
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
            {selectedTab == 2 && (
              textShippingReturn.map((item, index) => {
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

const textGeneral = [
  {
    title: 'How to contact Esteticohome',
    content: 'You can call our representative line or send us a chat in support button below.',
  },
  {
    title: 'Where is Esteticohome\'s product manufacture',
    content: 'Esteticohome products are exclusively produced in our workshops located in North Sumatra , Indonesia. We always picks the finest materials and experience craftsmen to manufacture and quality check our products',
  },
  {
    title: 'How to personalize Esteticohome products',
    content: 'Top table color and size is personalizable. Fill in the custom inquiry form or contact to customer service.',
  },
  {
    title: 'How to place a special order',
    content: 'Fill in the custom inquiry form or contact to customer service and let us know what you like. If you have a picture of similar items, you can also send it to us !',
  },
  {
    title: 'How to stay informed about Esteticohome news?',
    content: 'Subscribe our newsletter on our footer, and also follow our Instagram.',
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

const textPayment = [
  {
    title: 'How to contact Esteticohome',
    content: 'You can call our representative line or send us a chat in support button below.',
  },
  {
    title: 'Where is Esteticohome\'s product manufacture',
    content: 'Esteticohome products are exclusively produced in our workshops located in North Sumatra , Indonesia. We always picks the finest materials and experience craftsmen to manufacture and quality check our products',
  },
  {
    title: 'How to personalize Esteticohome products',
    content: 'Top table color and size is personalizable. Fill in the custom inquiry form or contact to customer service.',
  },
  {
    title: 'How to place a special order',
    content: 'Fill in the custom inquiry form or contact to customer service and let us know what you like. If you have a picture of similar items, you can also send it to us !',
  },
  {
    title: 'How to stay informed about Esteticohome news?',
    content: 'Subscribe our newsletter on our footer, and also follow our Instagram.',
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

const textShippingReturn = [
  {
    title: 'Shipping and Return',
    content: 'If you have question or would like to make a return, please contact us for any questions at orders@esteticohome.com',
  },
]

export default FAQ