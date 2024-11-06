import Logo from '../logo/logo'

const UserAccount = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="flex h-full">
      <div className="bg-secondary text-white flex-[1] items-center hidden md:flex">
        <img src="/library.png" alt="library" />
      </div>
      <div className="flex-[1.5] flex flex-col items-center justify-center px-4 md:px-0">
        <div className="justify-center mb-8">
          <Logo />
        </div>
        <div className="max-w-96 w-full">{children}</div>
      </div>
    </div>
  )
}

export default UserAccount
