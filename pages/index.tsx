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
