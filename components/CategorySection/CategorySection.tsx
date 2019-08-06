import { ReactElement } from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import PostCard from "../PostCard";
import getCategoryColour from "../../lib/categoryColors";
import Link from "next/link";

const GET_POSTS_BY_CATEGORYID = gql`
  query PostsByCateogory($categoryId: Int!) {
    posts(where: {categoryId: {_eq: $categoryId}}) {
      id
      title
      content
    }
  }
`

const CategorySection = ({ name = null, categoryId }: any): ReactElement => {
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
        <Query query={GET_POSTS_BY_CATEGORYID} variables={{ categoryId }}>
          {({ loading, error, data }: any): ReactElement[] | string => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          const { posts } = data

          return posts.map((edge: any) => (
            <PostCard title={edge.title} content={edge.content} key={edge.id} color={getCategoryColour(parseInt(categoryId))} />
          ))
        }}
        </Query>
      </div>
    </div>
  )
}
export default CategorySection
