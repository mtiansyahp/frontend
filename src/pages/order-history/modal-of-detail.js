import React from 'react'

const ModalofDetail = ({setIsOpenModal, openDetail}) => {
	return (
		<>
			<img
				className="h-[24px] cursor-pointer mb-1 float-right clear-both"
				onClick={() => setIsOpenModal(false)}
				src="/assets/icons/IconCloseBlack.svg"
				alt=""
			/>
			<p className='font-jakarta text-xl md:text-2xl lg:text-3xl font-light mt-4 mb-8 tracking-[2px]'>Transaction Detail</p>
			
			<div className='grid sm:grid-cols-6 grid-cols-1 gap-5'>
				<div className='sm:col-span-4 flex flex-col gap-3'>
					<div className='p-4 border border-slate-300 flex gap-3 items-center md:text-sm text-xs'>
						<span className={'px-2 rounded-lg font-bold ' 
						+ (openDetail === 'On Progress' ? 'bg-yellow-300' : (openDetail === 'Success' ? 'bg-green-300' : (openDetail === 'Cancelled' && 'bg-red-300')))}>
							{(openDetail === 'On Progress' ? 'On Progress' : (openDetail === 'Success' ? 'Success' : (openDetail === 'Cancelled' && 'Cancelled')))}
						</span>
						<span className='font-light'>{new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate()}</span>
					</div>
					<div className='p-4 border border-slate-300 flex flex-col items-start w-full gap-3'>
						<span className="text-xs md:text-sm lg:text-base font-light tracking-[2px]">RDCSLMC62PROSSLCVLBGL</span>
						<img alt="" src="/assets/images/DummyTableCavalloGalaxy.jpg" className='h-[130px] aspect-[3/2] object-cover'/>
						<div>
							<span className="text-xs md:text-sm lg:text-base font-light tracking-[2px]">Table Top</span>
							<table className='md:text-sm text-xs mt-2'>
								<tr>
									<td>Shape</td>
									<td className='w-[20px] text-center'>:</td>
									<td>blablabla</td>
								</tr>
								<tr>
									<td>Dimension</td>
									<td className='w-[20px] text-center'>:</td>
									<td>blablabla</td>
								</tr>
								<tr>
									<td>Marble Pattern</td>
									<td className='w-[20px] text-center'>:</td>
									<td>blablabla</td>
								</tr>
							</table>
						</div>
						<div>
							<span className="text-xs md:text-sm lg:text-base font-light tracking-[2px]">Table Leg</span>
							<table className='md:text-sm text-xs mt-2' >
								<tr>
									<td>Design</td>
									<td className='w-[20px] text-center'>:</td>
									<td>nanana</td>
								</tr>
								<tr>
									<td>Color</td>
									<td className='w-[20px] text-center'>:</td>
									<td>nanana</td>
								</tr> 
							</table>
						</div>
						<div>
							<p className="text-xs md:text-sm font-light">Rp 20.000.000 x 1</p>
							<p className="text-xs md:text-sm lg:text-base font-bold">Rp 20.000.000</p>
						</div>
					</div>
					<div className='p-4 border border-slate-300 flex flex-col gap-3'>
						<span className="text-xs md:text-sm lg:text-base font-light tracking-[2px]">Address</span>
						<span className="text-xs md:text-sm lg:text-base font-bold">Mas DW</span>
						<span className="text-xs md:text-sm">081237373737</span>
						<span className="text-xs md:text-sm">Jl Perindustrian II Lr Famili No 1234A Sukarami</span>
						<span className="text-xs md:text-sm">30151, Palembang, South Sumatera</span>
					</div>
					<div className='p-4 border border-slate-300 flex flex-col gap-3'>
						<span className="text-xs md:text-sm lg:text-base font-light tracking-[2px]">Total Price</span>
						<table className='w-full lg:text-base md:text-sm text-xs'>
							<tr>
								<td className='py-1.5 pr-10'>Subtotal</td>
								<td className='py-1.5'>Rp 20.000.000</td>
							</tr>
							<tr>
								<td className='py-1.5 pr-10'>Packaging Fee</td>
								<td className='py-1.5'>Rp 230.000</td>
							</tr>
							<tr>
								<td className='py-1.5 pr-10'>Shipping Fee</td>
								<td className='py-1.5'>Rp 0</td>
							</tr>
							<tr>
								<td className='py-1.5 pr-10'>Payment Costs</td>
								<td className='py-1.5 font-bold'>Rp 20.230.000</td>
							</tr>
						</table>
					</div>
				</div>
				<div className='sm:col-span-2 self-start p-4 border border-slate-300 flex flex-col gap-2'>
					<button className='font-bold text-xs md:text-sm text-white bg-primary border border-primary rounded-lg py-2 px-6'>Buy Again</button>
					<button className='font-bold text-xs md:text-sm text-primary border border-primary rounded-lg py-2 px-6'><a href="https://wa.me/+6282273386665" target='_blank'>Chat</a></button>
					{openDetail !== 'Cancelled' && (
						<button className='font-bold text-xs md:text-sm text-primary border border-primary rounded-lg py-2 px-6'>Print</button>
					)}
					{openDetail === 'On Progress' && (
						<button className='font-bold text-xs md:text-sm text-red-500 border border-red-500 rounded-lg py-2 px-6'>Cancel</button>
					)}
				</div>
			</div>
		</>
	)
}

export default ModalofDetail