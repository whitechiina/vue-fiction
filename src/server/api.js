import qs from 'querystring'
import axios from 'axios'
import {MessageBox, Toast} from 'mint-ui'


export default {
	//获取带书籍数量的父分类
	getCategories(){
		return axios.get('/api/cats/lv2/statistics')
	},
	//获取排名分类
	getRankCategory(){
		return axios.get('/api/ranking/gender')
	},
	//获取带子分类的分类
	getSubCategory(){
		return axios.get(`/api/cats/lv2`)
	},
	//获取分类详情
	getCategoryInfo(gender, type, major, minor, start, limit) {
		return axios.get(`/api/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=${limit}`)
  	},
	//获取书籍详情
	getBookInfo(id){
		return axios.get('/api/book/'+id)
	},
	//获取书籍相关推荐
	getRecommend(id){
		return axios.get('/api/book/'+id+'/recommend')
	},
	//获取作者名下的书籍
	getAuthorBook(author){
		return axios.get('/book/fuzzy-search?query=${query}')
	},
	//获取书籍源
	getBookSources(bookid){
		//view=summary
		//book=bookid
		let book_source = qs.stringify(bookid);
		return axios.get('/api/atoc?'+book_source)
	},
	//获取书籍章节
	getChapters(id){
		return axios.get('/api/atoc/'+id+'?view=chapters')
	},
	//获取章节详细内容
	getBookChapter(link){
		return axios.get('/content/chapter/'+link)
	},
	//获取搜索热词
	getSearchHot(){
		return axios.get('/api/book/search-hotwords')
	},

	//获取搜索结果
	getSearchResult(query){
		return axios.get(`/api/book/fuzzy-search?query=${query}`)
	},
	getSearchHotwords(){
		return axios.get('/api/book/search-hotwords');
	},
	//获取排名详情
	getRank(id){
		return axios.get(`/api/ranking/${id}`)
	}		
}