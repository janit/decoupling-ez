new Vue({
  el: '#app',
  data: {
    message: '',
    searchWord: '*',
    rides: [
        {
            'image': 'images/toulousse.png',
            'title': 'title 1',
            'author': 'da author',
            'route': 'Lyon Toulousse',
            'distance': '30',
            'level': 'easy'
        },
        {
            'image': 'images/toulousse.png',
            'title': 'title 2',
            'author': 'da author',
            'route': 'Lyon Toulousse',
            'distance': '30',
            'level': 'easy'
        },
        {
            'image': 'images/toulousse.png',
            'title': 'title 3',
            'author': 'da author',
            'route': 'Lyon Toulousse',
            'distance': '30',
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

        var that = this;

        query = this.contentService.newViewCreateStruct('bikesrides-view', 'ContentQuery');

        query.body.ViewInput.ContentQuery.Criteria = {
            ContentTypeIdentifierCriterion: 'ride'
        };

        query.body.ViewInput.ContentQuery.limit = 10;

        // query.body.ViewInput.LocationQuery.offset = 0;
        this.contentService.createView(query, function (error, response) {
            if ( error ) {
                console.log('Error!');
                return;
            }
            
            var bikeRides = [];
            var searchHits = response.document.View.Result.searchHits.searchHit;

            for (i in searchHits){

                var bikeRide = {};

                var fields = searchHits[i].value.Content.CurrentVersion.Version.Fields.field;

                for(j in fields){
                    bikeRide[fields[j].fieldDefinitionIdentifier] = fields[j].fieldValue;
                }

                bikeRides.push(bikeRide);

            }

            that.rides = bikeRides;

        });
    
    }

  }

});

function getFieldValues(field){

    var fieldValue = {};

    fieldValue[field.fieldDefinitionIdentifier] = field.fieldValue;

	return fieldValue;

}