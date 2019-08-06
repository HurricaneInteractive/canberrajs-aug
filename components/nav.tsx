import Link from 'next/link'
import { ReactElement } from 'react';
import getCategoryColour from '../lib/categoryColors';
import { categories } from "../lib/categories"

export default function Nav () {
  return (
    <nav>
      <ul className='flex justify-between items-center pt-8 pb-4 mb-10 border-b-2 border-gray-300 overflow-x-auto'>
        {categories.map((edge: any): ReactElement => (
            <li className="px-5">
              <Link href={`/resauce?id=${edge.categoryId}`}>
                <a className={`whitespace-no-wrap text-xs font-bold uppercase block relative text-${getCategoryColour(edge.categoryId)}-600`}>
                  {edge.name}
                </a>
              </Link>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}
