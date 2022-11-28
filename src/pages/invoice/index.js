import { Link } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import { formatRupiah } from '../../utils'
import { Footer, Navbar } from '../../components'

const Invoice = () => {

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <Navbar />

      <div className="xl:p-20 lg:p-16 sm:p-10 p-4">
        <section className="pt-20 md:pb-20 pb-10 flex justify-center items-center gap-4">
          <img className="md:scale-100 scale-[80%]" src="/assets/icons/IconChecklist.svg" />
          <h1 className="font-jakarta lg:text-4xl md:text-3xl text-2xl font-semibold">Thank You For Your Shopping</h1>
        </section>

        <section>
          <h3 className="text-center font-jakarta lg:text-xl md:text-lg text-base font-bold mb-9">INVOICE</h3>
          <div className="lg:flex lg:justify-between lg:items-center pb-6 sm:px-5">
            <div className="lg:flex lg:justify-between lg:w-3/5">
              <div className="lg:block flex justify-between">
                <h5 className="font-jakarta lg:text-base md:text-sm text-xs font-bold">Invoice Number</h5>
                <p className="font-lato lg:text-base md:text-sm text-xs font-normal">INV00443</p>
              </div>
              <div className="lg:block flex justify-between">
                <h5 className="font-jakarta lg:text-base md:text-sm text-xs font-bold">Order Number</h5>
                <p className="font-lato lg:text-base md:text-sm text-xs font-normal">INV00443</p>
              </div>
              <div className="lg:block flex justify-between">
                <h5 className="font-jakarta lg:text-base md:text-sm text-xs font-bold">Customer</h5>
                <p className="font-lato lg:text-base md:text-sm text-xs font-normal">Budi Setiawan</p>
              </div>
            </div>
            <div className="lg:w-2/5 text-right lg:block flex justify-between">
              <h5 className="font-jakarta lg:text-base md:text-sm text-xs font-bold">Date</h5>
              <p className="font-lato lg:text-base md:text-sm text-xs font-normal">Saturday 23 April 2022</p>
            </div>
          </div>

          <div className="overflow-x-auto scrollbar-custom bg-white rounded-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] overflow-hidden pb-3 mb-6">
            <table className="xl:w-full lg:w-screen w-max">
              <thead>
                <tr className="text-left font-lato lg:text-base md:text-sm text-xs font-bold text-white bg-primary">
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Article Code</th>
                  <th className="px-6 py-3">Quantity</th>
                  <th className="px-6 py-3">Tax</th>
                  <th className="px-6 py-3">Item Price</th>
                  <th className="px-6 py-3">Discount</th>
                  <th className="px-6 py-3">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-b-[#E5E5E5] font-lato lg:text-base md:text-sm text-xs font-normal">
                  <td className="px-6 py-3 font-jakarta lg:text-base md:text-sm text-xs font-bold">Estetico Home Bar Table <span className="block font-lato lg:text-base md:text-sm text-xs font-normal">Varian : Black</span></td>
                  <td className="px-6 py-3"></td>
                  <td className="px-6 py-3 text-center">x 1</td>
                  <td className="px-6 py-3 text-center">0%</td>
                  <td className="px-6 py-3 text-right">Rp. 10.000.000,-</td>
                  <td className="px-6 py-3 text-right">Rp. 100.000,-</td>
                  <td className="px-6 py-3 text-right">Rp. 10.100.000,-</td>
                </tr>
                <tr className="border-b border-b-[#E5E5E5] font-lato lg:text-base md:text-sm text-xs font-normal">
                  <td className="px-6 py-3 font-jakarta lg:text-base md:text-sm text-xs font-bold">Shipping & handling <span className="block font-lato lg:text-base md:text-sm text-xs font-normal">Kota Medan - Free</span></td>
                  <td className="px-6 py-3"></td>
                  <td className="px-6 py-3 text-center">x 1</td>
                  <td className="px-6 py-3 text-center">0%</td>
                  <td className="px-6 py-3 text-right">Rp. 0,-</td>
                  <td className="px-6 py-3 text-right">Rp. 0,-</td>
                  <td className="px-6 py-3 text-right">Rp. 0,-</td>
                </tr>
                <tr className="border-b border-b-[#E5E5E5] font-lato lg:text-base md:text-sm text-xs font-normal">
                  <td className="px-6 py-3 font-jakarta lg:text-base md:text-sm text-xs font-bold">Payment Costs <span className="block font-lato lg:text-base md:text-sm text-xs font-normal">Midtrans - Credit Card</span></td>
                  <td className="px-6 py-3"></td>
                  <td className="px-6 py-3 text-center">x 1</td>
                  <td className="px-6 py-3 text-center">0%</td>
                  <td className="px-6 py-3 text-right">Rp. 4.400,-</td>
                  <td className="px-6 py-3 text-right">Rp. 0,-</td>
                  <td className="px-6 py-3 text-right">Rp. 4.400,-</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="sm:flex sm:justify-between sm:items-center sm:pb-20 pb-14 sm:px-5">
            <div className="lg:w-3/5 sm:w-1/2">
              <h5 className="font-jakarta lg:text-base md:text-sm text-xs font-bold sm:block hidden">Note :</h5>
              <p className="font-lato lg:text-base md:text-sm text-xs font-normal sm:text-left text-right">Estimated Working Time 17 - 21 Days.</p>
            </div>
            <div className="lg:w-2/5 sm:w-1/2">
              <div className="flex justify-between">
                <p className="font-lato lg:text-base md:text-sm text-xs font-normal">Total excl. Tax</p>
                <p className="font-lato lg:text-base md:text-sm text-xs font-normal font-right">Rp. 10.100.000,-</p>
              </div>
              <div className="flex justify-between">
                <h5 className="font-jakarta lg:text-base md:text-sm text-xs font-bold">Total incl. Tax</h5>
                <h5 className="font-jakarta lg:text-base md:text-sm text-xs font-bold font-right">Rp. 10.104.400,-</h5>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="sm:flex sm:justify-between sm:items-start sm:gap-10 pb-6">
            <div className="sm:w-1/2 w-[90%]">
              <div className="sm:pb-10 pb-5">
                <h5 className="font-jakarta lg:text-base md:text-sm text-xs font-bold">Shipping Address</h5>
                <ul>
                  <li className="font-lato lg:text-base md:text-sm text-xs font-normal">Budi Setiawan</li>
                  <li className="font-lato lg:text-base md:text-sm text-xs font-normal">Jl. Brigjend H Kasim No. 1880 RT. 023 RW. 005, Bukit Sangkal, Kalidoni, Palembang, Sumatera Selatan</li>
                </ul>
              </div>
              <div className="sm:pb-0 pb-5">
                <h5 className="font-jakarta lg:text-base md:text-sm text-xs font-bold">Payment Method</h5>
                <p className="font-lato lg:text-base md:text-sm text-xs font-normal">Midtrans - Credit Card</p>
              </div>
            </div>
            <div className="sm:w-1/2 w-[90%]">
              <h5 className="font-jakarta lg:text-base md:text-sm text-xs font-bold">Bank Details</h5>
              <ul>
                <li className="font-lato lg:text-base md:text-sm text-xs font-normal">Account holder PT Estetico Fournir Agung</li>
                <li className="font-lato lg:text-base md:text-sm text-xs font-normal">Bank code number 8250775777</li>
                <li className="font-lato lg:text-base md:text-sm text-xs font-normal">Bank Central Asia</li>
                <li className="font-lato lg:text-base md:text-sm text-xs font-normal">BIC CENAIDJA</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <Link to ='/' className="font-jakarta lg:lg:text-base md:text-sm text-xs font-bold px-6 py-2 border border-primary bg-primary text-white duration-500 hover:bg-white hover:text-primary rounded-[10px]">Back to Home</Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

export default Invoice