import React from 'react'

const ThanksForOrder = () => {
	var timeleft = 5;
	const timer = setInterval(function(){
		if(timeleft <= 0){
			clearInterval(timer);
			window.history.go(-2);
		} else {
			document.getElementById("countdown").innerHTML = timeleft;
		}
		timeleft -= 1;
	}, 1000);

	return (
		<div className='md:p-4 p-2 relative h-screen w-full flex flex-col justify-center items-center font-jakarta tracking-[5px] lg:text-2xl md:text-xl text-lg text-center'>
			<img
				className="absolute top-2 left-2 h-[30px]"
				src="/assets/icons/Logo.svg"
				alt=""
			/>

			<section>
				<img className='block m-auto mb-8' src="/assets/icons/IconChecklist.svg" alt="" />
				<p className='font-light uppercase mb-5'>Thank you</p>
				<p className='font-bold uppercase mb-6'>For placing your order</p> 
				<p className='font-bold'>
					Redirect in &nbsp;
					<span className='font-light lg:text-3xl md:text-2xl text-xl' id="countdown"></span>
					&nbsp; s
				</p>
			</section>
		</div>
	)
}

export default ThanksForOrder