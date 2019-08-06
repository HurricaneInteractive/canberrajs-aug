import Link from 'next/link'
import { gql } from "apollo-boost";
import { Query } from "react-apollo"
import { ReactElement } from 'react';
import getCategoryColour from '../lib/categoryColors';

const GET_CATEGORIES = gql`
  query GetCategoriesForNav {
    categories {
      id
      name
    }
  }
`

export default function Nav () {
  return (
    <nav>
      <ul className='flex justify-between items-center pt-8 pb-4 mb-10 border-b-2 border-gray-300 overflow-x-auto'>
        <Query query={GET_CATEGORIES}>
          {({ loading, error, data }: any): string | ReactElement[] => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            const { categories } = data

            return categories.map((edge: any): ReactElement => (
              <li className="px-5" key={edge.id}>
                <Link href={`/resauce?id=${edge.id}`}>
                  <a className={`whitespace-no-wrap text-xs font-bold uppercase block relative text-${getCategoryColour(edge.id)}-600`}>
                    {edge.name}
                  </a>
                </Link>
              </li>
            ))
          }}
        </Query>
      </ul>
    </nav>
  )
}
