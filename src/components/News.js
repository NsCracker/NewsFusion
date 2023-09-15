import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: "general"
      }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
      };

    constructor(){
        super();
        this.state={
            articles: [],
            loading: false,
            page:1

        }
    }

      
      async componentDidMount(){
        const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b4b6597afec4499eab9275940fb283b0&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({articles: parsedData.articles, 
            totalResults: parsedData.totalResults,
            loading: false})
    }

    handlePrevClick = async()=>{
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b4b6597afec4499eab9275940fb283b0&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
        

    }
    handleNextClick = async()=>{
      let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b4b6597afec4499eab9275940fb283b0&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({
          page: this.state.page + 1,
          articles: parsedData.articles,
          loading: false
      })

    }

  render() {
    return (
      <div className='container my-4'>
        <h1 className='text-center' style={{margin: "35px 0px"}}>NewsFusion - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>(
                <div className="col-md-4" key={element.url}>
                    <NewsItem key={element.url} title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
            ))}

        </div>
        <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} > &larr; Previous</button>
            <div className="btn-group me-2" role="group" aria-label="First group">
                  <button type="button" className="btn btn-dark" onClick={this.handlePg1Click} >1</button>
                  <button type="button" className="btn btn-dark" onClick={this.handlePg2Click} >2</button>
                  <button type="button" className="btn btn-dark" onClick={this.handlePg3Click} >3</button>
                  <button type="button" className="btn btn-dark" onClick={this.handlePg4Click} >4</button>
            </div>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr; </button>

        </div>
      </div>
    )
  }
}

export default News
