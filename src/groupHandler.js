var axios = require('axios')

function extractGroupIDFromUrl(url) {
  // console.log(url);
  var regex = /.+\.com\/groups\/(.+)\//
  var result = url.match(regex)

  // console.log(result[1])
  if (!isNaN(result[1])) {
    return { id: result[1], name: '' }
  }

  axios.get('https://graph.facebook.com/search', {
    params: {
      q: result[1],
      type: 'group',
      access_token: 'EAACEdEose0cBANCHF0vU3T4gg4QEiMCVwq0zLzyDpN0UPr3OZC9QqfxWOyxZCUqmnFlZB5fy3opNUY4SiFbxRmvTKlqN8QaWN4qMDZBb4XEoceedEDNq1eslUkZBCJHxJIUTQiKcMCLibkiA7TFpx5hZAfDVC40oQ2TDlZBYWZAhS62ycfQrAi77ZAn7aaXV6Xg2IxQ0CwMQyVAZDZD'
    }
  })
  .then(function (response) {
    // console.log(response.data.data[0]);
    return response.data.data[0]
  })
  .catch(function (error) {
    console.log(error);
  });
}

// extractGroupIDFromUrl('https://web.facebook.com/groups/starbucksthailandcollectors/?ref=bookmarks')

export default extractGroupIDFromUrl
