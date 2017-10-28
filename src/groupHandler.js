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
      access_token: 'EAAB4baPzk4QBAJrvXEOmAv8WZCeuPQSTotvk8ef8mMk1kPdATX9BvD5qZB6FOEUSKY6ZCJvsEYK0uavxFqVma42safjv2P7PkXNcDlaI0uFLC7FsCjpPgeyHRA2Pv6xJZA25qEaA62Kb6nc6DdBHRXCrBzR1xe4sTyiZBlZBHmvwZDZD'
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
