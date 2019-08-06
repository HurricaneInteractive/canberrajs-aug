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
