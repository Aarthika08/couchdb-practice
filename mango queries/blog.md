##create json document
```
{
  "_id": "c3c691175f8f3488d784e0dcf100eff0",
  "_rev": "2-daedb163b08fa72c43b11b023e0b046b",
  "title": "couch db title",
  "content": "This is a blog post ",
  "type": "post"
}```

##write mango query
```
{
   "selector": {
      "type": "post"
   },
   "fields": [
      "_id",
      "_rev",
      "title",
      "content"
   ],
   "limit": 5,
   "sort": [
      {
         "title": "asc"
      }
   ],
   "use_index": "by_title"
}```

click manage indexes

``` {
   "index": {
      "fields": [
         "title"
      ]
   },
   "name": "title,
   "type": "json"
}```


explanation

selector- it fetch the type post ad display it,it act like a filter only type post is getting filtered
fields-it display only speicfic fields mentioned in there,
limit-to get the count of document
sort-in which order sorting have to be done,
use_index-based on index we already created.

based on above specifications the document will be displayed.
