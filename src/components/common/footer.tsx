export function Footer() {
  return (
    <footer className='border-grid border-b'>
      <div className='container-wrapper'>
        <div className='containerless-prose p-2 container flex flex-row gap-1 py-8 md:py-10 lg:py-12 justify-between items-baseline'>
          <p>
            &copy; 2025 code.altie122.xyz by{" "}
            <a href='https://altie122.xyz'>altie122</a>
          </p>
          {
            <>
              <img
                src='/WordMark-Black.png'
                alt='Logo'
                className='w-24 h-auto object-cover dark:hidden'
              />
              <img
                src='/WordMark-White.png'
                alt='Logo'
                className='w-24 h-auto object-cover hidden dark:block'
              />
            </>
          }
        </div>
      </div>
    </footer>
  );
}
