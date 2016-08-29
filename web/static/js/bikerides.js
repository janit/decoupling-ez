new Vue({
  el: '#app',
  data: {
    message: '',
    searchWord: '',
    rides: [],
    capi: false,
    contentService: false,
    newRide: {}
  },

  created: function(){

    var credentials = {
        login: 'admin',
        password: 'publish'
    };

    this.capi = new eZ.CAPI(
        'http://headless.websc',
        new eZ.SessionAuthAgent(credentials)
    );

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

        console.log('do search');

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
                    bikeRide[fields[j].fieldDefinitionIdentifier] = that.getSimpleValue(fields[j]);
                }

                bikeRides.push(bikeRide);

            }

            that.rides = bikeRides;

        });
    
    },

    getSimpleValue: function(field){

        if(field.fieldDefinitionIdentifier == "description"){
            return field.fieldValue.xhtml5edit;

        } else if(field.fieldDefinitionIdentifier == "image"){

            if(field.fieldValue){
                return field.fieldValue.uri;
            }

        } else if(field.fieldDefinitionIdentifier == "difficulty_level"){

            if(field.fieldValue.length > 0){
                var levels = ['easy','intermediate','hard'];
                return levels[field.fieldValue[0]];

            }

            return 'not set';
        }

        return field.fieldValue;

    },

    createNewRide: function(){

        var that = this;

        var locationStruct = this.contentService.newLocationCreateStruct('/api/ezp/v2/content/locations/1/2');
        var contentCreateStruct = this.contentService.newContentCreateStruct('/api/ezp/v2/content/types/13',locationStruct,'eng-GB');

        contentCreateStruct.addField('title',this.newRide.title);

        this.contentService.createContent(contentCreateStruct,function(error, response){

            if( error ) {
                that.message = 'CONTENT CREATION FAILED';
            } else {

                var createdObjectId = response.document.Content._id;
                that.contentService.publishVersion('/api/ezp/v2/content/objects/' + createdObjectId + '/versions/1', function(error, response){

                    that.message = 'Created and published content object ' + createdObjectId;

                });

            }

            that.newRide = {};
            that.refreshBikerideList();


        });

    }

  }

});

