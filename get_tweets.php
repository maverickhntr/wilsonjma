<?php

require_once('twitter_proxy.php');

// Twitter OAuth Config options
$oauth_access_token = '856614020970930176-eQlzwx45EOfJRWJI54D30l8rv9JjPny';
$oauth_access_token_secret = 'iZsjDHF88YGWn2cCuYcEnR3J6yLUMS1GoyuoGfYr71iCC';
$consumer_key = 'Fcnibd8Eese5QWvgAd7wSV5i8';
$consumer_secret = 'Kc1xXA6zrJJVdEcUZlbfd8uV5vGhqBXjEgJSWnbMYSjCJ57Zsy';
$user_id = '856614020970930176';
$screen_name = 'mcsmithalex';
$count = 5;

$twitter_url = 'statuses/user_timeline.json';
$twitter_url .= '?user_id=' . $user_id;
$twitter_url .= '&screen_name=' . $screen_name;
$twitter_url .= '&count=' . $count;

// Create a Twitter Proxy object from our twitter_proxy.php class
$twitter_proxy = new TwitterProxy(
    $oauth_access_token,         // 'Access token' on https://apps.twitter.com
    $oauth_access_token_secret,  // 'Access token secret' on https://apps.twitter.com
    $consumer_key,               // 'API key' on https://apps.twitter.com
    $consumer_secret,            // 'API secret' on https://apps.twitter.com
    $user_id,                    // User id (http://gettwitterid.com/)
    $screen_name,                // Twitter handle
    $count                       // The number of tweets to pull out
);

// Invoke the get method to retrieve results via a cURL request
$tweets = $twitter_proxy->get($twitter_url);

echo $tweets;

?>