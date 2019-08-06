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

# index.tsx

```javascript
import { Component } from 'react';
import { gql } from "apollo-boost";

import CategorySection from "../components/CategorySection"
import PageTitle from '../components/PageTitle';
import Nav from "../components/nav";

class Home extends Component {
  static async getInitialProps({ apolloClient }: any) {
    const categories = await apolloClient.query({
      query: gql`
        query AllCategories {
          categories(where: {
            exclude: 1,
            hideEmpty: true
          }) {
            edges {
              node {
                name
                categoryId
              }
            }
          }
        }
      `
    })

    return { categories }
  }

  renderCategorySections = (categories: any) => {
    const { data: { categories: { edges } } } = categories

    return edges.map((edge: any) => {
      const { node: { name, categoryId } } = edge
      return <CategorySection name={name} categoryId={categoryId} key={categoryId} />
    })
  }

  render = () => {
    const { categories } = this.props
    return (
      <>
        { this.renderCategorySections(categories) }
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
    posts(where:{categoryId:$categoryId}) {
      edges {
        node {
          id
          title
          content
        }
      }
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

          const { posts: { edges } } = data

          return edges.map((edge: any) => (
            <PostCard {...edge.node} key={edge.node.id} color={getCategoryColour(parseInt(categoryId))} />
          ))
        }}
        </Query>
      </div>
    </div>
  )
}
export default CategorySection
```

#nav

```javascript
import Link from 'next/link'
import { gql } from "apollo-boost";
import { Query } from "react-apollo"
import { ReactElement } from 'react';
import getCategoryColour from '../lib/categoryColors';

const GET_CATEGORIES = gql`
  query GetCategoriesForNav {
    categories(where: {
      exclude: 1,
      hideEmpty: true
    }) {
      edges {
        node {
          name
          categoryId
        }
      }
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

            const { categories: { edges } } = data

            return edges.map((edge: any): ReactElement => (
              <li className="px-5">
                <Link href={`/resauce?id=${edge.node.categoryId}`}>
                  <a className={`whitespace-no-wrap text-xs font-bold uppercase block relative text-${getCategoryColour(edge.node.categoryId)}-600`}>
                    {edge.node.name}
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

# resauce
```javascript
import { Component } from "react";
import { gql } from "apollo-boost";
import { withRouter } from 'next/router';
import CategorySection from "../components/CategorySection";

class Resauce extends Component {
  static async getInitialProps({ query, apolloClient }: any) {
    const categories = await apolloClient.query({
      query: gql`
        query PostsByCateogory($categoryId: Int!) {
          posts(where:{categoryId:$categoryId}) {
            edges {
              node {
                id
                title
                content
              }
            }
          }
        }
      `,
      variables: {
        categoryId: query.id
      }
    })

    return { categories }
  }

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
