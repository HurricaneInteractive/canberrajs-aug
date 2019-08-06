# _app

```javascript
import '../styles/index.css'
import "../styles/nprogress.css"

import React from 'react'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import withApollo from "../lib/withApollo"
import Page from '../components/Page';

class MyApp extends App {
  render () {
    const { Component, pageProps, apollo } = this.props

    return (
      <Container>
          <ApolloProvider client={apollo}>
            <Page>
              <Component {...pageProps} />
            </Page>
          </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)
```

# nav

```javascript
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
```

# index.tsx

```javascript
import { Component } from 'react';
import { gql } from "apollo-boost";

import CategorySection from "../components/CategorySection"

class Home extends Component {
  static async getInitialProps({ apolloClient }: any) {
    const data = await apolloClient.query({
      query: gql`
        query AllCategories {
          categories {
            id
            name
          }
        }
      `
    })

    return { data }
  }

  renderCategorySections = (data: any) => {
    const { categories } = data

    return categories.map((edge: any) => {
      const { name, id } = edge
      return <CategorySection name={name} categoryId={id} key={id} />
    })
  }

  render = () => {
    const { data } = this.props
    return (
      <>
        { this.renderCategorySections(data.data) }
      </>
    )
  }
}

export default Home
```

# Category Section
```javascript
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
```

# resauce
```javascript
import { Component } from "react";
import { withRouter } from 'next/router';
import CategorySection from "../components/CategorySection";

class Resauce extends Component {
  render = () => {
    return (
      <>
        <CategorySection categoryId={this.props.router.query.id} />
      </>
    )
  }
}

export default withRouter(Resauce)
```
