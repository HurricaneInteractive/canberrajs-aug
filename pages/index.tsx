import { Component } from 'react';
import CategorySection from "../components/CategorySection"
import { categories } from "../lib/categories"

class Home extends Component {
  renderCategorySections = () => {
    return categories.map(({ name, categoryId }) => {
      return <CategorySection name={name} categoryId={categoryId} key={categoryId} />
    })
  }

  render = () => {
    return (
      <>
        { this.renderCategorySections() }
      </>
    )
  }
}

export default Home
