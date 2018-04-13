var host = "douban.uieee.com"

var config = {
  host,
  // 正在热映的电影
  inTheatersUrl: `https://${host}/v2/movie/in_theaters`,
  // 即将上映
  comingSoonUrl: `https://${host}/v2/movie/coming_soon`,
  // top250
  top250Url: `https://${host}/v2/movie/top250`,
  // 电影搜索
  searchMovieUrl: `https://${host}/v2/movie/search`,
  // 电影详情
  movieDetailsUrl: `https://${host}/v2/movie/subject`
};
module.exports = config

