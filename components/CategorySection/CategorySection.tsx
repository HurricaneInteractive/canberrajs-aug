import { ReactElement } from "react"
import PostCard from "../PostCard";
import getCategoryColour from "../../lib/categoryColors";
import Link from "next/link";
import { itemsById } from "../../lib/categories"

const CategorySection = ({ name = null, categoryId }: any): ReactElement => {
  const items: any = itemsById[categoryId]
  return (
    <div className="mb-8">
      {
        name ? (
          <Link href={{
            pathname: '/resauce',
            query: {
              id: categoryId
            }
          }} >
            <a className={`lowercase block text-gray-500 mb-2 hover:text-${getCategoryColour(parseInt(categoryId))}-500`}>{name}</a>
          </Link>
        ) : (
          false
        )
      }
      <div className="flex flex-wrap -mx-2">
        {items.map((edge: any) => (
          <PostCard {...edge} key={edge.id} color={getCategoryColour(parseInt(categoryId))} />
        ))}
      </div>
    </div>
  )
}
export default CategorySection
