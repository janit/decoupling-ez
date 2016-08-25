var capi;

new Vue({
    el: '#app',
    data: {
        message: '',
        login: 'admin',
        password: 'publish',
        newBikeride: {
            title:''
        },
        capi: false,
        contentService: false,
    },

    created: function(){

        var credentials = {
            login: this.login,
            password: this.password
        };

        this.capi = new eZ.CAPI(
            'http://ezsc2016.local',
            new eZ.SessionAuthAgent(credentials)
        )

        this.refreshItemList();

    },

    methods: {

        refreshItemList: function(){

            console.log('REFESH');

        },

        doLogin: function(){

            if (this.login == '' && this.password == ''){
                
                this.message = 'Enter credentials!';

            } else {

                var that = this;

                this.contentService = this.capi.getContentService();

                this.capi.logIn(function (error, response) {
                    if ( error ) {
                        that.message = 'login failed';
                        return;
                    }
                    that.message = 'login succesful';
                });
            }
        },

        createBikeride: function() {

            var that = this;

            var locationStruct = this.contentService.newLocationCreateStruct('/api/ezp/v2/content/locations/1/2');
            var contentCreateStruct = this.contentService.newContentCreateStruct('/api/ezp/v2/content/types/13',locationStruct,'eng-GB');

            contentCreateStruct.addField('title',this.newBikeride.title);

            this.contentService.createContent(contentCreateStruct,function(error, response){

                if( error ) {
                    that.message = 'CONTENT CREATION FAILED';
                } else {

                    var createdObjectId = response.document.Content._id;
                    that.contentService.publishVersion('/api/ezp/v2/content/objects/' + createdObjectId + '/versions/1', function(error, response){

                        that.message = 'Created and published content object ' + createdObjectId;

                    });

                }
               
            });

        }

    }
})