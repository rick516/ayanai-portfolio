import { navLinks } from "../constants"
import { menu, close } from "../assets"
import { styles } from "../styles"
import { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {

  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);

  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-transparent`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto gap-x-10">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          {/* <img src={logo} alt="logo" className="w-10 h-10 object-contain" /> */}
          <p className="text-2xl text-white text-[18px] font-bold cursor-pointer">Ayanai J<span className="text-[#0fffeb]">0</span>urnal</p>
        </Link>
        <ul className="list-none hidden sm:flex justify-row gap-x-10">
          {navLinks.map((link) => (
            <li
              key={link.title}
              className={`${active === link.title ? 'text-white' : 'text-secondary'} hover:text-white font-medium cursor-pointer text-[18px]`}
              onClick={() => setActive(link.title)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActive(link.title);
                }
              }}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
        <div className="flex justify-end flex-1 items-center sm:hidden">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setToggle(!toggle);
              }
            }}
          />
          <div
            className={`${!toggle ? 'hidden' : 'flex'} absolute p-6 black-gradient top-20 right-0 mx-4 my-2 min-w-[140px] z-1 rounded-xl`}>
            <ul className="list-none flex justify-end items-start flex-col gap-y-4">
              {navLinks.map((link) => (
                <li
                  key={link.title}
                  className={`${active === link.title ? 'text-white' : 'text-secondary'} hover:text-white font-medium cursor-pointer text-[18px]`}
                  onClick={() => {
                    setActive(link.title);
                    setToggle(!toggle);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActive(link.title);
                    }
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar