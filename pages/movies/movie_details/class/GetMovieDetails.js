const HttpUtils = require('../../../../utils/netutils.js')
const utils = require('../../../../utils/util.js');
class GetMovieDetails {
  constructor(url, data) {
    this.url = url;
    this.data=data;
   
  }
  /**
   * 获取电影详情
   */
  getMovieDetails(callBack) {
    this.callBack = callBack;
    HttpUtils.http(this.url, this.data, this.getMovieDetailsSuccessCallBack.bind(this));
  }

  /**
   * 获取电影详情成功的回调
   */
  getMovieDetailsSuccessCallBack(res) {
    /**
        * 处理导演信息
        */
    var director = {
      name: '',
      id: '',
      avatar: ''
    }
    if (res.data.directors[0] != null) {
      director.name = res.data.directors[0].name;
      director.id = res.data.directors[0].id;
      director.avatar = res.data.directors[0].avatars.large;
    }
    /**
     * 处理其他电影信息
     */
    var movieDetails = {
      movieImg: res.data.images ? res.data.images.large : "",
      country: res.data.countries[0],
      title: res.data.title,
      originalTitle: res.data.original_title,
      wishCount: res.data.wish_count,
      commentCount: res.data.comments_count,
      years: res.data.year,
      genres: res.data.genres.join('/'),
      stars: utils.starscanvas2Array(res.data.rating.stars),
      score: res.data.rating.averge,
      director: director,
      summary: res.data.summary,
      casts: utils.converToCastString(res.data.casts),
      castsInfo: utils.converToCastInfo(res.data.casts)
    }
    // wx.setNavigationBarTitle({
    //   title: res.data.title
    // })
    this.callBack(movieDetails);
    // this.setData({
    //   movieDetails: movieDetails
    // });
  }


}
export { GetMovieDetails}