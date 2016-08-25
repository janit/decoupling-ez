new Vue({
  el: '#app',
  data: {
    message: '',
    rides: [
        {
            'image': 'images/toulousse.png',
            'title': 'title 1',
            'author': 'da author',
            'route': 'Lyon Toulousse',
            'distance': '30 Km',
            'level': 'easy'
        },
        {
            'image': 'images/toulousse.png',
            'title': 'title 2',
            'author': 'da author',
            'route': 'Lyon Toulousse',
            'distance': '30 Km',
            'level': 'easy'
        },
        {
            'image': 'images/toulousse.png',
            'title': 'title 3',
            'author': 'da author',
            'route': 'Lyon Toulousse',
            'distance': '30 Km',
            'level': 'easy'
        },
    ],
    capi: false,
    contentService: false
  },

  created: function(){

    var credentials = {
        login: 'admin',
        password: 'publish'
    };

    this.capi = new eZ.CAPI(
        'http://headless.websc',
        new eZ.SessionAuthAgent(credentials)
    )

    this.contentService = this.capi.getContentService();

    that = this;

    this.capi.logIn(function (error, response) {
        if ( error ) {
            that.message = 'login failed';
            return;
        }

        that.message = 'log in ok!';
        that.refreshBikerideList();

    });

  },
  
  methods: {

    refreshBikerideList: function(){
        console.log('load the list of rides here!');


        query = this.contentService.newViewCreateStruct('test-rest-view', 'ContentQuery');
        query.body.ViewInput.LocationQuery.Criteria = { // use 'ContentQuery' here as well
            FullTextCriterion: "ez",
        };
        query.body.ViewInput.LocationQuery.limit = 10;
        // query.body.ViewInput.LocationQuery.offset = 0;
        this.contentService.createView(query, function (error, response) {
            if ( error ) {
                console.log('Error!');
                return;
            }
            console.log("Search results", response.document.View.Result.searchHits.searchHit);
        })

/*

        var query = this.contentService.newViewCreateStruct('bikerides-view', 'ContentQuery');



/*

        this.contentService.createView(query, function(){

            
        });


//			query.body.ViewInput.LocationQuery.limit = 10;

			contentService.createViewAsync(query).then(function(response){

				var searchHits = response.document.View.Result.searchHits.searchHit;
				todos = searchHits.map(getTodoContent);

				return todos;

			});
*/
        
    }

  }

})