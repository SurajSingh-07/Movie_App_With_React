import loader from '/loader.webp'

const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
        <img className='w-[50%] h-[50%]' src={loader} alt="" />
    </div>
  )
}

export default Loading