// export interface NavigationItem {
//   name: string;
//   url: string;
// }

// interface NavigationBarProps {
//   isAuthenticated: boolean;
//   userDetails?: User;
//   navigationItems: NavigationItem[];
// }

// export function NavigationBar({
//   isAuthenticated,
//   userDetails,
//   navigationItems,
// }: NavigationBarProps) {
//   return (
//     <header className="bg-white border-b-[1px] border-b-[#e1e1e1]">
//       <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">
//           <div className="flex-1 md:flex md:items-center md:gap-12">
//             <a className="block text-teal-600" href="#">
//               <span className="sr-only">Home</span>
//               <p className="text-2xl">✈️</p>
//             </a>
//           </div>

//           <div className="md:flex md:items-center md:gap-12">
//             <nav aria-label="Global" className="hidden md:block">
//               <ul className="flex items-center gap-6 text-sm">
//                 {navigationItems.map((item, index) => (
//                   <li key={index}>
//                     <a
//                       className="text-gray-500 transition hover:text-gray-500/75"
//                       href={item.url}
//                     >
//                       {" "}
//                       {item.name}{" "}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </nav>

//             <div className="flex items-center gap-4">
//               <div className="sm:flex sm:gap-4">
//                 {isAuthenticated ? (
//                   <a
//                     className="text-gray-500 transition hover:text-gray-500/75"
//                     href="/profile"
//                   >
//                     {userDetails?.fullName}
//                   </a>
//                 ) : (
//                   <>
//                     <a
//                       className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
//                       href="/login"
//                     >
//                       Login
//                     </a>

//                     <div className="hidden sm:flex">
//                       <a
//                         className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
//                         href="/signup"
//                       >
//                         Register
//                       </a>
//                     </div>
//                   </>
//                 )}
//               </div>

//               <div className="block md:hidden">
//                 <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="size-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M4 6h16M4 12h16M4 18h16"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
