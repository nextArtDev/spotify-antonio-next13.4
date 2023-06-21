// import Link from 'next/link'
// import React, { useState } from 'react'
// import Logo from './Logo'
// import { useRouter } from 'next/router'
// import {
//   InstagramIcon,
//   MoonIcon,
//   SunIcon,
//   TelegramIcon,
//   WhatsappIcon,
// } from './Icons'
// import { motion } from 'framer-motion'
// import useThemeSwitcher from './hooks/useThemeSwitcher'

// const CustomLink = ({ href, title, className = '' }) => {
//   const router = useRouter()
//   return (
//     <Link href={href} className={`${className} relative group`}>
//       {title}
//       <span
//         className={`h-[2px] inline-block bg-dark absolute right-0 -bottom-0.5
//           group-hover:w-full transition-[width] ease duration-300 ${
//             router.asPath === href ? 'w-full' : 'w-0'
//           } dark:bg-light `}
//       >
//         &nbsp;
//       </span>
//     </Link>
//   )
// }
// const CustomMobileLink = ({ href, title, className = '', toggle }) => {
//   const router = useRouter()
//   const handleClick = () => {
//     router.push(href)
//     toggle()
//   }
//   return (
//     <button
//       href={href}
//       className={`${className} relative group text-light dark:text-dark my-2`}
//       onClick={handleClick}
//     >
//       {title}
//       <span
//         className={`h-[2px] inline-block bg-light absolute right-0 -bottom-0.5
//         group-hover:w-full transition-[width] ease duration-300 ${
//           router.asPath === href ? 'w-full' : 'w-0'
//         } dark:bg-dark `}
//       >
//         &nbsp;
//       </span>
//     </button>
//   )
// }
// function Navbar() {
//   const [mode, setMode] = useThemeSwitcher()
//   const [isOpen, setIsOpen] = useState(false)

//   const handleClick = () => {
//     setIsOpen(!isOpen)
//   }
//   return (
//     <header className=" relative w-full px-32 py-8 font-semibold flex items-center justify-between dark:text-light z-10 lg:px-16 md:px-12 sm:px-8 ">
//       {/* Hamberguer Menue */}
//       <button
//         className="flex-col justify-center items-center hidden lg:flex  "
//         onClick={handleClick}
//       >
//         <span
//           className={`bg-dark dark:bg-light block h-0.5 w-6 transition-all duration-300 ease-out rounded-sm ${
//             isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
//           } `}
//         ></span>
//         <span
//           className={`bg-dark dark:bg-light block h-0.5 w-6 transition-all duration-300 ease-out rounded-sm my-0.5 ${
//             isOpen ? 'opacity-0' : 'opacity-100'
//           } `}
//         ></span>
//         <span
//           className={`bg-dark dark:bg-light block h-0.5 w-6 transition-all duration-300 ease-out rounded-sm ${
//             isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
//           }`}
//         ></span>
//       </button>

//       {/* Large Menu */}
//       <div className="w-full flex justify-between items-center lg:hidden">
//         <nav className="flex gap-8 justify-between text-lg ">
//           <CustomLink href="/" title="خانه" />
//           <CustomLink href="/about" title="درباره من" />
//           <CustomLink href="/projects" title="پروژه‌ها" />
//           <CustomLink href="/articles" title="مقالات" />
//         </nav>
//         <nav className="flex flex-wrap justify-center items-center gap-4 ">
//           <motion.a
//             href="https://twitter.com"
//             target={'_blank'}
//             whileHover={{ y: -2 }}
//             whileTap={{ scale: 0.9 }}
//             className="w-7  text-pink-600 "
//           >
//             <InstagramIcon />
//           </motion.a>
//           <motion.a
//             href="https://twitter.com"
//             target={'_blank'}
//             whileHover={{ y: -2 }}
//             whileTap={{ scale: 0.9 }}
//             className="w-7 text-blue-500"
//           >
//             <TelegramIcon />
//           </motion.a>
//           <motion.a
//             href="https://twitter.com"
//             target={'_blank'}
//             whileHover={{ y: -2 }}
//             whileTap={{ scale: 0.9 }}
//             className="w-7 text-green-600 "
//           >
//             <WhatsappIcon />
//           </motion.a>
//           <button
//             onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
//             className={`mr-4 p-1 flex items-center justify-center rounded-full ${
//               mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'
//             } `}
//           >
//             {mode === 'dark' ? (
//               <SunIcon className={'fill-dark'} />
//             ) : (
//               <MoonIcon className={'fill-dark'} />
//             )}
//           </button>
//         </nav>
//       </div>
//       {/* Mobile Menu */}
//       {isOpen ? (
//         <motion.div
//           initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
//           animate={{ scale: 1, opacity: 1 }}
//           className="min-w-[70vw] z-30 flex flex-col justify-between items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md py-32 "
//         >
//           <nav className="flex items-center flex-col justify-center ">
//             <CustomMobileLink href="/" title="خانه" toggle={handleClick} />
//             <CustomMobileLink
//               href="/about"
//               title="درباره من"
//               toggle={handleClick}
//             />
//             <CustomMobileLink
//               href="/projects"
//               title="پروژه‌ها"
//               toggle={handleClick}
//             />
//             <CustomMobileLink
//               href="/articles"
//               title="مقالات"
//               toggle={handleClick}
//             />
//           </nav>
//           <nav className="flex flex-wrap justify-center items-center gap-4 mt-4 ">
//             <motion.a
//               href="https://twitter.com"
//               target={'_blank'}
//               whileHover={{ y: -2 }}
//               whileTap={{ scale: 0.9 }}
//               className="w-7 sm:mx-1  text-pink-600 "
//             >
//               <InstagramIcon />
//             </motion.a>
//             <motion.a
//               href="https://twitter.com"
//               target={'_blank'}
//               whileHover={{ y: -2 }}
//               whileTap={{ scale: 0.9 }}
//               className="w-7 sm:mx-1 text-blue-500"
//             >
//               <TelegramIcon />
//             </motion.a>
//             <motion.a
//               href="https://twitter.com"
//               target={'_blank'}
//               whileHover={{ y: -2 }}
//               whileTap={{ scale: 0.9 }}
//               className="w-7 sm:mx-1 text-green-600 "
//             >
//               <WhatsappIcon />
//             </motion.a>
//             <button
//               onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
//               className={`mr-4 p-1 flex items-center justify-center rounded-full ${
//                 mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'
//               } `}
//             >
//               {mode === 'dark' ? (
//                 <SunIcon className={'fill-dark'} />
//               ) : (
//                 <MoonIcon className={'fill-dark'} />
//               )}
//             </button>
//           </nav>
//         </motion.div>
//       ) : null}
//       <div className="absolute left-[50%] top-2 translate-x-[-50%] ">
//         <Logo />
//       </div>
//     </header>
//   )
// }

// export default Navbar
